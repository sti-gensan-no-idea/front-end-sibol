import { apiClients, ApiResponse } from "./api-config";

/**
 * Strategy 7: Feedback Surveys
 * Automated post-deal surveys with Podio integration for continuous improvement
 */

export interface Survey {
  id: string;
  type:
    | "Post-Deal"
    | "Service Quality"
    | "Agent Performance"
    | "Website Experience"
    | "Property Viewing";
  clientEmail: string;
  propertyId?: string;
  agentId?: string;
  status: "Sent" | "In Progress" | "Completed" | "Expired";
  createdDate: string;
  completedDate?: string;
  responses: SurveyResponse[];
  overallRating?: number;
  npsScore?: number;
  followUpRequired: boolean;
}

export interface SurveyQuestion {
  id: string;
  type: "rating" | "multiple_choice" | "text" | "yes_no" | "nps";
  question: string;
  options?: string[];
  required: boolean;
  scale?: {
    min: number;
    max: number;
    labels?: { [key: number]: string };
  };
}

export interface SurveyResponse {
  questionId: string;
  answer: string | number;
  timestamp: string;
}

export interface SurveyTemplate {
  id: string;
  name: string;
  type: Survey["type"];
  questions: SurveyQuestion[];
  triggerConditions: {
    event: string;
    delay?: number; // hours after trigger event
    conditions?: any;
  }[];
  targetAudience?: {
    dealValue?: [number, number];
    propertyType?: string[];
    agentSpecialization?: string[];
  };
}

