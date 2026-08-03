'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PropertyForm } from '@/components/dashboard/landlord/property-form'
import { PropertyFormData } from '@/schemas/property'

export default function CreatePropertyPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: PropertyFormData) => {
    setIsLoading(true)
    try {
      // Mock API call - replace with actual API integration
      console.log('[v0] Property data submitted:', data)
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Show success and redirect
      console.log('[v0] Property created successfully')
      router.push('/dashboard/landlord/properties')
    } catch (error) {
      console.error('[v0] Error creating property:', error)
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
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  )
}
