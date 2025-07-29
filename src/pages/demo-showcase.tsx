import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Link,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/react";
import {
  IconRocket,
  IconUser,
  IconUsers,
  IconShield,
  IconCalendar,
  IconChartBar,
  IconMessage,
  IconHome,
  IconMap,
  IconTarget,
  IconTrendingUp,
  IconMail,
  IconPhone,
  IconMapPin,
  IconStar
} from "@tabler/icons-react";
import { NavBar } from "@/components/navbar";
import { useAutomation } from "@/contexts/automation-context";

export const DemoShowcasePage = () => {
  const { analytics } = useAutomation();
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const demoSections = [
    {
      id: 'client',
      title: 'Client Experience',
      description: 'Property browsing, inquiry submission, and automated follow-ups',
      icon: IconUser,
      color: 'primary',
      features: [
        'Smart property filtering (pet-friendly, non-haunted, flood risk)',
        'Advanced search with Philippine-specific criteria',
        'Automated inquiry processing and lead scoring',
        'Real-time SMS/Email notifications',
        'Favorite properties management',
        'Scheduled viewing automation'
      ],
      route: '/profile/client',
      metrics: {
        'Active Users': '2,450+',
        'Properties Viewed': '15,680',
        'Inquiries Sent': '847',
        'Satisfaction Rate': '94%'
      }
    },
    {
      id: 'agent',
      title: 'Agent Dashboard',
      description: 'Lead management, event scheduling, and performance analytics',
      icon: IconUsers,
      color: 'success',
      features: [
        'Prioritized lead management by seriousness score',
        'Automated follow-up templates and triggers',
        'Real-time chat with clients',
        'Event scheduling with automatic notifications',
        'Performance analytics and conversion tracking',
        'Integration with CRM and communication tools'
      ],
      route: '/profile/agent',
      metrics: {
        'Active Agents': '48',
        'Avg Response Time': '< 2 hours',
        'Conversion Rate': `${analytics.conversionRate.toFixed(1)}%`,
        'Client Satisfaction': '4.7/5'
      }
    },
    {
      id: 'admin',
      title: 'Admin Control Center',
      description: 'Complete system oversight with marketing automation analytics',
      icon: IconShield,
      color: 'warning',
      features: [
        'Comprehensive marketing automation dashboard',
        'Agent performance monitoring and analytics',
        'Property portfolio analysis and insights',
        'Lead source performance tracking',
        'Neighborhood market analysis',
        'System integration health monitoring'
      ],
      route: '/admin/dashboard',
      metrics: {
        'Total Properties': analytics.totalProperties.toString(),
        'Active Leads': analytics.activeLeads.toString(),
        'Automation Rate': `${((analytics.automatedMessages / analytics.totalMessages) * 100).toFixed(1)}%`,
        'System Uptime': '99.9%'
      }
    }
  ];

  const automationFeatures = [
    {
      title: 'Lead Generation & Follow-ups',
      description: 'Automated lead capture with Philippine-specific forms and instant SMS/email follow-ups',
      icon: IconTarget,
      stats: `${analytics.activeLeads} active leads, ${((analytics.automatedMessages / analytics.totalMessages) * 100).toFixed(1)}% automated`
    },
    {
      title: 'Lead Scoring & Distribution',
      description: 'Smart lead prioritization and automatic agent assignment based on specialization',
      icon: IconTrendingUp,
      stats: `${analytics.conversionRate.toFixed(1)}% conversion rate for high-score leads`
    },
    {
      title: 'Event Scheduling',
      description: 'Automated viewing appointments with calendar integration and SMS reminders',
      icon: IconCalendar,
      stats: `${analytics.scheduledEvents} events scheduled this month`
    },
    {
      title: 'Multi-Channel Messaging',
      description: 'Coordinated SMS, email, and social media campaigns with sentiment analysis',
      icon: IconMessage,
      stats: `${analytics.totalMessages} messages sent, ${analytics.positiveMessages} positive responses`
    },
    {
      title: 'Marketing Analytics',
      description: 'Real-time insights on lead sources, conversion rates, and neighborhood performance',
      icon: IconChartBar,
      stats: 'Live dashboard with 15+ key metrics'
    },
    {
      title: 'Philippine Market Integration',
      description: 'Local features including haunted properties, flood risk, and General Santos City data',
      icon: IconMapPin,
      stats: '5 neighborhoods analyzed, PHP pricing, local mobile formats'
    }
  ];

  const integrations = [
    { name: 'Pipedrive CRM', status: 'Connected', description: 'Lead management and pipeline tracking' },
    { name: 'DocuSign', status: 'Active', description: 'Automated document signing workflows' },
    { name: 'Avochato SMS', status: 'Running', description: 'SMS automation and 2-way messaging' },
    { name: 'Bryckel AI', status: 'Processing', description: 'Sentiment analysis and property scoring' },
    { name: 'n8n Automation', status: 'Connected', description: 'Complex workflow automation' },
    { name: 'Zapier', status: 'Active', description: 'App integration and trigger management' },
    { name: 'Buildium', status: 'Synced', description: 'Property management and lease tracking' },
    { name: 'Open Real Estate', status: 'Connected', description: 'Listing syndication and promotion' }
  ];

  const openDemo = (demoId: string) => {
    setSelectedDemo(demoId);
    onOpen();
  };

  const selectedDemoData = demoSections.find(demo => demo.id === selectedDemo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 p-4 rounded-full">
              <IconRocket className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
            aTuna Marketing Automation
          </h1>
          <p className="text-xl text-foreground-600 max-w-3xl mx-auto mb-8">
            Complete real estate marketing automation solution for General Santos City. 
            Experience 8 integrated automation strategies designed for the Philippine market.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Chip size="lg" variant="flat" color="primary" className="px-4 py-2">
              <IconMap className="h-4 w-4 mr-2" />
              8 Automation Strategies
            </Chip>
            <Chip size="lg" variant="flat" color="success" className="px-4 py-2">
              <IconHome className="h-4 w-4 mr-2" />
              {analytics.totalProperties} Properties
            </Chip>
            <Chip size="lg" variant="flat" color="warning" className="px-4 py-2">
              <IconUsers className="h-4 w-4 mr-2" />
              {analytics.activeLeads} Active Leads
            </Chip>
          </div>
        </div>

        {/* Demo Sections */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Interactive Demo Dashboards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {demoSections.map((demo) => {
              const Icon = demo.icon;
              return (
                <Card key={demo.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className={`bg-${demo.color}-100 p-3 rounded-full`}>
                        <Icon className={`h-8 w-8 text-${demo.color}-600`} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">{demo.title}</h3>
                    <p className="text-foreground-600">{demo.description}</p>
                  </CardHeader>
                  <CardBody className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(demo.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="text-lg font-bold text-primary">{value}</p>
                          <p className="text-xs text-foreground-600">{key}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Divider />
                    
                    <div className="space-y-2">
                      {demo.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                      {demo.features.length > 3 && (
                        <p className="text-xs text-foreground-500">+{demo.features.length - 3} more features</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      <Button
                        as={Link}
                        href={demo.route}
                        color={demo.color as any}
                        variant="solid"
                        className="flex-1"
                      >
                        Open Dashboard
                      </Button>
                      <Button
                        variant="light"
                        onPress={() => openDemo(demo.id)}
                        className="flex-1"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Automation Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Marketing Automation Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardBody className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary-100 p-2 rounded-lg">
                        <Icon className="h-5 w-5 text-primary-600" />
                      </div>
                      <h3 className="font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-foreground-600">{feature.description}</p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-primary">{feature.stats}</p>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>

        {/* System Integrations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">System Integrations</h2>
          <Card>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-divider rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{integration.name}</p>
                      <p className="text-xs text-foreground-600">{integration.description}</p>
                    </div>
                    <Chip size="sm" variant="flat" color="success">
                      {integration.status}
                    </Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardBody>
              <IconMessage className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{analytics.totalMessages}</p>
              <p className="text-sm text-foreground-600">Messages Sent</p>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody>
              <IconCalendar className="h-8 w-8 mx-auto mb-2 text-success" />
              <p className="text-2xl font-bold">{analytics.scheduledEvents}</p>
              <p className="text-sm text-foreground-600">Events Scheduled</p>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody>
              <IconMap className="h-8 w-8 mx-auto mb-2 text-warning" />
              <p className="text-2xl font-bold">{((analytics.automatedMessages / analytics.totalMessages) * 100).toFixed(0)}%</p>
              <p className="text-sm text-foreground-600">Automated</p>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody>
              <IconStar className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <p className="text-2xl font-bold">{analytics.averageAgentRating.toFixed(1)}</p>
              <p className="text-sm text-foreground-600">Agent Rating</p>
            </CardBody>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <CardBody className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Real Estate Business?</h2>
            <p className="text-lg mb-8 text-primary-100">
              Experience the future of real estate marketing automation designed specifically for the Philippine market.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button as={Link} href="/admin/dashboard" size="lg" color="warning" variant="solid">
                <IconChartBar className="h-5 w-5 mr-2" />
                View Admin Dashboard
              </Button>
              <Button as={Link} href="/profile/agent" size="lg" variant="bordered" className="text-white border-white">
                <IconUsers className="h-5 w-5 mr-2" />
                Try Agent Dashboard
              </Button>
              <Button as={Link} href="/profile/client" size="lg" variant="light" className="text-white">
                <IconUser className="h-5 w-5 mr-2" />
                Browse as Client
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Demo Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          {selectedDemoData && (
            <>
              <ModalHeader className="flex items-center space-x-3">
                <selectedDemoData.icon className="h-6 w-6 text-primary" />
                <span>{selectedDemoData.title} - Detailed Features</span>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <p className="text-foreground-600">{selectedDemoData.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Key Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedDemoData.metrics).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-xl font-bold text-primary">{value}</p>
                          <p className="text-sm text-foreground-600">{key}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Complete Feature List</h4>
                    <div className="space-y-2">
                      {selectedDemoData.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button 
                  as={Link} 
                  href={selectedDemoData.route} 
                  color="primary"
                  onPress={onClose}
                >
                  Open Dashboard
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