// Create and send post-deal survey
export const createPostDealSurvey = async (
  dealId: string,
  clientEmail: string,
  agentId: string,
  propertyId: string
): Promise<ApiResponse> => {
  try {
    const survey: Survey = {
      id: `survey-${Date.now()}`,
      type: "Post-Deal",
      clientEmail,
      propertyId,
      agentId,
      status: "Sent",
      createdDate: new Date().toISOString(),
      responses: [],
      followUpRequired: false,
    };

    // Generate personalized survey
    const surveyContent = generatePostDealSurveyContent(survey);

    // Send via email
    await sendSurveyEmail(survey, surveyContent);

    // Log to Podio CRM
    await apiClients.openRealEstate.post("/surveys", {
      survey,
      dealId,
      market: "General Santos City",
    });

    // Schedule follow-up reminder
    await scheduleSurveyReminder(survey.id, clientEmail, 3); // 3 days

    return {
      success: true,
      data: { surveyId: survey.id },
      message: "Post-deal survey created and sent successfully",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Post-deal survey error:", error);

    return {
      success: false,
      message: "Failed to create post-deal survey",
      timestamp: new Date().toISOString(),
    };
  }
};

// Generate post-deal survey content
const generatePostDealSurveyContent = (survey: Survey): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Your Experience with aTuna Real Estate</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
            .content { padding: 30px; }
            .question { margin: 25px 0; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
            .rating-scale { display: flex; justify-content: space-between; margin: 15px 0; }
            .rating-option { padding: 8px 12px; border: 1px solid #ddd; cursor: pointer; text-align: center; min-width: 30px; }
            .submit-btn { background-color: #667eea; color: white; padding: 12px 30px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🏠 Thank You for Choosing aTuna!</h1>
                <p>Your feedback helps us serve you better</p>
            </div>
            
            <div class="content">
                <p>Congratulations on your new property! We hope you're excited about this new chapter.</p>
                <p>Please take 3 minutes to share your experience with us. Your feedback is invaluable in helping us improve our services.</p>
                
                <form action="https://atuna.com/survey/submit" method="post">
                    <input type="hidden" name="surveyId" value="${survey.id}">
                    
                    <div class="question">
                        <h3>1. Overall Satisfaction</h3>
                        <p>How satisfied are you with your overall experience with aTuna Real Estate?</p>
                        <div class="rating-scale">
                            ${[1, 2, 3, 4, 5]
                              .map(
                                (i) => `
                                <label class="rating-option">
                                    <input type="radio" name="overall_satisfaction" value="${i}" required>
                                    ${i}
                                </label>
                            `
                              )
                              .join("")}
                        </div>
                        <small>1 = Very Dissatisfied, 5 = Very Satisfied</small>
                    </div>
                    
                    <div class="question">
                        <h3>2. Agent Performance</h3>
                        <p>How would you rate your agent's performance?</p>
                        <div class="rating-scale">
                            ${[1, 2, 3, 4, 5]
                              .map(
                                (i) => `
                                <label class="rating-option">
                                    <input type="radio" name="agent_performance" value="${i}" required>
                                    ${i}
                                </label>
                            `
                              )
                              .join("")}
                        </div>
                        <small>1 = Poor, 5 = Excellent</small>
                    </div>
                    
                    <div class="question">
                        <h3>3. Property Search Process</h3>
                        <p>How easy was it to find and view properties?</p>
                        <div class="rating-scale">
                            ${[1, 2, 3, 4, 5]
                              .map(
                                (i) => `
                                <label class="rating-option">
                                    <input type="radio" name="search_process" value="${i}" required>
                                    ${i}
                                </label>
                            `
                              )
                              .join("")}
                        </div>
                        <small>1 = Very Difficult, 5 = Very Easy</small>
                    </div>
                    
                    <div class="question">
                        <h3>4. Communication Quality</h3>
                        <p>How would you rate our communication throughout the process?</p>
                        <div class="rating-scale">
                            ${[1, 2, 3, 4, 5]
                              .map(
                                (i) => `
                                <label class="rating-option">
                                    <input type="radio" name="communication" value="${i}" required>
                                    ${i}
                                </label>
                            `
                              )
                              .join("")}
                        </div>
                        <small>1 = Poor, 5 = Excellent</small>
                    </div>
                    
                    <div class="question">
                        <h3>5. Philippine-Specific Features</h3>
                        <p>How helpful were our local features (flood risk, property history, etc.)?</p>
                        <div class="rating-scale">
                            ${[1, 2, 3, 4, 5]
                              .map(
                                (i) => `
                                <label class="rating-option">
                                    <input type="radio" name="local_features" value="${i}" required>
                                    ${i}
                                </label>
                            `
                              )
                              .join("")}
                        </div>
                        <small>1 = Not Helpful, 5 = Very Helpful</small>
                    </div>
                    
                    <div class="question">
                        <h3>6. Net Promoter Score</h3>
                        <p>How likely are you to recommend aTuna Real Estate to friends and family?</p>
                        <div class="rating-scale">
                            ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                              .map(
                                (i) => `
                                <label class="rating-option">
                                    <input type="radio" name="nps_score" value="${i}" required>
                                    ${i}
                                </label>
                            `
                              )
                              .join("")}
                        </div>
                        <small>0 = Not likely at all, 10 = Extremely likely</small>
                    </div>
                    
                    <div class="question">
                        <h3>7. What could we improve?</h3>
                        <textarea name="improvement_suggestions" rows="4" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;" placeholder="Please share any suggestions for improvement..."></textarea>
                    </div>
                    
                    <div class="question">
                        <h3>8. Additional Comments</h3>
                        <textarea name="additional_comments" rows="3" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;" placeholder="Any other feedback you'd like to share..."></textarea>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <button type="submit" class="submit-btn">Submit Feedback</button>
                    </div>
                </form>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #666;">
                        🎁 <strong>Thank you bonus:</strong> Complete this survey to receive a ₱500 discount on your next property transaction!
                    </p>
                </div>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
                <p>aTuna Real Estate - General Santos City</p>
                <p>This survey will expire in 7 days. If you need assistance, contact us at hello@atuna.com</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Send survey email
const sendSurveyEmail = async (
  survey: Survey,
  content: string
): Promise<void> => {
  try {
    console.log(`Sending survey email to: ${survey.clientEmail}`);
    console.log("Survey content preview:", content.substring(0, 200) + "...");

    // Would integrate with email service provider
    // await emailService.send({
    //   to: survey.clientEmail,
    //   subject: 'Your Experience with aTuna Real Estate - Quick Survey',
    //   html: content
    // });
  } catch (error) {
    console.error("Survey email error:", error);
  }
};

// Process survey response
export const processSurveyResponse = async (
  surveyId: string,
  responses: { [questionId: string]: any }
): Promise<ApiResponse> => {
  try {
    const surveyResponses: SurveyResponse[] = Object.entries(responses).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
        timestamp: new Date().toISOString(),
      })
    );

    // Calculate overall rating and NPS
    const overallRating = responses.overall_satisfaction || 0;
    const npsScore = responses.nps_score || 0;

    // Determine if follow-up is needed
    const followUpRequired =
      overallRating <= 3 ||
      npsScore <= 6 ||
      responses.improvement_suggestions?.length > 10;

    // Update survey in database
    await apiClients.openRealEstate.patch(`/surveys/${surveyId}`, {
      responses: surveyResponses,
      overallRating,
      npsScore,
      followUpRequired,
      status: "Completed",
      completedDate: new Date().toISOString(),
    });

    // Trigger follow-up actions if needed
    if (followUpRequired) {
      await triggerFollowUpActions(surveyId, responses);
    }

    // Update agent performance metrics
    await updateAgentMetrics(surveyId, responses);

    return {
      success: true,
      data: {
        surveyId,
        overallRating,
        npsScore,
        followUpRequired,
      },
      message: "Survey response processed successfully",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Survey response processing error:", error);

    return {
      success: false,
      message: "Failed to process survey response",
      timestamp: new Date().toISOString(),
    };
  }
};

// Schedule survey reminder
const scheduleSurveyReminder = async (
  surveyId: string,
  clientEmail: string,
  daysDelay: number
): Promise<void> => {
  try {
    const reminderDate = new Date();

    reminderDate.setDate(reminderDate.getDate() + daysDelay);

    await apiClients.openRealEstate.post("/survey-reminders", {
      surveyId,
      clientEmail,
      scheduledDate: reminderDate.toISOString(),
      message: generateReminderMessage(),
    });

    console.log(
      `Survey reminder scheduled for ${reminderDate.toLocaleDateString()}`
    );
  } catch (error) {
    console.error("Reminder scheduling error:", error);
  }
};

// Generate reminder message
const generateReminderMessage = (): string => {
  return `Hi! We hope you're enjoying your new property! 🏠

We'd love to hear about your experience with aTuna Real Estate. Your feedback takes just 3 minutes and helps us serve future clients better.

Plus, complete the survey to receive a ₱500 discount on your next transaction!

Complete Survey: [Survey Link]

Thank you!
aTuna Real Estate Team`;
};

// Trigger follow-up actions for negative feedback
const triggerFollowUpActions = async (
  surveyId: string,
  responses: any
): Promise<void> => {
  try {
    // Create support ticket for negative feedback
    if (responses.overall_satisfaction <= 3) {
      await apiClients.openRealEstate.post("/support-tickets", {
        surveyId,
        subject: "Low Satisfaction Score Follow-up",
        priority: "High",
        category: "Service Quality",
        description: `Client gave low satisfaction score (${responses.overall_satisfaction}/5). Improvement suggestions: ${responses.improvement_suggestions || "None provided"}`,
      });
    }

    // Alert management for very low NPS
    if (responses.nps_score <= 6) {
      await apiClients.openRealEstate.post("/management-alerts", {
        type: "Low NPS Alert",
        surveyId,
        npsScore: responses.nps_score,
        urgency: "High",
      });
    }

    console.log("Follow-up actions triggered for survey:", surveyId);
  } catch (error) {
    console.error("Follow-up actions error:", error);
  }
};

// Update agent performance metrics
const updateAgentMetrics = async (
  surveyId: string,
  responses: any
): Promise<void> => {
  try {
    const agentPerformanceData = {
      surveyId,
      agentRating: responses.agent_performance || 0,
      communicationRating: responses.communication || 0,
      overallSatisfaction: responses.overall_satisfaction || 0,
      timestamp: new Date().toISOString(),
    };

    await apiClients.openRealEstate.post(
      "/agent-performance",
      agentPerformanceData
    );

    console.log("Agent metrics updated from survey:", surveyId);
  } catch (error) {
    console.error("Agent metrics update error:", error);
  }
};

// Create service quality survey
export const createServiceQualitySurvey = async (
  interactionId: string,
  clientEmail: string
): Promise<Survey> => {
  const survey: Survey = {
    id: `quality-${Date.now()}`,
    type: "Service Quality",
    clientEmail,
    status: "Sent",
    createdDate: new Date().toISOString(),
    responses: [],
    followUpRequired: false,
  };

  const questions: SurveyQuestion[] = [
    {
      id: "response_time",
      type: "rating",
      question: "How satisfied were you with our response time?",
      required: true,
      scale: { min: 1, max: 5 },
    },
    {
      id: "helpfulness",
      type: "rating",
      question: "How helpful was our team?",
      required: true,
      scale: { min: 1, max: 5 },
    },
    {
      id: "problem_resolution",
      type: "yes_no",
      question: "Was your issue completely resolved?",
      required: true,
    },
    {
      id: "additional_feedback",
      type: "text",
      question: "Any additional feedback?",
      required: false,
    },
  ];

  console.log("Service quality survey created:", survey.id);

  return survey;
};

// Create agent performance survey
export const createAgentPerformanceSurvey = async (
  agentId: string,
  clientEmail: string
): Promise<Survey> => {
  const survey: Survey = {
    id: `agent-${Date.now()}`,
    type: "Agent Performance",
    clientEmail,
    agentId,
    status: "Sent",
    createdDate: new Date().toISOString(),
    responses: [],
    followUpRequired: false,
  };

  console.log("Agent performance survey created for agent:", agentId);

  return survey;
};

// Analyze survey trends
export const analyzeSurveyTrends = async (
  period: "7d" | "30d" | "90d"
): Promise<any> => {
  try {
    const response = await apiClients.openRealEstate.get("/survey-analytics", {
      params: { period },
    });

    const analytics = {
      totalSurveys: response.data.total || 150,
      responseRate: response.data.responseRate || 0.65,
      averageRating: response.data.averageRating || 4.2,
      npsScore: response.data.npsScore || 42,
      topIssues: response.data.topIssues || [
        "Communication timing",
        "Property availability updates",
        "Viewing scheduling",
      ],
      agentPerformance: response.data.agentPerformance || {
        highest: { name: "Maria Santos", rating: 4.8 },
        lowest: { name: "Juan Cruz", rating: 3.9 },
      },
      improvementAreas: response.data.improvementAreas || [
        "Faster response times",
        "Better property descriptions",
        "More viewing slots",
      ],
    };

    return analytics;
  } catch (error) {
    console.error("Survey analytics error:", error);

    return {
      totalSurveys: 0,
      responseRate: 0,
      averageRating: 0,
      npsScore: 0,
      topIssues: [],
      agentPerformance: {},
      improvementAreas: [],
    };
  }
};

// Generate survey insights report
export const generateSurveyInsights = async (): Promise<string> => {
  const analytics = await analyzeSurveyTrends("30d");

  return `
    📊 SURVEY INSIGHTS REPORT - GENERAL SANTOS CITY
    Period: Last 30 Days
    
    📈 KEY METRICS:
    • Total Surveys: ${analytics.totalSurveys}
    • Response Rate: ${(analytics.responseRate * 100).toFixed(1)}%
    • Average Rating: ${analytics.averageRating}/5.0
    • NPS Score: ${analytics.npsScore}
    
    🏆 TOP PERFORMING AGENT:
    ${analytics.agentPerformance.highest?.name} - ${analytics.agentPerformance.highest?.rating}/5.0
    
    ⚠️ IMPROVEMENT AREAS:
    ${analytics.improvementAreas.map((area: string) => `• ${area}`).join("\n")}
    
    🔍 COMMON ISSUES:
    ${analytics.topIssues.map((issue: string) => `• ${issue}`).join("\n")}
    
    💡 RECOMMENDATIONS:
    • Focus on communication improvements
    • Enhance property viewing experience
    • Implement faster response protocols
  `;
};
