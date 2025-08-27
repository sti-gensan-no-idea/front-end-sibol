export interface Property {
  id: string;
  title: string;
  address: string;
  image: string;
  panoramaImage: string; // For 360 view
  details: string;
  price: string;
  status: 'Available' | 'Sold';
  amenities?: string[];
  description?: string;
  agent?: {
    name: string;
    phone: string;
    email: string;
  };
}

export const properties: Property[] = [
  {
    id: "prop-001",
    title: "Lakeside Villa",
    address: "Zone 5-B Provido Village, City Heights, General Santos City, South Cotabato, Philippines",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    panoramaImage: "/src/assets/images/panorama_living_room.jpg",
    details: "2 beds • 3 bath • 2,400 sqm.",
    price: "₱850,000",
    status: "Available",
    amenities: ["Swimming Pool", "Garden", "Garage", "Security"],
    description: "Beautiful lakeside villa with stunning water views and modern amenities.",
    agent: { name: "Sarah Miller", phone: "(+63) 9023396053", email: "sarah.miller@atuna.com" }
  },
  {
    id: "prop-002", 
    title: "Modern Loft",
    address: "Pioneer Avenue, General Santos City, South Cotabato, Philippines",
    image: "https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg",
    panoramaImage: "/src/assets/images/panorama_bed_room.jpg",
    details: "1 bed • 1 bath • 80 sqm.",
    price: "₱2,500,000",
    status: "Available",
    amenities: ["City View", "Modern Design", "Parking", "Balcony"],
    description: "Contemporary loft in the heart of the city with modern fixtures.",
    agent: { name: "David Chen", phone: "(+63) 902 339 6053", email: "david.chen@atuna.com" }
  },
  {
    id: "prop-003",
    title: "Cozy Bungalow", 
    address: "Lagao Road, General Santos City, South Cotabato, Philippines",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    panoramaImage: "/src/assets/images/panorama_kitchen.jpg",
    details: "2 beds • 2 bath • 120 sqm.",
    price: "₱1,200,000",
    status: "Sold",
    amenities: ["Garden", "Covered Parking", "Security Gate"],
    description: "Charming bungalow perfect for small families.",
    agent: { name: "Emily Rodriguez", phone: "(+63) 902 339 6053", email: "emily.rodriguez@atuna.com" }
  },
  {
    id: "prop-004",
    title: "Penthouse Suite",
    address: "Jose Catolico Avenue, General Santos City, South Cotabato, Philippines",
    image: "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg",
    panoramaImage: "/src/assets/images/panorama_1.jpg",
    details: "3 beds • 4 bath • 300 sqm.",
    price: "₱15,000,000",
    status: "Available",
    amenities: ["Rooftop Terrace", "City Views", "Premium Finishes", "2 Parking Spaces"],
    description: "Luxury penthouse with panoramic city views and premium amenities.",
    agent: { name: "Michael Johnson", phone: "(+63) 902 339 6053", email: "michael.johnson@atuna.com" }
  },
  {
    id: "prop-005",
    title: "Suburban House",
    address: "San Isidro, General Santos City, South Cotabato, Philippines",
    image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    panoramaImage: "/src/assets/images/panorama_living_room.jpg",
    details: "4 beds • 3 bath • 500 sqm.",
    price: "₱5,600,000",
    status: "Available",
    amenities: ["Large Garden", "2-Car Garage", "Family Room", "Security"],
    description: "Spacious suburban house perfect for growing families.",
    agent: { name: "Sarah Miller", phone: "(+63) 9023396053", email: "sarah.miller@atuna.com" }
  },
  {
    id: "prop-006",
    title: "Beachfront Cottage",
    address: "Gumasa Beach, Glan, Sarangani Province, Philippines",
    image: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg",
    panoramaImage: "/src/assets/images/panorama_bed_room.jpg",
    details: "2 beds • 2 bath • 200 sqm.",
    price: "₱3,400,000",
    status: "Available",
    amenities: ["Beach Access", "Ocean View", "Deck", "BBQ Area"],
    description: "Charming beachfront cottage with direct access to pristine beach.",
    agent: { name: "David Chen", phone: "(+63) 902 339 6053", email: "david.chen@atuna.com" }
  },
  {
    id: "prop-007",
    title: "Luxury Mansion",
    address: "Lagao Heights, General Santos City, South Cotabato, Philippines",
    image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
    panoramaImage: "/src/assets/images/panorama_kitchen.jpg",
    details: "6 beds • 8 bath • 1,200 sqm.",
    price: "₱45,000,000",
    status: "Available",
    amenities: ["Swimming Pool", "Home Theater", "Wine Cellar", "3-Car Garage", "Maid's Quarters"],
    description: "Opulent luxury mansion with world-class amenities and finishes.",
    agent: { name: "Emily Rodriguez", phone: "(+63) 902 339 6053", email: "emily.rodriguez@atuna.com" }
  },
  {
    id: "prop-008",
    title: "Countryside Farmhouse",
    address: "Polomolok, South Cotabato, Philippines",
    image: "https://images.pexels.com/photos/259597/pexels-photo-259597.jpeg",
    panoramaImage: "/src/assets/images/panorama_1.jpg",
    details: "3 beds • 2 bath • 2,000 sqm.",
    price: "₱7,800,000",
    status: "Sold",
    amenities: ["Large Lot", "Fruit Trees", "Barn", "Well Water"],
    description: "Rustic farmhouse with extensive land perfect for agricultural use.",
    agent: { name: "Michael Johnson", phone: "(+63) 902 339 6053", email: "michael.johnson@atuna.com" }
  }
];

