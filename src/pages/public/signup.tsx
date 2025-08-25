import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Button } from "@heroui/react";
import { IconUsers, IconBuilding, IconUserCheck, IconTool } from "@tabler/icons-react";

import { NavBar } from "@/widget/navbar";

export const SignUpPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Choose Your Role | Atuna";
  }, []);

  const roles = [
    {
      key: "client",
      title: "Client",
      description: "Looking to buy or rent properties",
      icon: IconUsers,
      color: "bg-blue-500",
      benefits: [
        "Browse exclusive properties",
        "Schedule property viewings", 
        "Save favorite properties",
        "Get personalized recommendations"
      ]
    },
    {
      key: "developer", 
      title: "Developer",
      description: "Property developers and builders",
      icon: IconBuilding,
      color: "bg-green-500",
      benefits: [
        "List and manage properties",
        "Upload bulk property data",
        "Track sales and analytics",
        "Manage property assignments"
      ]
    },
    {
      key: "agent",
      title: "Agent", 
      description: "Real estate sales agents",
      icon: IconUserCheck,
      color: "bg-purple-500",
      benefits: [
        "Manage client relationships",
        "Track leads and pipeline",
        "Schedule property showings",
        "Earn commissions"
      ]
    },
    {
      key: "broker",
      title: "Broker",
      description: "Licensed real estate brokers",
      icon: IconTool,
      color: "bg-orange-500", 
      benefits: [
        "Manage agent teams",
        "Oversee transactions",
        "Advanced analytics",
        "Team performance tracking"
      ]
    }
  ];

  return (
    <main>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Join Atuna Today
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your role to get started with the right tools and features for your real estate needs
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card 
                  key={role.key}
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  isPressable
                  onPress={() => navigate(`/signup/${role.key}`)}
                >
                  <CardBody className="p-6 text-center">
                    <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{role.description}</p>
                    
                    <ul className="text-xs text-gray-500 space-y-1 mb-6">
                      {role.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-green-500 mt-1">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <Button
                      color="primary"
                      variant="flat"
                      size="sm"
                      className="w-full"
                    >
                      Sign up as {role.title}
                    </Button>
                  </CardBody>
                </Card>
              );
            })}
          </div>

          {/* Bottom Text */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="text-primary hover:underline font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
