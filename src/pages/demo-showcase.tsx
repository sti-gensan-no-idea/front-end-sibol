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
      color: 'primary',
      gradient: 'from-blue-400 to-purple-500',
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
      color: 'success',
      gradient: 'from-green-400 to-emerald-500',
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
      color: 'warning',
      gradient: 'from-orange-400 to-pink-500',
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
      stats: `${analytics.activeLeads} active leads`,
      color: 'primary'
    },
    {
      title: 'Intelligent Scoring',
      description: 'AI-powered lead prioritization and distribution',
      icon: IconTrendingUp,
      stats: `${analytics.conversionRate.toFixed(1)}% conversion rate`,
      color: 'success'
    },
    {
      title: 'Event Automation',
      description: 'Seamless scheduling with smart reminders',
      icon: IconCalendar,
      stats: `${analytics.scheduledEvents} events scheduled`,
      color: 'secondary'
    },
    {
      title: 'Multi-Channel Messaging',
      description: 'Coordinated communication with sentiment analysis',
      icon: IconMessage,
      stats: `${analytics.totalMessages} messages sent`,
      color: 'warning'
    },
    {
      title: 'Real-time Analytics',
      description: 'Comprehensive insights and performance tracking',
      icon: IconChartBar,
      stats: '15+ key metrics tracked',
      color: 'danger'
    },
    {
      title: 'Local Market Integration',
      description: 'Philippines-specific features and data',
      icon: IconMapPin,
      stats: '5 neighborhoods analyzed',
      color: 'primary'
    }
  ];

  const integrations = [
    { name: 'Pipedrive CRM', status: 'Connected', color: 'success' },
    { name: 'DocuSign', status: 'Active', color: 'primary' },
    { name: 'Avochato SMS', status: 'Running', color: 'warning' },
    { name: 'Bryckel AI', status: 'Processing', color: 'secondary' },
    { name: 'n8n Automation', status: 'Connected', color: 'success' },
    { name: 'Zapier', status: 'Active', color: 'primary' },
    { name: 'Buildium', status: 'Synced', color: 'success' },
    { name: 'Open Real Estate', status: 'Connected', color: 'success' }
  ];

  const openDemo = (demoId: string) => {
    setSelectedDemo(demoId);
    onOpen();
  };

  const selectedDemoData = demoSections.find(demo => demo.id === selectedDemo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <NavBar />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="p-6 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              <IconRocket className="h-16 w-16 text-purple-300" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent mb-8 leading-tight">
            aTuna Marketing
            <br />
            <span className="text-4xl md:text-6xl">Automation</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Revolutionary real estate marketing automation for General Santos City. 
            Experience intelligent automation strategies crafted for the Philippine market.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge content="New" color="primary" variant="flat" className="p-0">
              <Chip 
                size="lg" 
                className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-3"
                startContent={<IconSparkles className="h-5 w-5" />}
              >
                8 AI Strategies
              </Chip>
            </Badge>
            <Chip 
              size="lg" 
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-3"
              startContent={<IconHome className="h-5 w-5" />}
            >
              {analytics.totalProperties} Properties
            </Chip>
            <Chip 
              size="lg" 
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-3"
              startContent={<IconUsers className="h-5 w-5" />}
            >
              {analytics.activeLeads} Active Leads
            </Chip>
          </div>
        </div>

        {/* Demo Sections */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Interactive Demo Dashboards
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {demoSections.map((demo) => {
              const Icon = demo.icon;
              return (
                <Card 
                  key={demo.id} 
                  className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
                >
                  <CardHeader className="text-center pb-6">
                    <div className="flex justify-center mb-6">
                      <div className={`p-4 rounded-full bg-gradient-to-r ${demo.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{demo.title}</h3>
                    <p className="text-slate-300">{demo.description}</p>
                  </CardHeader>
                  
                  <CardBody className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(demo.metrics).map(([key, value]) => (
                        <div key={key} className="text-center bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                          <p className="text-xl font-bold text-purple-300">{value}</p>
                          <p className="text-xs text-slate-400">{key}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Divider className="bg-white/20" />
                    
                    <div className="space-y-3">
                      {demo.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-slate-300">
                          <IconCheck className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                      {demo.features.length > 3 && (
                        <p className="text-xs text-slate-400 ml-7">+{demo.features.length - 3} more features</p>
                      )}
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button
                        as={Link}
                        href={demo.route}
                        className={`flex-1 bg-gradient-to-r ${demo.gradient} text-white font-semibold hover:scale-105 transition-transform`}
                        endContent={<IconArrowRight className="h-4 w-4" />}
                      >
                        Open Dashboard
                      </Button>
                      <Button
                        variant="bordered"
                        className="flex-1 border-white/30 text-white hover:bg-white/10"
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
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Automation Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                >
                  <CardBody className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-${feature.color}/20 group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-6 w-6 text-${feature.color}`} />
                      </div>
                      <h3 className="font-semibold text-white text-lg">{feature.title}</h3>
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                    
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-lg border border-white/10">
                      <p className="text-sm font-medium text-purple-200">{feature.stats}</p>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>

        {/* System Integrations */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            System Integrations
          </h2>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardBody className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {integrations.map((integration, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{integration.name}</p>
                    </div>
                    <Chip 
                      size="sm" 
                      color={integration.color as any}
                      variant="flat"
                      className="ml-2"
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
            { icon: IconMessage, value: analytics.totalMessages, label: 'Messages', color: 'from-blue-400 to-purple-500' },
            { icon: IconCalendar, value: analytics.scheduledEvents, label: 'Events', color: 'from-green-400 to-emerald-500' },
            { icon: IconMap, value: `${((analytics.automatedMessages / analytics.totalMessages) * 100).toFixed(0)}%`, label: 'Automated', color: 'from-orange-400 to-pink-500' },
            { icon: IconStar, value: analytics.averageAgentRating.toFixed(1), label: 'Rating', color: 'from-purple-400 to-indigo-500' }
          ].map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 transition-transform duration-300">
              <CardBody className="text-center p-6">
                <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-lg border border-white/20 shadow-2xl">
          <CardBody className="text-center py-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-12 text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of real estate marketing automation designed specifically for the Philippine market.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Button 
                as={Link} 
                href="/admin/dashboard" 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-4 hover:scale-105 transition-transform"
                startContent={<IconChartBar className="h-5 w-5" />}
              >
                Admin Dashboard
              </Button>
              <Button 
                as={Link} 
                href="/profile/agent" 
                size="lg"
                variant="bordered"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4"
                startContent={<IconUsers className="h-5 w-5" />}
              >
                Agent Dashboard
              </Button>
              <Button 
                as={Link} 
                href="/profile/client" 
                size="lg"
                variant="light"
                className="text-white hover:bg-white/10 px-8 py-4"
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
          backdrop: "bg-black/80 backdrop-blur-sm",
          base: "bg-white/10 backdrop-blur-lg border border-white/20",
          header: "border-b border-white/20",
          body: "py-6",
          footer: "border-t border-white/20"
        }}
      >
        <ModalContent>
          {selectedDemoData ? (
            <>
              <ModalHeader className="flex items-center gap-3 text-white">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedDemoData.gradient}`}>
                  <selectedDemoData.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl">{selectedDemoData.title}</span>
              </ModalHeader>
              
              <ModalBody className="text-white">
                <div className="space-y-6">
                  <p className="text-slate-300 text-lg leading-relaxed">{selectedDemoData.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-4 text-xl">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedDemoData.metrics).map(([key, value]) => (
                        <div key={key} className="bg-white/10 p-4 rounded-lg text-center backdrop-blur-sm border border-white/10">
                          <p className="text-2xl font-bold text-purple-300">{value}</p>
                          <p className="text-sm text-slate-400">{key}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4 text-xl">Complete Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedDemoData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <IconCheck className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-slate-300">{feature}</span>
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
                  className="text-white hover:bg-white/10"
                >
                  Close
                </Button>
                <Button 
                  as={Link} 
                  href={selectedDemoData.route} 
                  className={`bg-gradient-to-r ${selectedDemoData.gradient} text-white font-semibold`}
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
