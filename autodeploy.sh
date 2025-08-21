#!/usr/bin/env bash
#
# Autodeploy script for Atuna FE (Vite)
# - Pulls latest from Git
# - Builds production assets
# - Publishes to Nginx web root
# - Keeps timestamped releases for quick rollback
#
# Usage:
#   ./autodeploy.sh                # deploy main from origin
#   BRANCH=main ./autodeploy.sh    # deploy a specific branch
#   GIT_REMOTE=origin ./autodeploy.sh
#   NGINX_RELOAD=false ./autodeploy.sh  # skip nginx reload (CI dry-runs)
#
# Requirements: git, node, yarn (or npm), rsync, bash

set -Eeuo pipefail

### --- Config (adjust to your server layout) --- ###
REPO_DIR="/var/www/atuna-fe"
WEB_ROOT="/var/www/site/dist"                  # Nginx serves from here
RELEASES_BASE="/var/www/site/releases"         # store built releases
BRANCH="${BRANCH:-main}"
GIT_REMOTE="${GIT_REMOTE:-origin}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
NODE_BUILD_CMD="${NODE_BUILD_CMD:-yarn build}" # or: npm run build
NODE_INSTALL_CMD="${NODE_INSTALL_CMD:-yarn install --frozen-lockfile}" # or: npm ci
ENV_FILE="${ENV_FILE:-.env.production}"        # used by Vite if present
OWNER="${OWNER:-www-data:www-data}"
LOCKFILE="/tmp/atuna-fe-deploy.lock"
NGINX_RELOAD="${NGINX_RELOAD:-true}"
### --------------------------------------------- ###

log() { printf "\033[1;32m[deploy]\033[0m %s\n" "$*"; }
err() { printf "\033[1;31m[error]\033[0m %s\n" "$*" >&2; }

# Single-run lock
exec 9>"$LOCKFILE"
if ! flock -n 9; then
  err "Another deployment is running (lock: $LOCKFILE)"
  exit 1
fi

# Pre-flight checks
for cmd in git rsync; do
  command -v "$cmd" >/dev/null 2>&1 || { err "Missing dependency: $cmd"; exit 1; }
done

if ! command -v yarn >/dev/null 2>&1 && ! command -v npm >/dev/null 2>&1; then
  err "Missing Node package manager (yarn or npm)."
  exit 1
fi

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
RELEASE_DIR="$RELEASES_BASE/$TIMESTAMP"
BUILD_DIR="$REPO_DIR/dist"

trap 'err "Deployment failed. See logs above."; exit 1' ERR

log "Starting frontend deployment at $TIMESTAMP"
log "Repo: $REPO_DIR  | Branch: $BRANCH  | Remote: $GIT_REMOTE"

# 1) Update code
cd "$REPO_DIR"
git fetch --all --prune
git checkout "$BRANCH"
git reset --hard "$GIT_REMOTE/$BRANCH"
git submodule update --init --recursive || true

# 2) Install deps (only if needed)
if [ -f "yarn.lock" ]; then
  log "Installing dependencies with yarn…"
  $NODE_INSTALL_CMD
else
  log "Installing dependencies with npm…"
  NODE_INSTALL_CMD="npm ci"
  $NODE_INSTALL_CMD
fi

# 3) Build
log "Building production assets…"
rm -rf "$BUILD_DIR"
# Ensure Vite uses production env if you rely on .env.production (VITE_* vars)
export NODE_ENV=production
$NODE_BUILD_CMD

# Minimal sanity check
if [ ! -f "$BUILD_DIR/index.html" ]; then
  err "Build produced no index.html ($BUILD_DIR/index.html missing)."
  exit 1
fi

# 4) Stage release and publish atomically
log "Staging new release at $RELEASE_DIR"
mkdir -p "$RELEASE_DIR"
rsync -a --delete "$BUILD_DIR/" "$RELEASE_DIR/"

log "Publishing to $WEB_ROOT (atomic rsync)…"
mkdir -p "$WEB_ROOT"
rsync -a --delete "$RELEASE_DIR/" "$WEB_ROOT/"

# 5) Permissions
log "Fixing ownership to $OWNER"
chown -R "$OWNER" "$WEB_ROOT" "$RELEASES_BASE" || true

# 6) Keep only last N releases
if [ -d "$RELEASES_BASE" ]; then
  log "Pruning old releases (keeping last $KEEP_RELEASES)…"
  ls -1dt "$RELEASES_BASE"/* 2>/dev/null | tail -n +$((KEEP_RELEASES + 1)) | xargs --no-run-if-empty rm -rf
fi

# 7) Reload Nginx (optional)
if [ "$NGINX_RELOAD" = "true" ]; then
  log "Reloading Nginx…"
  if nginx -t >/dev/null 2>&1; then
    systemctl reload nginx || true
  else
    err "Nginx config test failed; skipping reload."
  fi
else
  log "Skipping Nginx reload (NGINX_RELOAD=false)"
fi

log "✅ Frontend deployed successfully at $TIMESTAMP"
