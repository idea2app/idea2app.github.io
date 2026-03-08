import { client } from './Base';

export interface FileUploadResponse {
  url: string;
  name: string;
}

export class FileModel {
  async upload(file: File): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await client.post<FileUploadResponse>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.body!;
  }
}

export const fileModel = new FileModel();