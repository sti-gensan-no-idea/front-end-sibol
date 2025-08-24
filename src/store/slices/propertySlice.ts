// Property Redux Slice
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { propertyService } from '../../services/api/propertyService';
import { Property, PropertyCreate, PropertyUpdate, PropertyResponse, CSVUploadResponse } from '../../types/apiTypes';

interface PropertyState {
  properties: PropertyResponse[];
  selectedProperty: PropertyResponse | null;
  featuredProperties: PropertyResponse[];
  loading: boolean;
  uploadProgress: number;
  error: string | null;
  filters: {
    status?: string;
    propertyType?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    projectName?: string;
  };
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  csvUploadResult: CSVUploadResponse | null;
}

const initialState: PropertyState = {
  properties: [],
  selectedProperty: null,
  featuredProperties: [],
  loading: false,
  uploadProgress: 0,
  error: null,
  filters: {},
  pagination: {
    total: 0,
    limit: 10,
    offset: 0,
    hasNext: false,
    hasPrev: false,
  },
  csvUploadResult: null,
};

// Async thunks
export const fetchProperties = createAsyncThunk(
  'properties/fetchAll',
  async (params?: any) => {
    const response = await propertyService.getProperties(params);
    return response;
  }
);

export const fetchPropertyById = createAsyncThunk(
  'properties/fetchById',
  async (propertyId: string) => {
    return await propertyService.getProperty(propertyId);
  }
);

export const createProperty = createAsyncThunk(
  'properties/create',
  async (data: PropertyCreate) => {
    return await propertyService.createProperty(data);
  }
);

export const updateProperty = createAsyncThunk(
  'properties/update',
  async ({ propertyId, data }: { propertyId: string; data: PropertyUpdate }) => {
    return await propertyService.updateProperty(propertyId, data);
  }
);

export const deleteProperty = createAsyncThunk(
  'properties/delete',
  async (propertyId: string) => {
    return await propertyService.archiveProperty(propertyId);
  }
);

export const uploadPropertiesCSV = createAsyncThunk(
  'properties/uploadCSV',
  async ({ file, projectName, onProgress }: {
    file: File;
    projectName?: string;
    onProgress?: (progress: number) => void;
  }) => {
    return await propertyService.uploadPropertiesCSV(file, projectName, onProgress);
  }
);

export const fetchFeaturedProperties = createAsyncThunk(
  'properties/fetchFeatured',
  async (limit: number = 6) => {
    return await propertyService.getFeaturedProperties(limit);
  }
);

export const assignProperty = createAsyncThunk(
  'properties/assign',
  async ({ propertyId, data }: { propertyId: string; data: any }) => {
    return await propertyService.assignProperty(propertyId, data);
  }
);

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setSelectedProperty: (state, action: PayloadAction<PropertyResponse | null>) => {
      state.selectedProperty = action.payload;
    },
    setFilters: (state, action: PayloadAction<PropertyState['filters']>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCSVUploadResult: (state) => {
      state.csvUploadResult = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch properties
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.items as PropertyResponse[];
        state.pagination = {
          total: action.payload.total,
          limit: action.payload.limit,
          offset: action.payload.offset,
          hasNext: action.payload.hasNext,
          hasPrev: action.payload.hasPrev,
        };
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch properties';
      });

    // Fetch property by ID
    builder
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.selectedProperty = action.payload;
      });

    // Create property
    builder
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.unshift(action.payload);
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create property';
      });

    // Update property
    builder
      .addCase(updateProperty.fulfilled, (state, action) => {
        const index = state.properties.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.properties[index] = action.payload;
        }
        if (state.selectedProperty?.id === action.payload.id) {
          state.selectedProperty = action.payload;
        }
      });

    // Delete property
    builder
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.properties = state.properties.filter(p => p.id !== action.payload.id);
      });

    // Upload CSV
    builder
      .addCase(uploadPropertiesCSV.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadPropertiesCSV.fulfilled, (state, action) => {
        state.loading = false;
        state.csvUploadResult = action.payload;
        state.uploadProgress = 100;
      })
      .addCase(uploadPropertiesCSV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to upload CSV';
        state.uploadProgress = 0;
      });

    // Featured properties
    builder
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        state.featuredProperties = action.payload;
      });
  },
});

export const {
  setSelectedProperty,
  setFilters,
  clearFilters,
  setUploadProgress,
  clearError,
  clearCSVUploadResult,
} = propertySlice.actions;

export default propertySlice.reducer;
