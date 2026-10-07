/**
 * NFT Marketplace - Mock Data & Initial State
 * Matches Figma Community Design exactly
 */

export const MOCK_DATA = {
  featuredNft: {
    id: "featured-1",
    title: "Birghten LQ",
    creator: {
      name: "John Abraham",
      avatar: "/assets/images/figma_creator_avatar.png",
      tag: "@john_abraham"
    },
    currentBid: "0.05 ETH",
    highestBid: "0.15 ETH",
    timeRemaining: "3h 1m 50s",
    image: "/assets/images/birghten_lq.jpg"
  },

  trendingBids: [
    {
      id: "wave-1",
      title: "Liquid Wave",
      image: "/assets/images/liquid_wave_1.jpg",
      currentBid: "0.05 ETH",
      highestBid: "0.15 ETH",
      timeRemaining: "3h 1m 50s",
      category: "Artwork"
    },
    {
      id: "wave-2",
      title: "Liquid Wave",
      image: "/assets/images/liquid_wave_2.jpg",
      currentBid: "0.05 ETH",
      highestBid: "0.15 ETH",
      timeRemaining: "3h 1m 50s",
      category: "Artwork"
    },
    {
      id: "wave-3",
      title: "Liquid Wave",
      image: "/assets/images/liquid_wave_3.jpg",
      currentBid: "0.05 ETH",
      highestBid: "0.15 ETH",
      timeRemaining: "3h 1m 50s",
      category: "Artwork"
    },
    {
      id: "wave-4",
      title: "Liquid Wave",
      image: "/assets/images/liquid_wave_4.jpg",
      currentBid: "0.05 ETH",
      highestBid: "0.15 ETH",
      timeRemaining: "3h 1m 50s",
      category: "Artwork"
    },
    {
      id: "wave-5",
      title: "Liquid Wave",
      image: "/assets/images/liquid_wave_1.jpg",
      currentBid: "0.05 ETH",
      highestBid: "0.15 ETH",
      timeRemaining: "3h 1m 50s",
      category: "Artwork"
    },
    {
      id: "wave-6",
      title: "Liquid Wave",
      image: "/assets/images/liquid_wave_2.jpg",
      currentBid: "0.05 ETH",
      highestBid: "0.15 ETH",
      timeRemaining: "3h 1m 50s",
      category: "Artwork"
    },
    {
      id: "wave-7",
      title: "Liquid Wave",
      image: "/assets/images/liquid_wave_3.jpg",
      currentBid: "0.05 ETH",
      highestBid: "0.15 ETH",
      timeRemaining: "3h 1m 50s",
      category: "Artwork"
    },
    {
      id: "wave-8",
      title: "Liquid Wave",
      image: "/assets/images/liquid_wave_4.jpg",
      currentBid: "0.05 ETH",
      highestBid: "0.15 ETH",
      timeRemaining: "3h 1m 50s",
      category: "Artwork"
    }
  ],

  recentActivities: [
    {
      id: "act-1",
      user: "Papaya",
      avatar: "/assets/images/figma_creator_avatar.png",
      action: "Purchase by you for 0.05 ETH",
      time: "12 mins ago"
    },
    {
      id: "act-2",
      user: "Papaya",
      avatar: "/assets/images/figma_creator_avatar.png",
      action: "0.06ETH Received",
      time: "12 mins ago"
    },
    {
      id: "act-3",
      user: "Papaya",
      avatar: "/assets/images/figma_creator_avatar.png",
      action: "Started Following you",
      time: "12 mins ago"
    },
    {
      id: "act-4",
      user: "Papaya",
      avatar: "/assets/images/figma_creator_avatar.png",
      action: "Has been sold by 12.75ETH",
      time: "12 mins ago"
    },
    {
      id: "act-5",
      user: "Papaya",
      avatar: "/assets/images/figma_creator_avatar.png",
      action: "Purchase by you for 0.05 ETH",
      time: "12 mins ago"
    }
  ],

  topCreators: [
    { id: "c-1", name: "Papaya", items: "60 Items", avatar: "/assets/images/figma_creator_avatar.png", isFollowed: false },
    { id: "c-2", name: "Papaya", items: "60 Items", avatar: "/assets/images/figma_creator_avatar.png", isFollowed: false },
    { id: "c-3", name: "Papaya", items: "60 Items", avatar: "/assets/images/figma_creator_avatar.png", isFollowed: false },
    { id: "c-4", name: "Papaya", items: "60 Items", avatar: "/assets/images/figma_creator_avatar.png", isFollowed: false },
    { id: "c-5", name: "Papaya", items: "60 Items", avatar: "/assets/images/figma_creator_avatar.png", isFollowed: false },
    { id: "c-6", name: "Papaya", items: "60 Items", avatar: "/assets/images/figma_creator_avatar.png", isFollowed: false },
    { id: "c-7", name: "Papaya", items: "60 Items", avatar: "/assets/images/figma_creator_avatar.png", isFollowed: false },
    { id: "c-8", name: "Papaya", items: "60 Items", avatar: "/assets/images/figma_creator_avatar.png", isFollowed: false }
  ],

  bidsMetrics: [
    { id: "bm-1", number: "24K", label: "Artworks", color: "purple" },
    { id: "bm-2", number: "82K", label: "Auction", color: "green" },
    { id: "bm-3", number: "200", label: "Creators", color: "yellow" },
    { id: "bm-4", number: "89", label: "Canceled", color: "coral" }
  ],

  activeBids: [
    {
      id: "bid-1",
      title: "Cute Cube Cool",
      creator: "John Abraham",
      image: "/assets/images/bid_thumb_1.png",
      openPrice: "0.0025 ETH",
      yourOffer: "0.0025 ETH",
      recentOffer: { avatar: "/assets/images/figma_suit_avatar.png", amount: "0.0025 ETH" },
      timeLeft: "2 Hours 1 min 30s"
    },
    {
      id: "bid-2",
      title: "Liquid Wave",
      creator: "John Abraham",
      image: "/assets/images/bid_thumb_2.png",
      openPrice: "0.0025 ETH",
      yourOffer: "0.0025 ETH",
      recentOffer: { avatar: "/assets/images/figma_suit_avatar.png", amount: "0.0025 ETH" },
      timeLeft: "2 Hours 1 min 30s"
    },
    {
      id: "bid-3",
      title: "Cute Cube Cool",
      creator: "John Abraham",
      image: "/assets/images/bid_thumb_3.png",
      openPrice: "0.0025 ETH",
      yourOffer: "0.0025 ETH",
      recentOffer: { avatar: "/assets/images/figma_suit_avatar.png", amount: "0.0025 ETH" },
      timeLeft: "2 Hours 1 min 30s"
    },
    {
      id: "bid-4",
      title: "Liquid Wave",
      creator: "John Abraham",
      image: "/assets/images/bid_thumb_4.png",
      openPrice: "0.0025 ETH",
      yourOffer: "0.0025 ETH",
      recentOffer: { avatar: "/assets/images/figma_suit_avatar.png", amount: "0.0025 ETH" },
      timeLeft: "2 Hours 1 min 30s"
    },
    {
      id: "bid-5",
      title: "Liquid Wave",
      creator: "John Abraham",
      image: "/assets/images/bid_thumb_5.png",
      openPrice: "0.0025 ETH",
      yourOffer: "0.0025 ETH",
      recentOffer: { avatar: "/assets/images/figma_suit_avatar.png", amount: "0.0025 ETH" },
      timeLeft: "2 Hours 1 min 30s"
    }
  ],

  savedArtworks: [
    { id: "s-1", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "s-2", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "s-3", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "s-4", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "s-5", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "s-6", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "s-7", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "s-8", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" }
  ],

  collectionArtworks: [
    { id: "col-1", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "col-2", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "col-3", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "col-4", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "col-5", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "col-6", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "col-7", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" },
    { id: "col-8", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", time: "3h 1m 50s", currentBid: "0.05 ETH", highestBid: "0.15 ETH", category: "Artwork" }
  ],

  followingCreators: [
    { id: "fol-1", name: "Papaya", items: "60 Items", avatar: "/assets/images/figma_creator_avatar.png" },
    { id: "fol-2", name: "Papaya", items: "60 Items", avatar: "/assets/images/figma_creator_avatar.png" },
    { id: "fol-3", name: "Papaya", items: "60 Items", avatar: "/assets/images/figma_creator_avatar.png" },
    { id: "fol-4", name: "Papaya", items: "60 Items", avatar: "/assets/images/figma_creator_avatar.png" }
  ],

  profileBoughtArtworks: [
    { id: "pb-1", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", creatorAvatar: "/assets/images/figma_creator_avatar.png" },
    { id: "pb-2", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", creatorAvatar: "/assets/images/figma_creator_avatar.png" },
    { id: "pb-3", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", creatorAvatar: "/assets/images/figma_creator_avatar.png" },
    { id: "pb-4", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg", creatorAvatar: "/assets/images/figma_creator_avatar.png" }
  ],

  profileCollections: [
    { id: "pc-1", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg" },
    { id: "pc-2", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg" },
    { id: "pc-3", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg" },
    { id: "pc-4", title: "Liquid Wave", image: "/assets/images/liquid_wave_1.jpg" }
  ]
};
