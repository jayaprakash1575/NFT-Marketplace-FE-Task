import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { NftCard } from '../components/common/NftCard';
import { nftApi } from '../services/api';
import { useMarket } from '../context/MarketContext';
import { motion } from 'framer-motion';
import { LayoutGrid, List, Search } from 'lucide-react';

const FILTERS = ['All', 'Artwork', 'Book'];

export const CollectionsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [collectionArtworks, setCollectionArtworks] = useState([]);
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCollections = async () => {
      const items = await nftApi.getCollections(activeCategory);
      if (Array.isArray(items)) {
        setCollectionArtworks(items);
      }
    };
    fetchCollections();
  }, [activeCategory]);

  const filtered = Array.isArray(collectionArtworks)
    ? collectionArtworks.filter((nft) =>
        nft.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Collections"
        subtitle="Welcome Collections Page"
        breadcrumb="Collections"
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
          {FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#6F4FF2] text-white shadow-sm'
                  : 'theme-card bg-[#1B1736] text-[#8B8AA0] hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right: Search + View toggle */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8B8AA0]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Here"
              className="theme-input w-full h-[38px] bg-[#1B1736] border border-white/5 rounded-xl pl-9 pr-4 text-[12.5px] text-white placeholder-[#8B8AA0] focus:outline-none focus:border-[#6F4FF2] transition-colors"
            />
          </div>

          <div className="theme-card flex items-center gap-1.5 bg-[#1B1736] border border-white/5 rounded-xl p-1 flex-shrink-0">
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-lg transition-colors ${view === 'grid' ? 'bg-[#6F4FF2] text-white' : 'text-[#8B8AA0] hover:text-white'}`}
              title="Grid view"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded-lg transition-colors ${view === 'list' ? 'bg-[#6F4FF2] text-white' : 'text-[#8B8AA0] hover:text-white'}`}
              title="List view"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* NFT Grid / List */}
      <motion.div
        key={`${activeCategory}-${view}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={
          view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
            : 'flex flex-col gap-3'
        }
      >
        {filtered.map((nft) =>
          view === 'grid' ? (
            <NftCard key={nft.id} nft={nft} showLikeBtn={true} />
          ) : (
            <CollectionListItem key={nft.id} nft={nft} />
          )
        )}
      </motion.div>

      {filtered.length === 0 && (
        <div className="theme-card flex flex-col items-center justify-center py-24 text-center space-y-4 bg-[#1B1736] rounded-[22px] border border-white/5">
          <div className="w-16 h-16 rounded-full bg-[#1B1736] flex items-center justify-center">
            <LayoutGrid size={28} className="text-[#6E6D82]" />
          </div>
          <div>
            <h3 className="theme-text text-[16px] font-bold text-white font-heading">No collections found</h3>
            <p className="theme-muted text-[13px] text-[#8B8AA0] mt-1">Try a different category or search term.</p>
          </div>
        </div>
      )}
    </div>
  );
};

const CollectionListItem = ({ nft }) => {
  const { openBidModal } = useMarket();

  return (
    <div className="theme-card flex items-center gap-4 p-3.5 bg-[#1B1736] border border-white/5 rounded-[16px] hover:border-white/10 transition-all">
      <img
        src={nft.image}
        alt={nft.title}
        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
        onError={(e) => { e.target.src = '/assets/images/liquid_wave_1.jpg'; }}
      />
      <div className="flex-1 min-w-0">
        <h4 className="theme-text text-[14px] font-bold text-white truncate">{nft.title}</h4>
        <p className="theme-muted text-[12px] text-[#8B8AA0]">Auction ends in {nft.time}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <span className="theme-muted block text-[11px] text-[#8B8AA0]">Current Bid</span>
        <span className="text-[13px] font-bold text-[#6F4FF2] font-mono">{nft.currentBid}</span>
      </div>
      <button
        onClick={() => openBidModal(nft)}
        className="px-4 py-2 rounded-xl bg-[#6F4FF2] hover:bg-[#5E3EE0] text-white text-[12.5px] font-semibold transition-colors flex-shrink-0"
      >
        Bid
      </button>
    </div>
  );
};
