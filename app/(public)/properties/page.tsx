


import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PropertySearch } from '@/components/property/propertySearch'
import { PropertyFilters } from '@/components/property/propertyFIlters'
import { PropertyGrid } from '@/components/property/propertyGrid'

// Placeholder data matching the backend response shape
const PROPERTIES = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    location: '123 Main St, New York, NY',
    rentAmount: 2500,
    bedrooms: 2,
    bathrooms: 1,
    sizeSqFt: 850,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502088113235-c3a393e8353d?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&h=400&fit=crop',
    ],
    isAvailable: true,
    facilities: ['WiFi', 'Parking', '24/7 Security', 'Gym'],
    category: 'Apartment',
    landlord: { name: 'John Smith', profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  },
  {
    id: '2',
    title: 'Cozy Studio in Brooklyn',
    location: '456 Park Ave, Brooklyn, NY',
    rentAmount: 1800,
    bedrooms: 0,
    bathrooms: 1,
    sizeSqFt: 450,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502088113235-c3a393e8353d?w=500&h=400&fit=crop',
    ],
    isAvailable: true,
    facilities: ['WiFi', 'Air Conditioning'],
    category: 'Studio',
    landlord: { name: 'Sarah Johnson', profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  },
  {
    id: '3',
    title: 'Luxury Villa with Pool',
    location: '789 Ocean Dr, Miami, FL',
    rentAmount: 5500,
    bedrooms: 4,
    bathrooms: 3,
    sizeSqFt: 3200,
    images: [
      'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c52f1d?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&h=400&fit=crop',
    ],
    isAvailable: false,
    facilities: ['WiFi', 'Pool', 'Gym', 'Parking', 'CCTV', '24/7 Security'],
    category: 'Villa',
    landlord: { name: 'Michael Brown', profilePhoto: 'https://images.unsplash.com/photo-1507009073585-e637e8944c0e?w=100&h=100&fit=crop' },
  },
  {
    id: '4',
    title: 'Family Home in Suburbs',
    location: '321 Elm St, Austin, TX',
    rentAmount: 3200,
    bedrooms: 3,
    bathrooms: 2,
    sizeSqFt: 1500,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=400&fit=crop',
    ],
    isAvailable: true,
    facilities: ['WiFi', 'Parking', 'Backyard', 'Garage'],
    category: 'Family House',
    landlord: { name: 'Emily Davis', profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  },
  {
    id: '5',
    title: 'Duplex in Downtown',
    location: '555 Market St, San Francisco, CA',
    rentAmount: 4000,
    bedrooms: 2,
    bathrooms: 2,
    sizeSqFt: 1200,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop',
    ],
    isAvailable: true,
    facilities: ['WiFi', 'Parking', 'Rooftop'],
    category: 'Duplex',
    landlord: { name: 'David Wilson', profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  },
  {
    id: '6',
    title: 'Professional Office Space',
    location: '999 Business Ave, Seattle, WA',
    rentAmount: 6000,
    bedrooms: 0,
    bathrooms: 2,
    sizeSqFt: 2500,
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1534165515845-c489bf4917f0?w=500&h=400&fit=crop',
    ],
    isAvailable: true,
    facilities: ['WiFi', 'Meeting Room', 'Parking', 'Reception'],
    category: 'Office',
    landlord: { name: 'Lisa Martinez', profilePhoto: 'https://images.unsplash.com/photo-1517849845537-1d51a20414de?w=100&h=100&fit=crop' },
  },
  {
    id: '7',
    title: 'Charming Apartment Near Park',
    location: '234 Maple Ave, Boston, MA',
    rentAmount: 2100,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqFt: 650,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop',
    ],
    isAvailable: true,
    facilities: ['WiFi', 'Air Conditioning', 'Laundry'],
    category: 'Apartment',
    landlord: { name: 'Robert Taylor', profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  },
  {
    id: '8',
    title: 'Spacious Villa with Garden',
    location: '888 Palm Blvd, Los Angeles, CA',
    rentAmount: 4800,
    bedrooms: 3,
    bathrooms: 2,
    sizeSqFt: 2000,
    images: [
      'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c52f1d?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502088113235-c3a393e8353d?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
    ],
    isAvailable: true,
    facilities: ['WiFi', 'Pool', 'Garden', 'Parking', 'CCTV'],
    category: 'Villa',
    landlord: { name: 'Jennifer Anderson', profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  },
  {
    id: '9',
    title: 'Modern Studio with Balcony',
    location: '101 Sunset Ave, Denver, CO',
    rentAmount: 1950,
    bedrooms: 0,
    bathrooms: 1,
    sizeSqFt: 500,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502088113235-c3a393e8353d?w=500&h=400&fit=crop',
    ],
    isAvailable: true,
    facilities: ['WiFi', 'Air Conditioning', 'Balcony'],
    category: 'Studio',
    landlord: { name: 'Christopher Lee', profilePhoto: 'https://images.unsplash.com/photo-1507009073585-e637e8944c0e?w=100&h=100&fit=crop' },
  },
]

export default function PropertiesPage() {
  // const router = useRouter()

  // const handleViewDetails = (id: string) => {
  //   router.push(`/properties/${id}`)
  // }

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Find Your Perfect Property</h1>
          <p className="text-lg text-muted-foreground">Browse our collection of premium rental properties</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <PropertySearch />
        </div>

        {/* Filters and Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <PropertyFilters />
          </aside>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            <PropertyGrid properties={PROPERTIES} 
            // onViewDetails={handleViewDetails} 
            />
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <Button variant="outline" size="icon" className="w-10 h-10">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex gap-1">
            <Button variant="default" size="sm" className="w-10 h-10 p-0">
              1
            </Button>
            <Button variant="outline" size="sm" className="w-10 h-10 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="w-10 h-10 p-0">
              3
            </Button>
            <Button variant="outline" size="sm" className="w-10 h-10 p-0">
              4
            </Button>
            <Button variant="outline" size="sm" className="w-10 h-10 p-0">
              5
            </Button>
          </div>
          
          <Button variant="outline" size="icon" className="w-10 h-10">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </main>
  )
}
