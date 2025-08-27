import { useState } from "react";
import { ValidationStepper } from "../components/Stepper";
import { Button } from "@heroui/react";

// Example usage component
export function SignupStepperExample() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  // Example validation states
  const [validationState, setValidationState] = useState({
    profileComplete: false,
    emailVerified: false,
    mobileVerified: false,
    credentialsUploaded: false,
  });

  const steps = [
    {
      number: 1,
      title: "Complete Profile",
      description: "Fill in your basic information",
      isValid: validationState.profileComplete,
      isRequired: true,
      validationMessage: !validationState.profileComplete ? "Please complete all required fields" : undefined
    },
    {
      number: 2,
      title: "Verify Email & Mobile",
      description: "Confirm your contact information",
      isValid: validationState.emailVerified && validationState.mobileVerified,
      isRequired: true,
      validationMessage: !validationState.emailVerified || !validationState.mobileVerified 
        ? "Both email and mobile verification required" : undefined
    },
    {
      number: 3,
      title: "Upload Credentials",
      description: "Submit required documents",
      isValid: validationState.credentialsUploaded,
      isRequired: true,
      validationMessage: !validationState.credentialsUploaded ? "Please upload all required documents" : undefined
    },
    {
      number: 4,
      title: "Get Started",
      description: "Complete your registration",
      isValid: Object.values(validationState).every(Boolean),
      isRequired: false,
    }
  ];

  const handleStepValidation = (stepNumber: number, isValid: boolean) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: isValid
    }));

    // Update validation state based on step
    switch (stepNumber) {
      case 1:
        setValidationState(prev => ({ ...prev, profileComplete: isValid }));
        break;
      case 2:
        setValidationState(prev => ({ 
          ...prev, 
          emailVerified: isValid, 
          mobileVerified: isValid 
        }));
        break;
      case 3:
        setValidationState(prev => ({ ...prev, credentialsUploaded: isValid }));
        break;
    }
  };

  const canProceedToNext = () => {
    const currentStepData = steps.find(step => step.number === currentStep);
    return currentStepData?.isValid || false;
  };

  const handleNextStep = () => {
    if (canProceedToNext() && currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Stepper Column */}
        <div>
          <ValidationStepper
            currentStep={currentStep}
            steps={steps}
            className="sticky top-6"
          />
        </div>

        {/* Content Column */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {steps[currentStep - 1]?.title}
            </h2>
            <p className="text-default-500">
              {steps[currentStep - 1]?.description}
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Profile Information</h3>
                <p className="text-sm text-default-600">
                  Complete your profile information to proceed.
                </p>
                <Button
                  color="primary"
                  onPress={() => handleStepValidation(1, !validationState.profileComplete)}
                >
                  {validationState.profileComplete ? "Mark Incomplete" : "Complete Profile"}
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Verification</h3>
                <p className="text-sm text-default-600">
                  Verify your email and mobile number.
                </p>
                <Button
                  color="primary"
                  onPress={() => handleStepValidation(2, !validationState.emailVerified)}
                >
                  {validationState.emailVerified ? "Mark Unverified" : "Verify Contacts"}
                </Button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Document Upload</h3>
                <p className="text-sm text-default-600">
                  Upload your required credentials and documents.
                </p>
                <Button
                  color="primary"
                  onPress={() => handleStepValidation(3, !validationState.credentialsUploaded)}
                >
                  {validationState.credentialsUploaded ? "Remove Documents" : "Upload Documents"}
                </Button>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="font-semibold">All Set!</h3>
                <p className="text-sm text-default-600">
                  You've completed all required steps. Ready to get started?
                </p>
                <Button
                  color="success"
                  size="lg"
                  disabled={!Object.values(validationState).every(Boolean)}
                >
                  Complete Registration
                </Button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="bordered"
              onPress={handlePreviousStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <Button
              color="primary"
              onPress={handleNextStep}
              disabled={!canProceedToNext() || currentStep === steps.length}
            >
              {currentStep === steps.length ? "Complete" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
