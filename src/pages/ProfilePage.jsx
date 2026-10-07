import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { useMarket } from '../context/MarketContext';
import { nftApi } from '../services/api';
import { CheckCircle2, Lock } from 'lucide-react';

export const ProfilePage = () => {
  const { user, addToast } = useMarket();
  const [profileData, setProfileData] = useState(null);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await nftApi.getProfileData();
      setProfileData(data);
      if (Array.isArray(data?.following)) {
        setFollowing(data.following);
      }
    };
    fetchProfile();
  }, []);

  const handleToggleUnfollow = (id) => {
    setFollowing((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.isUnfollowed;
          addToast(`${next ? 'Followed' : 'Unfollowed'} ${item.name}`, 'info');
          return { ...item, isUnfollowed: next };
        }
        return item;
      })
    );
  };

  if (!profileData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-[#6F4FF2] border-t-transparent animate-spin" />
      </div>
    );
  }

  const boughtItems = Array.isArray(profileData?.bought) ? profileData.bought : [];
  const collectionItems = Array.isArray(profileData?.collections) ? profileData.collections : [];

  return (
    <div className="space-y-8 pb-10">
      <PageHeader title="Profile" subtitle="Welcome Profile Page" breadcrumb="Profile" />

      {/* Top Grid: Verification Card & Following (Figma Frame) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Verification Card (5 cols on desktop) */}
        <div className="lg:col-span-5 theme-card bg-[#1B1736] rounded-[22px] p-5 sm:p-6 lg:p-7 border border-white/5 flex flex-col justify-between gap-5 shadow-sm">
          {/* Avatar + Welcome */}
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#6F4FF2]/40 shadow-sm flex-shrink-0">
              <img
                src={user.avatar || "/assets/images/figma_header_avatar.png"}
                alt={user.name}
                className="w-full h-full object-cover object-center"
                onError={(e) => { e.target.src = '/assets/images/figma_header_avatar.png'; }}
              />
            </div>
            <div>
              <h3 className="theme-text text-[17px] sm:text-[18px] font-bold text-white font-heading">
                Welcome, {user.name}
              </h3>
              <p className="theme-muted text-[12px] sm:text-[12.5px] text-[#8B8AA0] mt-1 leading-relaxed">
                Looks like you are not verified yet. Verify yourself to use the full potential of Xtrader.
              </p>
            </div>
          </div>

          {/* Action buttons matching Figma */}
          <div className="space-y-2.5">
            <button
              onClick={() => addToast('Verification request submitted', 'success')}
              className="theme-inner-card w-full flex items-center gap-3 p-3 rounded-xl bg-[#120F26]/70 border border-white/5 hover:border-[#22C55E]/40 transition-all text-left group"
            >
              <span className="w-6 h-6 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={14} />
              </span>
              <span className="text-[12.5px] sm:text-[13px] font-semibold text-[#8A63F8] group-hover:text-[#A585FC]">
                Verify account
              </span>
            </button>

            <button
              onClick={() => addToast('Two-factor authentication setup opened', 'info')}
              className="theme-inner-card w-full flex items-center gap-3 p-3 rounded-xl bg-[#120F26]/70 border border-white/5 hover:border-[#6F4FF2]/40 transition-all text-left group"
            >
              <span className="w-6 h-6 rounded-full bg-[#6F4FF2]/20 text-[#6F4FF2] flex items-center justify-center flex-shrink-0">
                <Lock size={12} />
              </span>
              <span className="text-[12.5px] sm:text-[13px] font-semibold text-[#8A63F8] group-hover:text-[#A585FC]">
                Two-factor Authentication ( 2FA )
              </span>
            </button>
          </div>
        </div>

        {/* Right: Following Creators 2x2 Grid (7 cols on desktop) */}
        <div className="lg:col-span-7 theme-card bg-[#1B1736] rounded-[22px] p-5 sm:p-6 lg:p-7 border border-white/5 flex flex-col justify-between space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="theme-text text-[16px] font-bold text-white font-heading">Following</h3>
            <span className="theme-muted text-[12px] text-[#8B8AA0]">{following.length} accounts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            {following.map((creator) => (
              <div
                key={creator.id}
                className="theme-inner-card bg-[#120F26]/80 rounded-[18px] p-2.5 sm:p-3 flex items-center justify-between border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10 shadow-sm">
                    <img
                      src={creator.avatar || '/assets/images/figma_creator_avatar.png'}
                      alt={creator.name}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => { e.target.src = '/assets/images/figma_creator_avatar.png'; }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h5 className="theme-text font-bold text-white text-[12.5px] sm:text-[13px] truncate">{creator.name}</h5>
                    <span className="theme-muted text-[10.5px] sm:text-[11px] text-[#8B8AA0] block">{creator.items}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleUnfollow(creator.id)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all flex-shrink-0 ${
                    creator.isUnfollowed
                      ? 'bg-[#6F4FF2] text-white hover:bg-[#5E3EE0]'
                      : 'bg-[#E03E52] hover:bg-[#C93245] text-white shadow-sm'
                  }`}
                >
                  {creator.isUnfollowed ? 'Follow' : 'Unfollow'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 1: My bought (4 Cards, 2 cols on mobile, 4 on desktop) */}
      <div className="space-y-4">
        <h3 className="theme-text text-[18px] font-bold text-white font-heading">
          My bought
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {boughtItems.map((item) => (
            <div
              key={item.id}
              className="theme-card bg-[#1B1736] rounded-[20px] p-3 sm:p-3.5 border border-white/5 hover:border-[#6F4FF2]/30 shadow-sm transition-all"
            >
              <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-[#120F26] mb-2 sm:mb-2.5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = '/assets/images/liquid_wave_1.jpg'; }}
                />
                {item.creatorAvatar && (
                  <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-2 border-white shadow-md z-10">
                    <img
                      src={item.creatorAvatar}
                      alt="Creator"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => { e.target.src = '/assets/images/figma_creator_avatar.png'; }}
                    />
                  </div>
                )}
              </div>
              <h4 className="theme-text font-bold text-white text-[13px] sm:text-[14px] font-heading px-0.5 truncate">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: My Collections (4 Cards, 2 cols on mobile, 4 on desktop) */}
      <div className="space-y-4">
        <h3 className="theme-text text-[18px] font-bold text-white font-heading">
          My Collections
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {collectionItems.map((item) => (
            <div
              key={item.id}
              className="theme-card bg-[#1B1736] rounded-[20px] p-3 sm:p-3.5 border border-white/5 hover:border-[#6F4FF2]/30 shadow-sm transition-all"
            >
              <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-[#120F26] mb-2 sm:mb-2.5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = '/assets/images/liquid_wave_1.jpg'; }}
                />
              </div>
              <h4 className="theme-text font-bold text-white text-[13px] sm:text-[14px] font-heading px-0.5 truncate">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
