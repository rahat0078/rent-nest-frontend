'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { X, Loader2 } from 'lucide-react'
import { propertyFormSchema, type PropertyFormData } from '@/schemas/property'

interface PropertyFormProps {
  mode: 'create' | 'edit'
  initialData?: Partial<PropertyFormData>
  onSubmit: (data: PropertyFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const CATEGORIES = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'studio', label: 'Studio' },
  { value: 'villa', label: 'Villa' },
  { value: 'family-house', label: 'Family House' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'office-space', label: 'Office Space' },
]

export function PropertyForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: PropertyFormProps) {
  const [facilities, setFacilities] = useState<string[]>(initialData?.facilities || [])
  const [facilityInput, setFacilityInput] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || '',
      title: initialData?.title || '',
      description: initialData?.description || '',
      location: initialData?.location || '',
      bedrooms: initialData?.bedrooms || 1,
      bathrooms: initialData?.bathrooms || 1,
      rentAmount: initialData?.rentAmount || 1000,
      sizeSqFt: initialData?.sizeSqFt || 1000,
      facilities: initialData?.facilities || [],
      images: initialData?.images || '',
      isAvailable: initialData?.isAvailable ?? true,
    },
  })

  const handleAddFacility = () => {
    const trimmed = facilityInput.trim()
    if (trimmed && !facilities.includes(trimmed)) {
      const newFacilities = [...facilities, trimmed]
      setFacilities(newFacilities)
      setValue('facilities', newFacilities, { shouldValidate: true })
      setFacilityInput('')
    }
  }

  const handleRemoveFacility = (facilityToRemove: string) => {
    const newFacilities = facilities.filter((f) => f !== facilityToRemove)
    setFacilities(newFacilities)
    setValue('facilities', newFacilities, { shouldValidate: true })
  }

  const handleFormSubmit = async (data: PropertyFormData) => {
    await onSubmit(data)
  }

  const isProcessing = isSubmitting || isLoading

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          {mode === 'create' ? 'Create New Property' : 'Edit Property'}
        </h1>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register('categoryId')}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-500 mt-1">{errors.categoryId.message}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Property Title <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('title')}
              placeholder="e.g., Cozy 2-Bedroom Apartment"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              {...register('description')}
              placeholder="Provide a detailed description of your property..."
              rows={5}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('location')}
              placeholder="e.g., Downtown, San Francisco, CA"
              className={errors.location ? 'border-red-500' : ''}
            />
            {errors.location && (
              <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
            )}
          </div>

          {/* Bedrooms and Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Bedrooms <span className="text-red-500">*</span>
              </label>
              <Input
                {...register('bedrooms', { valueAsNumber: true })}
                type="number"
                min="1"
                max="10"
                className={errors.bedrooms ? 'border-red-500' : ''}
              />
              {errors.bedrooms && (
                <p className="text-sm text-red-500 mt-1">{errors.bedrooms.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Bathrooms <span className="text-red-500">*</span>
              </label>
              <Input
                {...register('bathrooms', { valueAsNumber: true })}
                type="number"
                min="1"
                max="10"
                className={errors.bathrooms ? 'border-red-500' : ''}
              />
              {errors.bathrooms && (
                <p className="text-sm text-red-500 mt-1">{errors.bathrooms.message}</p>
              )}
            </div>
          </div>

          {/* Rent and Size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Monthly Rent ($) <span className="text-red-500">*</span>
              </label>
              <Input
                {...register('rentAmount', { valueAsNumber: true })}
                type="number"
                min="1"
                className={errors.rentAmount ? 'border-red-500' : ''}
              />
              {errors.rentAmount && (
                <p className="text-sm text-red-500 mt-1">{errors.rentAmount.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Size (sq ft) <span className="text-red-500">*</span>
              </label>
              <Input
                {...register('sizeSqFt', { valueAsNumber: true })}
                type="number"
                min="1"
                className={errors.sizeSqFt ? 'border-red-500' : ''}
              />
              {errors.sizeSqFt && (
                <p className="text-sm text-red-500 mt-1">{errors.sizeSqFt.message}</p>
              )}
            </div>
          </div>

          {/* Facilities */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Facilities <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-3">
              <Input
                value={facilityInput}
                onChange={(e) => setFacilityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddFacility()
                  }
                }}
                placeholder="Add a facility (e.g., WiFi, Gym, Pool)"
              />
              <Button
                type="button"
                onClick={handleAddFacility}
                variant="outline"
                size="sm"
              >
                Add
              </Button>
            </div>
            {errors.facilities && (
              <p className="text-sm text-red-500 mb-2">{errors.facilities.message}</p>
            )}
            {facilities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {facilities.map((facility) => (
                  <Badge
                    key={facility}
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    {facility}
                    <button
                      type="button"
                      onClick={() => handleRemoveFacility(facility)}
                      className="ml-1 hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Image URL <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('images')}
              placeholder="https://example.com/image.jpg"
              className={errors.images ? 'border-red-500' : ''}
            />
            {errors.images && (
              <p className="text-sm text-red-500 mt-1">{errors.images.message}</p>
            )}
          </div>

          {/* Availability Toggle (Edit Mode Only) */}
          {mode === 'edit' && (
            <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
              <input
                type="checkbox"
                {...register('isAvailable')}
                id="isAvailable"
                className="w-4 h-4 rounded"
              />
              <label htmlFor="isAvailable" className="text-sm font-medium cursor-pointer">
                Property is available for rent
              </label>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {mode === 'create' ? 'Creating...' : 'Saving...'}
                </>
              ) : (
                mode === 'create' ? 'Create Property' : 'Save Changes'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}