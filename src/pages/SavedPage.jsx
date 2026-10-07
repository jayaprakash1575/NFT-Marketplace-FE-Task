import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { NftCard } from '../components/common/NftCard';
import { nftApi } from '../services/api';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const FILTERS = ['All', 'Artwork', 'Book'];

export const SavedPage = () => {
  const [savedArtworks, setSavedArtworks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSaved = async () => {
      const items = await nftApi.getSavedArtworks();
      if (Array.isArray(items)) {
        setSavedArtworks(items);
      }
    };
    fetchSaved();
  }, []);

  const filtered = Array.isArray(savedArtworks)
    ? savedArtworks.filter((nft) => {
        const matchSearch = nft.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = activeFilter === 'All' || nft.category === activeFilter;
        return matchSearch && matchCategory;
      })
    : [];

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Saved Items"
        subtitle="Welcome Saved Page"
        breadcrumb="Saved"
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium transition-all ${
                activeFilter === f
                  ? 'bg-[#6F4FF2] text-white shadow-sm'
                  : 'theme-card bg-[#1B1736] text-[#8B8AA0] hover:text-white border border-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8B8AA0]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Here"
            className="theme-input w-full h-[38px] bg-[#1B1736] border border-white/5 rounded-xl pl-9 pr-4 text-[12.5px] text-white placeholder-[#8B8AA0] focus:outline-none focus:border-[#6F4FF2] transition-colors"
          />
        </div>
      </div>

      {/* NFT Grid (8 items in 4 columns matching Figma) */}
      {filtered.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {filtered.map((nft) => (
            <motion.div
              key={nft.id}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            >
              <NftCard nft={nft} showLikeBtn={true} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="theme-card flex flex-col items-center justify-center py-24 text-center space-y-3 bg-[#1B1736] rounded-[22px] border border-white/5">
          <h3 className="theme-text text-[16px] font-bold text-white font-heading">No saved items found</h3>
          <p className="theme-muted text-[13px] text-[#8B8AA0]">
            {searchQuery ? 'Try a different search term.' : 'Browse NFTs and heart items to save them here.'}
          </p>
        </div>
      )}
    </div>
  );
};
