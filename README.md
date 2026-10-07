# NFT Marketplace - React & Vite Implementation

A pixel-perfect, responsive Web3 NFT Marketplace dashboard built in strict adherence to the Figma Community Design.

## 🚀 Getting Started

### Development Server
To launch the Vite development server:
```bash
npm run dev
```

### Production Build
To create an optimized production bundle:
```bash
npm run build
```

### Linting
To check code quality with Oxlint:
```bash
npm run lint
```

---

## 🎨 Design Fidelity & Features

### 1. Dual Theme System (Dark Theme & Light Theme)
- Implemented **both Dark Theme and Light Theme** matching the Figma design frames.
- **1-Click Theme Switcher**: Toggle in the top header (Sun ☀️ / Moon 🌙 icon).
- **Persistent Preferences**: Saves selected theme across sessions using `localStorage`.

### 2. Full Page Coverage
- **Dashboard / Home (`/`)**:
  - Cosmic Hero Banner with call-to-actions ("Explore", "Create").
  - Featured NFT Card with live countdown timer, creator avatar, and bidding buttons.
  - **Trending Bids**: 4-column responsive grid with interactive favorites and category filter pills (*All*, *Artwork*, *Book*).
  - **Analytics Row**: Metric cards with positive/negative trend pills.
  - **Interactive ETH Price Chart**: Glowing SVG spline chart with real-time ETH & USD calculations.
  - **Recent Activity Feed**: Real-time ledger entries for bids, purchases, and receipts.
  - **Top Creators**: Creator ranking cards with follow/unfollow interactive buttons and verified badges.
- **Live Bids Page (`/bids`)**:
  - Metric overview cards and full-width table displaying active auctions, current bids, highest bids, timers, and bid management.
- **Saved Items Page (`/saved`)**:
  - Dedicated bookmarks collection reflecting user favorited NFTs with category filters.
- **Featured Collections Page (`/collections`)**:
  - Curated collection cards with Grid / List view toggle, search, and category filters.
- **Creator Profile Page (`/profile`)**:
  - Profile cover, avatar, wallet balance, verification status, following list, and tabs for purchased artworks and collections.
- **Account Settings Page (`/setting`)**:
  - Profile management form (Display Name, Username, Email, Password, Personal Info) and notification preferences.

### 3. Interactive Web3 Modals & Systems
- **"Place a Bid" Modal**:
  - Live ETH to USD price calculation, balance validation, and instant updates.
- **Real-Time Timers**:
  - 1-second interval countdown for auction items.
- **Toast Notifications**:
  - Global feedback toast notifications for user interactions.

---

## 🛠️ Technology Stack
- **Framework**: React 19 + Vite
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS + Custom CSS Utilities
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP Client**: Axios with simulated fallback data

---

## 📁 Project Structure

```
NFT Marketplace Figma Task/
├── index.html              # HTML entry point with Google Fonts
├── public/
│   └── assets/images/      # Optimized assets & creator avatars
├── src/
│   ├── components/
│   │   ├── common/         # NftCard, PageHeader
│   │   ├── layout/         # AppLayout, Header, Sidebar
│   │   └── modals/         # BidModal, ToastContainer
│   ├── context/            # MarketContext (Global state & notifications)
│   ├── data/               # mockData.js (NFTs, creators, bids)
│   ├── pages/              # Route pages (Home, Bids, Collections, Saved, Profile, Setting)
│   ├── services/           # api.js (Axios API layer)
│   ├── App.jsx             # Main Router configuration
│   ├── index.css           # Tailwind directives & custom styles
│   └── main.jsx            # Application entry point
├── package.json            # Project dependencies & scripts
├── tailwind.config.js      # Tailwind configuration
└── vite.config.js          # Vite configuration
```
