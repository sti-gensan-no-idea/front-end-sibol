import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Chip } from '@heroui/react';
import { 
  IconArrowLeft, 
  IconCircleCheck, 
  IconUser, 
  IconMail, 
  IconPhone, 
  IconBuilding, 
  IconFileText,
  IconId
} from '@tabler/icons-react';
import { useSignupStore } from '../state';
import { ROLE_CONFIG } from '../roleConfig';
import { submitApplication } from '../api';

export function StepReview() {
  const navigate = useNavigate();
  const { role, personalData, filesData, reset } = useSignupStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roleConfig = role ? ROLE_CONFIG[role] : null;

  const handleSubmit = async () => {
    if (!role || !personalData || !filesData) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await submitApplication({
        role,
        personal: personalData,
        files: filesData,
      });

      if (response.success) {
        // Reset store and redirect to success page or dashboard
        reset();
        navigate('/signin', { 
          state: { 
            message: 'Registration submitted successfully! Please check your email for next steps.',
            type: 'success'
          }
        });
      } else {
        setError(response.error || 'Failed to submit application');
      }
    } catch (error) {
      setError('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(`/signup/${role}/credentials`);
  };

  if (!role || !roleConfig || !personalData) {
    return <div>Invalid data</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <IconCircleCheck className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Review & Submit
        </h2>
        <p className="text-gray-600">
          Please review your information before submitting
        </p>
      </div>

      <div className="space-y-6">
        {/* Role Badge */}
        <div className="flex justify-center">
          <Chip 
            color="primary" 
            variant="flat" 
            size="lg"
            startContent={<IconUser className="w-4 h-4" />}
          >
            {roleConfig.statusBadgeText}
          </Chip>
        </div>

        {/* Personal Information */}
        <Card>
          <CardBody className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <IconUser className="w-5 h-5 mr-2 text-primary" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <IconUser className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{personalData.firstName} {personalData.lastName}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <IconMail className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{personalData.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <IconPhone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{personalData.phoneNumber}</p>
                </div>
              </div>

              {personalData.companyName && (
                <div className="flex items-center space-x-3">
                  <IconBuilding className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium">{personalData.companyName}</p>
                  </div>
                </div>
              )}

              {personalData.prcNumber && (
                <div className="flex items-center space-x-3">
                  <IconId className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">PRC Number</p>
                    <p className="font-medium">{personalData.prcNumber}</p>
                  </div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Uploaded Documents */}
        <Card>
          <CardBody className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <IconFileText className="w-5 h-5 mr-2 text-primary" />
              Uploaded Documents
            </h3>
            
            <div className="space-y-3">
              {roleConfig.credentials.map((credential) => {
                const file = filesData?.[credential.key];
                return (
                  <div key={credential.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <IconFileText className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-sm">{credential.label}</p>
                        {file && (
                          <p className="text-xs text-gray-500">
                            {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Chip 
                      size="sm" 
                      color={file ? "success" : credential.optional ? "default" : "warning"}
                      variant="flat"
                    >
                      {file ? "Uploaded" : credential.optional ? "Optional" : "Required"}
                    </Chip>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Error Display */}
        {error && (
          <Card>
            <CardBody>
              <p className="text-danger text-sm">{error}</p>
            </CardBody>
          </Card>
        )}

        {/* Terms Notice */}
        <div className="text-center text-sm text-gray-500">
          <p>
            By submitting, you agree to our{' '}
            <Button variant="light" size="sm" className="p-0 text-primary">
              Terms of Service
            </Button>{' '}
            and{' '}
            <Button variant="light" size="sm" className="p-0 text-primary">
              Privacy Policy
            </Button>
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          variant="flat"
          color="default"
          startContent={<IconArrowLeft className="w-4 h-4" />}
          onClick={handleBack}
          isDisabled={isSubmitting}
        >
          Back
        </Button>
        
        <Button
          color="success"
          isLoading={isSubmitting}
          onClick={handleSubmit}
          className="px-8"
          startContent={!isSubmitting ? <IconCircleCheck className="w-4 h-4" /> : undefined}
        >
          Submit Application
        </Button>
      </div>
    </div>
  );
}
