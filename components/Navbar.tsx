import React from 'react';
import { Trophy, Menu, Bell } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-bae-main border-b border-bae-hover px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {/* Logo Style like BAE */}
        <div className="bg-bae-blue text-white font-black text-xl px-2 py-1 rounded-md tracking-tighter shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          BAE
        </div>
        <span className="text-bae-muted text-sm font-medium hidden sm:block">Shop at Ease!</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden sm:flex items-center gap-2 text-bae-blue font-bold bg-bae-blue/10 px-3 py-1.5 rounded-full border border-bae-blue/20">
            <Trophy className="w-4 h-4 fill-current" />
            <span>1,250 pts</span>
        </div>
        
        <button className="text-bae-muted hover:text-white relative">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-bae-red rounded-full border-2 border-bae-main"></div>
        </button>

        <div className="flex items-center gap-3 cursor-pointer group">
            <img 
                src="https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff&bold=true" 
                alt="User" 
                className="w-9 h-9 rounded-full border-2 border-bae-hover group-hover:border-bae-blue transition-colors shadow-lg"
            />
        </div>
        
        <button className="md:hidden text-bae-muted">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;