import { IconCheck } from "@tabler/icons-react";

interface StepperProps {
  currentStep: number;
  steps: Array<{
    number: number;
    title: string;
    description: string;
  }>;
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center flex-1">
          {/* Step Circle */}
          <div className="flex flex-col items-center relative">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                ${currentStep >= step.number
                  ? "bg-primary text-white"
                  : "bg-default-100 text-default-500"
                }
              `}
            >
              {currentStep > step.number ? (
                <IconCheck className="w-5 h-5" />
              ) : (
                step.number
              )}
            </div>
            
            {/* Step Info */}
            <div className="mt-3 text-center">
              <div className={`text-sm font-medium transition-colors ${
                currentStep >= step.number ? "text-foreground" : "text-default-500"
              }`}>
                {step.title}
              </div>
              <div className="text-xs text-default-400 mt-1 max-w-20">
                {step.description}
              </div>
            </div>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-4 mt-[-40px] transition-colors"
              style={{
                backgroundColor: currentStep > step.number ? 'rgb(var(--primary))' : 'rgb(var(--default-200))'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
