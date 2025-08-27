// Bookmarks API Endpoints
import api from '../core/apiService';
import { Bookmark, BookmarkCreate, PaginatedResponse } from '../types';

class BookmarksAPI {
  async addBookmark(data: BookmarkCreate): Promise<Bookmark> {
    return api.post<Bookmark>('/bookmarks/', data);
  }

  async getBookmarks(params?: {
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<Bookmark>> {
    return api.get<PaginatedResponse<Bookmark>>('/bookmarks/', { params });
  }

  async getBookmark(bookmarkId: string): Promise<Bookmark> {
    return api.get<Bookmark>(`/bookmarks/${bookmarkId}`);
  }

  async removeBookmark(bookmarkId: string): Promise<void> {
    return api.delete<void>(`/bookmarks/${bookmarkId}`);
  }
}

export const bookmarksAPI = new BookmarksAPI();
export default bookmarksAPI;
