import axios from 'axios';
import { MOCK_DATA } from '../data/mockData';

// Check if a real backend API URL is configured; otherwise use mock data
const hasLiveBackend = Boolean(import.meta.env.VITE_API_BASE_URL);

// Axios instance configured for NFT Marketplace
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const walletToken = localStorage.getItem('nft_wallet_token');
    if (walletToken) {
      config.headers.Authorization = `Bearer ${walletToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: reject HTML fallback returned by dev server
apiClient.interceptors.response.use(
  (response) => {
    if (typeof response.data === 'string' && (response.data.includes('<!DOCTYPE') || response.data.includes('<html'))) {
      return Promise.reject(new Error('HTML fallback received instead of JSON'));
    }
    return response;
  },
  (error) => Promise.reject(error)
);

// Helper for simulated network latency
const simulateNetwork = (data, delay = 100) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const nftApi = {
  // Fetch home / market overview
  getMarketOverview: async () => {
    if (!hasLiveBackend) {
      return simulateNetwork({
        featured: MOCK_DATA.featuredNft,
        trending: MOCK_DATA.trendingBids,
        activities: MOCK_DATA.recentActivities,
        creators: MOCK_DATA.topCreators,
      });
    }
    try {
      const res = await apiClient.get('/market/overview');
      if (typeof res.data === 'string') throw new Error('Invalid JSON');
      return res.data;
    } catch {
      return simulateNetwork({
        featured: MOCK_DATA.featuredNft,
        trending: MOCK_DATA.trendingBids,
        activities: MOCK_DATA.recentActivities,
        creators: MOCK_DATA.topCreators,
      });
    }
  },

  // Fetch trending NFTs with optional category
  getTrendingNfts: async (category = 'All') => {
    if (!hasLiveBackend) {
      let items = [...MOCK_DATA.trendingBids];
      if (category !== 'All') {
        items = items.filter((i) => i.category === category);
      }
      return simulateNetwork(items);
    }
    try {
      const res = await apiClient.get('/nfts/trending', { params: { category } });
      if (typeof res.data === 'string') throw new Error('Invalid JSON');
      return res.data;
    } catch {
      let items = [...MOCK_DATA.trendingBids];
      if (category !== 'All') {
        items = items.filter((i) => i.category === category);
      }
      return simulateNetwork(items);
    }
  },

  // Fetch active bids list
  getActiveBids: async () => {
    if (!hasLiveBackend) {
      return simulateNetwork({
        metrics: MOCK_DATA.bidsMetrics,
        bids: MOCK_DATA.activeBids,
      });
    }
    try {
      const res = await apiClient.get('/bids/active');
      if (typeof res.data === 'string') throw new Error('Invalid JSON');
      return res.data;
    } catch {
      return simulateNetwork({
        metrics: MOCK_DATA.bidsMetrics,
        bids: MOCK_DATA.activeBids,
      });
    }
  },

  // Fetch saved artworks
  getSavedArtworks: async () => {
    if (!hasLiveBackend) {
      return simulateNetwork(MOCK_DATA.savedArtworks);
    }
    try {
      const res = await apiClient.get('/user/saved');
      if (typeof res.data === 'string') throw new Error('Invalid JSON');
      return res.data;
    } catch {
      return simulateNetwork(MOCK_DATA.savedArtworks);
    }
  },

  // Fetch collections
  getCollections: async (category = 'All') => {
    if (!hasLiveBackend) {
      let items = [...MOCK_DATA.collectionArtworks];
      if (category !== 'All') {
        items = items.filter((i) => i.category === category);
      }
      return simulateNetwork(items);
    }
    try {
      const res = await apiClient.get('/collections', { params: { category } });
      if (typeof res.data === 'string') throw new Error('Invalid JSON');
      return res.data;
    } catch {
      let items = [...MOCK_DATA.collectionArtworks];
      if (category !== 'All') {
        items = items.filter((i) => i.category === category);
      }
      return simulateNetwork(items);
    }
  },

  // Fetch profile information
  getProfileData: async () => {
    if (!hasLiveBackend) {
      return simulateNetwork({
        user: {
          name: "John Smith",
          email: "johnsmith@xtrader.io",
          avatar: "/assets/images/figma_header_avatar.png",
          isVerified: false,
          wallet: "0x71C...49A2",
          balance: 4.85,
        },
        following: MOCK_DATA.followingCreators,
        bought: MOCK_DATA.profileBoughtArtworks,
        collections: MOCK_DATA.profileCollections,
      });
    }
    try {
      const res = await apiClient.get('/user/profile');
      if (typeof res.data === 'string') throw new Error('Invalid JSON');
      return res.data;
    } catch {
      return simulateNetwork({
        user: {
          name: "John Smith",
          email: "johnsmith@xtrader.io",
          avatar: "/assets/images/figma_header_avatar.png",
          isVerified: false,
          wallet: "0x71C...49A2",
          balance: 4.85,
        },
        following: MOCK_DATA.followingCreators,
        bought: MOCK_DATA.profileBoughtArtworks,
        collections: MOCK_DATA.profileCollections,
      });
    }
  },

  // Place a new bid
  placeBid: async (nftId, amount) => {
    if (!hasLiveBackend) {
      return simulateNetwork({
        success: true,
        nftId,
        amount,
        txHash: `0x${Math.random().toString(16).substring(2, 10)}...`,
        timestamp: new Date().toISOString(),
      });
    }
    try {
      const res = await apiClient.post(`/nfts/${nftId}/bid`, { amount });
      return res.data;
    } catch {
      return simulateNetwork({
        success: true,
        nftId,
        amount,
        txHash: `0x${Math.random().toString(16).substring(2, 10)}...`,
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Cancel an offer
  cancelOffer: async (bidId) => {
    if (!hasLiveBackend) {
      return simulateNetwork({ success: true, bidId });
    }
    try {
      const res = await apiClient.delete(`/bids/${bidId}`);
      return res.data;
    } catch {
      return simulateNetwork({ success: true, bidId });
    }
  }
};

export default apiClient;
