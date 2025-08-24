import { useCallback, useState } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { IconUpload, IconFile, IconX } from "@tabler/icons-react";
import type { CredentialItem } from "../roleConfig";

interface FileDropzoneProps {
  credential: CredentialItem;
  file: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  error?: string;
}

export function FileDropzone({ 
  credential, 
  file, 
  onFileSelect, 
  onFileRemove, 
  error 
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSelectFile(droppedFile);
    }
  }, [credential]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSelectFile(selectedFile);
    }
  }, [credential]);

  const validateAndSelectFile = (file: File) => {
    // Check file type
    if (!credential.accept.includes(file.type)) {
      alert(`Invalid file type. Accepted types: ${credential.accept.join(", ")}`);
      return;
    }

    // Check file size (convert MB to bytes)
    const maxSize = credential.maxMB * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File too large. Maximum size: ${credential.maxMB}MB`);
      return;
    }

    onFileSelect(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full">
      <CardBody className="p-6">
        {/* Label */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {credential.label}
            {!credential.optional && <span className="text-danger ml-1">*</span>}
          </h3>
        </div>

        {!file ? (
          /* Upload Area */
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${isDragOver 
                ? "border-primary bg-primary/5" 
                : error
                ? "border-danger bg-danger/5"
                : "border-default-300 bg-default-50"
              }
            `}
          >
            <IconUpload className="w-12 h-12 text-default-400 mx-auto mb-4" />
            <p className="text-default-600 mb-2">
              Drag and drop your file here, or{" "}
              <label className="text-primary cursor-pointer hover:underline">
                browse
                <input
                  type="file"
                  accept={credential.accept.join(",")}
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </p>
            <p className="text-sm text-default-400">{credential.helper}</p>
          </div>
        ) : (
          /* File Preview */
          <div className="border border-default-200 rounded-lg p-4 bg-default-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconFile className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-default-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                color="danger"
                onPress={onFileRemove}
                aria-label="Remove file"
              >
                <IconX className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {error && (
          <p className="text-danger text-sm mt-2">{error}</p>
        )}
      </CardBody>
    </Card>
  );
}
