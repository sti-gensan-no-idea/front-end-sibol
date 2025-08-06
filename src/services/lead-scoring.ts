import { apiClients } from "./api-config";

import { Lead, Agent } from "@/data/automation_data";

/**
 * Strategy 2: Lead Scoring & Distribution
 * Implements intelligent lead scoring and automatic agent assignment
 */

export interface LeadScore {
  leadId: string;
  totalScore: number;
  breakdown: {
    budget: number;
    urgency: number;
    contactQuality: number;
    preferences: number;
    source: number;
    engagement: number;
  };
  priority: "High" | "Medium" | "Low";
  recommendedAgent?: string;
  estimatedCloseTime: string;
  estimatedValue: number;
}

export interface AgentAssignment {
  agentId: string;
  leadId: string;
  score: number;
  matchReason: string[];
  assignmentTime: string;
  expectedResponseTime: string;
}

// Enhanced lead scoring with Philippine market factors
export const calculateAdvancedLeadScore = async (
  lead: Lead
): Promise<LeadScore> => {
  try {
    const breakdown = {
      budget: calculateBudgetScore(lead.budget),
      urgency: calculateUrgencyScore(lead.timeline),
      contactQuality: calculateContactScore(lead.email, lead.phone),
      preferences: calculatePreferenceScore(lead.preferences),
      source: calculateSourceScore(lead.source),
      engagement: calculateEngagementScore(lead.seriousness),
    };

    const totalScore = Object.values(breakdown).reduce(
      (sum, score) => sum + score,
      0
    );
    const priority = determinePriority(totalScore);
    const estimatedValue = calculateLeadValue(lead.budget);
    const estimatedCloseTime = calculateCloseTime(lead.timeline, totalScore);

    // Submit score to Podio CRM for tracking
    await apiClients.openRealEstate.post("/lead-scores", {
      leadId: lead.id,
      score: totalScore,
      breakdown,
      priority,
      timestamp: new Date().toISOString(),
      market: "General Santos City",
    });

    return {
      leadId: lead.id,
      totalScore,
      breakdown,
      priority,
      estimatedCloseTime,
      estimatedValue,
    };
  } catch (error) {
    console.error("Lead scoring error:", error);
    throw new Error("Failed to calculate lead score");
  }
};

// Calculate budget score based on Philippine real estate market
const calculateBudgetScore = (budget: number): number => {
  if (budget >= 10000000) return 25; // Ultra-luxury PHP 10M+
  if (budget >= 7000000) return 22; // Luxury PHP 7-10M
  if (budget >= 5000000) return 20; // High-end PHP 5-7M
  if (budget >= 3500000) return 18; // Upper-mid PHP 3.5-5M
  if (budget >= 2500000) return 15; // Mid-range PHP 2.5-3.5M
  if (budget >= 1500000) return 12; // Entry PHP 1.5-2.5M
  if (budget >= 1000000) return 8; // Budget PHP 1-1.5M

  return 5; // Very budget conscious
};

// Calculate urgency score based on timeline
const calculateUrgencyScore = (timeline: string): number => {
  switch (timeline) {
    case "1-3 months":
      return 20; // Immediate need
    case "3-6 months":
      return 15; // Near-term
    case "6+ months":
      return 10; // Future planning
    default:
      return 5;
  }
};

// Calculate contact quality score
const calculateContactScore = (email: string, phone: string): number => {
  let score = 0;

  // Email quality
  if (email.includes("@gmail.com") || email.includes("@yahoo.com")) score += 5;
  if (email.includes(".ph") || email.includes(".com.ph")) score += 8; // Local domain
  if (email.includes("corp") || email.includes("business")) score += 10; // Business email

  // Philippine mobile format validation
  if (phone.startsWith("+639"))
    score += 10; // Proper international format
  else if (phone.startsWith("09"))
    score += 8; // Local format
  else if (phone.match(/^[0-9]{11}$/)) score += 6; // 11 digits

  return Math.min(score, 15); // Cap at 15
};

// Calculate preference specificity score
const calculatePreferenceScore = (preferences: any): number => {
  let score = 0;

  if (preferences.petFriendly !== undefined) score += 3;
  if (preferences.nonHaunted) score += 5; // Philippine-specific
  if (preferences.floodSafe) score += 5; // Important in Philippines

  return score;
};

