import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { useMarket } from '../context/MarketContext';
import { FileText, CheckCircle2, Users, XCircle, X, Gavel, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const BidsPage = () => {
  const { activeBids, bidsMetrics, openBidModal, cancelBidOffer } = useMarket();
  const [selectedBids, setSelectedBids] = useState(new Set());

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBids(new Set(activeBids.map((b) => b.id)));
    } else {
      setSelectedBids(new Set());
    }
  };

  const handleSelectOne = (id) => {
    setSelectedBids((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getMetricIcon = (color) => {
    switch (color) {
      case 'purple': return <Gavel className="w-5 h-5 text-white" />;
      case 'green': return <CheckCircle2 className="w-5 h-5 text-white" />;
      case 'yellow': return <Users className="w-5 h-5 text-white" />;
      case 'coral': return <XCircle className="w-5 h-5 text-white" />;
      default: return <FileText className="w-5 h-5 text-white" />;
    }
  };

  const getMetricGradient = (color) => {
    switch (color) {
      case 'purple': return 'from-[#6F4FF2] to-[#5E3EE0]';
      case 'green': return 'from-[#22C55E] to-[#16A34A]';
      case 'yellow': return 'from-[#F59E0B] to-[#D97706]';
      case 'coral': return 'from-[#D93F4A] to-[#B91C27]';
      default: return 'from-[#6F4FF2] to-[#5E3EE0]';
    }
  };

  const getMetricGlow = (color) => {
    switch (color) {
      case 'purple': return 'shadow-[0_8px_20px_rgba(111,79,242,0.3)]';
      case 'green': return 'shadow-[0_8px_20px_rgba(34,197,94,0.3)]';
      case 'yellow': return 'shadow-[0_8px_20px_rgba(245,158,11,0.3)]';
      case 'coral': return 'shadow-[0_8px_20px_rgba(217,63,74,0.3)]';
      default: return '';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7 pb-10">
      <PageHeader title="Bids" subtitle="Welcome Bids Page" breadcrumb="Bids" />

      {/* 4 Metric Cards - 2x2 on Mobile, 4x1 on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {bidsMetrics.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="theme-card bg-[#1B1736] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4 border border-white/5 hover:border-white/10 transition-all shadow-sm"
          >
            <div
              className={`w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] rounded-[12px] sm:rounded-[14px] flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${getMetricGradient(stat.color)} ${getMetricGlow(stat.color)}`}
            >
              {getMetricIcon(stat.color)}
            </div>
            <div className="min-w-0">
              <span className="theme-text block text-[20px] sm:text-[24px] font-extrabold text-white font-heading leading-tight truncate">
                {stat.number}
              </span>
              <span className="theme-muted text-[11px] sm:text-[12.5px] text-[#8B8AA0] mt-0.5 block truncate">
                {stat.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active Bids Header Row */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="theme-text text-[18px] sm:text-[20px] font-bold text-white font-heading">
          Active Bids
        </h2>

        <button
          onClick={() =>
            openBidModal(activeBids[0] || {
              id: 'new-bid',
              title: 'Cute Cube Cool',
              currentBid: '0.0025 ETH',
              image: '/assets/images/birghten_lq.jpg',
            })
          }
          className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[#6F4FF2] hover:bg-[#5E3EE0] text-white text-[12.5px] sm:text-[13px] font-semibold transition-all shadow-[0_0_16px_rgba(111,79,242,0.3)] hover:scale-[1.01]"
        >
          Place a Bid
        </button>
      </div>

      {/* ── Mobile Auction Cards View (< 640px) ── */}
      <div className="sm:hidden space-y-3">
        {/* Mobile Select All Row */}
        <div className="flex items-center justify-between px-3 py-2 text-[12px] text-[#8B8AA0]">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <span className="custom-checkbox">
              <input
                type="checkbox"
                checked={selectedBids.size === activeBids.length && activeBids.length > 0}
                onChange={handleSelectAll}
              />
            </span>
            <span>Select All Items</span>
          </label>
          <span>{activeBids.length} Active</span>
        </div>

        {Array.isArray(activeBids) && activeBids.map((bid) => (
          <div
            key={bid.id}
            className={`theme-card rounded-[18px] p-4 bg-[#1B1736] border space-y-3 transition-all ${
              selectedBids.has(bid.id)
                ? 'border-[#6F4FF2]/60 bg-[#1B1736]/90'
                : 'border-white/5'
            }`}
          >
            {/* Top row: Checkbox, Artwork, Info, Cancel */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <label className="custom-checkbox flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={selectedBids.has(bid.id)}
                    onChange={() => handleSelectOne(bid.id)}
                  />
                </label>
                <img
                  src={bid.image}
                  alt={bid.title}
                  className="w-12 h-8 rounded-[10px] object-cover flex-shrink-0 shadow-sm"
                  onError={(e) => { e.target.src = '/assets/images/birghten_lq.jpg'; }}
                />
                <div className="min-w-0">
                  <h4 className="theme-text font-bold text-white text-[13.5px] truncate">{bid.title}</h4>
                  <span className="theme-muted text-[11px] text-[#8B8AA0] block truncate">{bid.creator}</span>
                </div>
              </div>

              <button
                onClick={() => cancelBidOffer(bid.id)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8B8AA0] hover:text-white hover:bg-white/5 transition-colors flex-shrink-0"
                title="Cancel Offer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Price pills grid */}
            <div className="theme-inner-card grid grid-cols-3 gap-1.5 sm:gap-2 p-2.5 rounded-xl bg-[#120F26]/80 border border-white/5 text-[11px]">
              <div>
                <span className="theme-muted text-[#8B8AA0] block text-[10px] truncate">Open Price</span>
                <span className="theme-text font-mono text-white font-medium text-[11px] sm:text-[12px] block truncate">{bid.openPrice}</span>
              </div>
              <div>
                <span className="theme-muted text-[#8B8AA0] block text-[10px] truncate">Your Offer</span>
                <span className="font-mono text-[#A585FC] font-semibold text-[11px] sm:text-[12px] block truncate">{bid.yourOffer}</span>
              </div>
              <div>
                <span className="theme-muted text-[#8B8AA0] block text-[10px] truncate">Recent Offer</span>
                <div className="flex items-center gap-1 font-mono text-white">
                  <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                    <img
                      src="/assets/images/figma_suit_avatar.png"
                      alt="Bidder"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <span className="theme-text text-white text-[11px] sm:text-[12px] truncate font-medium">{bid.recentOffer?.amount || '0.0025 ETH'}</span>
                </div>
              </div>
            </div>

            {/* Time Left row */}
            <div className="flex items-center justify-between text-[11.5px] pt-0.5 px-0.5">
              <span className="theme-muted text-[#8B8AA0] flex items-center gap-1.5">
                <Clock size={12} className="text-[#6F4FF2]" />
                Time Left:
              </span>
              <span className="theme-text text-white font-medium">{bid.timeLeft}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop & Tablet Table (Exact Figma Fidelity) (>= 640px) ── */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="min-w-[760px] space-y-2.5">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-3 text-[11.5px] font-semibold text-[#8B8AA0] px-5 py-2">
            <div className="col-span-1">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={selectedBids.size === activeBids.length && activeBids.length > 0}
                  onChange={handleSelectAll}
                />
              </label>
            </div>
            <div className="col-span-3">Item List</div>
            <div className="col-span-2">Open Price</div>
            <div className="col-span-2">Your Offer</div>
            <div className="col-span-2">Recent Offer</div>
            <div className="col-span-1">Time Left</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {/* Table Rows (Each is an individual card matching Figma) */}
          {Array.isArray(activeBids) && activeBids.map((bid) => (
            <div
              key={bid.id}
              className={`theme-card grid grid-cols-12 gap-3 items-center text-[13px] px-5 py-3.5 rounded-[18px] bg-[#1B1736] border transition-all ${
                selectedBids.has(bid.id)
                  ? 'border-[#6F4FF2]/50 bg-[#1B1736]/95'
                  : 'border-white/5 hover:border-white/10 hover:bg-[#201B40]'
              }`}
            >
              <div className="col-span-1">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedBids.has(bid.id)}
                    onChange={() => handleSelectOne(bid.id)}
                  />
                </label>
              </div>

              <div className="col-span-3 flex items-center gap-3 min-w-0">
                <img
                  src={bid.image}
                  alt={bid.title}
                  className="w-12 h-8 rounded-[10px] object-cover flex-shrink-0 shadow-sm"
                  onError={(e) => { e.target.src = '/assets/images/birghten_lq.jpg'; }}
                />
                <div className="min-w-0">
                  <h5 className="theme-text font-bold text-white text-[13.5px] truncate">{bid.title}</h5>
                  <span className="theme-muted text-[11.5px] text-[#8B8AA0] block truncate">{bid.creator}</span>
                </div>
              </div>

              <div className="theme-text col-span-2 font-mono text-white text-[12.5px] font-medium">{bid.openPrice}</div>
              <div className="col-span-2 font-mono text-white text-[12.5px] font-medium">{bid.yourOffer}</div>

              <div className="col-span-2 flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-white/10 shadow-sm">
                  <img
                    src="/assets/images/figma_suit_avatar.png"
                    alt="Recent bidder"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <span className="theme-text font-mono text-white text-[12.5px] truncate font-medium">
                  {bid.recentOffer?.amount || '0.0025 ETH'}
                </span>
              </div>

              <div className="theme-muted col-span-1 text-[11.5px] text-white whitespace-nowrap font-medium">
                {bid.timeLeft}
              </div>

              <div className="col-span-1 text-right">
                <button
                  onClick={() => cancelBidOffer(bid.id)}
                  className="w-7 h-7 rounded-lg inline-flex items-center justify-center text-white hover:text-[#E03E52] hover:bg-white/5 transition-colors"
                  title="Cancel Offer"
                >
                  <X size={14} className="stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}

          {activeBids.length === 0 && (
            <div className="theme-card flex flex-col items-center justify-center py-16 text-center bg-[#1B1736] rounded-[20px] border border-white/5">
              <Gavel size={36} className="text-[#6E6D82] mb-3" />
              <p className="theme-text text-[14px] font-bold text-white">No active bids</p>
              <p className="theme-muted text-[12.5px] text-[#8B8AA0] mt-1">Place your first bid to see it here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