// Add more properties with cycling through the available panorama images
const additionalProperties: Property[] = [
  {
    id: "prop-009",
    title: "Minimalist Studio",
    address: "City Heights, General Santos City, South Cotabato, Philippines",
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    panoramaImage: "/src/assets/images/panorama_living_room.jpg",
    details: "1 bed • 1 bath • 40 sqm.",
    price: "₱950,000",
    status: "Available",
    amenities: ["Modern Design", "Balcony", "Security"],
    description: "Compact and efficient studio perfect for young professionals.",
    agent: { name: "Sarah Miller", phone: "(+63) 9023396053", email: "sarah.miller@atuna.com" }
  },
  {
    id: "prop-010",
    title: "Mountain View Cabin",
    address: "Malungon, Sarangani Province, Philippines",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    panoramaImage: "/src/assets/images/panorama_bed_room.jpg",
    details: "2 beds • 1 bath • 150 sqm.",
    price: "₱2,300,000",
    status: "Available",
    amenities: ["Mountain Views", "Fireplace", "Deck", "Nature Trail"],
    description: "Peaceful mountain retreat with breathtaking views.",
    agent: { name: "David Chen", phone: "(+63) 902 339 6053", email: "david.chen@atuna.com" }
  }
];

// Generate more properties programmatically
for (let i = 11; i <= 50; i++) {
  const panoramaImages = [
    "/src/assets/images/panorama_living_room.jpg",
    "/src/assets/images/panorama_bed_room.jpg", 
    "/src/assets/images/panorama_kitchen.jpg",
    "/src/assets/images/panorama_1.jpg"
  ];
  
  const agents = [
    { name: "Sarah Miller", phone: "(+63) 9023396053", email: "sarah.miller@atuna.com" },
    { name: "David Chen", phone: "(+63) 902 339 6053", email: "david.chen@atuna.com" },
    { name: "Emily Rodriguez", phone: "(+63) 902 339 6053", email: "emily.rodriguez@atuna.com" },
    { name: "Michael Johnson", phone: "(+63) 902 339 6053", email: "michael.johnson@atuna.com" }
  ];

  const propertyTypes = [
    { title: "Modern Apartment", details: "2 beds • 1 bath • 85 sqm.", amenities: ["Balcony", "Parking", "Security"] },
    { title: "Family House", details: "3 beds • 2 bath • 200 sqm.", amenities: ["Garden", "Garage", "Security Gate"] },
    { title: "Luxury Condo", details: "1 bed • 2 bath • 95 sqm.", amenities: ["Gym", "Pool", "Concierge"] },
    { title: "Suburban Villa", details: "4 beds • 3 bath • 350 sqm.", amenities: ["Pool", "Garden", "2-Car Garage"] }
  ];

  const type = propertyTypes[(i - 11) % propertyTypes.length];
  const agent = agents[(i - 11) % agents.length];
  const panorama = panoramaImages[(i - 11) % panoramaImages.length];
  
  additionalProperties.push({
    id: `prop-${String(i).padStart(3, '0')}`,
    title: `${type.title} ${i}`,
    address: `Property Address ${i}, General Santos City, Philippines`,
    image: `https://picsum.photos/seed/property${i}/400/300`,
    panoramaImage: panorama,
    details: type.details,
    price: `₱${(Math.random() * 10000000 + 500000).toLocaleString('en-PH').replace(/,/g, ',')}`,
    status: Math.random() > 0.8 ? "Sold" : "Available",
    amenities: type.amenities,
    description: `Beautiful ${type.title.toLowerCase()} with modern amenities and great location.`,
    agent: agent
  });
}

properties.push(...additionalProperties);