// Calculate source quality score
const calculateSourceScore = (source: string): number => {
  switch (source) {
    case "Referral":
      return 15; // Highest quality
    case "Website":
      return 12; // Direct interest
    case "Email Campaign":
      return 10; // Engaged with marketing
    case "Social Media":
      return 8; // Social engagement
    case "Open House":
      return 6; // Casual interest
    default:
      return 3;
  }
};

// Calculate engagement score
const calculateEngagementScore = (seriousness: number): number => {
  return Math.round(seriousness * 0.2); // Convert 0-100 to 0-20
};

// Determine priority level
const determinePriority = (totalScore: number): "High" | "Medium" | "Low" => {
  if (totalScore >= 80) return "High";
  if (totalScore >= 60) return "Medium";

  return "Low";
};

// Calculate estimated lead value
const calculateLeadValue = (budget: number): number => {
  const commissionRate = 0.05; // 5% standard in Philippines

  return budget * commissionRate;
};

// Calculate estimated close time
const calculateCloseTime = (timeline: string, score: number): string => {
  let baseMonths = 3;

  if (timeline === "1-3 months") baseMonths = 2;
  else if (timeline === "3-6 months") baseMonths = 4;
  else if (timeline === "6+ months") baseMonths = 8;

  // High-score leads close faster
  if (score >= 80) baseMonths -= 1;
  else if (score <= 40) baseMonths += 2;

  const closeDate = new Date();

  closeDate.setMonth(closeDate.getMonth() + baseMonths);

  return closeDate.toISOString().split("T")[0];
};

// Intelligent agent assignment based on lead characteristics
export const assignLeadToAgent = async (
  lead: Lead,
  agents: Agent[],
  leadScore: LeadScore
): Promise<AgentAssignment> => {
  try {
    const bestAgent = findBestAgent(lead, agents, leadScore);

    if (!bestAgent) {
      throw new Error("No suitable agent found");
    }

    const matchReasons = generateMatchReasons(lead, bestAgent, leadScore);
    const expectedResponseTime = calculateResponseTime(leadScore.priority);

    // Submit assignment to CRM
    await apiClients.openRealEstate.post("/lead-assignments", {
      leadId: lead.id,
      agentId: bestAgent.id,
      score: leadScore.totalScore,
      priority: leadScore.priority,
      matchReasons,
      timestamp: new Date().toISOString(),
      market: "General Santos City",
    });

    // Send notification to agent
    await notifyAgentOfAssignment(bestAgent, lead, leadScore);

    return {
      agentId: bestAgent.id,
      leadId: lead.id,
      score: leadScore.totalScore,
      matchReasons,
      assignmentTime: new Date().toISOString(),
      expectedResponseTime,
    };
  } catch (error) {
    console.error("Agent assignment error:", error);
    throw new Error("Failed to assign lead to agent");
  }
};

// Find the best agent for a lead
const findBestAgent = (
  lead: Lead,
  agents: Agent[],
  leadScore: LeadScore
): Agent | null => {
  // Filter available agents
  const availableAgents = agents.filter((agent) => agent.activeLeads < 20); // Max 20 leads per agent

  if (availableAgents.length === 0) {
    return agents.reduce((best, current) =>
      current.activeLeads < best.activeLeads ? current : best
    );
  }

  // Score each agent for this lead
  const agentScores = availableAgents.map((agent) => ({
    agent,
    score: calculateAgentMatchScore(lead, agent, leadScore),
  }));

  // Sort by score and return the best match
  agentScores.sort((a, b) => b.score - a.score);

  return agentScores[0].agent;
};

// Calculate how well an agent matches a lead
const calculateAgentMatchScore = (
  lead: Lead,
  agent: Agent,
  leadScore: LeadScore
): number => {
  let score = 0;

  // Specialization match
  const leadType =
    lead.budget > 5000000
      ? "Luxury"
      : lead.budget > 3000000
        ? "Commercial"
        : "Residential";

  if (agent.specialization === leadType) score += 30;
  else if (agent.specialization === "Luxury" && leadType === "Commercial")
    score += 20;

  // Performance scoring
  if (agent.rating >= 4.5) score += 25;
  else if (agent.rating >= 4.0) score += 20;
  else if (agent.rating >= 3.5) score += 15;

  // Workload consideration
  if (agent.activeLeads <= 5) score += 20;
  else if (agent.activeLeads <= 10) score += 15;
  else if (agent.activeLeads <= 15) score += 10;

  // Experience factor
  if (agent.closedDeals >= 50) score += 15;
  else if (agent.closedDeals >= 25) score += 10;
  else if (agent.closedDeals >= 10) score += 5;

  // Lead priority matching
  if (leadScore.priority === "High" && agent.rating >= 4.0) score += 10;

  return score;
};

