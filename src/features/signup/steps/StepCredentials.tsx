import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';
import { IconArrowLeft, IconFileText } from '@tabler/icons-react';
import { useSignupStore } from '../state';
import { ROLE_CONFIG } from '../roleConfig';
import { FileDropzone } from '../components/FileDropzone';

export function StepCredentials() {
  const navigate = useNavigate();
  const { role, emailVerified, filesData, setFileData, removeFileData, setCurrentStep } = useSignupStore();
  const [isLoading, setIsLoading] = useState(false);

  const roleConfig = role ? ROLE_CONFIG[role] : null;

  const handleFileUpload = (key: string, file: File) => {
    setFileData(key, file);
  };

  const handleFileRemove = (key: string) => {
    removeFileData(key);
  };

  const handleContinue = () => {
    setCurrentStep(4);
    navigate(`/signup/${role}/review`);
  };

  const handleBack = () => {
    navigate(`/signup/${role}/verify-email`);
  };

  // Check if user has verified email
  if (!emailVerified) {
    navigate(`/signup/${role}/verify-email`);
    return null;
  }

  if (!role || !roleConfig) {
    return <div>Invalid role</div>;
  }

  // Check if required files are uploaded
  const requiredCredentials = roleConfig.credentials.filter(cred => !cred.optional);
  const hasAllRequiredFiles = requiredCredentials.every(cred => 
    filesData && filesData[cred.key]
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <IconFileText className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Upload Credentials
        </h2>
        <p className="text-gray-600">
          Upload your documents to verify your {roleConfig.displayName.toLowerCase()} credentials
        </p>
      </div>

      <div className="space-y-6">
        {roleConfig.credentials.length === 1 ? (
          // Single credential - center it
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <FileDropzone
                credential={roleConfig.credentials[0]}
                file={filesData?.[roleConfig.credentials[0].key] || null}
                onFileSelect={(file) => handleFileUpload(roleConfig.credentials[0].key, file)}
                onFileRemove={() => handleFileRemove(roleConfig.credentials[0].key)}
              />
            </div>
          </div>
        ) : (
          // Multiple credentials - use grid
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roleConfig.credentials.map((credential) => (
              <FileDropzone
                key={credential.key}
                credential={credential}
                file={filesData?.[credential.key] || null}
                onFileSelect={(file) => handleFileUpload(credential.key, file)}
                onFileRemove={() => handleFileRemove(credential.key)}
              />
            ))}
          </div>
        )}

        {/* Requirements info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            {roleConfig.credentials.map((credential) => (
              <li key={credential.key} className="flex items-start">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                <span>
                  <strong>{credential.label}</strong>
                  {credential.optional && <span className=" text-gray-500"> (Optional)</span>}
                  <br />
                  {credential.helper}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          variant="flat"
          color="default"
          startContent={<IconArrowLeft className="w-4 h-4" />}
          onClick={handleBack}
        >
          Back
        </Button>
        
        <Button
          color="primary"
          isLoading={isLoading}
          onClick={handleContinue}
          className="px-8"
          isDisabled={!hasAllRequiredFiles}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
