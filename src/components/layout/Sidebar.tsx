
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';
import { BarChart, Dumbbell, User, Weight } from 'lucide-react';

export const Sidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium w-full flex items-center p-2 rounded-lg" 
      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full flex items-center p-2 rounded-lg transition-colors";

  return (
    <SidebarComponent className={`${collapsed ? "w-[70px]" : "w-64"} bg-sidebar-background text-sidebar-foreground transition-all`}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && <h2 className="text-xl font-bold">DailyStride</h2>}
        <SidebarTrigger className="text-sidebar-foreground hover:text-white" />
      </div>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/" end className={getNavCls}>
                <BarChart className="h-5 w-5 mr-2" />
                {!collapsed && <span>Dashboard</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/workouts" className={getNavCls}>
                <Dumbbell className="h-5 w-5 mr-2" />
                {!collapsed && <span>Activity</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/nutrition" className={getNavCls}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5 mr-2"
                >
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                  <path d="M7 2v20"></path>
                  <path d="M21 15V2"></path>
                  <path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                </svg>
                {!collapsed && <span>Nutrition</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/weight" className={getNavCls}>
                <Weight className="h-5 w-5 mr-2" />
                {!collapsed && <span>Weight</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/profile" className={getNavCls}>
                <User className="h-5 w-5 mr-2" />
                {!collapsed && <span>Profile</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </SidebarComponent>
  );
};
