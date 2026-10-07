import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMarket } from '../../context/MarketContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useMarket();

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2.5 max-w-[380px] pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1B1736] border shadow-2xl text-[13px] text-white ${
              toast.type === 'success'
                ? 'border-[#22C55E]/40'
                : toast.type === 'error'
                ? 'border-[#D93F4A]/40'
                : 'border-[#6F4FF2]/40'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-[#D93F4A] flex-shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#6F4FF2] flex-shrink-0" />}
            <span className="leading-snug">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