// Generate reasons for agent assignment
const generateMatchReasons = (
  lead: Lead,
  agent: Agent,
  leadScore: LeadScore
): string[] => {
  const reasons = [];

  const leadType =
    lead.budget > 5000000
      ? "Luxury"
      : lead.budget > 3000000
        ? "Commercial"
        : "Residential";

  if (agent.specialization === leadType) {
    reasons.push(`Specializes in ${leadType.toLowerCase()} properties`);
  }

  if (agent.rating >= 4.5) {
    reasons.push(`Top-rated agent (${agent.rating.toFixed(1)}/5.0)`);
  }

  if (agent.activeLeads <= 10) {
    reasons.push(`Low current workload (${agent.activeLeads} active leads)`);
  }

  if (agent.closedDeals >= 25) {
    reasons.push(`Experienced agent (${agent.closedDeals} closed deals)`);
  }

  if (leadScore.priority === "High") {
    reasons.push(`High-priority lead match`);
  }

  return reasons;
};

// Calculate expected response time
const calculateResponseTime = (priority: "High" | "Medium" | "Low"): string => {
  const now = new Date();
  let hours = 24; // Default 24 hours

  switch (priority) {
    case "High":
      hours = 2;
      break;
    case "Medium":
      hours = 8;
      break;
    case "Low":
      hours = 24;
      break;
  }

  now.setHours(now.getHours() + hours);

  return now.toISOString();
};

// Notify agent of new lead assignment
const notifyAgentOfAssignment = async (
  agent: Agent,
  lead: Lead,
  leadScore: LeadScore
): Promise<void> => {
  try {
    const message = `New ${leadScore.priority.toLowerCase()}-priority lead assigned! ${lead.name} (${lead.email}) - Budget: ₱${(lead.budget / 1000000).toFixed(1)}M. Score: ${leadScore.totalScore}/100. Please respond within ${leadScore.priority === "High" ? "2 hours" : leadScore.priority === "Medium" ? "8 hours" : "24 hours"}.`;

    // Send SMS notification to agent
    await apiClients.smsGateway.post("/messages", {
      number: "+639123456789", // Agent's phone would be stored in agent data
      message: message,
      sender: "aTuna",
      priority: leadScore.priority,
    });

    console.log(`Agent ${agent.name} notified of new lead assignment`);
  } catch (error) {
    console.error("Agent notification error:", error);
  }
};

// Batch process lead scoring for multiple leads
export const batchProcessLeadScoring = async (
  leads: Lead[]
): Promise<LeadScore[]> => {
  try {
    const scoringPromises = leads.map((lead) =>
      calculateAdvancedLeadScore(lead)
    );
    const scores = await Promise.all(scoringPromises);

    // Sort by total score (highest first)
    scores.sort((a, b) => b.totalScore - a.totalScore);

    console.log(`Batch processed ${scores.length} lead scores`);

    return scores;
  } catch (error) {
    console.error("Batch scoring error:", error);
    throw new Error("Failed to batch process lead scores");
  }
};

// Real-time lead scoring update
export const updateLeadScore = async (
  leadId: string,
  newData: Partial<Lead>
): Promise<LeadScore> => {
  try {
    // This would fetch the current lead data and merge with updates
    console.log(`Updating lead score for ${leadId} with new data:`, newData);

    // Recalculate score with new data
    // Return updated score
    return {
      leadId,
      totalScore: 85, // Mock updated score
      breakdown: {
        budget: 20,
        urgency: 15,
        contactQuality: 12,
        preferences: 8,
        source: 10,
        engagement: 20,
      },
      priority: "High",
      estimatedCloseTime: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 60 days
      estimatedValue: 150000,
    };
  } catch (error) {
    console.error("Lead score update error:", error);
    throw new Error("Failed to update lead score");
  }
};
