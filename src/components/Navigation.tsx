
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Home, MessageCircle, Info, User, GamepadIcon } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 w-full bg-aurora-deep-purple/80 backdrop-blur-md border-t border-aurora-purple/30 py-2 px-4 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Link to="/" className={`flex flex-col items-center p-2 ${isActive('/') ? 'text-aurora-purple' : 'text-white/70'}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link to="/calendar" className={`flex flex-col items-center p-2 ${isActive('/calendar') ? 'text-aurora-purple' : 'text-white/70'}`}>
          <Calendar size={24} />
          <span className="text-xs mt-1">Calendar</span>
        </Link>
        
        <Link to="/games" className={`flex flex-col items-center p-2 ${isActive('/games') ? 'text-aurora-purple' : 'text-white/70'}`}>
          <GamepadIcon size={24} />
          <span className="text-xs mt-1">Games</span>
        </Link>
        
        <Link to="/info" className={`flex flex-col items-center p-2 ${isActive('/info') ? 'text-aurora-purple' : 'text-white/70'}`}>
          <Info size={24} />
          <span className="text-xs mt-1">Info</span>
        </Link>
        
        <Link to="/chat" className={`flex flex-col items-center p-2 ${isActive('/chat') ? 'text-aurora-purple' : 'text-white/70'}`}>
          <MessageCircle size={24} />
          <span className="text-xs mt-1">Chat</span>
        </Link>
        
        <Link to="/profile" className={`flex flex-col items-center p-2 ${isActive('/profile') ? 'text-aurora-purple' : 'text-white/70'}`}>
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
