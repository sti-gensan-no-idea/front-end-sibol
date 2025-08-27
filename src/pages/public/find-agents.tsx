import { useState } from "react";
import { Input, Button, Chip } from "@heroui/react";
import { NavBar } from "@/widget/navbar";
import { IconSearch } from "@tabler/icons-react";
import agent1 from "@/assets/images/agent1.png";
import agent2 from "@/assets/images/agent2.png";
import agent3 from "@/assets/images/agent3.png";
import agent4 from "@/assets/images/agent4.png";
import { AgentsTabAgentsCard } from "@/widget/agents-tab-agents-card";

export const FindAgents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const sampleData = [
    {
      name: "Sarah Miller",
      number: "(+63) 902 339 6053",
      img: agent1,
      email: "sarah.miller@atuna.com",
      location: "Makati City",
      rating: 4.8,
      specialties: ["Luxury Homes", "Condominiums"],
      id: "sarah-miller",
    },
    {
      name: "David Chen",
      number: "(+63) 902 339 6054",
      img: agent2,
      email: "david.chen@atuna.com",
      location: "BGC, Taguig",
      rating: 4.7,
      specialties: ["Commercial", "Investment"],
      id: "david-chen",
    },
    {
      name: "Emily Rodriguez",
      number: "(+63) 902 339 6055",
      img: agent3,
      email: "emily.rodriguez@atuna.com", 
      location: "Ortigas Center",
      rating: 4.9,
      specialties: ["Residential", "First-Time Buyers"],
      id: "emily-rodriguez",
    },
    {
      name: "Michael Johnson",
      number: "(+63) 902 339 6056",
      img: agent4,
      email: "michael.johnson@atuna.com",
      location: "Alabang",
      rating: 4.6,
      specialties: ["Townhouses", "Subdivision"],
      id: "michael-johnson",
    },
    {
      name: "Sarah Miller",
      number: "(+63) 902 339 6057",
      img: agent1,
      email: "sarah.miller2@atuna.com",
      location: "Quezon City",
      rating: 4.5,
      specialties: ["Affordable Housing", "Rent-to-Own"],
      id: "sarah-miller-2",
    },
    {
      name: "David Chen",
      number: "(+63) 902 339 6058",
      img: agent2,
      email: "david.chen2@atuna.com",
      location: "Mandaluyong",
      rating: 4.8,
      specialties: ["High-Rise", "Penthouse"],
      id: "david-chen-2",
    },
    {
      name: "Emily Rodriguez",
      number: "(+63) 902 339 6059",
      img: agent3,
      email: "emily.rodriguez2@atuna.com",
      location: "Pasig City", 
      rating: 4.7,
      specialties: ["Family Homes", "Schools Nearby"],
      id: "emily-rodriguez-2",
    },
    {
      name: "Michael Johnson",
      number: "(+63) 902 339 6060",
      img: agent4,
      email: "michael.johnson2@atuna.com",
      location: "Parañaque",
      rating: 4.9,
      specialties: ["Beachfront", "Resort Living"],
      id: "michael-johnson-2",
    },
  ];

  // Filter agents based on search and filters
  const filteredAgents = sampleData.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !selectedLocation || agent.location === selectedLocation;
    const matchesSpecialty = !selectedSpecialty || agent.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  const uniqueLocations = [...new Set(sampleData.map(agent => agent.location))];
  const uniqueSpecialties = [...new Set(sampleData.flatMap(agent => agent.specialties))];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the filter logic above
    console.log("Searching for:", searchTerm);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <NavBar />
      <div className="max-w-7xl mx-auto w-full py-8 px-5 lg:px-0 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Find Real Estate Agents</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with professional real estate agents in Metro Manila. 
            Schedule consultations, property viewings, and get expert market insights.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-medium p-6 space-y-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <Input
              startContent={<IconSearch className="w-5 h-5 text-gray-400" />}
              placeholder="Search agents by name, location, or specialty..."
              className="flex-1"
              variant="bordered"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              type="submit"
              color="primary"
              startContent={<IconSearch size={18} />}
            >
              Search
            </Button>
          </form>

          {/* Quick Filters */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">Filter by Location:</h3>
              <div className="flex flex-wrap gap-2">
                <Chip
                  variant={selectedLocation === "" ? "solid" : "bordered"}
                  color="primary"
                  className="cursor-pointer"
                  onClick={() => setSelectedLocation("")}
                >
                  All Locations
                </Chip>
                {uniqueLocations.map((location) => (
                  <Chip
                    key={location}
                    variant={selectedLocation === location ? "solid" : "bordered"}
                    color="primary"
                    className="cursor-pointer"
                    onClick={() => setSelectedLocation(location === selectedLocation ? "" : location)}
                  >
                    {location}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">Filter by Specialty:</h3>
              <div className="flex flex-wrap gap-2">
                <Chip
                  variant={selectedSpecialty === "" ? "solid" : "bordered"}
                  color="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedSpecialty("")}
                >
                  All Specialties
                </Chip>
                {uniqueSpecialties.map((specialty) => (
                  <Chip
                    key={specialty}
                    variant={selectedSpecialty === specialty ? "solid" : "bordered"}
                    color="secondary"
                    className="cursor-pointer"
                    onClick={() => setSelectedSpecialty(specialty === selectedSpecialty ? "" : specialty)}
                  >
                    {specialty}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <div className="text-gray-600">
            Showing <span className="font-semibold">{filteredAgents.length}</span> agents
            {(searchTerm || selectedLocation || selectedSpecialty) && " matching your criteria"}
          </div>
          <div className="text-sm text-gray-500">
            Click on any agent card to view their profile or schedule a meeting
          </div>
        </div>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAgents.map((agent, index) => (
              <AgentsTabAgentsCard
                key={`${agent.id}-${index}`}
                name={agent.name}
                number={agent.number}
                img={agent.img}
                email={agent.email}
                location={agent.location}
                rating={agent.rating}
                specialties={agent.specialties}
                id={agent.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <IconSearch className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No agents found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or clearing the filters.
            </p>
            <Button
              color="primary"
              variant="flat"
              onClick={() => {
                setSearchTerm("");
                setSelectedLocation("");
                setSelectedSpecialty("");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't find the right agent?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Let us help you connect with the perfect real estate agent for your needs. 
            We'll match you with specialists in your preferred area and property type.
          </p>
          <Button
            color="primary"
            size="lg"
            onClick={() => window.open('mailto:support@atuna.com?subject=Agent Matching Request', '_blank')}
          >
            Request Agent Matching
          </Button>
        </div>
      </div>
    </main>
  );
};
