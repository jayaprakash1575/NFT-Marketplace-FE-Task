import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_DATA } from '../data/mockData';
import { nftApi } from '../services/api';

const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('nft_theme') || 'dark');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');

  // User & Wallet
  const [user, setUser] = useState({
    name: "John Smith",
    email: "johnsmith@xtrader.io",
    avatar: "/assets/images/figma_header_avatar.png",
    wallet: "0x71C...49A2",
    balance: 4.85,
    isVerified: false,
  });

  // Bids state
  const [activeBids, setActiveBids] = useState(MOCK_DATA.activeBids);
  const [bidsMetrics] = useState(MOCK_DATA.bidsMetrics);

  // Modal state
  const [biddingNft, setBiddingNft] = useState(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  // Toasts notification system
  const [toasts, setToasts] = useState([]);

  // Mobile Menu Drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Saved items
  const [savedIds, setSavedIds] = useState(new Set(['wave-1', 'wave-2', 'wave-3', 'wave-4']));

  // Theme application
  useEffect(() => {
    localStorage.setItem('nft_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    addToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} mode`, 'info');
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const openBidModal = (nft) => {
    setBiddingNft(nft);
    setIsBidModalOpen(true);
  };

  const closeBidModal = () => {
    setIsBidModalOpen(false);
    setBiddingNft(null);
  };

  const submitBid = async (amount) => {
    if (!biddingNft) return;
    if (amount <= (biddingNft.currentBid || 0.0025)) {
      addToast(`Bid must be higher than ${biddingNft.currentBid || 0.0025} ETH`, 'error');
      return false;
    }
    if (amount > user.balance) {
      addToast(`Insufficient balance! Your balance is ${user.balance} ETH`, 'error');
      return false;
    }

    try {
      await nftApi.placeBid(biddingNft.id, amount);
      setUser((prev) => ({ ...prev, balance: parseFloat((prev.balance - 0.001).toFixed(4)) }));
      addToast(`Bid of ${amount} ETH successfully placed on ${biddingNft.title}!`, 'success');
      closeBidModal();
      return true;
    } catch {
      addToast('Failed to place bid. Please try again.', 'error');
      return false;
    }
  };

  const cancelBidOffer = async (bidId) => {
    try {
      await nftApi.cancelOffer(bidId);
      setActiveBids((prev) => prev.filter((b) => b.id !== bidId));
      addToast('Bid offer cancelled', 'info');
    } catch {
      addToast('Failed to cancel offer', 'error');
    }
  };

  const toggleSaveItem = (id) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        addToast('Removed from Saved Items', 'info');
      } else {
        next.add(id);
        addToast('Saved to your favorites ❤️', 'success');
      }
      return next;
    });
  };

  return (
    <MarketContext.Provider
      value={{
        theme,
        toggleTheme,
        searchQuery,
        setSearchQuery,
        user,
        setUser,
        activeBids,
        bidsMetrics,
        biddingNft,
        isBidModalOpen,
        openBidModal,
        closeBidModal,
        submitBid,
        cancelBidOffer,
        toasts,
        addToast,
        savedIds,
        toggleSaveItem,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toggleMobileMenu,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};
