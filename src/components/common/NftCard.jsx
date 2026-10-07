import React from 'react';
import { motion } from 'framer-motion';
import { useMarket } from '../../context/MarketContext';
import { Heart } from 'lucide-react';

export const NftCard = ({ nft, showLikeBtn = false, showCategory = false }) => {
  const { openBidModal, savedIds, toggleSaveItem } = useMarket();
  const isLiked = savedIds.has(nft.id);

  const formatTime = (time) => {
    if (typeof time === 'string') return time;
    if (typeof time === 'number') {
      const h = Math.floor(time / 3600);
      const m = Math.floor((time % 3600) / 60);
      const s = time % 60;
      return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
    }
    return '3h 1m 50s';
  };

  const currentBid = typeof nft.currentBid === 'number' ? `${nft.currentBid} ETH` : nft.currentBid;
  const highestBid = nft.highestBid
    ? typeof nft.highestBid === 'number' ? `${nft.highestBid} ETH` : nft.highestBid
    : null;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="theme-card bg-[#1B1736] rounded-[20px] p-3.5 flex flex-col border border-white/5 hover:border-[#6F4FF2]/40 hover:shadow-[0_8px_30px_rgba(111,79,242,0.15)] transition-all shadow-sm"
    >
      {/* Artwork Image */}
      <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-[#120F26] mb-3 group">
        <img
          src={nft.image}
          alt={nft.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-400"
          onError={(e) => { e.target.src = '/assets/images/liquid_wave_1.jpg'; }}
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Like Button */}
        {showLikeBtn && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveItem(nft.id);
            }}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-md ${
              isLiked
                ? 'bg-[#FF4757] text-white scale-110'
                : 'bg-black/40 text-white/70 hover:text-white hover:bg-black/60 hover:scale-110'
            }`}
            title={isLiked ? 'Remove from saved' : 'Save artwork'}
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        )}

        {/* Category badge - optional */}
        {showCategory && nft.category && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-[10px] font-medium text-white/90">
            {nft.category}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="theme-text text-[15px] font-bold text-white font-heading truncate mb-2 px-0.5">
        {nft.title}
      </h3>

      {/* Meta Row */}
      <div className="flex items-end justify-between text-[11.5px] mb-3 px-0.5">
        <div>
          <span className="theme-muted block text-[11px] text-[#8B8AA0] mb-0.5">Auction time</span>
          <span className="theme-text font-normal text-white text-[12px]">
            {formatTime(nft.time || nft.timeRemaining)}
          </span>
        </div>
        <div className="text-right">
          <span className="theme-muted block text-[11px] text-[#8B8AA0] mb-0.5">Current Bid</span>
          <span className="font-medium text-[#6F4FF2] text-[12px] block">
            {currentBid}
          </span>
          <span className="theme-muted text-[11px] text-[#8B8AA0] block">
            {highestBid || '0.15 ETH'}
          </span>
        </div>
      </div>

      {/* Place a Bid Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => openBidModal(nft)}
        className="w-full h-[40px] rounded-xl bg-[#6F4FF2] hover:bg-[#5E3EE0] text-white text-[13px] font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm hover:shadow-[0_0_18px_rgba(111,79,242,0.35)]"
      >
        Place a Bid
      </motion.button>
    </motion.div>
  );
};
