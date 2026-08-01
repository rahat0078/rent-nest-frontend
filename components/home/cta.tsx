'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-32 lg:px-8 bg-gradient-to-r from-primary to-accent">
      <div className="mx-auto max-w-4xl text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-primary-foreground mb-6">
          Ready to Find Your Perfect Home?
        </h2>

        {/* Description */}
        <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
          Browse through our collection of verified rental properties and connect with trusted landlords. Your next home is just a click away.
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary gap-2 font-semibold"
        >
          Browse Properties
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  )
}
