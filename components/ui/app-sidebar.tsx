"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Package,
  Boxes,
  FileText,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-bold">ERP System</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link
                      href="/dashboard"
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-sidebar-accent"
                    >
                      <LayoutDashboard size={18} />
                      <span>Dashboard</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link
                      href="/dashboard/customers"
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-sidebar-accent"
                    >
                      <Users size={18} />
                      <span>Customers</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link
                      href="/dashboard/products"
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-sidebar-accent"
                    >
                      <Package size={18} />
                      <span>Products</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
  <SidebarMenuButton
    render={
      <Link
        href="/dashboard/inventory/in"
        className="flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-sidebar-accent"
      >
        <Boxes size={18} />
        <span>Stock In</span>
      </Link>
    }
  />
</SidebarMenuItem>

<SidebarMenuItem>
  <SidebarMenuButton
    render={
      <Link
        href="/dashboard/inventory/out"
        className="flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-sidebar-accent"
      >
        <Boxes size={18} />
        <span>Stock Out</span>
      </Link>
    }
  />
</SidebarMenuItem>

<SidebarMenuItem>
  <SidebarMenuButton
    render={
      <Link
        href="/dashboard/inventory/history"
        className="flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-sidebar-accent"
      >
        <Boxes size={18} />
        <span>Stock History</span>
      </Link>
    }
  />
</SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link
                      href="/dashboard/challans"
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-sidebar-accent"
                    >
                      <FileText size={18} />
                      <span>Sales Challans</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

    </Sidebar>
  );
}