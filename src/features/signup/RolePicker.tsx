import { Card, CardBody, Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { 
  IconUser, 
  IconBuilding, 
  IconUsers, 
  IconHome 
} from '@tabler/icons-react';

const ROLES = [
  {
    key: 'developer' as const,
    title: 'Developer',
    description: 'Build and sell properties',
    icon: IconBuilding,
    features: ['Property management', 'Sales tracking', 'Agent network'],
  },
  {
    key: 'broker' as const,
    title: 'Broker',
    description: 'Lead agent teams',
    icon: IconUsers,
    features: ['Team management', 'Commission tracking', 'Lead distribution'],
  },
  {
    key: 'agent' as const,
    title: 'Agent',
    description: 'Sell properties',
    icon: IconUser,
    features: ['Client management', 'Property listings', 'Commission tracking'],
  },
  {
    key: 'client' as const,
    title: 'Client',
    description: 'Buy or rent properties',
    icon: IconHome,
    features: ['Property search', 'Saved favorites', 'Agent matching'],
  },
];

export function RolePicker() {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    navigate(`/signup/${role}/personal`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Role
          </h1>
          <p className="text-gray-600">
            Select the role that best describes you to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <Card 
                key={role.key} 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/30"
                onClick={() => handleRoleSelect(role.key)}
                isPressable
              >
                <CardBody className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {role.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {role.description}
                      </p>
                      
                      <ul className="space-y-1">
                        {role.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-500 flex items-center">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        color="primary" 
                        variant="flat" 
                        size="sm" 
                        className="mt-4"
                      >
                        Sign up as {role.title}
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <Button
              variant="light"
              size="sm"
              className="p-0 text-primary"
              onClick={() => navigate('/signin')}
            >
              Sign in here
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
