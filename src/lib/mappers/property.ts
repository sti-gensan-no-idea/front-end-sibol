import type { PropertyResponse } from '@/lib/api/generated/model';

export interface PropertyCard {
  id: string;
  title: string;
  address: string;
  image: string;
  details: string;
  price: string;
  status: string;
  projectName?: string;
  propertyType?: string;
  description?: string;
}

export function mapPropertyToCard(property: PropertyResponse): PropertyCard {
  // Create title from project name or property type
  const title = property.project_name || property.property_type || 'Property';
  
  // Format price
  const price = property.price ? `₱${Number(property.price).toLocaleString()}` : 'Price on request';
  
  // Create details string from available info
  const details = [
    property.property_type,
    // Add more property details when available from the API
  ].filter(Boolean).join(' • ');
  
  // Use location or placeholder address
  const address = property.location || 'Location not specified';
  
  // Map status
  const status = property.status === 'available' ? 'Available' : 'Sold';
  
  // Use description or generate from project name
  const description = property.description || `Beautiful ${property.property_type?.toLowerCase()} in ${property.project_name}`;
  
  // For now, use placeholder images until property images are available in API
  const image = `https://picsum.photos/seed/property-${property.id}/400/300`;
  
  return {
    id: property.id,
    title,
    address,
    image,
    details: details || 'Details not available',
    price,
    status,
    projectName: property.project_name,
    propertyType: property.property_type,
    description,
  };
}
