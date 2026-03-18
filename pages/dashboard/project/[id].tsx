import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Upload, X, FileText, Image } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  content: string;
}

export default function ProjectRequirementPage() {
  const router = useRouter();
  const { id } = router.query;
  const [requirement, setRequirement] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const processFile = useCallback(async (file: File): Promise<FileItem> => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve({
          id,
          name: file.name,
          size: file.size,
          type: file.type,
          content
        });
      };
      
      reader.onerror = () => reject(new Error('文件读取失败'));
      
      if (file.type.startsWith('text/') || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
        reader.readAsText(file);
      } else if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });
  }, []);

  const handleFileSelect = useCallback(async (files: FileList) => {
    const filePromises = Array.from(files).map(processFile);
    try {
      const processedFiles = await Promise.all(filePromises);
      setUploadedFiles(prev => [...prev, ...processedFiles]);
      
      // 如果是文本文件，将内容添加到需求输入框
      const textFiles = processedFiles.filter(file => 
        file.type.startsWith('text/') || file.name.endsWith('.md') || file.name.endsWith('.txt')
      );
      
      if (textFiles.length > 0) {
        const textContent = textFiles.map(file => `\n\n--- ${file.name} ---\n${file.content}`).join('');
        setRequirement(prev => prev + textContent);
      }
    } catch (error) {
      console.error('文件处理失败:', error);
    }
  }, [processFile]);

  const handleFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
    // 重置input值以便重复选择同一文件
    e.target.value = '';
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  }, [handleFileSelect]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of Array.from(items)) {
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) {
          handleFileSelect([file] as any);
        }
      }
    }
  }, [handleFileSelect]);

  const removeFile = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  }, []);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  const getFileIcon = useCallback((type: string, name: string) => {
    if (type.startsWith('image/')) {
      return <Image className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">项目需求评估</h1>
            <p className="mt-1 text-sm text-gray-600">请详细描述您的项目需求，或上传相关文档</p>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {/* 文件上传区域 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">文档上传</label>
                  <button
                    onClick={handleFileUpload}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    选择文件
                  </button>
                </div>

                {/* 拖拽上传区域 */}
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragOver
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    拖拽文件到此处上传，或{' '}
                    <button
                      onClick={handleFileUpload}
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      点击选择文件
                    </button>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    支持 TXT, MD, 图片等格式
                  </p>
                </div>

                {/* 已上传文件列表 */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">已上传文件</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            {getFileIcon(file.type, file.name)}
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 需求输入区域 */}
              <div className="space-y-2">
                <label htmlFor="requirement" className="text-sm font-medium text-gray-700">
                  项目需求描述
                </label>
                <textarea
                  ref={textareaRef}
                  id="requirement"
                  rows={12}
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  onPaste={handlePaste}
                  placeholder="请详细描述您的项目需求，包括功能要求、技术规格、预期目标等。您也可以直接粘贴文档内容或拖拽文件到此处..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
                <p className="text-xs text-gray-500">
                  支持粘贴文本内容，拖拽文件上传，或使用上方的文件上传功能
                </p>
              </div>

              {/* 提交按钮 */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => router.back()}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  返回
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={!requirement.trim() && uploadedFiles.length === 0}
                >
                  提交评估
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".txt,.md,.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}