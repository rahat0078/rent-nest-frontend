"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Eye,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface PropertyItem {
  id: string;
  title: string;
  location: string;
  rentAmount: number;
  sizeSqFt: number;
  bedrooms: number;
  bathrooms: number;
  isAvailable: boolean;
  createdAt: string;
  category: {
    name: string;
  };
  landlord: {
    name: string;
    email: string;
    profilePhoto: string | null;
  };
}

export const mockProperties: PropertyItem[] = [
  {
    id: "adf229f0-c20e-4f49-b56a-3a56eb155aff",
    title: "Modern Apartment in Bashundhara R/A",
    location: "Bashundhara R/A, Dhaka",
    rentAmount: 32000,
    sizeSqFt: 1400,
    bedrooms: 3,
    bathrooms: 2,
    isAvailable: true,
    createdAt: "2026-07-08T18:46:58.833Z",
    category: { name: "Apartment" },
    landlord: {
      name: "Rakib Hossain",
      email: "rakib@example.com",
      profilePhoto: null,
    },
  },
  {
    id: "19783ee6-3797-444c-82b8-80d37830727e",
    title: "Affordable Studio Apartment - Newly Renovated",
    location: "Mohammadpur, Dhaka",
    rentAmount: 13500,
    sizeSqFt: 550,
    bedrooms: 1,
    bathrooms: 1,
    isAvailable: false,
    createdAt: "2026-07-08T18:51:22.252Z",
    category: { name: "Studio" },
    landlord: {
      name: "Sabbir Ahmed",
      email: "sabbir@example.com",
      profilePhoto: "https://i.pravatar.cc/300?img=4",
    },
  },
  {
    id: "2ad80acf-2190-4859-997f-bcef707381d3",
    title: "Luxury Villa with Private Garden",
    location: "Gulshan 2, Dhaka",
    rentAmount: 95000,
    sizeSqFt: 4200,
    bedrooms: 5,
    bathrooms: 4,
    isAvailable: false,
    createdAt: "2026-07-08T18:47:46.656Z",
    category: { name: "Villa" },
    landlord: {
      name: "Rakib Hossain",
      email: "rakib@example.com",
      profilePhoto: null,
    },
  },
  {
    id: "3be8b9a6-dfa0-4894-ad3d-6c3f440f03cc",
    title: "Commercial Office Space",
    location: "Motijheel, Dhaka",
    rentAmount: 60000,
    sizeSqFt: 1800,
    bedrooms: 2,
    bathrooms: 2,
    isAvailable: true,
    createdAt: "2026-07-08T18:52:08.386Z",
    category: { name: "Office" },
    landlord: {
      name: "Sabbir Ahmed",
      email: "sabbir@example.com",
      profilePhoto: "https://i.pravatar.cc/300?img=4",
    },
  },
  {
    id: "5f44224d-c451-4d75-b917-9ffdcb6ccb20",
    title: "Independent Family House",
    location: "Mirpur DOHS, Dhaka",
    rentAmount: 48000,
    sizeSqFt: 2100,
    bedrooms: 4,
    bathrooms: 3,
    isAvailable: true,
    createdAt: "2026-07-08T18:48:38.775Z",
    category: { name: "House" },
    landlord: {
      name: "Rakib Hossain",
      email: "rakib@example.com",
      profilePhoto: null,
    },
  },
];

export function PropertyTable() {
  const [properties] = useState<PropertyItem[]>(mockProperties);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card shadow-2xs overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-70 text-xs font-semibold">
                Property Title
              </TableHead>
              <TableHead className="text-xs font-semibold">Category</TableHead>
              <TableHead className="text-xs font-semibold">Landlord</TableHead>
              <TableHead className="text-xs font-semibold">
                Rent Amount
              </TableHead>
              <TableHead className="text-xs font-semibold">Status</TableHead>
              <TableHead className="text-xs font-semibold">
                Created Date
              </TableHead>
              <TableHead className="text-right text-xs font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((prop) => {
              const formattedDate = new Date(prop.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              );

              return (
                <TableRow
                  key={prop.id}
                  className="hover:bg-muted/40 transition-colors"
                >
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-foreground line-clamp-1">
                        {prop.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3 shrink-0 text-muted-foreground/80" />
                        {prop.location}
                      </span>
                      <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground font-mono mt-0.5">
                        <span className="flex items-center gap-0.5">
                          <Bed className="h-3 w-3" /> {prop.bedrooms} Bed
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Bath className="h-3 w-3" /> {prop.bathrooms} Bath
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Maximize2 className="h-2.5 w-2.5" /> {prop.sizeSqFt}{" "}
                          sqft
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-2 py-0.5 font-mono"
                    >
                      {prop.category.name}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7 border border-border">
                        <AvatarImage
                          src={prop.landlord.profilePhoto || undefined}
                          alt={prop.landlord.name}
                        />
                        <AvatarFallback className="text-[10px]">
                          {prop.landlord.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium leading-none">
                          {prop.landlord.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground leading-none mt-0.5">
                          {prop.landlord.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="font-mono text-xs font-bold text-foreground">
                    ৳ {prop.rentAmount.toLocaleString()}/mo
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        prop.isAvailable
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold"
                          : "border-destructive/40 bg-destructive/10 text-destructive text-[10px] font-semibold"
                      }
                    >
                      {prop.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      {formattedDate}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel className="text-[11px]">
                          Moderation
                        </DropdownMenuLabel>
                        <DropdownMenuItem className="text-xs cursor-pointer">
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          View Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-2 pt-2">
        <p className="text-xs text-muted-foreground font-mono">
          Showing <span className="font-semibold text-foreground">1-5</span> of{" "}
          <span className="font-semibold text-foreground">5</span> listings
        </p>
        <Pagination className="w-auto m-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className="h-8 text-xs" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive className="h-8 w-8 text-xs">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className="h-8 text-xs" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
