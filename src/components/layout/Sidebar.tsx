
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Dumbbell, 
  BarChart2, 
  User, 
  Settings,
  LogOut,
  Scale,
  MenuSquare
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  activePage: 'dashboard' | 'workouts' | 'exercises' | 'progress' | 'profile' | 'settings' | 'weight';
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  const isMobile = useMobile();
  
  const navItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/dashboard',
      active: activePage === 'dashboard',
    },
    {
      name: 'Workouts',
      icon: <Dumbbell className="h-5 w-5" />,
      href: '/workouts',
      active: activePage === 'workouts',
    },
    {
      name: 'Exercises',
      icon: <MenuSquare className="h-5 w-5" />,
      href: '/exercises',
      active: activePage === 'exercises',
    },
    {
      name: 'Weight',
      icon: <Scale className="h-5 w-5" />,
      href: '/weight',
      active: activePage === 'weight',
    },
    {
      name: 'Progress',
      icon: <BarChart2 className="h-5 w-5" />,
      href: '/progress',
      active: activePage === 'progress',
    },
    {
      name: 'Profile',
      icon: <User className="h-5 w-5" />,
      href: '/profile',
      active: activePage === 'profile',
    },
    {
      name: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      href: '/settings',
      active: activePage === 'settings',
    },
  ];

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around p-2">
          {navItems.slice(0, 5).map((item) => (
            <Link 
              key={item.name} 
              to={item.href}
              className={cn(
                "flex flex-col items-center py-1 px-3 rounded-md text-xs",
                item.active ? "text-empowerfit-purple" : "text-gray-500"
              )}
            >
              {item.icon}
              <span className="mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 h-screen border-r bg-white flex flex-col">
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center">
          <h1 className="text-2xl font-bold gradient-purple gradient-text">EmpowerFit</h1>
        </Link>
      </div>
      
      <div className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md transition-colors",
              item.active 
                ? "bg-empowerfit-purple text-white" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {item.icon}
            <span className="ml-3 font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <Button variant="ghost" className="flex w-full text-gray-600">
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
