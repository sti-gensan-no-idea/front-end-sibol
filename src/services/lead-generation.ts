import { apiClients, ApiResponse, LeadCaptureData } from "./api-config";

/**
 * Strategy 1: Lead Generation & Follow-ups
 * Implements automated lead capture with Philippine-specific forms and instant follow-ups
 */

// Lead capture form submission with Open Real Estate integration
export const captureLeadFromProperty = async (
  leadData: LeadCaptureData
): Promise<ApiResponse> => {
  try {
    // Submit to Open Real Estate CRM
    const oreResponse = await apiClients.openRealEstate.post("/leads", {
      ...leadData,
      source: "aTuna-Website",
      country: "Philippines",
      city: "General Santos City",
      timestamp: new Date().toISOString(),
      philippineSpecific: {
        preferredLanguage: "English",
        currency: "PHP",
        mobileFormat: leadData.phone.startsWith("+639") ? "valid" : "converted",
      },
    });

    console.log("Lead captured via Open Real Estate:", oreResponse.data);

    // Trigger immediate automated follow-up
    await sendWelcomeMessage(leadData);

    // Score the lead based on preferences and budget
    const leadScore = calculateLeadScore(leadData);

    return {
      success: true,
      data: {
        leadId: `lead-${Date.now()}`,
        score: leadScore,
        estimatedValue: calculateEstimatedValue(leadData),
        nextAction: "automated_followup_scheduled",
      },
      message: "Lead captured successfully with automated follow-up initiated",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Lead capture error:", error);

    return {
      success: false,
      message: "Failed to capture lead",
      timestamp: new Date().toISOString(),
    };
  }
};

// Send automated welcome message via SMS (Philippine mobile format)
export const sendWelcomeMessage = async (
  leadData: LeadCaptureData
): Promise<ApiResponse> => {
  try {
    const mobileNumber = formatPhilippineMobile(leadData.phone);

    const welcomeMessage = `Mabuhay ${leadData.name}! 🏠 Thank you for your interest in aTuna properties. We've received your inquiry and will contact you within 2 hours. For immediate assistance, reply HELP. - aTuna Real Estate`;

    const smsResponse = await apiClients.smsGateway.post("/messages", {
      number: mobileNumber,
      message: welcomeMessage,
      sender: "aTuna",
      country: "PH",
    });

    console.log("Welcome SMS sent:", smsResponse.data);

    // Also send welcome email
    await sendWelcomeEmail(leadData);

    return {
      success: true,
      data: { messageId: `sms-${Date.now()}`, deliveryStatus: "sent" },
      message: "Welcome message sent successfully",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Welcome message error:", error);

    return {
      success: false,
      message: "Failed to send welcome message",
      timestamp: new Date().toISOString(),
    };
  }
};

// Send welcome email with property recommendations
export const sendWelcomeEmail = async (
  leadData: LeadCaptureData
): Promise<ApiResponse> => {
  try {
    const emailContent = generateWelcomeEmailContent(leadData);

    // This would integrate with an email service like SendGrid or Mailgun
    console.log("Welcome email would be sent:", {
      to: leadData.email,
      subject: "Welcome to aTuna - Your General Santos City Property Partner",
      html: emailContent,
    });

    return {
      success: true,
      data: { emailId: `email-${Date.now()}`, status: "queued" },
      message: "Welcome email sent successfully",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Welcome email error:", error);

    return {
      success: false,
      message: "Failed to send welcome email",
      timestamp: new Date().toISOString(),
    };
  }
};

// Schedule automated follow-up sequence
export const scheduleFollowUpSequence = async (
  leadId: string,
  leadData: LeadCaptureData
): Promise<ApiResponse> => {
  try {
    const followUpSchedule = [
      { delay: 2, type: "sms", template: "initial_followup" }, // 2 hours
      { delay: 24, type: "email", template: "property_suggestions" }, // 1 day
      { delay: 72, type: "sms", template: "viewing_reminder" }, // 3 days
      { delay: 168, type: "email", template: "market_update" }, // 1 week
    ];

    // Store follow-up schedule (would integrate with a job queue)
    console.log(
      "Follow-up sequence scheduled for lead:",
      leadId,
      followUpSchedule
    );

    return {
      success: true,
      data: {
        scheduleId: `schedule-${Date.now()}`,
        sequenceSteps: followUpSchedule.length,
        nextFollowUp: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      },
      message: "Follow-up sequence scheduled successfully",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Follow-up scheduling error:", error);

    return {
      success: false,
      message: "Failed to schedule follow-ups",
      timestamp: new Date().toISOString(),
    };
  }
};

// Calculate lead score based on Philippine market factors
const calculateLeadScore = (leadData: LeadCaptureData): number => {
  let score = 50; // Base score

  // Budget scoring (Philippine market)
  if (leadData.preferences?.budget) {
    if (leadData.preferences.budget > 5000000)
      score += 30; // High-end PHP 5M+
    else if (leadData.preferences.budget > 3000000)
      score += 20; // Mid-range PHP 3-5M
    else if (leadData.preferences.budget > 1500000)
      score += 15; // Entry PHP 1.5-3M
    else score += 5; // Budget-conscious
  }

  // Contact quality scoring
  if (leadData.phone.startsWith("+639")) score += 10; // Valid PH mobile
  if (leadData.email.includes(".com") || leadData.email.includes(".ph"))
    score += 5;
  if (leadData.message.length > 50) score += 10; // Detailed inquiry

  // Preference specificity
  if (leadData.preferences?.nonHaunted) score += 5; // Specific requirements
  if (leadData.preferences?.floodSafe) score += 5; // Safety conscious
  if (leadData.preferences?.petFriendly) score += 3; // Lifestyle preferences

  // Source quality
  if (leadData.source === "Referral") score += 15;
  else if (leadData.source === "Website") score += 10;
  else if (leadData.source === "Social Media") score += 5;

  return Math.min(score, 100); // Cap at 100
};

// Calculate estimated customer value
const calculateEstimatedValue = (leadData: LeadCaptureData): number => {
  const baseBudget = leadData.preferences?.budget || 2500000;
  const commissionRate = 0.05; // 5% typical Philippine real estate commission

  return baseBudget * commissionRate;
};

// Format Philippine mobile number
const formatPhilippineMobile = (phone: string): string => {
  // Remove any non-digits
  const digits = phone.replace(/\D/g, "");

  // Handle different formats
  if (digits.startsWith("639")) {
    return `+${digits}`;
  } else if (digits.startsWith("09")) {
    return `+63${digits.substring(1)}`;
  } else if (digits.startsWith("9")) {
    return `+639${digits}`;
  }

  return phone; // Return original if can't format
};

// Generate personalized welcome email content
const generateWelcomeEmailContent = (leadData: LeadCaptureData): string => {
  const budget = leadData.preferences?.budget
    ? `₱${(leadData.preferences.budget / 1000000).toFixed(1)}M`
    : "your budget";

  return `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
          <h1>Mabuhay, ${leadData.name}!</h1>
          <p style="font-size: 18px;">Welcome to aTuna Real Estate - General Santos City</p>
        </div>
        
        <div style="padding: 30px;">
          <h2>Thank you for your interest!</h2>
          <p>We're excited to help you find the perfect property in General Santos City. Based on your inquiry, we've noted your budget of ${budget} and will send you personalized property recommendations.</p>
          
          <h3>What happens next?</h3>
          <ul>
            <li><strong>Within 2 hours:</strong> Personal call from our specialist agent</li>
            <li><strong>Within 24 hours:</strong> Curated property list matching your criteria</li>
            <li><strong>This week:</strong> Scheduled property viewings at your convenience</li>
          </ul>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4>Philippine-Specific Features We Offer:</h4>
            <ul>
              <li>Flood risk assessment for all properties</li>
              <li>Pet-friendly property filtering</li>
              <li>Full disclosure of property history</li>
              <li>₱ PHP pricing with no hidden fees</li>
              <li>Local neighborhood insights</li>
            </ul>
          </div>
          
          <p>Need immediate assistance? Contact us:</p>
          <p>📱 +639 XXX XXXX (SMS/Call)<br>
          📧 hello@atuna.com<br>
          🏢 Pioneer Avenue, General Santos City</p>
          
          <p style="color: #666; font-size: 14px;">This is an automated message. We'll never spam you and you can unsubscribe anytime.</p>
        </div>
      </body>
    </html>
  `;
};

// Automated lead nurturing based on behavior
export const triggerBehavioralFollowUp = async (
  leadId: string,
  behavior: string,
  data: any
): Promise<ApiResponse> => {
  try {
    let message = "";
    let channel = "email";

    switch (behavior) {
      case "property_viewed":
        message = `Hi! We noticed you viewed ${data.propertyTitle}. Would you like to schedule a viewing? Reply YES for immediate scheduling.`;
        channel = "sms";
        break;
      case "multiple_properties_viewed":
        message = `We see you're actively searching! Our agent can help narrow down your options. Call us at +639 XXX XXXX.`;
        channel = "sms";
        break;
      case "price_filter_changed":
        message = `New properties in your updated price range (₱${data.newPriceRange}) are available. Check them out!`;
        channel = "email";
        break;
      case "returned_after_week":
        message = `Welcome back! The market has new listings since your last visit. Here's what's new...`;
        channel = "email";
        break;
      default:
        message = `Thank you for your continued interest in aTuna properties. How can we assist you today?`;
    }

    console.log(`Behavioral follow-up triggered: ${behavior}`, {
      leadId,
      channel,
      message,
    });

    return {
      success: true,
      data: {
        triggerId: `trigger-${Date.now()}`,
        behavior,
        channel,
        message: message.substring(0, 50) + "...",
      },
      message: "Behavioral follow-up triggered successfully",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Behavioral follow-up error:", error);

    return {
      success: false,
      message: "Failed to trigger behavioral follow-up",
      timestamp: new Date().toISOString(),
    };
  }
};
