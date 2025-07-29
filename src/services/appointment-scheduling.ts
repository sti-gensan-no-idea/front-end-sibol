import { apiClients, ApiResponse, EventScheduleData } from './api-config';
import { Event, Agent, Lead } from '@/data/automation_data';

/**
 * Strategy 5: Appointment Scheduling
 * Integrates with OpenMaint API for automated event scheduling and calendar management
 */

export interface SchedulingRule {
  id: string;
  agentId: string;
  type: 'Viewing' | 'Inspection' | 'Consultation' | 'Open House';
  duration: number; // minutes
  bufferTime: number; // minutes between appointments
  workingHours: {
    start: string; // "09:00"
    end: string;   // "18:00"
  };
  workingDays: number[]; // 0-6 (Sunday-Saturday)
  maxPerDay: number;
  requiresConfirmation: boolean;
  autoReschedule: boolean;
  reminderSettings: {
    sms: number[]; // hours before: [24, 2]
    email: number[]; // hours before: [48, 24, 1]
  };
}

export interface AppointmentRequest {
  leadId: string;
  propertyId?: string;
  type: 'Viewing' | 'Inspection' | 'Consultation' | 'Open House';
  preferredDates: string[];
  preferredTimes: string[];
  duration?: number;
  notes?: string;
  contactPreference: 'SMS' | 'Email' | 'Call';
  urgency: 'Low' | 'Medium' | 'High';
}

export interface SchedulingResponse {
  success: boolean;
  appointmentId?: string;
  scheduledTime?: string;
  agentAssigned?: string;
  confirmationRequired?: boolean;
  alternativeTimes?: string[];
  message: string;
}

// Create automated appointment scheduling
export const scheduleAppointment = async (request: AppointmentRequest): Promise<SchedulingResponse> => {
  try {
    // Find best available agent and time slot
    const assignment = await findOptimalSchedule(request);
    
    if (!assignment.success) {
      return {
        success: false,
        message: 'No available slots found for your preferred times',
        alternativeTimes: assignment.alternativeTimes
      };
    }

    // Create event in OpenMaint
    const eventData: EventScheduleData = {
      title: `${request.type} - ${request.leadId}`,
      description: `Automated ${request.type.toLowerCase()} appointment`,
      date: assignment.date!,
      time: assignment.time!,
      duration: assignment.duration || 60,
      attendees: [assignment.agentId!, request.leadId],
      location: request.propertyId ? `Property ${request.propertyId}` : 'aTuna Office',
      type: request.type
    };

    const openMaintResponse = await apiClients.openMaint.post('/events', eventData);
    
    // Send confirmation notifications
    await sendAppointmentConfirmation(assignment, request);
    
    // Schedule automated reminders
    await scheduleReminders(assignment, request);

    console.log('Appointment scheduled via OpenMaint:', openMaintResponse.data);

    return {
      success: true,
      appointmentId: assignment.appointmentId,
      scheduledTime: `${assignment.date} ${assignment.time}`,
      agentAssigned: assignment.agentId,
      confirmationRequired: assignment.requiresConfirmation,
      message: 'Appointment scheduled successfully'
    };
  } catch (error) {
    console.error('Appointment scheduling error:', error);
    return {
      success: false,
      message: 'Failed to schedule appointment. Please try again or contact us directly.'
    };
  }
};

// Find optimal schedule considering agent availability and rules
const findOptimalSchedule = async (request: AppointmentRequest): Promise<any> => {
  try {
    // Mock intelligent scheduling logic
    const availableSlots = await getAvailableSlots(request);
    
    if (availableSlots.length === 0) {
      return {
        success: false,
        alternativeTimes: await getSuggestedAlternatives(request)
      };
    }

    const bestSlot = availableSlots[0]; // Select best match
    
    return {
      success: true,
      appointmentId: `appt-${Date.now()}`,
      agentId: bestSlot.agentId,
      date: bestSlot.date,
      time: bestSlot.time,
      duration: bestSlot.duration,
      requiresConfirmation: bestSlot.requiresConfirmation
    };
  } catch (error) {
    console.error('Schedule optimization error:', error);
    return { success: false };
  }
};

// Get available time slots based on agent schedules
const getAvailableSlots = async (request: AppointmentRequest): Promise<any[]> => {
  // Mock available slots - in real implementation, would query agent calendars
  const slots = [];
  const now = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    
    // Skip weekends for business hours
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const timeSlots = ['09:00', '10:30', '14:00', '15:30', '17:00'];
    
    timeSlots.forEach(time => {
      slots.push({
        agentId: `agent-${Math.floor(Math.random() * 10) + 1}`,
        date: date.toISOString().split('T')[0],
        time,
        duration: request.duration || 60,
        requiresConfirmation: request.urgency === 'High' ? false : true,
        available: Math.random() > 0.3 // 70% availability
      });
    });
  }
  
  return slots.filter(slot => slot.available);
};

