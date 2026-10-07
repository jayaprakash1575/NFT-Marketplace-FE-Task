import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMarket } from '../../context/MarketContext';
import { X } from 'lucide-react';

export const BidModal = () => {
  const { isBidModalOpen, closeBidModal, biddingNft, submitBid, user } = useMarket();
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    if (biddingNft) {
      const minAmount = typeof biddingNft.currentBid === 'number'
        ? (biddingNft.currentBid + 0.01).toFixed(2)
        : '0.06';
      setBidAmount(minAmount);
    }
  }, [biddingNft]);

  if (!isBidModalOpen || !biddingNft) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitBid(parseFloat(bidAmount));
  };

  const usdValue = (parseFloat(bidAmount || 0) * 3450.25).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeBidModal}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-[460px] bg-[#1B1736] rounded-[24px] p-6 lg:p-7 border border-white/10 shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <h2 className="text-[18px] font-bold text-white font-heading">
              Place a Bid
            </h2>
            <button
              onClick={closeBidModal}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#8B8AA0] hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* NFT Preview */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#120F26] border border-white/5 mb-5">
            <img
              src={biddingNft.image}
              alt={biddingNft.title}
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div>
              <h4 className="text-[14px] font-bold text-white font-heading">
                {biddingNft.title}
              </h4>
              <p className="text-[12px] text-[#8B8AA0] mt-0.5">
                Current Bid: <span className="text-[#6F4FF2] font-semibold">{biddingNft.currentBid} ETH</span>
              </p>
            </div>
          </div>

          {/* Bid Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex justify-between text-[12px] text-[#8B8AA0] mb-1.5">
                <span>Your Bid (ETH)</span>
                <span>Balance: <strong className="text-white">{user.balance} ETH</strong></span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.001"
                  min="0.001"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full h-[46px] rounded-xl bg-[#120F26] border border-white/10 px-4 text-white text-[15px] font-mono focus:outline-none focus:border-[#6F4FF2] transition-colors"
                  placeholder="0.00"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#8B8AA0] font-mono">
                  ≈ {usdValue}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full h-[46px] rounded-xl bg-[#6F4FF2] hover:bg-[#5E3EE0] text-white font-semibold text-[14px] shadow-glow-purple transition-all"
              >
                Confirm Bid
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
