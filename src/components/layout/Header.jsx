import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { Search, Sun, Moon, Bell, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { theme, toggleTheme, searchQuery, setSearchQuery, user, addToast, setIsMobileMenuOpen } = useMarket();

  return (
    <header className="theme-header h-[68px] sm:h-[72px] flex items-center justify-between px-4 sm:px-6 lg:px-10 border-b border-white/[0.06] bg-[#0D0B1A] sticky top-0 z-40 transition-colors">
      {/* Left: Mobile Menu Button + Search Bar */}
      <div className="flex items-center gap-2.5 sm:gap-4 flex-1 max-w-[400px] min-w-0">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 rounded-xl text-[#8B8AA0] hover:text-white hover:bg-white/5 transition-colors flex-shrink-0"
          aria-label="Open Navigation Menu"
          title="Open Menu"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-[#8B8AA0] pointer-events-none" />
          <input
            type="text"
            id="header-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Here"
            className="theme-input w-full h-[40px] bg-[#1B1736] border border-white/[0.06] rounded-xl pl-10 pr-3 sm:pr-4 text-[13px] text-white placeholder-[#6E6D82] focus:outline-none focus:border-[#6F4FF2]/60 focus:ring-1 focus:ring-[#6F4FF2]/20 transition-all truncate"
          />
        </div>
      </div>

      {/* Right Actions: Theme Toggle, Notifications, Profile Avatar */}
      <div className="flex items-center gap-2 sm:gap-4 ml-3 flex-shrink-0">
        {/* Theme Toggle (Sun / Moon) */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          className="w-[36px] h-[36px] rounded-xl flex items-center justify-center text-[#8B8AA0] hover:text-white hover:bg-white/5 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-[18px] h-[18px] text-[#A2A1B8] hover:text-white" />
          ) : (
            <Moon className="w-[18px] h-[18px] text-[#6F4FF2]" />
          )}
        </button>

        {/* Notification Bell */}
        <button
          id="notifications-btn"
          onClick={() => addToast('You have 3 unread auction alerts', 'info')}
          className="relative w-[36px] h-[36px] rounded-xl flex items-center justify-center text-[#A2A1B8] hover:text-white hover:bg-white/5 transition-colors"
          title="Notifications"
          aria-label="View notifications"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E03E52]" />
        </button>

        {/* User Avatar */}
        <Link
          to="/profile"
          id="profile-avatar-btn"
          className="cursor-pointer group ml-0.5 sm:ml-1 flex-shrink-0"
          title={`Account: ${user.name}`}
        >
          <div className="w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full overflow-hidden border border-white/20 group-hover:border-[#6F4FF2] transition-colors shadow-sm">
            <img
              src="/assets/images/figma_header_avatar.png"
              alt={user.name}
              className="w-full h-full object-cover object-center"
              onError={(e) => { e.target.src = '/assets/images/figma_header_avatar.png'; }}
            />
          </div>
        </Link>
      </div>
    </header>
  );
};
