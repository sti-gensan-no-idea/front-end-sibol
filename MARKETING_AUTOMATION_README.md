# aTuna Real Estate Marketing Automation System

A comprehensive real estate marketing automation platform integrated with HeroUI, featuring separate dashboards for agents, clients, users, and admins, plus an advanced event planner/scheduler.

## 🚀 Features

### 📊 **Complete Marketing Automation (8 Strategies)**
1. **Lead Generation & Follow-ups** - Automated lead capture and SMS/email follow-ups
2. **Lead Scoring & Distribution** - Intelligent lead prioritization and agent assignment
3. **Social Media Posting** - Automated social media campaigns with tracking
4. **Email Campaigns** - Targeted email marketing with sentiment analysis
5. **Appointment Scheduling** - Automated event scheduling with notifications
6. **Customer Service** - AI-powered chatbot with agent escalation
7. **Feedback Surveys** - Post-deal automated surveys
8. **Marketing Analysis** - Comprehensive analytics and reporting

### 👥 **Multi-Role Dashboards**

#### 🏢 **Agent Dashboard** (`/profile/agent`)
- **Overview Tab**: KPI cards, lead sources, automation performance
- **Lead Management**: Prioritized lead list with seriousness scoring
- **Event Scheduler**: Calendar integration with automated booking
- **Analytics**: Performance metrics and neighborhood insights
- **Features**: 
  - Add/manage leads with automated follow-ups
  - Real-time chat with clients
  - Event scheduling with automated notifications
  - Performance tracking and analytics

#### 👤 **Client Dashboard** (`/profile/client`)
- **Browse Properties**: Advanced filtering (price, type, flood risk, pet-friendly, haunted)
- **My Inquiries**: Message history and viewing schedules
- **Favorites**: Saved properties with quick actions
- **Features**:
  - Property search with Philippine-specific filters
  - Direct inquiry submission with automated responses
  - Viewing scheduling with agent coordination
  - Favorites management

#### 👑 **Admin Dashboard** (`/admin/dashboard`)
- **Dashboard Overview**: System-wide KPIs and metrics
- **Event Scheduler**: Advanced calendar with multiple views
- **Agent Performance**: Team analytics and ratings
- **Property Analytics**: Market insights and trends
- **Automation Center**: Integration monitoring
- **Features**:
  - System-wide analytics and reporting
  - Agent performance monitoring
  - Integration health tracking
  - Comprehensive event management

### 📅 **Advanced Event Planner/Scheduler**
- **Multiple Views**: Calendar, List, and Timeline views
- **Event Types**: Property viewings, inspections, lease reviews, document signing, open houses
- **Automated Notifications**: SMS/email reminders 24 hours before events
- **Integration**: Seamless integration with lead and property management
- **Features**:
  - Drag-and-drop calendar interface
  - Automated event creation from lead actions
  - Multi-agent scheduling coordination
  - Event analytics and reporting

## 🏗️ **Architecture**

### **Data Layer** (`src/data/automation_data.ts`)
- TypeScript interfaces for all entities
- 50+ sample entries per entity for testing
- Philippine-specific data (General Santos City addresses, PHP pricing)
- Realistic sample data with proper relationships

### **State Management** (`src/contexts/automation-context.tsx`)
- React Context for global state management
- Real-time data synchronization
- Automated actions (follow-ups, notifications)
- Filter and search functionality

### **Components Structure**
```
src/
├── components/
│   ├── agent-dashboard-content.tsx     # Agent interface
│   ├── event-planner-scheduler.tsx     # Calendar & scheduling
│   └── [other existing components]
├── pages/
│   ├── dashboard-agent.tsx             # Agent dashboard page
│   ├── dashboard-client.tsx            # Client dashboard page
│   ├── dashboard-admin.tsx             # Admin dashboard page
│   └── [other existing pages]
├── contexts/
│   └── automation-context.tsx          # Global state management
└── data/
    └── automation_data.ts              # Data models & samples
```

## 🌍 **Philippine Market Features**

### **Currency & Pricing**
- All prices in Philippine Peso (₱)
- Price ranges: ₱2.5M - ₱5M+ for properties
- Monthly rent: ₱12K - ₱62K

### **Local Addresses**
- General Santos City neighborhoods:
  - Rizal Street
  - Quezon Avenue
  - Magsaysay Boulevard
  - Pioneer Avenue
  - Dacera Street

### **Cultural Considerations**
- **Haunted Properties**: Filter and disclosure system
- **Flood Risk Assessment**: Low/Medium/High classifications
- **Pet-Friendly Options**: Specific filtering
- **Filipino Contact Numbers**: +639 format
- **Local Business Hours**: 9 AM - 5 PM scheduling

