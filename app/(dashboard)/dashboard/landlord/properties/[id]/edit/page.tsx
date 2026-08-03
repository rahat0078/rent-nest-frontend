'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PropertyForm } from '@/components/dashboard/landlord/property-form'
import { PropertyFormData } from '@/schemas/property'

// Mock data - replace with actual API call
const MOCK_PROPERTY = {
  categoryId: '23490234hewrfop9034210-ewjw239',
  title: 'Modern 2-Bedroom Apartment in Downtown',
  description: 'Beautiful apartment located in the heart of downtown with stunning city views. Features modern appliances, hardwood floors, and a spacious balcony.',
  location: 'Downtown, San Francisco, CA',
  bedrooms: 2,
  bathrooms: 1,
  rent: 2500,
  size: 950,
  facilities: ['WiFi', 'Gym', 'Parking', 'Pet-Friendly'],
  imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop',
  availability: true,
}

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: PropertyFormData) => {
    setIsLoading(true)
    try {
      // Mock API call - replace with actual API integration
      console.log('[v0] Property update submitted:', data)
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Show success and redirect
      console.log('[v0] Property updated successfully')
      router.push('/dashboard/landlord/properties')
    } catch (error) {
      console.error('[v0] Error updating property:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/dashboard/landlord/properties')
  }

  return (
    <div className="py-8">
      <PropertyForm
        mode="edit"
        initialData={MOCK_PROPERTY}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  )
}
