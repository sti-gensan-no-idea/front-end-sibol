import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  Tab,
  Avatar,
  Divider
} from "@heroui/react";
import {
  IconChartBar,
  IconUsers,
  IconHome,
  IconMessage,
  IconCalendar,
  IconClipboard,
  IconTrendingUp,
  IconTrendingDown,
  IconMail,
  IconPhone,
  IconMapPin,
  IconStar,
  IconTarget,
  IconActivity,
  IconSettings,
  IconDashboard
} from "@tabler/icons-react";
import { useAutomation } from "@/contexts/automation-context";
import { EventPlannerScheduler } from "@/components/event-planner-scheduler";
import { NavBar } from "@/components/navbar";
import Pipeline from "./pipeline";

export const AdminDashboardPage = () => {
  const {
    analytics,
    filteredProperties,
    filteredLeads,
    agents,
    messages,
    filteredEvents,
    leases,
    documents
  } = useAutomation();

  const [activeTab, setActiveTab] = useState('overview');

  const renderOverview = () => (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardBody className="flex flex-row items-center space-x-4">
            <div className="p-3 rounded-full">
              <IconHome className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-foreground-600">Total Properties</p>
              <p className="text-2xl font-bold">{analytics.totalProperties}</p>
              <div className="flex items-center space-x-1">
                <IconTrendingUp className="h-4 w-4 text-success" />
                <span className="text-success text-xs">+12% from last month</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardBody className="flex flex-row items-center space-x-4">
            <div className="bg-success-100 p-3 rounded-full">
              <IconUsers className="h-6 w-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-foreground-600">Active Leads</p>
              <p className="text-2xl font-bold">{analytics.activeLeads}</p>
              <div className="flex items-center space-x-1">
                <IconTrendingUp className="h-4 w-4 text-success" />
                <span className="text-success text-xs">+8% conversion rate</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardBody className="flex flex-row items-center space-x-4">
            <div className="bg-warning-100 p-3 rounded-full">
              <IconTarget className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-foreground-600">Revenue (₱)</p>
              <p className="text-2xl font-bold">₱{(analytics.medianPrice / 1000000 * 25).toFixed(1)}M</p>
              <div className="flex items-center space-x-1">
                <IconTrendingDown className="h-4 w-4 text-danger" />
                <span className="text-danger text-xs">-3% from target</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardBody className="flex flex-row items-center space-x-4">
            <div className="bg-secondary-100 p-3 rounded-full">
              <IconActivity className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-foreground-600">Automation Rate</p>
              <p className="text-2xl font-bold">{((analytics.automatedMessages / analytics.totalMessages) * 100).toFixed(1)}%</p>
              <div className="flex items-center space-x-1">
                <IconTrendingUp className="h-4 w-4 text-success" />
                <span className="text-success text-xs">Highly automated</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Lead Sources Performance</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {Object.entries(analytics.leadSourceCounts).map(([source, count]) => {
                const percentage = ((count / analytics.activeLeads) * 100).toFixed(1);
                const conversionRate = Math.floor(Math.random() * 30) + 10; // Mock conversion rate
                return (
                  <div key={source} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{source}</span>
                      <div className="text-right">
                        <span className="text-sm font-medium">{count} leads</span>
                        <p className="text-xs text-foreground-600">{conversionRate}% conversion</p>
                      </div>
                    </div>
                    <Progress 
                      value={parseFloat(percentage)} 
                      className="max-w-full"
                      color={
                        source === 'Website' ? 'primary' : 
                        source === 'Social Media' ? 'secondary' : 
                        source === 'Referral' ? 'success' : 
                        source === 'Email Campaign' ? 'warning' : 'default'
                      }
                    />
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Neighborhood Performance */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Top Performing Neighborhoods</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {Object.entries(analytics.neighborhoodData).slice(0, 5).map(([neighborhood, data]: [string, any]) => {
                const conversionRate = ((data.converted / data.total) * 100).toFixed(1);
                const avgPrice = (data.totalPrice / data.total / 1000000).toFixed(1);
                return (
                  <div key={neighborhood} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{neighborhood}</p>
                      <p className="text-sm text-foreground-600">{data.total} properties</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">₱{avgPrice}M avg</p>
                      <p className="text-sm text-success">{conversionRate}% conversion</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Automation Performance */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Marketing Automation Stats</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Automated Messages</span>
                  <span className="text-sm">{analytics.automatedMessages}/{analytics.totalMessages}</span>
                </div>
                <Progress 
                  value={(analytics.automatedMessages / analytics.totalMessages) * 100} 
                  color="primary"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Positive Sentiment Rate</span>
                  <span className="text-sm">{analytics.positiveMessages}/{analytics.totalMessages}</span>
                </div>
                <Progress 
                  value={(analytics.positiveMessages / analytics.totalMessages) * 100} 
                  color="success"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Event Completion Rate</span>
                  <span className="text-sm">85%</span>
                </div>
                <Progress value={85} color="warning" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Lead Response Time</span>
                  <span className="text-sm">2 hours</span>
                </div>
                <Progress value={92} color="secondary" />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Integration Status */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">System Integrations</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {[
                { name: 'Pipedrive CRM', status: 'Connected', health: 98, color: 'success' },
                { name: 'DocuSign', status: 'Connected', health: 95, color: 'success' },
                { name: 'Avochato SMS', status: 'Connected', health: 100, color: 'success' },
                { name: 'Bryckel AI', status: 'Active', health: 87, color: 'primary' },
                { name: 'n8n Automation', status: 'Running', health: 93, color: 'secondary' },
                { name: 'Zapier Workflows', status: 'Active', health: 89, color: 'warning' },
                { name: 'Buildium', status: 'Synced', health: 96, color: 'success' },
                { name: 'Open Real Estate', status: 'Connected', health: 91, color: 'primary' }
              ].map((integration) => (
                <div key={integration.name} className="flex justify-between items-center p-3 border border-divider rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-${integration.color}`}></div>
                    <span className="text-sm font-medium">{integration.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-foreground-600">{integration.health}%</span>
                    <Chip size="sm" variant="flat" color={integration.color as any}>
                      {integration.status}
                    </Chip>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Recent System Activity</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {messages.slice(0, 8).map((message) => (
              <div key={message.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  message.automated ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs text-foreground-500">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Chip size="sm" variant="flat" color={
                      message.channel === 'Email' ? 'primary' : 
                      message.channel === 'SMS' ? 'success' : 
                      'secondary'
                    }>
                      {message.channel}
                    </Chip>
                    <Chip size="sm" variant="flat" color={
                      message.sentiment === 'Positive' ? 'success' : 
                      message.sentiment === 'Neutral' ? 'default' : 
                      'danger'
                    }>
                      {message.sentiment}
                    </Chip>
                    {message.automated && (
                      <span className="text-xs text-blue-600 flex items-center">
                        <IconActivity className="h-3 w-3 mr-1" />
                        Auto
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderAgentPerformance = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Agent Performance Dashboard</h2>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Top Performing Agents</h3>
        </CardHeader>
        <CardBody>
          <Table removeWrapper>
            <TableHeader>
              <TableColumn>AGENT</TableColumn>
              <TableColumn>ACTIVE LEADS</TableColumn>
              <TableColumn>CLOSED DEALS</TableColumn>
              <TableColumn>RATING</TableColumn>
              <TableColumn>SPECIALIZATION</TableColumn>
              <TableColumn>PERFORMANCE</TableColumn>
            </TableHeader>
            <TableBody>
              {agents.slice(0, 10).map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar src={agent.avatar} name={agent.name} size="sm" />
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-foreground-600">{agent.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{agent.activeLeads}</TableCell>
                  <TableCell>{agent.closedDeals}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <IconStar className="h-4 w-4 text-yellow-500" />
                      <span>{agent.rating.toFixed(1)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip size="sm" variant="flat" color={
                      agent.specialization === 'Luxury' ? 'warning' :
                      agent.specialization === 'Commercial' ? 'primary' : 'success'
                    }>
                      {agent.specialization}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Progress 
                      value={(agent.closedDeals / agent.activeLeads) * 100} 
                      className="max-w-20"
                      color={agent.rating >= 4.5 ? 'success' : agent.rating >= 4.0 ? 'warning' : 'danger'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );

  const renderPropertyAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Property Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Property Distribution</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Residential</span>
                <span className="font-medium">{filteredProperties.filter(p => p.type === 'Residential').length}</span>
              </div>
              <Progress 
                value={(filteredProperties.filter(p => p.type === 'Residential').length / filteredProperties.length) * 100}
                color="primary"
              />
              
              <div className="flex justify-between items-center">
                <span>Commercial</span>
                <span className="font-medium">{filteredProperties.filter(p => p.type === 'Commercial').length}</span>
              </div>
              <Progress 
                value={(filteredProperties.filter(p => p.type === 'Commercial').length / filteredProperties.length) * 100}
                color="secondary"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Price Range Analysis</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {[
                { range: '₱2M - ₱3M', min: 2000000, max: 3000000, color: 'success' },
                { range: '₱3M - ₱5M', min: 3000000, max: 5000000, color: 'primary' },
                { range: '₱5M+', min: 5000000, max: Infinity, color: 'warning' }
              ].map(({ range, min, max, color }) => {
                const count = filteredProperties.filter(p => p.price >= min && p.price < max).length;
                const percentage = (count / filteredProperties.length) * 100;
                return (
                  <div key={range} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{range}</span>
                      <span className="text-sm">{count} properties ({percentage.toFixed(1)}%)</span>
                    </div>
                    <Progress value={percentage} color={color as any} />
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Property Insights</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">₱{(analytics.medianPrice / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-foreground-600">Median Price</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-success">{filteredProperties.filter(p => p.petFriendly).length}</p>
              <p className="text-sm text-foreground-600">Pet-Friendly Properties</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-warning">{filteredProperties.filter(p => p.floodRisk === 'Low').length}</p>
              <p className="text-sm text-foreground-600">Low Flood Risk</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen  ml-30">
      {/* <NavBar /> */}
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: IconDashboard },
            { id: 'scheduler', label: 'Event Scheduler', icon: IconCalendar },
            { id: 'agents', label: 'Agent Performance', icon: IconUsers },
            { id: 'properties', label: 'Property Analytics', icon: IconHome },
            { id: 'automation', label: 'Automation Center', icon: IconActivity }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'solid' : 'light'}
                color={activeTab === tab.id ? 'primary' : 'default'}
                onPress={() => setActiveTab(tab.id)}
                startContent={<Icon className="h-4 w-4" />}
                size="sm"
              >
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'scheduler' && <EventPlannerScheduler />}
        {activeTab === 'agents' && renderAgentPerformance()}
        {activeTab === 'properties' && renderPropertyAnalytics()}
        {activeTab === 'automation' && (

          <Pipeline/>
        )}
      </div>
    </div>
  );
};
