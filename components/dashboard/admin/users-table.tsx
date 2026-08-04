"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle2,
  Phone,
  Calendar,
  Shield,
  User as UserIcon,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  TUser,
  TUsersMeta,
} from "@/app/(dashboard)/dashboard/admin/_adminActions/getAllUsers";
import { updateUserStatus } from "@/app/(dashboard)/dashboard/admin/_adminActions/updateUserStatus";

interface UsersTableProps {
  users: TUser[];
  meta: TUsersMeta;
}

export function UsersTable({ users, meta }: UsersTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleUserStatus = async (user: TUser) => {
    try {
      setLoadingId(user.id);
      const nextStatus = user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";
      await updateUserStatus(user.id, { status: nextStatus });
      router.refresh();
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setLoadingId(null);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card shadow-2xs overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-62.5 text-xs font-semibold">
                User
              </TableHead>
              <TableHead className="text-xs font-semibold">Phone</TableHead>
              <TableHead className="text-xs font-semibold">Role</TableHead>
              <TableHead className="text-xs font-semibold">Status</TableHead>
              <TableHead className="text-xs font-semibold">
                Joined Date
              </TableHead>
              <TableHead className="text-right text-xs font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-xs text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => {
                const isBlocked =
                  user.status === "BLOCKED" || user.status === "BANNED";
                const formattedDate = new Date(
                  user.createdAt,
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <TableRow
                    key={user.id}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-border">
                          <AvatarImage
                            src={user.profilePhoto || undefined}
                            alt={user.name}
                          />
                          <AvatarFallback className="text-xs font-semibold">
                            {user.name
                              ? user.name.substring(0, 2).toUpperCase()
                              : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-foreground leading-tight">
                            {user.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-xs font-mono text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-muted-foreground/70" />
                        {user.phone || "N/A"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          user.role === "ADMIN"
                            ? "default"
                            : user.role === "LANDLORD"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-[10px] px-2 py-0.5 font-mono"
                      >
                        {user.role === "ADMIN" && (
                          <Shield className="h-2.5 w-2.5 mr-1 inline" />
                        )}
                        {user.role === "LANDLORD" && (
                          <UserIcon className="h-2.5 w-2.5 mr-1 inline" />
                        )}
                        {user.role}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          isBlocked
                            ? "border-destructive/40 bg-destructive/10 text-destructive text-[10px] px-2 py-0.5 font-semibold"
                            : "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] px-2 py-0.5 font-semibold"
                        }
                      >
                        {isBlocked ? "BANNED" : "ACTIVE"}
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={loadingId === user.id}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuLabel className="text-[11px]">
                            Actions
                          </DropdownMenuLabel>
                          <DropdownMenuItem className="text-xs cursor-pointer">
                            <Eye className="mr-2 h-3.5 w-3.5" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => toggleUserStatus(user)}
                            className={
                              isBlocked
                                ? "text-xs cursor-pointer text-emerald-600 focus:text-emerald-600 font-medium"
                                : "text-xs cursor-pointer text-destructive focus:text-destructive font-medium"
                            }
                          >
                            {isBlocked ? (
                              <>
                                <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
                                Unban User
                              </>
                            ) : (
                              <>
                                <Ban className="mr-2 h-3.5 w-3.5" />
                                Ban User
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-2 pt-2">
        <p className="text-xs text-muted-foreground font-mono">
          Showing{" "}
          <span className="font-semibold text-foreground">{users.length}</span>{" "}
          of <span className="font-semibold text-foreground">{meta.total}</span>{" "}
          users
        </p>
        {meta.totalPages > 1 && (
          <Pagination className="w-auto m-0">
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  disabled={meta.page <= 1}
                  onClick={() => handlePageChange(meta.page - 1)}
                >
                  Previous
                </Button>
              </PaginationItem>
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === meta.page}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(p);
                      }}
                      className="h-8 w-8 text-xs"
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  disabled={meta.page >= meta.totalPages}
                  onClick={() => handlePageChange(meta.page + 1)}
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
