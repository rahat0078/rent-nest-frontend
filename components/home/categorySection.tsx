'use client'

import { Building2, Home, Castle, Armchair, Split, Briefcase } from 'lucide-react'

const categories = [
  {
    icon: Armchair,
    name: 'Apartment',
    description: 'Modern urban living spaces',
  },
  {
    icon: Home,
    name: 'Studio',
    description: 'Compact and affordable homes',
  },
  {
    icon: Castle,
    name: 'Villa',
    description: 'Luxury residential properties',
  },
  {
    icon: Building2,
    name: 'Family House',
    description: 'Perfect for growing families',
  },
  {
    icon: Split,
    name: 'Duplex',
    description: 'Contemporary dual living',
  },
  {
    icon: Briefcase,
    name: 'Office Space',
    description: 'Professional work environments',
  },
]

export default function CategoriesSection() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8 bg-primary/5">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Property Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect property type that matches your lifestyle and needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={index}
                className="group p-8 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{category.name}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
