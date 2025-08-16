import React, { useState } from "react";
import { Button, Divider, Input, Link, Select, SelectItem, Chip } from "@heroui/react";
import {
  IconMailFilled,
  IconUserFilled,
  IconLockFilled,
  IconPhoneFilled,
  IconIdBadge2,
  IconBuilding,
  IconFileCheck,
} from "@tabler/icons-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks";

type UserRole = 'client' | 'developer' | 'agent' | 'broker' | 'admin';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: UserRole;
  // Professional fields (conditional)
  company_name?: string;
  license_number?: string;
  team_name?: string;
  cpd_certificate?: string;
  broker_id?: string;
}

const roleOptions = [
  { key: "client", label: "Client", description: "Browse and purchase properties" },
  { key: "agent", label: "Agent", description: "Manage leads and assist clients" },
  { key: "broker", label: "Broker", description: "Manage teams and properties" },
  { key: "developer", label: "Developer", description: "Upload and manage developments" },
];

export const ClientSignUpCardForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signup, loading, error } = useAuth();
  
  // Get role from URL parameter if present
  const roleFromUrl = searchParams.get('role') as UserRole || 'client';
  
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    phone: "",
    role: roleFromUrl,
  });
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Basic validation
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.first_name) errors.first_name = "First name is required";
    if (!formData.last_name) errors.last_name = "Last name is required";
    if (!formData.phone) errors.phone = "Phone is required";

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Password strength
    if (formData.password && formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    // Password match
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    // Phone format
    const phoneRegex = /^(\+63|0)\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.phone = "Invalid phone format (use +63XXXXXXXXXX or 09XXXXXXXXX)";
    }

    // Role-specific validation
    if (formData.role === "developer" && !formData.company_name) {
      errors.company_name = "Company name is required for developers";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field: keyof SignUpFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData(prev => ({
      ...prev,
      role,
      // Clear role-specific fields when changing roles
      company_name: "",
      license_number: "",
      team_name: "",
      cpd_certificate: "",
      broker_id: "",
    }));
    
    // Update URL parameter
    const newParams = new URLSearchParams(searchParams);
    newParams.set('role', role);
    navigate(`/signup?${newParams.toString()}`, { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      // Prepare role-specific data
      const baseData = {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        role: formData.role,
      };

      let userData: any = baseData;

      // Add role-specific fields
      switch (formData.role) {
        case "developer":
          userData = {
            ...baseData,
            company_name: formData.company_name!,
            license_to_sell: formData.license_number,
            certificate_of_registration: "", // Can be added later
          };
          break;
        case "broker":
          userData = {
            ...baseData,
            license_number: formData.license_number,
            team_name: formData.team_name,
          };
          break;
        case "agent":
          userData = {
            ...baseData,
            cpd_certificate: formData.cpd_certificate,
            broker_id: formData.broker_id,
          };
          break;
      }

      const success = await signup(userData, formData.role);
      
      if (success) {
        setSuccess(true);
        setTimeout(() => {
          const signInPath = formData.role === "client" ? "/signin" : `/signin/${formData.role}`;
          navigate(signInPath, { 
            state: { 
              message: `Registration successful! ${
                formData.role !== "client" ? "Account may require verification." : ""
              }`,
              email: formData.email 
            }
          });
        }, 2000);
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto p-8 h-screen flex flex-col items-center justify-center">
        <div className="w-lg mx-auto bg-white rounded-2xl shadow-large shadow-gray-300 p-8 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconFileCheck className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your {formData.role} account has been created successfully.
            </p>
            {formData.role !== "client" && (
              <Chip color="warning" variant="flat">
                Note: Professional accounts may require verification
              </Chip>
            )}
          </div>
        </div>
      </div>
    );
  }

  const selectedRole = roleOptions.find(r => r.key === formData.role);

  return (
    <div className="container mx-auto p-8 min-h-screen flex flex-col items-center justify-center relative">
      {/* Background blur blobs */}
      <div className="absolute top-46 -left-10 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-20 right-20 w-60 h-60 bg-primary-300 rounded-full blur-2xl opacity-20" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-red-300 rounded-full blur-[100px] opacity-20" />

      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-large shadow-gray-300 p-8 flex flex-col items-center justify-center z-10">
        <h1 className="text-foreground-700 text-4xl mt-4 font-bold">
          Create Account
        </h1>
        <p className="text-foreground-700 mt-3 text-center">
          Join thousands of property professionals
        </p>

        {error && (
          <div className="w-full mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col w-full mt-6">
          {/* Role Selection */}
          <Select
            label="Account Type"
            placeholder="Select your role"
            selectedKeys={[formData.role]}
            onSelectionChange={(keys) => handleRoleChange(Array.from(keys)[0] as UserRole)}
            className="mb-4"
            description={selectedRole?.description}
          >
            {roleOptions.map((role) => (
              <SelectItem key={role.key}>
                {role.label}
              </SelectItem>
            ))}
          </Select>

          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="First name"
                startContent={<IconUserFilled />}
                value={formData.first_name}
                onChange={(e) => handleChange("first_name", e.target.value)}
                errorMessage={validationErrors.first_name}
                isInvalid={!!validationErrors.first_name}
                isRequired
              />
              <Input
                label="Last Name"
                placeholder="Last name"
                startContent={<IconUserFilled />}
                value={formData.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
                errorMessage={validationErrors.last_name}
                isInvalid={!!validationErrors.last_name}
                isRequired
              />
            </div>

            <Input
              label="Email"
              placeholder="Email address"
              type="email"
              startContent={<IconMailFilled />}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              errorMessage={validationErrors.email}
              isInvalid={!!validationErrors.email}
              isRequired
            />

            <Input
              label="Phone"
              placeholder="+63XXXXXXXXXX or 09XXXXXXXXX"
              startContent={<IconPhoneFilled />}
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              errorMessage={validationErrors.phone}
              isInvalid={!!validationErrors.phone}
              isRequired
            />

            {/* Role-Specific Fields */}
            {formData.role === "developer" && (
              <Input
                label="Company Name"
                placeholder="Your company name"
                startContent={<IconBuilding />}
                value={formData.company_name || ""}
                onChange={(e) => handleChange("company_name", e.target.value)}
                errorMessage={validationErrors.company_name}
                isInvalid={!!validationErrors.company_name}
                isRequired
              />
            )}

            {(formData.role === "broker" || formData.role === "developer") && (
              <Input
                label="License Number (Optional)"
                placeholder="Professional license number"
                startContent={<IconIdBadge2 />}
                value={formData.license_number || ""}
                onChange={(e) => handleChange("license_number", e.target.value)}
                description="Helps with faster verification"
              />
            )}

            {formData.role === "broker" && (
              <Input
                label="Team Name (Optional)"
                placeholder="Your team name"
                startContent={<IconBuilding />}
                value={formData.team_name || ""}
                onChange={(e) => handleChange("team_name", e.target.value)}
                description="Name for your agent team"
              />
            )}

            {formData.role === "agent" && (
              <>
                <Input
                  label="CPD Certificate (Optional)"
                  placeholder="Certificate number"
                  startContent={<IconIdBadge2 />}
                  value={formData.cpd_certificate || ""}
                  onChange={(e) => handleChange("cpd_certificate", e.target.value)}
                  description="Continuing Professional Development"
                />
                <Input
                  label="Broker ID (Optional)"
                  placeholder="Will be assigned by broker"
                  startContent={<IconIdBadge2 />}
                  value={formData.broker_id || ""}
                  onChange={(e) => handleChange("broker_id", e.target.value)}
                  description="Leave empty if no broker yet"
                />
              </>
            )}

            {/* Password Fields */}
            <Divider className="my-2" />
            
            <Input
              label="Password"
              placeholder="Minimum 8 characters"
              type="password"
              startContent={<IconLockFilled />}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              errorMessage={validationErrors.password}
              isInvalid={!!validationErrors.password}
              isRequired
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm password"
              type="password"
              startContent={<IconLockFilled />}
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              errorMessage={validationErrors.confirmPassword}
              isInvalid={!!validationErrors.confirmPassword}
              isRequired
            />
          </div>

          <Button 
            className="mt-6 w-full" 
            color="primary" 
            type="submit"
            isLoading={loading}
            disabled={loading}
          >
            {loading ? "Creating Account..." : `Create ${selectedRole?.label} Account`}
          </Button>
        </form>

        <Divider className="mt-6" />

        <div className="flex items-center justify-center w-full mt-4">
          <span className="text-foreground-700">Already have an account?</span>
          <Link
            className="ml-3 cursor-pointer"
            href="/signin"
            underline="hover"
          >
            Sign In
          </Link>
        </div>

        {/* Professional Account Notes */}
        {formData.role !== "client" && (
          <div className="mt-4 text-center">
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Professional accounts may require verification</p>
              <p>• License information helps with faster approval</p>
              {formData.role === "agent" && <p>• Broker assignment may be required</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};