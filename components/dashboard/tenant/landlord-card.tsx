'use client'

import { Mail, Phone, BadgeCheck } from 'lucide-react'
import Image from 'next/image'

interface LandlordCardProps {
  name: string
  email: string
  phone: string
  avatar: string
  verified: boolean
}

export function LandlordCard({
  name,
  email,
  phone,
  avatar,
  verified,
}: LandlordCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Landlord Information</h3>

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <Image
          unoptimized
            src={avatar}
            alt={name}
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
          {verified && (
            <BadgeCheck className="absolute -bottom-1 -right-1 w-6 h-6 text-primary bg-background rounded-full" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-semibold text-foreground">{name}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <a href={`mailto:${email}`} className="text-sm text-primary hover:underline">
                {email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <a href={`tel:${phone}`} className="text-sm text-primary hover:underline">
                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {verified && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center gap-2">
          <BadgeCheck className="w-4 h-4 text-primary" />
          <p className="text-xs font-medium text-primary">Verified Landlord</p>
        </div>
      )}
    </div>
  )
}
