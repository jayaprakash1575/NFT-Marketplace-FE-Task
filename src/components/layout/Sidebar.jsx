import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Sidebar = () => {
  const { addToast, isMobileMenuOpen, setIsMobileMenuOpen, user } = useMarket();

  const navLinks = [
    {
      to: '/',
      title: 'Dashboard',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="currentColor">
          <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
        </svg>
      ),
    },
    {
      to: '/bids',
      title: 'Active Bids',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1.5" ry="1.5" />
          <line x1="9" y1="11" x2="15" y2="11" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
    },
    {
      to: '/saved',
      title: 'Saved Items',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      to: '/collections',
      title: 'Collections',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      to: '/profile',
      title: 'Profile',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="10" r="3" />
          <path d="M6.168 18.849a4 4 0 0 1 3.832-2.849h4a4 4 0 0 1 3.832 2.849" />
        </svg>
      ),
    },
    {
      to: '/setting',
      title: 'Settings',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="3" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    addToast('Signed out of session', 'info');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* ── Desktop Icon Sidebar (Exact Figma Fidelity) ── */}
      <aside className="theme-sidebar hidden lg:flex fixed top-0 bottom-0 left-0 w-[78px] bg-[#14112B] border-r border-white/5 flex-col items-center justify-between py-6 z-40 transition-colors">
        {/* Top Logo */}
        <div className="flex flex-col items-center gap-7 w-full">
          <NavLink
            to="/"
            className="w-[44px] h-[44px] rounded-[14px] bg-[#6F4FF2] flex items-center justify-center shadow-glow-purple hover:scale-105 transition-transform"
            title="NFT Marketplace"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 4h7.5c2.5 0 4.5 1.5 5.5 3.5l2 3.5c.8 1.4.8 3.1 0 4.5l-2 3.5c-1 2-3 3.5-5.5 3.5H7c-2.2 0-4-1.8-4-4V8c0-2.2 1.8-4 4-4z"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="11.5" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="2.2" />
            </svg>
          </NavLink>

          {/* Navigation Items */}
          <nav className="flex flex-col items-center gap-4 w-full">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group relative w-[46px] h-[46px] rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'text-[#6F4FF2] bg-[#6F4FF2]/10'
                      : 'text-[#6E6D82] hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.icon}
                {/* Tooltip on Hover */}
                <span className="hidden lg:group-hover:block absolute left-[88px] top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#1F1B3C] text-white text-[11px] font-medium rounded-md whitespace-nowrap shadow-xl border border-white/10 pointer-events-none z-50">
                  {item.title}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Sign Out */}
        <div className="w-full flex justify-center">
          <button
            onClick={handleLogout}
            className="group relative w-[46px] h-[46px] rounded-xl flex items-center justify-center text-[#6E6D82] hover:text-white hover:bg-white/5 transition-all"
            title="Sign Out"
          >
            <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className="hidden lg:group-hover:block absolute left-[88px] top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#1F1B3C] text-white text-[11px] font-medium rounded-md whitespace-nowrap shadow-xl border border-white/10 pointer-events-none z-50">
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* ── Mobile & Tablet Navigation Drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="theme-sidebar absolute top-0 bottom-0 left-0 w-[280px] bg-[#14112B] border-r border-white/10 shadow-2xl flex flex-col justify-between p-6 z-10"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <NavLink
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <div className="w-[40px] h-[40px] rounded-[12px] bg-[#6F4FF2] flex items-center justify-center shadow-glow-purple flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 4h7.5c2.5 0 4.5 1.5 5.5 3.5l2 3.5c.8 1.4.8 3.1 0 4.5l-2 3.5c-1 2-3 3.5-5.5 3.5H7c-2.2 0-4-1.8-4-4V8c0-2.2 1.8-4 4-4z"
                          stroke="#FFFFFF"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="11.5" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="2.2" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-heading font-extrabold text-[16px] text-white tracking-wide block">
                        Xtrader NFT
                      </span>
                      <span className="text-[11px] text-[#8B8AA0] block -mt-0.5">
                        Marketplace
                      </span>
                    </div>
                  </NavLink>

                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8B8AA0] hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Nav Links with Labels */}
                <nav className="space-y-1.5">
                  {navLinks.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-[13.5px] font-medium transition-all ${
                          isActive
                            ? 'text-white bg-[#6F4FF2] shadow-sm'
                            : 'theme-muted text-[#8B8AA0] hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span>{item.title}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer with User & Sign Out */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
                    <img
                      src="/assets/images/figma_header_avatar.png"
                      alt={user.name}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => { e.target.src = '/assets/images/figma_header_avatar.png'; }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="theme-text text-[13px] font-bold text-white truncate">{user.name}</h5>
                    <span className="theme-muted text-[11px] text-[#8B8AA0] font-mono truncate block">{user.wallet}</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium text-[#E03E52] hover:bg-[#E03E52]/10 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Mobile Bottom Navigation Bar (Exact Figma Mobile Frames Fidelity) ── */}
      <nav className="theme-sidebar lg:hidden fixed bottom-0 left-0 right-0 h-[62px] bg-[#14112B]/95 backdrop-blur-lg border-t border-white/[0.08] flex items-center justify-around px-2 z-40 transition-colors">
        {navLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive
                  ? 'text-[#6F4FF2] scale-110 drop-shadow-[0_0_8px_rgba(111,79,242,0.5)]'
                  : 'text-[#6E6D82] hover:text-white'
              }`
            }
            title={item.title}
          >
            {item.icon}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center p-2 rounded-xl text-[#6E6D82] hover:text-[#E03E52] transition-colors"
          title="Sign Out"
        >
          <LogOut size={20} strokeWidth={1.8} />
        </button>
      </nav>
    </>
  );
};
