import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Bell, User, Moon, Sun, Globe, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/hooks/useTheme";

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  toolName?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Docker Build Completed',
    message: 'Image myapp:latest built successfully',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    toolName: 'Docker'
  },
  {
    id: '2',
    type: 'error',
    title: 'Jenkins Pipeline Failed',
    message: 'Build #127 failed at test stage',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    read: false,
    toolName: 'Jenkins'
  },
  {
    id: '3',
    type: 'warning',
    title: 'Kubernetes Deployment Slow',
    message: 'Pod startup taking longer than expected',
    timestamp: new Date(Date.now() - 18 * 60 * 1000),
    read: true,
    toolName: 'Kubernetes'
  },
];

export function Header() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-status-success" />;
      case 'error': return <XCircle className="w-4 h-4 text-status-error" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-status-warning" />;
      default: return <Clock className="w-4 h-4 text-status-running" />;
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="status-running">
            2 {t('dashboard.activeWorkflows')}
          </Badge>
          <Badge variant="outline" className="status-success">
            12 {t('dashboard.completedToday')}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover/95 backdrop-blur-sm border-border/50">
            <DropdownMenuLabel>{t('common.language')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => changeLanguage('en')}>
              <span className="fi fi-us mr-2"></span>English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('es')}>
              <span className="fi fi-es mr-2"></span>Español
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('hi')}>
              <span className="fi fi-in mr-2"></span>हिन्दी
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-error-red text-white">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-popover/95 backdrop-blur-sm border-border/50">
            <DropdownMenuLabel className="flex items-center justify-between">
              {t('notifications.title')}
              <Button variant="ghost" size="sm" className="text-xs h-6">
                {t('notifications.viewAll')}
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ScrollArea className="h-64">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  {t('notifications.noNotifications')}
                </div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`p-3 cursor-pointer ${!notification.read ? 'bg-primary/5' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3 w-full">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {notification.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover/95 backdrop-blur-sm border-border/50">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}