import { apiClients, ApiResponse } from "./api-config";

import { Lead, Property } from "@/data/automation_data";

/**
 * Strategy 4: Email Campaigns
 * Implements automated email marketing with Podio CRM integration
 */

export interface EmailCampaign {
  id: string;
  name: string;
  type:
    | "Welcome"
    | "Property Update"
    | "Market Report"
    | "Follow-up"
    | "Nurture";
  subject: string;
  template: string;
  triggers: {
    event: string;
    conditions: any;
    delay?: number; // hours
  }[];
  targetSegment: {
    leadStatus?: string[];
    budget?: [number, number];
    timeline?: string[];
    source?: string[];
  };
  schedule?: {
    frequency: "Once" | "Daily" | "Weekly" | "Monthly";
    time: string;
    timezone: string;
  };
  status: "Draft" | "Active" | "Paused" | "Completed";
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    replied: number;
    unsubscribed: number;
    bounced: number;
  };
  createdDate: string;
  lastSent?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  type: "Welcome" | "Property Alert" | "Market Update" | "Follow-up" | "Survey";
  subject: string;
  htmlContent: string;
  plainTextContent: string;
  variables: string[];
  philippineSpecific: {
    greeting: "Mabuhay" | "Kumusta" | "Hello";
    currency: "PHP";
    addressFormat: "Philippine";
    timezone: "Asia/Manila";
  };
}