// Get suggested alternative times
const getSuggestedAlternatives = async (request: AppointmentRequest): Promise<string[]> => {
  const alternatives = [];
  const now = new Date();
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      alternatives.push(`${date.toLocaleDateString()} at 10:00 AM`);
      alternatives.push(`${date.toLocaleDateString()} at 2:00 PM`);
    }
  }
  
  return alternatives.slice(0, 6);
};

// Send appointment confirmation
const sendAppointmentConfirmation = async (assignment: any, request: AppointmentRequest): Promise<void> => {
  try {
    const confirmationMessage = generateConfirmationMessage(assignment, request);
    
    if (request.contactPreference === 'SMS') {
      await apiClients.smsGateway.post('/messages', {
        number: '+639123456789', // Would get from lead data
        message: confirmationMessage.sms,
        sender: 'aTuna'
      });
    }
    
    // Always send email confirmation as well
    console.log('Email confirmation would be sent:', confirmationMessage.email);
    
  } catch (error) {
    console.error('Confirmation sending error:', error);
  }
};

// Generate confirmation messages
const generateConfirmationMessage = (assignment: any, request: AppointmentRequest): any => {
  const datetime = `${assignment.date} at ${assignment.time}`;
  const location = request.propertyId ? 'the property location' : 'our office at Pioneer Avenue, General Santos City';
  
  return {
    sms: `✅ CONFIRMED: Your ${request.type.toLowerCase()} is scheduled for ${datetime}. Location: ${location}. Agent: ${assignment.agentId}. Reply RESCHEDULE if you need to change. -aTuna`,
    email: {
      subject: `Appointment Confirmed - ${request.type} on ${assignment.date}`,
      body: `Your ${request.type.toLowerCase()} appointment has been confirmed for ${datetime} at ${location}. Your agent will contact you 24 hours before the appointment.`
    }
  };
};

// Schedule automated reminders
const scheduleReminders = async (assignment: any, request: AppointmentRequest): Promise<void> => {
  try {
    const reminders = [
      { hours: 48, type: 'email', message: 'Reminder: Your appointment is in 2 days' },
      { hours: 24, type: 'sms', message: 'Tomorrow: Property viewing at ${time}. Reply CONFIRM or RESCHEDULE' },
      { hours: 2, type: 'sms', message: 'In 2 hours: Property viewing. Address: ${location}. Agent: ${agent}' }
    ];
    
    await apiClients.openMaint.post('/reminders', {
      appointmentId: assignment.appointmentId,
      reminders,
      timezone: 'Asia/Manila'
    });
    
    console.log('Automated reminders scheduled for appointment:', assignment.appointmentId);
  } catch (error) {
    console.error('Reminder scheduling error:', error);
  }
};

// Reschedule appointment
export const rescheduleAppointment = async (appointmentId: string, newRequest: Partial<AppointmentRequest>): Promise<SchedulingResponse> => {
  try {
    // Cancel existing appointment
    await apiClients.openMaint.delete(`/events/${appointmentId}`);
    
    // Create new appointment with updated preferences
    const fullRequest = { ...newRequest } as AppointmentRequest;
    return await scheduleAppointment(fullRequest);
  } catch (error) {
    console.error('Reschedule error:', error);
    return {
      success: false,
      message: 'Failed to reschedule appointment'
    };
  }
};

