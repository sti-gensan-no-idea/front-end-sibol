import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { 
  Input, 
  Button, 
  Card, 
  CardBody 
} from '@heroui/react';
import { IconUser, IconMail, IconPhone, IconBuilding, IconId } from '@tabler/icons-react';
import { personalInfoSchema, type PersonalInfoFormData } from '../validation';
import { useSignupStore } from '../state';
import { ROLE_CONFIG } from '../roleConfig';

export function StepPersonalInfo() {
  const navigate = useNavigate();
  const { role, setPersonalData, setCurrentStep } = useSignupStore();
  const [isLoading, setIsLoading] = useState(false);

  const roleConfig = role ? ROLE_CONFIG[role] : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
  });

  const onSubmit = async (data: PersonalInfoFormData) => {
    setIsLoading(true);
    
    try {
      // Save personal data to store
      setPersonalData(data);
      setCurrentStep(2);
      
      // Navigate to next step
      navigate(`/signup/${role}/verify-email`);
    } catch (error) {
      console.error('Error saving personal info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!role || !roleConfig) {
    return <div>Invalid role</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600">
          Tell us about yourself to get started
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            {...register('firstName')}
            label="First Name"
            placeholder="Enter your first name"
            startContent={<IconUser className="w-4 h-4 text-gray-400" />}
            isRequired
            isInvalid={!!errors.firstName}
            errorMessage={errors.firstName?.message}
          />
          
          <Input
            {...register('lastName')}
            label="Last Name"
            placeholder="Enter your last name"
            startContent={<IconUser className="w-4 h-4 text-gray-400" />}
            isRequired
            isInvalid={!!errors.lastName}
            errorMessage={errors.lastName?.message}
          />
        </div>

        <Input
          {...register('email')}
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          startContent={<IconMail className="w-4 h-4 text-gray-400" />}
          isRequired
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />

        <Input
          {...register('phoneNumber')}
          label="Phone Number"
          placeholder="Enter your phone number"
          startContent={<IconPhone className="w-4 h-4 text-gray-400" />}
          isRequired
          isInvalid={!!errors.phoneNumber}
          errorMessage={errors.phoneNumber?.message}
        />

        {/* Role-specific fields */}
        {roleConfig.personalFields?.companyName && (
          <Input
            {...register('companyName')}
            label="Company Name"
            placeholder="Enter your company name"
            startContent={<IconBuilding className="w-4 h-4 text-gray-400" />}
            isInvalid={!!errors.companyName}
            errorMessage={errors.companyName?.message}
          />
        )}

        {roleConfig.personalFields?.prcNumber && (
          <Input
            {...register('prcNumber')}
            label="PRC Number"
            placeholder="Enter your PRC license number"
            startContent={<IconId className="w-4 h-4 text-gray-400" />}
            isInvalid={!!errors.prcNumber}
            errorMessage={errors.prcNumber?.message}
          />
        )}

        <div className="flex justify-between pt-6">
          <Button
            variant="flat"
            color="default"
            onClick={() => navigate('/signup')}
          >
            Change Role
          </Button>
          
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            className="px-8"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