// Automated email campaign triggers
export const createWelcomeEmailCampaign = async (
  leadId: string,
  leadData: Lead
): Promise<ApiResponse> => {
  try {
    const welcomeCampaign: EmailCampaign = {
      id: `welcome-${Date.now()}`,
      name: `Welcome Series - ${leadData.name}`,
      type: "Welcome",
      subject: "Mabuhay! Welcome to aTuna Real Estate",
      template: "welcome-template-1",
      triggers: [
        {
          event: "lead_captured",
          conditions: { source: leadData.source },
          delay: 0, // Immediate
        },
        {
          event: "no_response",
          conditions: { days: 3 },
          delay: 72, // 3 days
        },
        {
          event: "property_viewed",
          conditions: { count: 3 },
          delay: 24, // 1 day after viewing 3 properties
        },
      ],
      targetSegment: {
        leadStatus: ["New"],
        budget: [leadData.budget * 0.8, leadData.budget * 1.2],
      },
      status: "Active",
      metrics: {
        sent: 0,
        opened: 0,
        clicked: 0,
        replied: 0,
        unsubscribed: 0,
        bounced: 0,
      },
      createdDate: new Date().toISOString(),
    };

    // Submit to Podio CRM
    const podioResponse = await apiClients.openRealEstate.post(
      "/email-campaigns",
      {
        campaign: welcomeCampaign,
        leadId,
        market: "General Santos City",
      }
    );

    // Send immediate welcome email
    await sendWelcomeEmail(leadData);

    console.log("Welcome email campaign created:", podioResponse.data);

    return {
      success: true,
      data: { campaignId: welcomeCampaign.id },
      message: "Welcome email campaign created and triggered",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Welcome campaign error:", error);

    return {
      success: false,
      message: "Failed to create welcome email campaign",
      timestamp: new Date().toISOString(),
    };
  }
};

// Send personalized welcome email
const sendWelcomeEmail = async (leadData: Lead): Promise<void> => {
  const emailContent = generateWelcomeEmailHTML(leadData);

  console.log("Sending welcome email to:", leadData.email);
  console.log("Email content preview:", emailContent.substring(0, 200) + "...");

  // This would integrate with an email service provider
};

// Generate welcome email HTML content
const generateWelcomeEmailHTML = (leadData: Lead): string => {
  const budget = leadData.budget
    ? `₱${(leadData.budget / 1000000).toFixed(1)}M`
    : "your budget";
  const timeline = leadData.timeline || "3-6 months";

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to aTuna Real Estate</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white; }
            .content { padding: 30px; }
            .property-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .property-card { border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; text-align: center; }
            .cta-button { display: inline-block; background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; }
            .philippine-features { background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Mabuhay, ${leadData.name}! 🏠</h1>
                <p style="font-size: 18px; margin: 10px 0;">Welcome to aTuna Real Estate</p>
                <p>Your trusted partner in General Santos City</p>
            </div>
            
            <div class="content">
                <h2>Thank you for choosing aTuna!</h2>
                <p>We're excited to help you find the perfect property in General Santos City. Based on your preferences:</p>
                
                <ul style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <li><strong>Budget:</strong> ${budget}</li>
                    <li><strong>Timeline:</strong> ${timeline}</li>
                    <li><strong>Preferences:</strong> ${getPreferencesText(leadData.preferences)}</li>
                </ul>
                
                <h3>What happens next?</h3>
                <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p><strong>⏰ Within 2 hours:</strong> Personal call from your dedicated agent</p>
                    <p><strong>📧 Within 24 hours:</strong> Curated property recommendations</p>
                    <p><strong>🏠 This week:</strong> Scheduled property viewings</p>
                </div>
                
                <div class="philippine-features">
                    <h4>🇵🇭 Philippine-Specific Features We Offer:</h4>
                    <ul>
                        <li><strong>Flood Risk Assessment:</strong> Complete disclosure for all properties</li>
                        <li><strong>Clean History Verification:</strong> No surprises about property background</li>
                        <li><strong>Pet-Friendly Options:</strong> Filtered search for pet owners</li>
                        <li><strong>PHP Pricing:</strong> Transparent pricing with no hidden fees</li>
                        <li><strong>Local Expertise:</strong> Deep knowledge of General Santos City neighborhoods</li>
                    </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://atuna.com/properties?budget=${leadData.budget}" class="cta-button">Browse Properties</a>
                    <a href="https://atuna.com/schedule-viewing" class="cta-button">Schedule Viewing</a>
                </div>
                
                <h3>Popular Properties in Your Range:</h3>
                <div class="property-grid">
                    <div class="property-card">
                        <strong>Rizal Street Property</strong><br>
                        ₱3.2M • 3BR/2BA<br>
                        <small>Modern, Pet-Friendly</small>
                    </div>
                    <div class="property-card">
                        <strong>Pioneer Avenue Home</strong><br>
                        ₱4.1M • 4BR/3BA<br>
                        <small>Low Flood Risk</small>
                    </div>
                </div>
                
                <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
                    <h4>Need immediate assistance?</h4>
                    <p>📱 <strong>SMS/Call:</strong> +639 XXX XXXX<br>
                    📧 <strong>Email:</strong> hello@atuna.com<br>
                    🏢 <strong>Office:</strong> Pioneer Avenue, General Santos City</p>
                </div>
            </div>
            
            <div class="footer">
                <p>aTuna Real Estate - General Santos City</p>
                <p style="font-size: 12px;">You received this email because you inquired about properties on our website. 
                <a href="#unsubscribe">Unsubscribe</a> anytime.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Helper function to format preferences
const getPreferencesText = (preferences: any): string => {
  const prefs = [];

  if (preferences?.petFriendly) prefs.push("Pet-friendly");
  if (preferences?.nonHaunted) prefs.push("Clean history");
  if (preferences?.floodSafe) prefs.push("Flood-safe location");

  return prefs.length > 0 ? prefs.join(", ") : "Standard preferences";
};

// Create property alert campaign
export const createPropertyAlertCampaign = async (
  leadId: string,
  preferences: any
): Promise<EmailCampaign> => {
  const campaign: EmailCampaign = {
    id: `alert-${Date.now()}`,
    name: "Property Alert Campaign",
    type: "Property Update",
    subject: "New Properties Matching Your Criteria in General Santos City",
    template: "property-alert-template",
    triggers: [
      {
        event: "new_property_listed",
        conditions: { matchesPreferences: true },
      },
      {
        event: "price_drop",
        conditions: { percentage: 5 },
      },
    ],
    targetSegment: {
      leadStatus: ["New", "Contacted", "Qualified"],
      budget: preferences.budget
        ? [preferences.budget * 0.8, preferences.budget * 1.2]
        : undefined,
    },
    status: "Active",
    metrics: {
      sent: 0,
      opened: 0,
      clicked: 0,
      replied: 0,
      unsubscribed: 0,
      bounced: 0,
    },
    createdDate: new Date().toISOString(),
  };

  console.log("Property alert campaign created for lead:", leadId);

  return campaign;
};

// Create market update campaign
export const createMarketUpdateCampaign = async (): Promise<EmailCampaign> => {
  const campaign: EmailCampaign = {
    id: `market-${Date.now()}`,
    name: "Weekly Market Update - General Santos City",
    type: "Market Report",
    subject: "GenSan Real Estate Weekly Update - Market Trends & New Listings",
    template: "market-update-template",
    triggers: [
      {
        event: "scheduled",
        conditions: { day: "Monday", time: "08:00" },
      },
    ],
    targetSegment: {
      leadStatus: ["New", "Contacted", "Qualified"],
    },
    schedule: {
      frequency: "Weekly",
      time: "08:00",
      timezone: "Asia/Manila",
    },
    status: "Active",
    metrics: {
      sent: 0,
      opened: 0,
      clicked: 0,
      replied: 0,
      unsubscribed: 0,
      bounced: 0,
    },
    createdDate: new Date().toISOString(),
  };

  return campaign;
};

// Send property match notification
export const sendPropertyMatchEmail = async (
  leadData: Lead,
  properties: Property[]
): Promise<ApiResponse> => {
  try {
    const emailContent = generatePropertyMatchHTML(leadData, properties);

    console.log(
      `Sending property match email to ${leadData.email} with ${properties.length} properties`
    );

    // Update campaign metrics
    await updateCampaignMetrics("property-alert", {
      sent: 1,
      event: "property_match_sent",
    });

    return {
      success: true,
      data: {
        recipient: leadData.email,
        propertyCount: properties.length,
        emailId: `match-${Date.now()}`,
      },
      message: "Property match email sent successfully",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Property match email error:", error);

    return {
      success: false,
      message: "Failed to send property match email",
      timestamp: new Date().toISOString(),
    };
  }
};

// Generate property match email HTML
const generatePropertyMatchHTML = (
  leadData: Lead,
  properties: Property[]
): string => {
  const propertyCards = properties
    .map(
      (property) => `
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin: 10px 0; background: white;">
      <div style="display: flex; align-items: center;">
        <img src="${property.image}" alt="${property.title}" style="width: 120px; height: 80px; object-fit: cover; border-radius: 5px; margin-right: 15px;">
        <div style="flex: 1;">
          <h4 style="margin: 0 0 5px 0; color: #333;">${property.title}</h4>
          <p style="margin: 0; color: #666; font-size: 14px;">${property.address}</p>
          <p style="margin: 5px 0; font-weight: bold; color: #667eea; font-size: 18px;">₱${(property.price / 1000000).toFixed(1)}M</p>
          <div style="font-size: 12px; color: #888;">
            ${property.bedrooms} BR • ${property.bathrooms} BA • ${property.sqm} sqm
            ${property.petFriendly ? " • Pet-Friendly" : ""}
            ${property.floodRisk === "Low" ? " • Low Flood Risk" : ""}
          </div>
        </div>
        <a href="https://atuna.com/properties/preview?id=${property.id}" style="background-color: #667eea; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px;">View Details</a>
      </div>
    </div>
  `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Property Matches - aTuna Real Estate</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
                <h1>🏠 New Property Matches!</h1>
                <p>Hi ${leadData.name}, we found ${properties.length} properties that match your criteria</p>
            </div>
            
            <div style="padding: 30px;">
                <p>Great news! We have new properties in General Santos City that match your preferences:</p>
                
                ${propertyCards}
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://atuna.com/properties?budget=${leadData.budget}" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 0 10px;">View All Matches</a>
                    <a href="https://atuna.com/schedule-viewing" style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 0 10px;">Schedule Viewing</a>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 0; font-size: 14px; color: #666;">
                        💡 <strong>Tip:</strong> Properties in General Santos City are moving fast! 
                        Schedule a viewing within 48 hours to avoid missing out.
                    </p>
                </div>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
                <p>aTuna Real Estate - General Santos City</p>
                <p><a href="#unsubscribe">Unsubscribe</a> from property alerts</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Update campaign metrics
const updateCampaignMetrics = async (
  campaignId: string,
  metrics: any
): Promise<void> => {
  try {
    await apiClients.openRealEstate.patch(
      `/email-campaigns/${campaignId}/metrics`,
      metrics
    );
    console.log("Campaign metrics updated:", campaignId, metrics);
  } catch (error) {
    console.error("Metrics update error:", error);
  }
};

// Create nurture email sequence
export const createNurtureSequence = async (
  leadId: string,
  leadData: Lead
): Promise<EmailCampaign[]> => {
  const sequences = [
    {
      delay: 24, // 1 day
      subject: "Your Property Search Guide for General Santos City",
      template: "guide-template",
      type: "Nurture" as const,
    },
    {
      delay: 168, // 1 week
      subject: "Market Insights: What's Hot in GenSan Real Estate",
      template: "insights-template",
      type: "Nurture" as const,
    },
    {
      delay: 336, // 2 weeks
      subject: "Financing Options for Your Property Purchase",
      template: "financing-template",
      type: "Nurture" as const,
    },
    {
      delay: 720, // 1 month
      subject: "Still Looking? Here's What's New in the Market",
      template: "reengagement-template",
      type: "Nurture" as const,
    },
  ];

  return sequences.map((seq, index) => ({
    id: `nurture-${leadId}-${index + 1}`,
    name: `Nurture Sequence ${index + 1} - ${leadData.name}`,
    type: seq.type,
    subject: seq.subject,
    template: seq.template,
    triggers: [
      {
        event: "delayed_send",
        conditions: { hours: seq.delay },
      },
    ],
    targetSegment: {
      leadStatus: ["New", "Contacted"],
    },
    status: "Active",
    metrics: {
      sent: 0,
      opened: 0,
      clicked: 0,
      replied: 0,
      unsubscribed: 0,
      bounced: 0,
    },
    createdDate: new Date().toISOString(),
  }));
};

// Track email engagement
export const trackEmailEngagement = async (
  emailId: string,
  event: string,
  metadata?: any
): Promise<void> => {
  try {
    await apiClients.openRealEstate.post("/email-engagement", {
      emailId,
      event, // 'opened', 'clicked', 'replied', 'unsubscribed'
      timestamp: new Date().toISOString(),
      metadata,
    });

    console.log(`Email engagement tracked: ${event} for email ${emailId}`);
  } catch (error) {
    console.error("Email engagement tracking error:", error);
  }
};
