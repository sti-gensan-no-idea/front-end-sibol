export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export const uploadFile = async (
  file: File,
  endpoint: string,
  additionalData?: Record<string, any>,
  onProgress?: (progress: UploadProgress) => void
): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);
  
  if (additionalData) {
    Object.keys(additionalData).forEach((key) => {
      formData.append(key, additionalData[key]);
    });
  }

  // Use fetch directly to handle progress
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    if (onProgress) {
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          onProgress({
            loaded: event.loaded,
            total: event.total,
            percentage: Math.round((event.loaded * 100) / event.total)
          });
        }
      });
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (e) {
          resolve(xhr.responseText);
        }
      } else {
        reject(new Error(`Upload failed: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => reject(new Error("Upload failed"));
    
    const token = localStorage.getItem("access_token");
    xhr.open("POST", `${import.meta.env.VITE_API_BASE_URL}${endpoint}`);
    
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }
    
    xhr.send(formData);
  });
};

// CSV upload helper for properties
export const uploadPropertiesCSV = (
  file: File, 
  projectName?: string,
  onProgress?: (progress: UploadProgress) => void
) => {
  const additionalData = projectName ? { project_name: projectName } : undefined;
  return uploadFile(file, "/properties/upload-csv", additionalData, onProgress);
};

// Generic file validation
export const validateFile = (
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): { valid: boolean; error?: string } => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = [],
    allowedExtensions = []
  } = options;

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
    };
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed`
    };
  }

  if (allowedExtensions.length > 0) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !allowedExtensions.includes(extension)) {
      return {
        valid: false,
        error: `File extension must be one of: ${allowedExtensions.join(', ')}`
      };
    }
  }

  return { valid: true };
};
