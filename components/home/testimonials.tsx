'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    avatar: 'SJ',
    name: 'Sarah Johnson',
    rating: 5,
    review:
      'RentNest made finding my apartment incredibly easy. The verified listings gave me confidence, and the landlord communication was smooth and professional.',
  },
  {
    avatar: 'MK',
    name: 'Michael Kim',
    rating: 5,
    review:
      'I appreciated the transparent rental process and the helpful support team. Moving into my new place was stress-free thanks to RentNest.',
  },
  {
    avatar: 'ER',
    name: 'Emily Rodriguez',
    rating: 5,
    review:
      'The platform is user-friendly and the property quality is excellent. I found my dream villa quickly and securely through this platform.',
  },
]

export default function Testimonials() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-32 lg:px-8 bg-background">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">What Our Tenants Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy renters who found their perfect home on RentNest.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 rounded-xl border border-border bg-card hover:border-primary transition-colors">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-foreground mb-6 leading-relaxed">&quot;{testimonial.review}&quot;</p>

              {/* Avatar and Name */}
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">Verified Tenant</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
