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
} from "@heroui/react";
import { IconFileUpload, IconFile, IconDownload } from "@tabler/icons-react";
import { useProperties } from "../hooks";

interface BulkUploadModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const BulkUploadModal = ({
  isOpen,
  onOpenChange,
  onSuccess,
}: BulkUploadModalProps) => {
  const { uploadCSV, loading, error } = useProperties();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a CSV or Excel file (.csv, .xls, .xlsx)');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    const success = await uploadCSV(selectedFile);
    
    if (success) {
      setSelectedFile(null);
      onOpenChange(false);
      
      if (onSuccess) {
        onSuccess();
      }
      
      alert('Properties uploaded successfully!');
    }
  };

  const downloadTemplate = () => {
    // Create a sample CSV template
    const csvContent = `title,description,price,location,property_type,bedrooms,bathrooms,area
"Sample House","A beautiful 3-bedroom house",5000000,"Makati City","house",3,2,120
"Condo Unit","Modern condominium unit",3500000,"BGC Taguig","condominium",2,1,80
"Townhouse","Spacious townhouse with garage",6500000,"Quezon City","townhouse",4,3,150`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'property_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      backdrop="blur"
      isDismissible={false}
      isOpen={isOpen}
      size="3xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Bulk Upload Properties</ModalHeader>
            <ModalBody>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Template Download */}
                <Card>
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Need a template?</h4>
                        <p className="text-sm text-gray-600">
                          Download our CSV template to format your data correctly.
                        </p>
                      </div>
                      <Button
                        color="primary"
                        variant="flat"
                        startContent={<IconDownload />}
                        onPress={downloadTemplate}
                      >
                        Download Template
                      </Button>
                    </div>
                  </CardBody>
                </Card>

                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                    dragActive 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {selectedFile ? (
                    <div className="space-y-2">
                      <IconFile className="w-12 h-12 mx-auto text-green-500" />
                      <p className="font-semibold">{selectedFile.name}</p>
                      <p className="text-sm text-gray-600">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={() => setSelectedFile(null)}
                      >
                        Remove File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <IconFileUpload className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="font-semibold">Drop your CSV/Excel file here</p>
                      <p className="text-sm text-gray-600">
                        or click to browse files
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports: .csv, .xls, .xlsx (max 10MB)
                      </p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {/* Upload Instructions */}
                <Card>
                  <CardBody>
                    <h4 className="font-semibold mb-2">Upload Guidelines:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Required columns: title, price, location, property_type</li>
                      <li>• Optional columns: description, bedrooms, bathrooms, area</li>
                      <li>• Property types: house, condominium, townhouse, lot, commercial</li>
                      <li>• Price should be in Philippine Pesos (numbers only)</li>
                      <li>• Maximum file size: 10MB</li>
                    </ul>
                  </CardBody>
                </Card>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button 
                color="primary" 
                onPress={handleUpload}
                isLoading={loading}
                disabled={loading || !selectedFile}
                startContent={<IconFileUpload />}
              >
                {loading ? "Uploading..." : "Upload Properties"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
