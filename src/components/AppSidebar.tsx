
import { NavLink, useLocation } from "react-router-dom";
import { Activity, Puzzle, MessageSquare, Key, HelpCircle, MessageCircle, Zap, CreditCard, FileText, LogOut } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Activity
  },
  {
    title: "Tool Integration",
    url: "/integrations", 
    icon: Puzzle
  },
  {
    title: "Chat Console",
    url: "/chat",
    icon: MessageSquare
  },
  {
    title: "Use Cases",
    url: "/use-cases",
    icon: FileText
  },
  {
    title: "Pricing Plans",
    url: "/pricing",
    icon: CreditCard
  },
  {
    title: "Credentials",
    url: "/credentials",
    icon: Key
  },
  {
    title: "Support",
    url: "/support",
    icon: HelpCircle
  },
  {
    title: "Feedback", 
    url: "/feedback",
    icon: MessageCircle
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const getNavCls = ({ isActive }: { isActive: boolean }) => 
    isActive 
      ? "bg-primary/20 text-primary border-l-4 border-primary font-medium shadow-lg" 
      : "hover:bg-sidebar-accent/50 hover:text-sidebar-foreground text-sidebar-foreground/80";

  return (
    <Sidebar className={collapsed ? "w-20" : "w-72"} collapsible="icon">
      <SidebarContent className="gradient-sidebar border-r border-sidebar-border">
        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold text-sidebar-foreground">AIaaS</h1>
                <p className="text-sm text-sidebar-foreground/70">DevOps Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-4 py-6">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${getNavCls({ isActive: isActive(item.url) })}`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Bottom Section - User Profile & Logout */}
        <div className="p-4 border-t border-sidebar-border/30">
          {!collapsed && (
            <div className="mb-4 p-4 bg-sidebar-accent/30 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">DU</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">Demo User</p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">demo@aiaas.com</p>
                </div>
              </div>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-xl ${collapsed ? 'px-3' : 'px-4'}`}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
