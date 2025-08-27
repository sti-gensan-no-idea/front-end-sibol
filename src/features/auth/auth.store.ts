export type UserRole = 'client' | 'developer' | 'agent' | 'broker' | 'admin';

export type TokenResponse = {
  access_token: string;
  token_type: string;
  user_id: string;
  role: UserRole;
};

export function saveAuth(token: TokenResponse) {
  localStorage.setItem('access_token', token.access_token);
  localStorage.setItem('user_role', token.role);
  localStorage.setItem('user_id', token.user_id);
  
}

export function clearAuth() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_role');
  localStorage.removeItem('user_id');
}

export function getRole(): UserRole | null {
  return (localStorage.getItem('user_role') as UserRole) ?? null;
}

export function getUserId(): string | null {
  return localStorage.getItem('user_id');
}

export function getToken(): string | null {
  return localStorage.getItem('access_token');
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
