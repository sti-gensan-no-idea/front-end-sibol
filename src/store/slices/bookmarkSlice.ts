// Bookmark Redux Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../services/api/apiClient';
import { BookmarkCreate, BookmarkResponse } from '../../types/apiTypes';

interface BookmarkState {
  bookmarks: BookmarkResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: BookmarkState = {
  bookmarks: [],
  loading: false,
  error: null,
};

export const fetchBookmarks = createAsyncThunk(
  'bookmarks/fetchAll',
  async (params?: { limit?: number; offset?: number }) => {
    const response = await apiClient.getPaginated<BookmarkResponse>('/bookmarks/', params);
    return response.items;
  }
);

export const addBookmark = createAsyncThunk(
  'bookmarks/add',
  async (data: BookmarkCreate) => {
    return await apiClient.post<BookmarkResponse>('/bookmarks/', data);
  }
);

export const removeBookmark = createAsyncThunk(
  'bookmarks/remove',
  async (bookmarkId: string) => {
    await apiClient.delete(`/bookmarks/${bookmarkId}`);
    return bookmarkId;
  }
);

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookmarks';
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.bookmarks.unshift(action.payload);
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.bookmarks = state.bookmarks.filter(b => b.id !== action.payload);
      });
  },
});

export const { clearError } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
