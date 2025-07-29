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
  useDisclosure,
  Badge
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
  IconMapPin,
  IconStar,
  IconSparkles,
  IconArrowRight,
  IconCheck
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
      description: 'Seamless property discovery with intelligent automation',
      icon: IconUser,
      features: [
        'AI-powered property matching',
        'Smart filtering (pet-friendly, flood-safe)',
        'Instant inquiry processing',
        'Real-time notifications',
        'Automated viewing schedules',
        'Personalized recommendations'
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
      description: 'Intelligent lead management with performance insights',
      icon: IconUsers,
      features: [
        'Smart lead prioritization',
        'Automated follow-up sequences',
        'Real-time client communication',
        'Performance analytics',
        'Calendar integration',
        'CRM synchronization'
      ],
      route: '/profile/agent',
      metrics: {
        'Active Agents': '48',
        'Response Time': '< 2hrs',
        'Conversion Rate': `${analytics.conversionRate.toFixed(1)}%`,
        'Satisfaction': '4.7/5'
      }
    },
    {
      id: 'admin',
      title: 'Admin Control',
      description: 'Complete system oversight with advanced analytics',
      icon: IconShield,
      features: [
        'Marketing automation dashboard',
        'Agent performance monitoring',
        'Property portfolio analysis',
        'Lead source tracking',
        'Market trend analysis',
        'System health monitoring'
      ],
      route: '/admin/dashboard',
      metrics: {
        'Properties': analytics.totalProperties.toString(),
        'Active Leads': analytics.activeLeads.toString(),
        'Automation': `${((analytics.automatedMessages / analytics.totalMessages) * 100).toFixed(1)}%`,
        'Uptime': '99.9%'
      }
    }
  ];

  const automationFeatures = [
    {
      title: 'Smart Lead Generation',
      description: 'Automated capture with Philippine market integration',
      icon: IconTarget,
      stats: `${analytics.activeLeads} active leads`
    },
    {
      title: 'Intelligent Scoring',
      description: 'AI-powered lead prioritization and distribution',
      icon: IconTrendingUp,
      stats: `${analytics.conversionRate.toFixed(1)}% conversion rate`
    },
    {
      title: 'Event Automation',
      description: 'Seamless scheduling with smart reminders',
      icon: IconCalendar,
      stats: `${analytics.scheduledEvents} events scheduled`
    },
    {
      title: 'Multi-Channel Messaging',
      description: 'Coordinated communication with sentiment analysis',
      icon: IconMessage,
      stats: `${analytics.totalMessages} messages sent`
    },
    {
      title: 'Real-time Analytics',
      description: 'Comprehensive insights and performance tracking',
      icon: IconChartBar,
      stats: '15+ key metrics tracked'
    },
    {
      title: 'Local Market Integration',
      description: 'Philippines-specific features and data',
      icon: IconMapPin,
      stats: '5 neighborhoods analyzed'
    }
  ];

  const integrations = [
    { name: 'Pipedrive CRM', status: 'Connected' },
    { name: 'DocuSign', status: 'Active' },
    { name: 'Avochato SMS', status: 'Running' },
    { name: 'Bryckel AI', status: 'Processing' },
    { name: 'n8n Automation', status: 'Connected' },
    { name: 'Zapier', status: 'Active' },
    { name: 'Buildium', status: 'Synced' },
    { name: 'Open Real Estate', status: 'Connected' }
  ];

  const openDemo = (demoId: string) => {
    setSelectedDemo(demoId);
    onOpen();
  };

  const selectedDemoData = demoSections.find(demo => demo.id === selectedDemo);

  return (
    <div className="min-h-screen bg-blue-100/20 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23e0f2fe' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E')] opacity-70"></div>

      <NavBar />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="p-4 rounded-2xl bg-blue-200/20 backdrop-blur-xl border border-blue-100/40 shadow-lg">
              <IconRocket className="h-12 w-12 text-blue-500" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-semibold text-blue-950 mb-6 leading-tight">
            Atuna Marketing
            <br />
            <span className="text-4xl md:text-5xl">Automation</span>
          </h1>
          
          <p className="text-lg text-blue-800 max-w-3xl mx-auto mb-10 leading-relaxed">
            Revolutionary real estate marketing automation for General Santos City. 
            Experience intelligent automation strategies crafted for the Philippine market.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Chip 
              size="lg" 
              className="bg-blue-200/20 backdrop-blur-xl border border-blue-100/40 text-blue-950 px-6 py-3"
              startContent={<IconSparkles className="h-5 w-5 text-blue-600" />}
            >
              8 AI Strategies
            </Chip>
            <Chip 
              size="lg" 
              className="bg-blue-200/20 backdrop-blur-xl border border-blue-100/40 text-blue-950 px-6 py-3"
              startContent={<IconHome className="h-5 w-5 text-blue-600" />}
            >
              {analytics.totalProperties} Properties
            </Chip>
            <Chip 
              size="lg" 
              className="bg-blue-200/20 backdrop-blur-xl border border-blue-100/40 text-blue-950 px-6 py-3"
              startContent={<IconUsers className="h-5 w-5 text-blue-600" />}
            >
              {analytics.activeLeads} Active Leads
            </Chip>
          </div>
        </div>

        {/* Demo Sections */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-center mb-12 text-blue-950">
            Interactive Demo Dashboards
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {demoSections.map((demo) => {
              const Icon = demo.icon;
              return (
                <Card 
                  key={demo.id} 
                  className="bg-blue-200/20 backdrop-blur-xl border border-blue-100/40 hover:bg-blue-200/30 transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-xl bg-blue-200/40">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-blue-950 mb-2">{demo.title}</h3>
                    <p className="text-sm text-blue-800">{demo.description}</p>
                  </CardHeader>
                  
                  <CardBody className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(demo.metrics).map(([key, value]) => (
                        <div key={key} className="text-center bg-blue-200/10 rounded-lg p-3 backdrop-blur-sm">
                          <p className="text-lg font-medium text-blue-600">{value}</p>
                          <p className="text-xs text-blue-800">{key}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Divider className="bg-blue-100/40" />
                    
                    <div className="space-y-2">
                      {demo.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-blue-800">
                          <IconCheck className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                      {demo.features.length > 3 && (
                        <p className="text-xs text-blue-600 ml-6">+{demo.features.length - 3} more features</p>
                      )}
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      <Button
                        as={Link}
                        href={demo.route}
                        className="flex-1 bg-white-500/90 text-white hover:bg-blue-600 transition-all duration-300"
                        endContent={<IconArrowRight className="h-4 w-4" />}
                      >
                        Open Dashboard
                      </Button>
                      <Button
                        variant="bordered"
                        className="flex-1 border-blue-100/50 text-blue-950 hover:bg-blue-200/20"
                        onPress={() => openDemo(demo.id)}
                      >
                        Details
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Automation Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-center mb-12 text-blue-950">
            Automation Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-blue-200/20 backdrop-blur-xl border border-blue-100/40 hover:bg-blue-200/30 transition-all duration-300"
                >
                  <CardBody className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-200/40">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-medium text-blue-950 text-lg">{feature.title}</h3>
                    </div>
                    
                    <p className="text-sm text-blue-800 leading-relaxed">{feature.description}</p>
                    
                    <div className="bg-blue-200/10 p-2 rounded-lg border border-blue-100/30">
                      <p className="text-sm font-medium text-blue-600">{feature.stats}</p>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>

        {/* System Integrations */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-center mb-12 text-blue-950">
            System Integrations
          </h2>
          
          <Card className="bg-blue-200/20 backdrop-blur-xl border border-blue-100/40">
            <CardBody className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {integrations.map((integration, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-blue-200/10 border border-blue-100/30 rounded-lg hover:bg-blue-200/20 transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-blue-950 text-sm">{integration.name}</p>
                    </div>
                    <Chip 
                      size="sm" 
                      className="bg-blue-200/20 text-blue-600"
                      variant="flat"
                    >
                      {integration.status}
                    </Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: IconMessage, value: analytics.totalMessages, label: 'Messages' },
            { icon: IconCalendar, value: analytics.scheduledEvents, label: 'Events' },
            { icon: IconMap, value: `${((analytics.automatedMessages / analytics.totalMessages) * 100).toFixed(0)}%`, label: 'Automated' },
            { icon: IconStar, value: analytics.averageAgentRating.toFixed(1), label: 'Rating' }
          ].map((stat, index) => (
            <Card key={index} className="bg-blue-200/20 backdrop-blur-xl border border-blue-100/40 hover:bg-blue-200/30 transition-all duration-300">
              <CardBody className="text-center p-4">
                <div className="inline-flex p-2 rounded-lg bg-blue-200/40 mb-3">
                  <stat.icon className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-2xl font-medium text-blue-950 mb-1">{stat.value}</p>
                <p className="text-sm text-blue-800">{stat.label}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-blue-200/20 backdrop-blur-xl border border-blue-100/40">
          <CardBody className="text-center py-12">
            <h2 className="text-3xl font-semibold mb-6 text-blue-950">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg mb-8 text-blue-800 max-w-3xl mx-auto leading-relaxed">
              Experience the future of real estate marketing automation designed specifically for the Philippine market.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                as={Link} 
                href="/admin/dashboard" 
                size="lg" 
                className="bg-blue-500/90 text-white hover:bg-blue-600 px-6 py-3 transition-all duration-300"
                startContent={<IconChartBar className="h-5 w-5" />}
              >
                Admin Dashboard
              </Button>
              <Button 
                as={Link} 
                href="/profile/agent" 
                size="lg"
                variant="bordered"
                className="border-blue-100/50 text-blue-950 hover:bg-blue-200/20 px-6 py-3"
                startContent={<IconUsers className="h-5 w-5" />}
              >
                Agent Dashboard
              </Button>
              <Button 
                as={Link} 
                href="/profile/client" 
                size="lg"
                variant="light"
                className="text-blue-950 hover:bg-blue-200/20 px-6 py-3"
                startContent={<IconUser className="h-5 w-5" />}
              >
                Browse Properties
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Enhanced Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="3xl"
        classNames={{
          backdrop: "bg-blue-900/80 backdrop-blur-sm",
          base: "bg-blue-200/20 backdrop-blur-xl border border-blue-100/40",
          header: "border-b border-blue-100/40",
          body: "py-6",
          footer: "border-t border-blue-100/40"
        }}
      >
        <ModalContent>
          {selectedDemoData ? (
            <>
              <ModalHeader className="flex items-center gap-3 text-blue-950">
                <div className="p-2 rounded-lg bg-blue-200/40">
                  <selectedDemoData.icon className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-lg font-semibold">{selectedDemoData.title}</span>
              </ModalHeader>
              
              <ModalBody className="text-blue-950">
                <div className="space-y-6">
                  <p className="text-blue-800 text-base leading-relaxed">{selectedDemoData.description}</p>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-lg">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(selectedDemoData.metrics).map(([key, value]) => (
                        <div key={key} className="bg-blue-200/10 p-3 rounded-lg text-center backdrop-blur-sm border border-blue-100/30">
                          <p className="text-lg font-medium text-blue-600">{value}</p>
                          <p className="text-xs text-blue-800">{key}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-lg">Complete Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedDemoData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-blue-200/10 rounded-lg">
                          <IconCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span className="text-sm text-blue-800">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ModalBody>
              
              <ModalFooter>
                <Button 
                  variant="light" 
                  onPress={onClose}
                  className="text-blue-950 hover:bg-blue-200/20"
                >
                  Close
                </Button>
                <Button 
                  as={Link} 
                  href={selectedDemoData.route} 
                  className="bg-blue-500/90 text-white hover:bg-blue-600"
                  onPress={onClose}
                  endContent={<IconArrowRight className="h-4 w-4" />}
                >
                  Open Dashboard
                </Button>
              </ModalFooter>
            </>
          ) : null}
        </ModalContent>
      </Modal>
    </div>
  );
};