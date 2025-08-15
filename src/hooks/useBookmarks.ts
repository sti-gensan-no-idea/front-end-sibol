import { useState, useEffect, useCallback } from 'react';
import { dataService, type Bookmark, type BookmarkCreate } from '../services';

interface UseBookmarksReturn {
  bookmarks: Bookmark[];
  loading: boolean;
  error: string | null;
  fetchBookmarks: () => Promise<void>;
  addBookmark: (propertyId: string) => Promise<Bookmark | null>;
  removeBookmark: (id: string) => Promise<boolean>;
  isBookmarked: (propertyId: string) => boolean;
  toggleBookmark: (propertyId: string) => Promise<boolean>;
}

export const useBookmarks = (): UseBookmarksReturn => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getBookmarks();
      setBookmarks(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  }, []);

  const addBookmark = useCallback(async (propertyId: string): Promise<Bookmark | null> => {
    setLoading(true);
    setError(null);
    try {
      const bookmarkData: BookmarkCreate = { property_id: propertyId };
      const newBookmark = await dataService.createBookmark(bookmarkData);
      setBookmarks(prev => [...prev, newBookmark]);
      return newBookmark;
    } catch (err: any) {
      setError(err.message || 'Failed to add bookmark');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeBookmark = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await dataService.deleteBookmark(id);
      setBookmarks(prev => prev.filter(b => b.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to remove bookmark');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const isBookmarked = useCallback((propertyId: string): boolean => {
    return bookmarks.some(bookmark => bookmark.property_id === propertyId);
  }, [bookmarks]);

  const toggleBookmark = useCallback(async (propertyId: string): Promise<boolean> => {
    const existingBookmark = bookmarks.find(b => b.property_id === propertyId);
    
    if (existingBookmark) {
      return await removeBookmark(existingBookmark.id);
    } else {
      const result = await addBookmark(propertyId);
      return result !== null;
    }
  }, [bookmarks, addBookmark, removeBookmark]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return {
    bookmarks,
    loading,
    error,
    fetchBookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
  };
};
