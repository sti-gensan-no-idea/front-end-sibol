import { useState, useEffect, useCallback } from "react";

import {
  dataService,
  type SiteViewing,
  type SiteViewingCreate,
} from "../services";

interface UseSiteViewingsReturn {
  siteViewings: SiteViewing[];
  loading: boolean;
  error: string | null;
  fetchSiteViewings: () => Promise<void>;
  createSiteViewing: (
    viewingData: SiteViewingCreate,
  ) => Promise<SiteViewing | null>;
  createGuestSiteViewing: (
    viewingData: SiteViewingCreate,
  ) => Promise<SiteViewing | null>;
  updateSiteViewing: (
    id: string,
    viewingData: Partial<SiteViewingCreate>,
  ) => Promise<SiteViewing | null>;
  confirmViewing: (id: string) => Promise<boolean>;
  cancelViewing: (id: string) => Promise<boolean>;
}

export const useSiteViewings = (): UseSiteViewingsReturn => {
  const [siteViewings, setSiteViewings] = useState<SiteViewing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSiteViewings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getSiteViewings();

      setSiteViewings(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch site viewings");
    } finally {
      setLoading(false);
    }
  }, []);

  const createSiteViewing = useCallback(
    async (viewingData: SiteViewingCreate): Promise<SiteViewing | null> => {
      setLoading(true);
      setError(null);
      try {
        const newViewing = await dataService.createSiteViewing(viewingData);

        setSiteViewings((prev) => [...prev, newViewing]);

        return newViewing;
      } catch (err: any) {
        setError(err.message || "Failed to create site viewing");

        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const createGuestSiteViewing = useCallback(
    async (viewingData: SiteViewingCreate): Promise<SiteViewing | null> => {
      setLoading(true);
      setError(null);
      try {
        const newViewing =
          await dataService.createGuestSiteViewing(viewingData);

        setSiteViewings((prev) => [...prev, newViewing]);

        return newViewing;
      } catch (err: any) {
        setError(err.message || "Failed to create guest site viewing");

        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateSiteViewing = useCallback(
    async (
      id: string,
      viewingData: Partial<SiteViewingCreate>,
    ): Promise<SiteViewing | null> => {
      setLoading(true);
      setError(null);
      try {
        const updatedViewing = await dataService.updateSiteViewing(
          id,
          viewingData,
        );

        setSiteViewings((prev) =>
          prev.map((v) => (v.id === id ? updatedViewing : v)),
        );

        return updatedViewing;
      } catch (err: any) {
        setError(err.message || "Failed to update site viewing");

        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const confirmViewing = useCallback(
    async (id: string): Promise<boolean> => {
      return (await updateSiteViewing(id, { status: "confirmed" })) !== null;
    },
    [updateSiteViewing],
  );

  const cancelViewing = useCallback(
    async (id: string): Promise<boolean> => {
      return (await updateSiteViewing(id, { status: "cancelled" })) !== null;
    },
    [updateSiteViewing],
  );

  useEffect(() => {
    fetchSiteViewings();
  }, [fetchSiteViewings]);

  return {
    siteViewings,
    loading,
    error,
    fetchSiteViewings,
    createSiteViewing,
    createGuestSiteViewing,
    updateSiteViewing,
    confirmViewing,
    cancelViewing,
  };
};
