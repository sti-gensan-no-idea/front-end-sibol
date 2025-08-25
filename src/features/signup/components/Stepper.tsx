import { IconCheck } from "@tabler/icons-react";

export type StepStatus = 'completed' | 'current' | 'pending';

interface StepperProps {
  currentStep: number;
  steps: Array<{
    number: number;
    title: string;
    description?: string;
    status?: StepStatus;
  }>;
  className?: string;
}

export function Stepper({ currentStep, steps, className = "" }: StepperProps) {
  // Auto-determine status if not provided
  const getStepStatus = (stepNumber: number): StepStatus => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'pending';
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground-600 mb-2">
          Verification Progress
        </h3>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step) => {
          const status = step.status || getStepStatus(step.number);
          
          return (
            <div
              key={step.number}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                ${status === 'current' 
                  ? 'bg-primary/10 border-2 border-primary/20' 
                  : 'hover:bg-default-50'
                }
              `}
            >
              {/* Step Icon/Number */}
              <div className="flex-shrink-0">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                    ${status === 'completed'
                      ? 'bg-success text-white shadow-sm'
                      : status === 'current'
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-default-200 text-default-500'
                    }
                  `}
                >
                  {status === 'completed' ? (
                    <IconCheck className="w-4 h-4" />
                  ) : (
                    step.number
                  )}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div
                  className={`
                    text-sm font-medium transition-colors
                    ${status === 'completed'
                      ? 'text-success'
                      : status === 'current'
                      ? 'text-primary'
                      : 'text-default-600'
                    }
                  `}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-xs text-default-400 mt-1">
                    {step.description}
                  </div>
                )}
              </div>

              {/* Status Indicator */}
              <div className="flex-shrink-0">
                <div
                  className={`
                    w-2 h-2 rounded-full transition-colors
                    ${status === 'completed'
                      ? 'bg-success'
                      : status === 'current'
                      ? 'bg-primary animate-pulse'
                      : 'bg-default-300'
                    }
                  `}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-default-100">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success flex items-center justify-center">
              <IconCheck className="w-2 h-2 text-white" />
            </div>
            <span className="text-success font-medium">Completed</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-medium">Current Step</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-default-300" />
            <span className="text-default-500">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced stepper with validation status
interface ValidationStepperProps extends Omit<StepperProps, 'steps'> {
  steps: Array<{
    number: number;
    title: string;
    description?: string;
    isValid?: boolean;
    isRequired?: boolean;
    validationMessage?: string;
  }>;
}

export function ValidationStepper({ 
  currentStep, 
  steps, 
  className = "" 
}: ValidationStepperProps) {
  
  const getStepStatus = (step: ValidationStepperProps['steps'][0]): StepStatus => {
    if (step.number < currentStep) {
      return step.isValid ? 'completed' : 'pending';
    }
    if (step.number === currentStep) return 'current';
    return 'pending';
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground-600 mb-2">
          Verification Progress
        </h3>
        <div className="text-sm text-default-500">
          Complete all required steps to continue
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step) => {
          const status = getStepStatus(step);
          const isInvalid = step.number <= currentStep && step.isRequired && !step.isValid;
          
          return (
            <div
              key={step.number}
              className={`
                flex items-start gap-3 p-3 rounded-lg transition-all duration-200
                ${status === 'current' 
                  ? 'bg-primary/10 border-2 border-primary/20' 
                  : isInvalid
                  ? 'bg-danger/5 border border-danger/20'
                  : 'hover:bg-default-50'
                }
              `}
            >
              {/* Step Icon/Number */}
              <div className="flex-shrink-0 mt-0.5">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                    ${status === 'completed'
                      ? 'bg-success text-white shadow-sm'
                      : status === 'current'
                      ? 'bg-primary text-white shadow-sm'
                      : isInvalid
                      ? 'bg-danger text-white'
                      : 'bg-default-200 text-default-500'
                    }
                  `}
                >
                  {status === 'completed' && step.isValid ? (
                    <IconCheck className="w-4 h-4" />
                  ) : (
                    step.number
                  )}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div
                  className={`
                    text-sm font-medium transition-colors flex items-center gap-2
                    ${status === 'completed' && step.isValid
                      ? 'text-success'
                      : status === 'current'
                      ? 'text-primary'
                      : isInvalid
                      ? 'text-danger'
                      : 'text-default-600'
                    }
                  `}
                >
                  {step.title}
                  {step.isRequired && (
                    <span className="text-danger text-xs">*</span>
                  )}
                </div>
                
                {step.description && (
                  <div className="text-xs text-default-400 mt-1">
                    {step.description}
                  </div>
                )}
                
                {step.validationMessage && isInvalid && (
                  <div className="text-xs text-danger mt-1 font-medium">
                    {step.validationMessage}
                  </div>
                )}
              </div>

              {/* Status Indicator */}
              <div className="flex-shrink-0 mt-2">
                <div
                  className={`
                    w-2 h-2 rounded-full transition-colors
                    ${status === 'completed' && step.isValid
                      ? 'bg-success'
                      : status === 'current'
                      ? 'bg-primary animate-pulse'
                      : isInvalid
                      ? 'bg-danger'
                      : 'bg-default-300'
                    }
                  `}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-default-100">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success flex items-center justify-center">
              <IconCheck className="w-2 h-2 text-white" />
            </div>
            <span className="text-success font-medium">Completed</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-medium">Current Step</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-default-300" />
            <span className="text-default-500">Pending</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-danger" />
            <span className="text-danger font-medium">Required</span>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-default-400">
          <span className="text-danger">*</span> Required steps must be completed
        </div>
      </div>
    </div>
  );
}