## 🔧 **Installation & Setup**

### **Prerequisites**
- Node.js 18+
- Yarn or npm
- Existing aTuna project structure

### **Integration Steps**

1. **Install Dependencies** (already included in your project):
```bash
yarn install
# or npm install
```

2. **Start Development Server**:
```bash
yarn dev
# or npm run dev
```

3. **Access Different Dashboards**:
   - Agent Dashboard: `http://localhost:3000/profile/agent`
   - Client Dashboard: `http://localhost:3000/profile/client`
   - Admin Dashboard: `http://localhost:3000/admin/dashboard`

## 📱 **User Flows**

### **Agent Workflow**
1. **Login** → Agent Dashboard
2. **Review Leads** → Prioritized by seriousness score
3. **Follow Up** → Automated SMS/email templates
4. **Schedule Events** → Property viewings, inspections
5. **Track Performance** → Analytics and metrics

### **Client Workflow**
1. **Browse Properties** → Advanced filtering
2. **Submit Inquiry** → Automated lead generation
3. **Schedule Viewing** → Calendar integration
4. **Receive Updates** → Automated notifications
5. **Provide Feedback** → Post-viewing surveys

### **Admin Workflow**
1. **Monitor KPIs** → System-wide analytics
2. **Manage Events** → Calendar overview
3. **Track Agents** → Performance metrics
4. **Review Integrations** → Health monitoring
5. **Generate Reports** → Business insights

## 🎯 **Key Features Demonstrated**

### **Marketing Automation**
- ✅ Automated lead follow-ups within minutes
- ✅ Lead scoring and intelligent distribution
- ✅ Social media post automation with tracking
- ✅ Email campaigns with sentiment analysis
- ✅ Event scheduling with automated notifications
- ✅ AI-powered customer service chat
- ✅ Post-deal feedback collection
- ✅ Comprehensive analytics and reporting

### **Philippine Real Estate Specifics**
- ✅ Local address format and neighborhoods
- ✅ PHP currency throughout the system
- ✅ Haunted property disclosure
- ✅ Flood risk assessment
- ✅ Pet-friendly property filtering
- ✅ Local phone number format
- ✅ Cultural sensitivity in messaging

### **Integration Simulations**
- 🔗 **Pipedrive CRM**: Lead management and scoring
- 🔗 **DocuSign**: Document automation
- 🔗 **Avochato**: SMS and chat functionality
- 🔗 **Bryckel AI**: Sentiment analysis and property scoring
- 🔗 **n8n**: Workflow automation
- 🔗 **Zapier**: Trigger-based actions
- 🔗 **Buildium**: Lease management
- 🔗 **Open Real Estate**: Listing promotion

## 📊 **Analytics & Reporting**

### **Key Metrics Tracked**
- Lead conversion rates by source
- Neighborhood performance analysis
- Agent productivity metrics
- Automation efficiency rates
- Customer sentiment tracking
- Event completion rates
- Revenue and deal tracking

### **Visualizations**
- Lead source distribution (pie charts)
- Neighborhood conversion rates (bar charts)
- Performance trends over time
- Automation success rates
- Agent comparison metrics

## 🔮 **Future Enhancements**

### **Planned Features**
- [ ] AI-powered property recommendations
- [ ] Advanced chat AI with natural language processing
- [ ] Mobile app integration
- [ ] Document e-signing workflow
- [ ] Payment processing integration
- [ ] Virtual property tours
- [ ] Advanced reporting dashboard
- [ ] Multi-language support (Filipino/English)

### **Integration Roadmap**
- [ ] Real Pipedrive CRM connection
- [ ] Actual DocuSign integration
- [ ] Live SMS/email services
- [ ] Google Maps integration
- [ ] Social media API connections
- [ ] Payment gateway integration

## 🏆 **Hackathon Features (July 30, 2025)**

This system is specifically designed for aTuna's hackathon requirements:

1. **Complete Automation Suite**: All 8 marketing strategies implemented
2. **Multi-Role System**: Agent, Client, Admin, and User interfaces
3. **Event Planner**: Advanced scheduling with calendar views
4. **Philippine Market**: Localized for General Santos City
5. **Sample Data**: 50+ entries per entity for comprehensive testing
6. **Analytics**: Real-time insights and performance tracking
7. **Integration Ready**: Simulated connections to popular tools
8. **Mobile Responsive**: Works on all device sizes

## 📞 **Support & Contact**

For questions about the marketing automation system:
- Review the component documentation in each file
- Check the automation context for state management
- Examine sample data structures in `automation_data.ts`
- Test different user flows through the various dashboards

---

**Built with**: React, TypeScript, HeroUI, Tailwind CSS, and modern web technologies for the aTuna Real Estate Platform.
