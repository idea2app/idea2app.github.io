interface FileUploadOptions {
  allowedTypes?: string[];
  maxSize?: number;
  onProgress?: (progress: number) => void;
}

interface FileUploadResponse {
  success: boolean;
  data?: {
    id: string;
    filename: string;
    url: string;
    size: number;
    type: string;
  };
  error?: string;
}

interface FileParseResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export class FileAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/files') {
    this.baseUrl = baseUrl;
  }

  async upload(file: File, options: FileUploadOptions = {}): Promise<FileUploadResponse> {
    const { allowedTypes, maxSize, onProgress } = options;

    // Validate file type
    if (allowedTypes && !allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: `File type ${file.type} is not allowed`
      };
    }

    // Validate file size
    if (maxSize && file.size > maxSize) {
      return {
        success: false,
        error: `File size exceeds maximum limit of ${maxSize} bytes`
      };
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const xhr = new XMLHttpRequest();
      
      return new Promise<FileUploadResponse>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && onProgress) {
            const progress = (event.loaded / event.total) * 100;
            onProgress(progress);
          }
        });

        xhr.onload = () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (error) {
              resolve({
                success: false,
                error: 'Invalid response format'
              });
            }
          } else {
            resolve({
              success: false,
              error: `Upload failed with status ${xhr.status}`
            });
          }
        };

        xhr.onerror = () => {
          resolve({
            success: false,
            error: 'Network error during upload'
          });
        };

        xhr.open('POST', `${this.baseUrl}/upload`);
        xhr.send(formData);
      });
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async parse(fileId: string, format?: string): Promise<FileParseResponse> {
    try {
      const url = new URL(`${this.baseUrl}/parse/${fileId}`, window.location.origin);
      if (format) {
        url.searchParams.append('format', format);
      }

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Parse failed with status ${response.status}`
        };
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async delete(fileId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/${fileId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Delete failed with status ${response.status}`
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getInfo(fileId: string): Promise<FileUploadResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${fileId}`);

      if (!response.ok) {
        return {
          success: false,
          error: `Failed to get file info with status ${response.status}`
        };
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  validateFile(file: File, options: FileUploadOptions = {}): { valid: boolean; error?: string } {
    const { allowedTypes, maxSize } = options;

    if (allowedTypes && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed`
      };
    }

    if (maxSize && file.size > maxSize) {
      return {
        valid: false,
        error: `File size exceeds maximum limit of ${maxSize} bytes`
      };
    }

    return { valid: true };
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const fileAPI = new FileAPI();