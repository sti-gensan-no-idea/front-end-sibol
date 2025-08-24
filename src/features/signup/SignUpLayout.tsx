import { ReactNode } from 'react';
import { Card, CardBody } from '@heroui/react';
import { 
  IconUser, 
  IconMail, 
  IconFileText, 
  IconHome 
} from '@tabler/icons-react';
import { Stepper } from './components/Stepper';
import { useSignupStore } from './state';
import { ROLE_CONFIG, type Role } from './roleConfig';

interface SignUpLayoutProps {
  children: ReactNode;
  role: Role;
}

const STEPS = [
  {
    number: 1,
    title: 'Personal Info',
    description: 'Basic information',
  },
  {
    number: 2,
    title: 'Verify Email',
    description: 'Email verification',
  },
  {
    number: 3,
    title: 'Credentials',
    description: 'Upload documents',
  },
  {
    number: 4,
    title: 'Review',
    description: 'Review & submit',
  },
];

const SIDEBAR_ICONS = [
  { icon: IconHome, href: '/', label: 'Home' },
  { icon: IconUser, href: '/profile', label: 'Profile' },
  { icon: IconFileText, href: '/properties', label: 'Properties' },
  { icon: IconMail, href: '/contact', label: 'Contact' },
];

export function SignUpLayout({ children, role }: SignUpLayoutProps) {
  const { currentStep } = useSignupStore();
  const roleConfig = ROLE_CONFIG[role];

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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Sign up as {roleConfig.displayName}
            </h1>
            <p className="text-gray-600">
              Complete your registration to get your {roleConfig.statusBadgeText}
            </p>
          </div>
        </div>

        {/* Stepper */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <Stepper currentStep={currentStep} steps={STEPS} />
        </div>

        {/* Content Area */}
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
  );
}
