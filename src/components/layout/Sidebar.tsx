
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Home,
  Dumbbell,
  BarChart2,
  Calendar,
  Settings,
  User,
  BookOpen,
  LogOut
} from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, active }) => {
  return (
    <Link to={to} className="w-full">
      <Button 
        variant={active ? "default" : "ghost"}
        className={`w-full justify-start ${active ? 'bg-empowerfit-purple text-white' : ''}`}
      >
        {icon}
        <span className="ml-2">{label}</span>
      </Button>
    </Link>
  );
};

interface SidebarProps {
  activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  return (
    <div className="w-64 border-r bg-white h-screen flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold gradient-purple gradient-text">EmpowerFit</h1>
        <p className="text-sm text-gray-500">Your fitness journey</p>
      </div>
      
      <div className="flex-1 py-4 px-3 space-y-1">
        <SidebarLink 
          to="/dashboard" 
          icon={<Home size={18} />} 
          label="Dashboard" 
          active={activePage === 'dashboard'} 
        />
        <SidebarLink 
          to="/workouts" 
          icon={<Dumbbell size={18} />} 
          label="Workouts" 
          active={activePage === 'workouts'} 
        />
        <SidebarLink 
          to="/exercises" 
          icon={<BookOpen size={18} />} 
          label="Exercise Library" 
          active={activePage === 'exercises'} 
        />
        <SidebarLink 
          to="/progress" 
          icon={<BarChart2 size={18} />} 
          label="Progress" 
          active={activePage === 'progress'} 
        />
        <SidebarLink 
          to="/calendar" 
          icon={<Calendar size={18} />} 
          label="Calendar" 
          active={activePage === 'calendar'} 
        />
      </div>
      
      <div className="p-3 border-t space-y-1">
        <SidebarLink 
          to="/profile" 
          icon={<User size={18} />} 
          label="Profile" 
          active={activePage === 'profile'} 
        />
        <SidebarLink 
          to="/settings" 
          icon={<Settings size={18} />} 
          label="Settings" 
          active={activePage === 'settings'} 
        />
        <Button variant="ghost" className="w-full justify-start text-gray-500">
          <LogOut size={18} />
          <span className="ml-2">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
