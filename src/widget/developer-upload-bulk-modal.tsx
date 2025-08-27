import { useState, useRef } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Progress,
  Alert,
} from "@heroui/react";
import {
  IconFileUpload,
  IconFileSpreadsheet,
  IconDownload,
  IconCheck,
} from "@tabler/icons-react";

import { useProperties } from "../hooks";

export const BulkUploadModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { uploadCSV, loading, error } = useProperties();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadResults, setUploadResults] = useState<{
    successful: number;
    failed: number;
    errors?: string[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedFileTypes = [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && acceptedFileTypes.includes(file.type)) {
      setSelectedFile(file);
      setUploadComplete(false);
      setUploadResults(null);
    } else {
      alert("Please select a valid CSV or Excel file.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file && acceptedFileTypes.includes(file.type)) {
      setSelectedFile(file);
      setUploadComplete(false);
      setUploadResults(null);
    } else {
      alert("Please select a valid CSV or Excel file.");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploadProgress(0);
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const result = await uploadCSV(selectedFile);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadComplete(true);

      // Map the response structure to match what the UI expects
      setUploadResults({
        successful: result.success_count,
        failed: result.error_count,
        errors: result.errors,
      });
    } catch (err: any) {
      setUploadProgress(0);
      console.error("Upload failed:", err);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadComplete(false);
    setUploadResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onOpenChange(false);
  };

  const downloadTemplate = () => {
    // Create a CSV template
    const headers = [
      "name",
      "description",
      "address",
      "city",
      "province",
      "price",
      "property_type",
      "bedrooms",
      "bathrooms",
      "area",
      "parking_slots",
      "amenities",
    ];

    const sampleData = [
      "Sample House",
      "Beautiful 3-bedroom house",
      "123 Main Street",
      "Quezon City",
      "Metro Manila",
      "5000000",
      "house",
      "3",
      "2",
      "120",
      "2",
      "Swimming pool, Garage",
    ];

    const csvContent = [headers.join(","), sampleData.join(",")].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "properties_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Modal
      backdrop="blur"
      isDismissable={false}
      isOpen={isOpen}
      size="4xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(_onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <IconFileUpload />
                Bulk Upload Properties
              </div>
              <p className="text-sm text-gray-500 font-normal">
                Upload multiple properties using CSV or Excel file
              </p>
            </ModalHeader>

            <ModalBody>
              {error && <Alert color="danger" title={error} variant="solid" />}

              {!uploadComplete && (
                <>
                  {/* File Upload Area */}
                  <Card
                    className={`border-2 border-dashed cursor-pointer transition-colors ${
                      selectedFile
                        ? "border-green-300 bg-green-50"
                        : "border-gray-300 hover:border-primary-300 hover:bg-gray-50"
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onPress={() => fileInputRef.current?.click()}
                  >
                    <CardBody className="text-center py-8">
                      <div className="flex flex-col items-center gap-4">
                        {selectedFile ? (
                          <>
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                              <IconCheck className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-green-700">
                                {selectedFile.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                                MB
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                              <IconFileSpreadsheet className="w-8 h-8 text-gray-400" />
                            </div>
                            <div>
                              <p className="font-semibold">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-sm text-gray-500">
                                CSV or Excel files up to 10MB
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </CardBody>
                  </Card>

                  <input
                    ref={fileInputRef}
                    accept=".csv,.xlsx,.xls"
                    className="hidden"
                    type="file"
                    onChange={handleFileSelect}
                  />

                  {/* Download Template */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-blue-800">
                        Need a template?
                      </p>
                      <p className="text-sm text-blue-600">
                        Download our CSV template with sample data
                      </p>
                    </div>
                    <Button
                      color="primary"
                      size="sm"
                      startContent={<IconDownload />}
                      variant="flat"
                      onPress={downloadTemplate}
                    >
                      Download Template
                    </Button>
                  </div>

                  {/* Upload Progress */}
                  {loading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                </>
              )}

              {/* Upload Results */}
              {uploadComplete && uploadResults && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <IconCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Upload Complete!</p>
                      <p className="text-sm text-gray-500">
                        File processed successfully
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {uploadResults.successful}
                      </p>
                      <p className="text-sm text-green-700">Successful</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">
                        {uploadResults.failed}
                      </p>
                      <p className="text-sm text-red-700">Failed</p>
                    </div>
                  </div>

                  {uploadResults.errors && uploadResults.errors.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-semibold text-red-700">Errors:</p>
                      <div className="max-h-32 overflow-y-auto">
                        {uploadResults.errors.map((error, index) => (
                          <div
                            key={index}
                            className="text-sm text-red-600 bg-red-50 p-2 rounded"
                          >
                            {error}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleClose}>
                {uploadComplete ? "Close" : "Cancel"}
              </Button>
              {!uploadComplete && (
                <Button
                  color="primary"
                  disabled={!selectedFile || loading}
                  isLoading={loading}
                  onPress={handleUpload}
                >
                  {loading ? "Uploading..." : "Upload Properties"}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