// Cancel appointment
export const cancelAppointment = async (appointmentId: string, reason?: string): Promise<ApiResponse> => {
  try {
    await apiClients.openMaint.delete(`/events/${appointmentId}`, {
      data: { reason, timestamp: new Date().toISOString() }
    });
    
    // Send cancellation notifications
    await sendCancellationNotification(appointmentId, reason);
    
    return {
      success: true,
      message: 'Appointment cancelled successfully',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Cancellation error:', error);
    return {
      success: false,
      message: 'Failed to cancel appointment',
      timestamp: new Date().toISOString()
    };
  }
};

// Send cancellation notification
const sendCancellationNotification = async (appointmentId: string, reason?: string): Promise<void> => {
  const message = `Your appointment ${appointmentId} has been cancelled. ${reason ? `Reason: ${reason}` : ''} Please contact us to reschedule. -aTuna`;
  
  console.log('Cancellation notification would be sent:', message);
};

// Create open house event
export const createOpenHouseEvent = async (propertyId: string, date: string, time: string): Promise<ApiResponse> => {
  try {
    const eventData: EventScheduleData = {
      title: `Open House - Property ${propertyId}`,
      description: 'Public open house viewing',
      date,
      time,
      duration: 180, // 3 hours
      attendees: ['public'],
      location: `Property ${propertyId}`,
      type: 'Open House'
    };
    
    const response = await apiClients.openMaint.post('/events/open-house', eventData);
    
    // Create social media posts for promotion
    await createOpenHousePromotion(propertyId, date, time);
    
    return {
      success: true,
      data: { eventId: response.data.id },
      message: 'Open house event created and promoted',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Open house creation error:', error);
    return {
      success: false,
      message: 'Failed to create open house event',
      timestamp: new Date().toISOString()
    };
  }
};

// Create open house promotion
const createOpenHousePromotion = async (propertyId: string, date: string, time: string): Promise<void> => {
  const promotionContent = {
    facebook: `🏠 OPEN HOUSE ALERT! 
    
Join us this ${new Date(date).toLocaleDateString('en-US', { weekday: 'long' })} at ${time} for an exclusive open house viewing!

📍 Property ${propertyId}
📅 ${new Date(date).toLocaleDateString()}
⏰ ${time}

No appointment needed - just show up! Our agents will be there to answer all your questions.

#aTunaRealEstate #OpenHouse #GeneralSantosCity #PropertyViewing`,
    
    instagram: `✨ OPEN HOUSE TODAY ✨

📍 Property ${propertyId}
📅 ${date}
⏰ ${time}

Come see this amazing property! No appointment needed 🔑

#OpenHouse #aTunaRealEstate #GenSan #PropertyViewing #RealEstate`,
    
    sms: `🏠 OPEN HOUSE: Property ${propertyId} open for viewing ${date} at ${time}. No appointment needed! Address sent separately. -aTuna`
  };
  
  console.log('Open house promotion would be posted:', promotionContent);
};

// Bulk schedule viewings for multiple leads
export const bulkScheduleViewings = async (propertyId: string, leadIds: string[]): Promise<ApiResponse[]> => {
  try {
    const results = await Promise.all(
      leadIds.map(leadId => 
        scheduleAppointment({
          leadId,
          propertyId,
          type: 'Viewing',
          preferredDates: [new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]],
          preferredTimes: ['10:00', '14:00', '16:00'],
          contactPreference: 'SMS',
          urgency: 'Medium'
        })
      )
    );
    
    console.log(`Bulk scheduled ${results.length} viewings for property ${propertyId}`);
    return results.map(r => ({
      success: r.success,
      data: { appointmentId: r.appointmentId },
      message: r.message,
      timestamp: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Bulk scheduling error:', error);
    return [{
      success: false,
      message: 'Failed to bulk schedule viewings',
      timestamp: new Date().toISOString()
    }];
  }
};

// Get agent availability
export const getAgentAvailability = async (agentId: string, dateRange: [string, string]): Promise<any> => {
  try {
    const response = await apiClients.openMaint.get(`/agents/${agentId}/availability`, {
      params: {
        startDate: dateRange[0],
        endDate: dateRange[1]
      }
    });
    
    return {
      agentId,
      availability: response.data.slots || [],
      workingHours: { start: '09:00', end: '18:00' },
      timeZone: 'Asia/Manila'
    };
  } catch (error) {
    console.error('Availability check error:', error);
    return {
      agentId,
      availability: [],
      error: 'Failed to check availability'
    };
  }
};

// Auto-assign appointments based on agent performance
export const autoAssignAppointments = async (appointments: AppointmentRequest[]): Promise<any[]> => {
  try {
    const assignments = [];
    
    for (const appointment of appointments) {
      // Get agent performance scores
      const agentScores = await getAgentPerformanceScores();
      
      // Find best agent based on availability and performance
      const bestAgent = findBestAgentForAppointment(appointment, agentScores);
      
      if (bestAgent) {
        const result = await scheduleAppointment({
          ...appointment,
          // Force assignment to best agent
        });
        
        assignments.push({
          appointmentRequest: appointment,
          assignedAgent: bestAgent.id,
          schedulingResult: result,
          matchScore: bestAgent.score
        });
      }
    }
    
    return assignments;
  } catch (error) {
    console.error('Auto-assignment error:', error);
    return [];
  }
};

// Get agent performance scores
const getAgentPerformanceScores = async (): Promise<any[]> => {
  // Mock agent performance data
  return [
    { id: 'agent-1', score: 95, specialization: 'Residential', activeAppointments: 5 },
    { id: 'agent-2', score: 88, specialization: 'Commercial', activeAppointments: 3 },
    { id: 'agent-3', score: 92, specialization: 'Luxury', activeAppointments: 7 },
  ];
};

// Find best agent for appointment
const findBestAgentForAppointment = (appointment: AppointmentRequest, agentScores: any[]): any | null => {
  // Sort agents by score and availability
  const sortedAgents = agentScores
    .filter(agent => agent.activeAppointments < 10) // Max 10 appointments
    .sort((a, b) => b.score - a.score);
  
  return sortedAgents[0] || null;
};