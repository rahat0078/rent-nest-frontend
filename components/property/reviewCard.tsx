'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'

interface ReviewCardProps {
  avatar: string
  name: string
  rating: number
  text: string
}

export function ReviewCard({ avatar, name, rating, text }: ReviewCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header with Avatar and Name */}
      <div className="flex items-center gap-4 mb-4">
        <Image
        unoptimized
          src={avatar}
          alt={name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-foreground">{name}</h4>
          <div className="flex gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating
                    ? 'fill-accent text-accent'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-muted-foreground leading-relaxed">{text}</p>
    </div>
  )
}
