'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { MapPin, Check } from 'lucide-react'
import { ReviewForm } from './reveiw-form'

interface ReviewCardProps {
  id: string
  propertyImage: string
  propertyTitle: string
  propertyLocation: string
  completedDate: string
}

export function ReviewCard({
  id,
  propertyImage,
  propertyTitle,
  propertyLocation,
  completedDate,
}: ReviewCardProps) {
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false)

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
      {/* Property Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image
        unoptimized
          src={propertyImage}
          alt={propertyTitle}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-lg truncate">{propertyTitle}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="truncate">{propertyLocation}</span>
            </div>
          </div>
          <Badge variant="secondary" className="shrink-0 gap-1.5">
            <Check className="w-3.5 h-3.5" />
            Completed
          </Badge>
        </div>

        {/* Completion Info */}
        <div className="text-sm text-muted-foreground">
          Rental completed on {new Date(completedDate).toLocaleDateString()}
        </div>

        {/* Form or Success State */}
        {isReviewSubmitted ? (
          <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              Review submitted successfully
            </p>
          </div>
        ) : (
          <ReviewForm
            propertyId={id}
            onSubmitSuccess={() => setIsReviewSubmitted(true)}
          />
        )}
      </div>
    </div>
  )
}
