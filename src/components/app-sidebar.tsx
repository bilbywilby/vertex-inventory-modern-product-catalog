import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, List, Clock, Settings, Package2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Inventory", icon: List, path: "/inventory" },
    { name: "Warranty Alerts", icon: Clock, path: "/alerts" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];
  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-border/50">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
            <Package2 className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
            Vertex
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.path}
                  tooltip={item.name}
                  className="h-10 transition-colors"
                >
                  <Link to={item.path} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}