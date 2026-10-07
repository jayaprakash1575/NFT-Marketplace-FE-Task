import React, { useState, useEffect } from 'react';
import { useMarket } from '../context/MarketContext';
import { nftApi } from '../services/api';
import { MOCK_DATA } from '../data/mockData';
import { NftCard } from '../components/common/NftCard';
import { Link } from 'react-router-dom';
import { Folder, Edit3, Wallet, X, Clock, Gavel } from 'lucide-react';

const FILTERS = ['All', 'Artwork', 'Book'];

export const HomePage = () => {
  const { openBidModal, addToast, activeBids, cancelBidOffer } = useMarket();
  const [activeFilter, setActiveFilter] = useState('All');
  const [trendingItems, setTrendingItems] = useState(MOCK_DATA.trendingBids);
  const [activities, setActivities] = useState(MOCK_DATA.recentActivities);
  const [creators, setCreators] = useState(MOCK_DATA.topCreators);
  const [featured, setFeatured] = useState(MOCK_DATA.featuredNft);
  const [hoveredEthPoint, setHoveredEthPoint] = useState(null);
  const [hoveredStatSegment, setHoveredStatSegment] = useState(null);
  const [selectedHomeBids, setSelectedHomeBids] = useState(new Set());

  const handleSelectAllHome = (e) => {
    if (e.target.checked) {
      setSelectedHomeBids(new Set(activeBids.map((b) => b.id)));
    } else {
      setSelectedHomeBids(new Set());
    }
  };

  const handleSelectOneHome = (id) => {
    setSelectedHomeBids((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await nftApi.getMarketOverview();
      if (data) {
        if (data.featured) setFeatured(data.featured);
        if (Array.isArray(data.activities)) setActivities(data.activities);
        if (Array.isArray(data.creators)) setCreators(data.creators);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      const items = await nftApi.getTrendingNfts(activeFilter);
      if (Array.isArray(items)) {
        setTrendingItems(items);
      }
    };
    fetchTrending();
  }, [activeFilter]);

  const handleToggleCreatorFollow = (id) => {
    setCreators((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = !c.isFollowed;
          addToast(`${next ? 'Now following' : 'Unfollowed'} ${c.name}`, 'info');
          return { ...c, isFollowed: next };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ==========================================
          HERO BANNER - FIGMA FRAME 1
          Two side-by-side cards:
          Left: Cosmic Nebula Card
          Right: Spotlight Birghten LQ Card
          ========================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Nebula Banner Card */}
        <div
          className="lg:col-span-7 rounded-[22px] p-5 sm:p-7 lg:p-8 flex flex-col justify-between relative overflow-hidden bg-cover bg-center shadow-lg min-h-[220px] sm:min-h-[240px]"
          style={{
            backgroundImage: "url('/assets/images/hero_nebula_bg.jpg')",
          }}
        >
          {/* Subtle gradient overlay to enhance legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0820]/75 via-[#150E36]/45 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-2 max-w-[440px]">
            <h1 className="text-[19px] sm:text-[28px] lg:text-[34px] font-extrabold text-white font-heading leading-tight">
              Discover, Collect, Sell <br className="hidden sm:inline" />
              and Create your NFT
            </h1>
            <p className="text-[11.5px] sm:text-[12.5px] text-[#D0CEE2] leading-relaxed max-w-[420px]">
              Digital marketplace for crypto collectibles and non fungible tokens
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 pt-5 sm:pt-6">
            <Link
              to="/bids"
              className="h-[38px] sm:h-[40px] px-6 sm:px-7 rounded-xl bg-[#6F4FF2] hover:bg-[#5E3EE0] text-white text-[12.5px] sm:text-[13px] font-semibold flex items-center justify-center transition-all hover:scale-[1.02] shadow-[0_0_16px_rgba(111,79,242,0.4)]"
            >
              Explore
            </Link>
            <button
              onClick={() => addToast('Create NFT modal ready', 'info')}
              className="h-[38px] sm:h-[40px] px-6 sm:px-7 rounded-xl bg-[#E03E52] hover:bg-[#C93245] text-white text-[12.5px] sm:text-[13px] font-semibold transition-all hover:scale-[1.02] shadow-[0_0_16px_rgba(224,62,82,0.35)]"
            >
              Create
            </button>
          </div>
        </div>

        {/* Right Spotlight NFT Card */}
        <div className="lg:col-span-5 theme-card bg-[#1B1736] rounded-[22px] p-4 sm:p-5 border border-white/5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center gap-3.5 sm:gap-4">
            {/* Fiery Artwork Image */}
            <div className="w-[110px] sm:w-[145px] aspect-[4/3] rounded-[14px] overflow-hidden bg-[#120F26] flex-shrink-0">
              <img
                src="/assets/images/birghten_lq.jpg"
                alt="Birghten LQ"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info Column */}
            <div className="flex-1 min-w-0">
              {/* Creator row */}
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-white/10 shadow-sm">
                  <img
                    src="/assets/images/figma_creator_avatar.png"
                    alt="John Abraham"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <span className="text-[12.5px] font-medium text-white flex items-center gap-1.5 truncate">
                  John Abraham
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] flex-shrink-0" />
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[15px] sm:text-[16px] font-bold text-white font-heading truncate mb-2">
                Birghten LQ
              </h3>

              {/* Meta row */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[#8B8AA0] block text-[10.5px]">Auction time</span>
                  <span className="text-white font-medium text-[11.5px]">{featured?.timeRemaining || '3h 1m 50s'}</span>
                </div>
                <div>
                  <span className="text-[#8B8AA0] block text-[10.5px]">
                    Current Bid : <span className="text-[#6F4FF2] font-semibold">0.05 ETH</span>
                  </span>
                  <span className="text-[#8B8AA0] text-[11px] block">0.15 ETH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-3 mt-1">
            <button
              onClick={() => openBidModal(featured || { id: 'birghten-lq', title: 'Birghten LQ', currentBid: '0.05 ETH', image: '/assets/images/birghten_lq.jpg' })}
              className="h-[38px] rounded-xl bg-[#6F4FF2] hover:bg-[#5E3EE0] text-white text-[12.5px] font-semibold transition-all hover:scale-[1.01]"
            >
              Place a Bid
            </button>
            <button
              onClick={() => addToast('Opening Birghten LQ details', 'info')}
              className="h-[38px] rounded-xl bg-[#E03E52] hover:bg-[#C93245] text-white text-[12.5px] font-semibold transition-all hover:scale-[1.01]"
            >
              Details
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          TRENDING BIDS - 8 CARDS (2 ROWS OF 4)
          ========================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="theme-text text-[20px] font-bold text-white font-heading">
            Trending Bids
          </h2>

          <div className="flex items-center gap-2">
            {FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                  activeFilter === cat
                    ? 'bg-[#6F4FF2] text-white shadow-sm'
                    : 'text-[#8B8AA0] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.isArray(trendingItems) && trendingItems.map((nft) => (
            <NftCard key={nft.id} nft={nft} showLikeBtn={false} showCategory={false} />
          ))}
        </div>
      </section>

      {/* ==========================================
          ANALYTICS ROW - FIGMA FRAME 2 (3 Columns)
          1) Trending Bids (3 Stacked Metric Cards)
          2) ETH Price Chart
          3) Statistics Donut
          ========================================== */}
      <section id="analytics-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {/* Column 1: Trending Bids Metric Cards (3 cols on desktop, 1 col on tablet) */}
        <div className="md:col-span-1 lg:col-span-3 flex flex-col justify-between min-h-[300px] space-y-3.5">
          <h3 className="theme-text text-[17px] font-bold text-white font-heading">
            Trending Bids
          </h3>

          <div className="flex-1 flex flex-col justify-between gap-3">
            {/* Card 1: 24K Artworks */}
            <div className="theme-card bg-[#1B1736] rounded-[20px] p-4 border border-white/5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6F4FF2] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <Folder size={18} />
                </div>
                <div>
                  <span className="theme-text block text-[16px] font-extrabold text-white font-heading leading-tight">
                    24K
                  </span>
                  <span className="theme-muted text-[11.5px] text-[#8B8AA0]">Artworks</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#22C55E]">
                +168.001%
              </span>
            </div>

            {/* Card 2: 89 Auction */}
            <div className="theme-card bg-[#1B1736] rounded-[20px] p-4 border border-white/5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E03E52] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <Edit3 size={18} />
                </div>
                <div>
                  <span className="theme-text block text-[16px] font-extrabold text-white font-heading leading-tight">
                    89
                  </span>
                  <span className="theme-muted text-[11.5px] text-[#8B8AA0]">Auction</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#E03E52]">
                -168.001%
              </span>
            </div>

            {/* Card 3: 82K Creators */}
            <div className="theme-card bg-[#1B1736] rounded-[20px] p-4 border border-white/5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <Wallet size={18} />
                </div>
                <div>
                  <span className="theme-text block text-[16px] font-extrabold text-white font-heading leading-tight">
                    82K
                  </span>
                  <span className="theme-muted text-[11.5px] text-[#8B8AA0]">Creators</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#22C55E]">
                +168.001%
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: ETH Price Chart (6 cols on desktop, full row on tablet) */}
        <div className="md:col-span-2 lg:col-span-6 md:order-last lg:order-none theme-card bg-[#1B1736] rounded-[24px] p-6 lg:p-7 border border-white/5 flex flex-col justify-between shadow-sm min-h-[310px] relative">
          <div className="flex items-center justify-between mb-1">
            <h3 className="theme-text text-[17px] sm:text-[18px] font-bold text-white font-heading">
              ETH Price
            </h3>
            {hoveredEthPoint !== null && (
              <span className="text-[12px] font-semibold text-[#8B6DF8] bg-[#6F4FF2]/20 px-2.5 py-0.5 rounded-full border border-[#6F4FF2]/30 animate-pulse">
                {[
                  { price: '0.00 ETH' },
                  { price: '105.40 ETH' },
                  { price: '90.20 ETH' },
                  { price: '155.80 ETH' },
                  { price: '135.10 ETH' },
                  { price: '208.90 ETH' },
                  { price: '120.30 ETH' },
                  { price: '92.50 ETH' },
                ][hoveredEthPoint]?.price}
              </span>
            )}
          </div>

          {/* SVG Chart with Y-Axis matching user's exact design */}
          <div className="flex items-center gap-3 h-[205px] w-full pt-1">
            {/* Y-axis labels: 350 to 0 perfectly spaced */}
            <div className="flex flex-col justify-between h-[190px] text-[11px] text-[#7B74A3] font-medium select-none pr-1">
              <span>350</span>
              <span>300</span>
              <span>250</span>
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>

            {/* Chart SVG with translucent area gradient underneath and solid purple vertex nodes */}
            <div className="flex-1 h-[190px] relative">
              <svg viewBox="0 0 460 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="ethAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7052F5" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#7052F5" stopOpacity="0.01" />
                  </linearGradient>
                </defs>

                {/* Shaded Area underneath the curve */}
                <path
                  d="M 8,190 L 65,138 L 122,146 L 180,113 L 240,124 L 306,85 L 368,133 L 422,146 L 458,129 L 458,190 L 8,190 Z"
                  fill="url(#ethAreaGradient)"
                />

                {/* Line Path */}
                <path
                  d="M 8,190 L 65,138 L 122,146 L 180,113 L 240,124 L 306,85 L 368,133 L 422,146 L 458,129"
                  fill="none"
                  stroke="#7052F5"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Point 0: Origin vertex with soft halo */}
                <circle
                  cx="8"
                  cy="190"
                  r="7"
                  fill="none"
                  stroke="#7052F5"
                  strokeWidth="1.2"
                  opacity="0.5"
                />
                <circle
                  cx="8"
                  cy="190"
                  r="4.5"
                  fill="#7052F5"
                  className="cursor-pointer transition-transform hover:scale-150"
                  onMouseEnter={() => setHoveredEthPoint(0)}
                  onMouseLeave={() => setHoveredEthPoint(null)}
                />

                {/* Vertex Points matching user's image (Solid purple, no white stroke) */}
                {[
                  [65, 138],
                  [122, 146],
                  [180, 113],
                  [240, 124],
                  [306, 85],
                  [368, 133],
                  [422, 146],
                ].map(([cx, cy], i) => (
                  <circle
                    key={i + 1}
                    cx={cx}
                    cy={cy}
                    r={hoveredEthPoint === i + 1 ? "6" : "4.5"}
                    fill="#7052F5"
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredEthPoint(i + 1)}
                    onMouseLeave={() => setHoveredEthPoint(null)}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Column 3: Statistics Donut Chart (3 cols on desktop, 1 col on tablet) */}
        <div className="md:col-span-1 lg:col-span-3 theme-card bg-[#1B1736] rounded-[24px] p-6 lg:p-7 border border-white/5 flex flex-col justify-between shadow-sm min-h-[310px]">
          <div className="flex items-center justify-between">
            <h3 className="theme-text text-[17px] sm:text-[18px] font-bold text-white font-heading">
              Statistics
            </h3>
            {hoveredStatSegment && (
              <span className="text-[11.5px] font-semibold text-[#8B6DF8] bg-[#6F4FF2]/20 px-2 py-0.5 rounded-full border border-[#6F4FF2]/30">
                {hoveredStatSegment === 'sold' ? '65% (156)' : '35% (84)'}
              </span>
            )}
          </div>

          {/* Donut Chart matching user's exact design */}
          <div className="flex items-center justify-center py-2 flex-1">
            <svg viewBox="0 0 180 180" className="w-[160px] h-[160px]">
              {/* Left Segment: Hollow (Artwork CanCel) with White Border & Top/Bottom Dividers */}
              <path
                d="M 90,24 A 66 66 0 0 0 90,156 L 90,136 A 46 46 0 0 1 90,44 Z"
                fill="transparent"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinejoin="round"
                className="cursor-pointer transition-opacity hover:opacity-80"
                onMouseEnter={() => setHoveredStatSegment('cancel')}
                onMouseLeave={() => setHoveredStatSegment(null)}
              />

              {/* Right Segment: Solid Purple (Artwork Sold) with White Border & Top/Bottom Dividers */}
              <path
                d="M 90,24 A 66 66 0 0 1 90,156 L 90,136 A 46 46 0 0 0 90,44 Z"
                fill="#7052F5"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinejoin="round"
                className="cursor-pointer transition-opacity hover:opacity-90"
                onMouseEnter={() => setHoveredStatSegment('sold')}
                onMouseLeave={() => setHoveredStatSegment(null)}
              />
            </svg>
          </div>

          {/* Legend matching user's image exactly */}
          <div className="flex items-center justify-center gap-6 pt-2 select-none">
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onMouseEnter={() => setHoveredStatSegment('sold')}
              onMouseLeave={() => setHoveredStatSegment(null)}
            >
              <span className="w-3.5 h-3.5 rounded-full bg-[#7052F5] inline-block flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="theme-muted text-[12.5px] text-[#8B8AA0] font-medium group-hover:text-white transition-colors">
                Artwork Sold
              </span>
            </div>
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onMouseEnter={() => setHoveredStatSegment('cancel')}
              onMouseLeave={() => setHoveredStatSegment(null)}
            >
              <span className="w-3.5 h-3.5 rounded-full border-[1.8px] border-white inline-block flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="theme-muted text-[12.5px] text-[#8B8AA0] font-medium group-hover:text-white transition-colors">
                Artwork CanCel
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          BOTTOM ROW - RECENT ACTIVITY & TOP CREATORS
          ========================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Activity */}
        <div className="theme-card bg-[#1B1736] rounded-[22px] p-6 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="theme-text text-[16px] font-bold text-white font-heading">
              Recent Activity
            </h3>
            <button
              onClick={() => addToast('Displaying real-time ledger events', 'info')}
              className="text-[12px] text-[#6F4FF2] hover:underline transition-colors"
            >
              See more
            </button>
          </div>

          <div className="space-y-1">
            {Array.isArray(activities) && activities.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/10 shadow-sm">
                    <img
                      src={act.avatar}
                      alt={act.user}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => { e.target.src = '/assets/images/figma_creator_avatar.png'; }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h5 className="theme-text text-[13px] font-bold text-white leading-snug">{act.user}</h5>
                    <p className="theme-muted text-[11.5px] text-[#8B8AA0] truncate">{act.action}</p>
                  </div>
                </div>
                <span className="theme-muted text-[11px] text-[#8B8AA0] whitespace-nowrap ml-3">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Creators (2 Columns x 4 Rows = 8 Creators) */}
        <div className="theme-card bg-[#1B1736] rounded-[22px] p-6 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="theme-text text-[16px] font-bold text-white font-heading">
              Top Creators
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {Array.isArray(creators) && creators.map((c) => (
              <div
                key={c.id}
                className="theme-inner-card flex items-center justify-between p-2.5 rounded-xl bg-[#120F26]/80 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/10 shadow-sm">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => { e.target.src = '/assets/images/figma_creator_avatar.png'; }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h5 className="theme-text text-[12.5px] font-bold text-white leading-tight truncate">{c.name}</h5>
                    <span className="theme-muted text-[11px] text-[#8B8AA0]">{c.items}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleCreatorFollow(c.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all flex-shrink-0 ${
                    c.isFollowed
                      ? 'bg-[#6F4FF2] text-white border-[#6F4FF2]'
                      : 'border-white/20 text-white hover:border-white/40'
                  }`}
                >
                  {c.isFollowed ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 5: ACTIVE BIDS - FIGMA FRAME 3 (HOME SCROLL DOWN)
          ========================================== */}
      <section id="active-bids-section" className="space-y-4 pt-2">
        <h2 className="theme-text text-[19px] sm:text-[21px] font-bold text-white font-heading">
          Active Bids
        </h2>

        {/* ── Mobile View: Compact Responsive Cards (< 640px) ── */}
        <div className="sm:hidden space-y-3">
          <div className="flex items-center justify-between px-2 text-[12px] text-[#8B8AA0]">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={selectedHomeBids.size === activeBids.length && activeBids.length > 0}
                  onChange={handleSelectAllHome}
                />
              </span>
              <span>Select All</span>
            </label>
            <span>{activeBids.length} Active</span>
          </div>

          {Array.isArray(activeBids) && activeBids.map((bid) => (
            <div
              key={bid.id}
              className={`theme-card rounded-[18px] p-4 bg-[#1B1736] border space-y-3 transition-all ${
                selectedHomeBids.has(bid.id)
                  ? 'border-[#6F4FF2]/60 bg-[#1B1736]/90'
                  : 'border-white/5'
              }`}
            >
              {/* Top row: Checkbox, Artwork Thumbnail Capsule, Title, Creator, Cancel */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <label className="custom-checkbox flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={selectedHomeBids.has(bid.id)}
                      onChange={() => handleSelectOneHome(bid.id)}
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
            <div className="grid grid-cols-12 gap-3 text-[11.5px] font-semibold text-[#8B8AA0] px-5 py-2 select-none">
              <div className="col-span-1">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedHomeBids.size === activeBids.length && activeBids.length > 0}
                    onChange={handleSelectAllHome}
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

            {/* Table Rows (Each row is an individual card matching Figma) */}
            {Array.isArray(activeBids) && activeBids.map((bid) => (
              <div
                key={bid.id}
                className={`theme-card grid grid-cols-12 gap-3 items-center text-[13px] px-5 py-3.5 rounded-[18px] bg-[#1B1736] border transition-all ${
                  selectedHomeBids.has(bid.id)
                    ? 'border-[#6F4FF2]/50 bg-[#1B1736]/95'
                    : 'border-white/5 hover:border-white/10 hover:bg-[#201B40]'
                }`}
              >
                <div className="col-span-1">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedHomeBids.has(bid.id)}
                      onChange={() => handleSelectOneHome(bid.id)}
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
          </div>
        </div>
      </section>
    </div>
  );
};
