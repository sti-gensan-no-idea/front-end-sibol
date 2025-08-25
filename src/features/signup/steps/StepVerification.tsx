import { useState } from 'react';
import { Button, Input, Card, CardBody, Tabs, Tab } from '@heroui/react';
import { IconMail, IconPhone, IconCheck } from '@tabler/icons-react';
import { useSignupStore } from '../state';

export function StepVerification() {
  const { 
    personalData, 
    emailVerified, 
    mobileVerified,
    setEmailVerified, 
    setMobileVerified,
    setCurrentStep 
  } = useSignupStore();
  
  const [activeTab, setActiveTab] = useState<string>('email');
  const [emailOtpCode, setEmailOtpCode] = useState('');
  const [mobileOtpCode, setMobileOtpCode] = useState('');
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isVerifyingMobile, setIsVerifyingMobile] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [mobileSent, setMobileSent] = useState(false);

  const handleSendEmailOtp = async () => {
    setIsVerifyingEmail(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmailSent(true);
    } catch (error) {
      console.error('Failed to send email OTP:', error);
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleSendMobileOtp = async () => {
    setIsVerifyingMobile(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMobileSent(true);
    } catch (error) {
      console.error('Failed to send mobile OTP:', error);
    } finally {
      setIsVerifyingMobile(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (emailOtpCode.length === 6) {
      setIsVerifyingEmail(true);
      try {
        // Simulate API verification
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEmailVerified(true);
        
        // Auto-switch to mobile tab if not verified
        if (!mobileVerified) {
          setActiveTab('mobile');
        }
      } catch (error) {
        console.error('Failed to verify email:', error);
      } finally {
        setIsVerifyingEmail(false);
      }
    }
  };

  const handleVerifyMobile = async () => {
    if (mobileOtpCode.length === 6) {
      setIsVerifyingMobile(true);
      try {
        // Simulate API verification
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMobileVerified(true);
      } catch (error) {
        console.error('Failed to verify mobile:', error);
      } finally {
        setIsVerifyingMobile(false);
      }
    }
  };

  const handleNext = () => {
    if (emailVerified && mobileVerified) {
      setCurrentStep(3);
    }
  };

  const canProceed = emailVerified && mobileVerified;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold mb-2">Verify Your Contact Details</h3>
        <p className="text-gray-600">
          We need to verify both your email and mobile number for security
        </p>
      </div>

      {/* Progress Indicators */}
      <div className="flex gap-4 mb-6">
        <Card className={`flex-1 ${emailVerified ? 'bg-success/10 border-success/20' : ''}`}>
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                emailVerified ? 'bg-success text-white' : 'bg-primary/10 text-primary'
              }`}>
                {emailVerified ? <IconCheck className="w-4 h-4" /> : <IconMail className="w-4 h-4" />}
              </div>
              <div>
                <div className="font-medium text-sm">Email Verification</div>
                <div className="text-xs text-gray-500 truncate">{personalData?.email}</div>
              </div>
              {emailVerified && (
                <IconCheck className="w-5 h-5 text-success ml-auto" />
              )}
            </div>
          </CardBody>
        </Card>

        <Card className={`flex-1 ${mobileVerified ? 'bg-success/10 border-success/20' : ''}`}>
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                mobileVerified ? 'bg-success text-white' : 'bg-primary/10 text-primary'
              }`}>
                {mobileVerified ? <IconCheck className="w-4 h-4" /> : <IconPhone className="w-4 h-4" />}
              </div>
              <div>
                <div className="font-medium text-sm">Mobile Verification</div>
                <div className="text-xs text-gray-500">{personalData?.phone || '+1 (555) 123-4567'}</div>
              </div>
              {mobileVerified && (
                <IconCheck className="w-5 h-5 text-success ml-auto" />
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Verification Tabs */}
      <Tabs 
        selectedKey={activeTab} 
        onSelectionChange={(key) => setActiveTab(key as string)}
        className="w-full"
      >
        <Tab 
          key="email" 
          title={
            <div className="flex items-center gap-2">
              <IconMail className="w-4 h-4" />
              Email
              {emailVerified && <IconCheck className="w-3 h-3 text-success" />}
            </div>
          }
        >
          <Card>
            <CardBody className="p-6">
              {!emailVerified ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <IconMail className="w-12 h-12 mx-auto text-primary mb-3" />
                    <h4 className="font-semibold mb-2">Verify Your Email</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      We'll send a 6-digit code to <strong>{personalData?.email}</strong>
                    </p>
                  </div>

                  {!emailSent ? (
                    <Button
                      color="primary"
                      size="lg"
                      className="w-full"
                      onPress={handleSendEmailOtp}
                      isLoading={isVerifyingEmail}
                    >
                      Send Verification Code
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <Input
                        label="Enter 6-digit code"
                        placeholder="000000"
                        value={emailOtpCode}
                        onValueChange={setEmailOtpCode}
                        maxLength={6}
                        classNames={{
                          input: "text-center text-2xl tracking-wider font-mono"
                        }}
                      />
                      <Button
                        color="primary"
                        size="lg"
                        className="w-full"
                        onPress={handleVerifyEmail}
                        isDisabled={emailOtpCode.length !== 6}
                        isLoading={isVerifyingEmail}
                      >
                        Verify Email
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        className="w-full"
                        onPress={handleSendEmailOtp}
                      >
                        Resend Code
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconCheck className="w-8 h-8 text-success" />
                  </div>
                  <h4 className="font-semibold text-success mb-2">Email Verified!</h4>
                  <p className="text-sm text-gray-600">
                    Your email address has been successfully verified
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>

        <Tab 
          key="mobile" 
          title={
            <div className="flex items-center gap-2">
              <IconPhone className="w-4 h-4" />
              Mobile
              {mobileVerified && <IconCheck className="w-3 h-3 text-success" />}
            </div>
          }
        >
          <Card>
            <CardBody className="p-6">
              {!mobileVerified ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <IconPhone className="w-12 h-12 mx-auto text-primary mb-3" />
                    <h4 className="font-semibold mb-2">Verify Your Mobile</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      We'll send a 6-digit code via SMS to <strong>{personalData?.phone || '+1 (555) 123-4567'}</strong>
                    </p>
                  </div>

                  {!mobileSent ? (
                    <Button
                      color="primary"
                      size="lg"
                      className="w-full"
                      onPress={handleSendMobileOtp}
                      isLoading={isVerifyingMobile}
                    >
                      Send SMS Code
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <Input
                        label="Enter 6-digit SMS code"
                        placeholder="000000"
                        value={mobileOtpCode}
                        onValueChange={setMobileOtpCode}
                        maxLength={6}
                        classNames={{
                          input: "text-center text-2xl tracking-wider font-mono"
                        }}
                      />
                      <Button
                        color="primary"
                        size="lg"
                        className="w-full"
                        onPress={handleVerifyMobile}
                        isDisabled={mobileOtpCode.length !== 6}
                        isLoading={isVerifyingMobile}
                      >
                        Verify Mobile
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        className="w-full"
                        onPress={handleSendMobileOtp}
                      >
                        Resend SMS
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconCheck className="w-8 h-8 text-success" />
                  </div>
                  <h4 className="font-semibold text-success mb-2">Mobile Verified!</h4>
                  <p className="text-sm text-gray-600">
                    Your mobile number has been successfully verified
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          variant="bordered"
          onPress={() => setCurrentStep(1)}
        >
          Previous
        </Button>

        <Button
          color="primary"
          onPress={handleNext}
          isDisabled={!canProceed}
          className={canProceed ? '' : 'opacity-50'}
        >
          Continue to Documents
        </Button>
      </div>

      {!canProceed && (
        <div className="text-center">
          <p className="text-sm text-warning">
            Both email and mobile verification are required to continue
          </p>
        </div>
      )}
    </div>
  );
}
