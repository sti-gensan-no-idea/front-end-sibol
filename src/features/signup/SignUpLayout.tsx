import { ReactNode, useMemo } from 'react';
import { Card, CardBody } from '@heroui/react';
import { 
  IconUser, 
  IconMail, 
  IconFileText, 
  IconHome 
} from '@tabler/icons-react';
import { ValidationStepper } from './components/Stepper';
import { useSignupStore } from './state';
import { ROLE_CONFIG, type Role } from './roleConfig';

interface SignUpLayoutProps {
  children: ReactNode;
  role: Role;
}

const SIDEBAR_ICONS = [
  { icon: IconHome, href: '/', label: 'Home' },
  { icon: IconUser, href: '/profile', label: 'Profile' },
  { icon: IconFileText, href: '/properties', label: 'Properties' },
  { icon: IconMail, href: '/contact', label: 'Contact' },
];

export function SignUpLayout({ children, role }: SignUpLayoutProps) {
  const { 
    currentStep, 
    personalData, 
    emailVerified, 
    mobileVerified,
    filesData, 
    otpData 
  } = useSignupStore();
  
  const roleConfig = ROLE_CONFIG[role];

  // Validation logic for each step
  const steps = useMemo(() => {
    const requiredFiles = roleConfig.requiredFiles || [];
    const filesUploaded = requiredFiles.every(fileKey => 
      filesData && filesData[fileKey.key]
    );

    const isPersonalInfoComplete = personalData && 
      personalData.email && 
      personalData.firstName && 
      personalData.lastName;

    const isContactVerified = emailVerified && mobileVerified;
    
    return [
      {
        number: 1,
        title: "Complete Profile",
        description: "Fill in your basic information",
        isValid: Boolean(isPersonalInfoComplete),
        isRequired: true,
        validationMessage: !isPersonalInfoComplete ? 
          "Please fill in all required personal information" : undefined
      },
      {
        number: 2,
        title: "Verify Email & Mobile",
        description: "Confirm your contact details",
        isValid: isContactVerified,
        isRequired: true,
        validationMessage: !isContactVerified ? 
          `Please verify: ${[
            !emailVerified ? "Email" : "",
            !mobileVerified ? "Mobile" : ""
          ].filter(Boolean).join(" & ")}` : undefined
      },
      {
        number: 3,
        title: "Upload Credentials",
        description: "Submit required documents",
        isValid: filesUploaded,
        isRequired: requiredFiles.length > 0,
        validationMessage: !filesUploaded && requiredFiles.length > 0 ? 
          `Please upload: ${requiredFiles.map(f => f.label).join(', ')}` : undefined
      },
      {
        number: 4,
        title: "Get Started",
        description: "Complete your registration",
        isValid: isPersonalInfoComplete && isContactVerified && (requiredFiles.length === 0 || filesUploaded),
        isRequired: false,
      }
    ];
  }, [personalData, emailVerified, mobileVerified, filesData, roleConfig.requiredFiles]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-white shadow-sm border-r border-gray-200 flex flex-col items-center py-6">
        {/* Logo */}
        <div className="w-8 h-8 bg-primary rounded-lg mb-8 flex items-center justify-center">
          <IconHome className="w-5 h-5 text-white" />
        </div>

        {/* Navigation Icons */}
        <div className="flex flex-col space-y-4">
          {SIDEBAR_ICONS.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Stepper Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6">
          <div className="sticky top-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                {roleConfig.displayName} Registration
              </h1>
              <p className="text-sm text-gray-600">
                {roleConfig.description}
              </p>
            </div>

            {/* Stepper */}
            <ValidationStepper 
              currentStep={currentStep} 
              steps={steps} 
            />

            {/* Role Info */}
            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm font-medium text-primary">
                  {roleConfig.statusBadgeText}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {roleConfig.benefits?.[0] || "Complete registration to access your dashboard"}
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Step Header */}
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {currentStep}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {steps[currentStep - 1]?.title}
                </h2>
              </div>
              <p className="text-gray-600 ml-11">
                {steps[currentStep - 1]?.description}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-sm">
                <CardBody className="p-8">
                  {children}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
