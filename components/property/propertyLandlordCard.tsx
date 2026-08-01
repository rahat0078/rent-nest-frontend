"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import Image from "next/image";

interface PropertyLandlordCardProps {
  name: string;
  profilePhoto: string;
  email?: string;
  phone?: string;
  isVerified?: boolean;
}

export function PropertyLandlordCard({
  name,
  profilePhoto,
  email = "landlord@example.com",
  phone = "+1 (555) 000-0000",
  isVerified = true,
}: PropertyLandlordCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">
        Landlord Information
      </h3>

      <div className="space-y-4">
        {/* Avatar and Name */}
        <div className="flex items-center gap-4">
          <Image
            unoptimized
            src={profilePhoto}
            alt={name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground">{name}</h4>
              {isVerified && <CheckCircle2 className="w-5 h-5 text-primary" />}
            </div>
            {isVerified && (
              <Badge className="bg-green-100 text-green-700">Verified</Badge>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 pt-4 border-t border-border">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-foreground">{email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-foreground">{phone}</span>
          </div>
        </div>

        {/* Contact Button */}
        <Button className="w-full" disabled>
          Contact Landlord
        </Button>
      </div>
    </div>
  );
}
