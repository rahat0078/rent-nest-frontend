'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const CATEGORIES = ['Apartment', 'Studio', 'Villa', 'Family House', 'Duplex', 'Office']
const SORT_OPTIONS = ['Newest', 'Price Low to High', 'Price High to Low']

export function PropertyFilters() {
  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      {/* Category Select */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1.5"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Location Input */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Location</label>
        <input
          type="text"
          placeholder="Enter location"
          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* Max Rent */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Maximum Rent</label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">$</span>
          <input
            type="number"
            placeholder="5000"
            className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Min Size */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Minimum Size (sq ft)</label>
        <input
          type="number"
          placeholder="500"
          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Sort By</label>
        <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all">
          {SORT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-3">
        <Button variant="outline" className="flex-1">
          Reset Filters
        </Button>
        <Button className="flex-1">
          Search
        </Button>
      </div>
    </div>
  )
}
