import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BidModal } from '../modals/BidModal';
import { ToastContainer } from '../modals/ToastContainer';

export const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0D0B1A] text-white flex overflow-x-hidden theme-bg transition-colors">
      {/* Icon Sidebar on Desktop, Slide-out Drawer on Mobile/Tablet */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-[78px] flex flex-col min-w-0 min-h-screen">
        <Header />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-7 lg:py-8 pb-24 lg:pb-8 max-w-[1600px] w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <BidModal />
      <ToastContainer />
    </div>
  );
};
