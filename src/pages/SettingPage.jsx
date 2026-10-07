import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { useMarket } from '../context/MarketContext';
import { User } from 'lucide-react';

const TABS = [
  'Profile',
  'Application',
  'Security',
  'Activity',
  'Payment Method',
  'API'
];

export const SettingPage = () => {
  const { user, setUser, addToast } = useMarket();
  const [activeTab, setActiveTab] = useState('Profile');
  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('••••••••••••');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, name: fullName }));
    addToast('Profile updated successfully!', 'success');
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, email }));
    addToast('Account credentials updated!', 'success');
  };

  const handleSavePersonalInfo = (e) => {
    e.preventDefault();
    addToast('Personal information saved!', 'success');
  };

  return (
    <div className="space-y-6 pb-10">
      <PageHeader title="Setting" subtitle="Welcome Setting Page" breadcrumb="Setting" />

      {/* Sub Navigation Tabs matching Figma */}
      <div className="flex items-center gap-4 sm:gap-6 border-b border-white/8 pb-0 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-[13px] font-medium transition-all whitespace-nowrap border-b-2 -mb-px flex-shrink-0 ${
              activeTab === tab
                ? 'text-[#6F4FF2] border-[#6F4FF2] font-semibold'
                : 'theme-muted text-[#8B8AA0] hover:text-white border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ===== PROFILE TAB (Figma Exact) ===== */}
      {activeTab === 'Profile' && (
        <div className="space-y-6">
          {/* Top 2-Column Grid: User profile & Update Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Card: User profile */}
            <div className="theme-card bg-[#1B1736] rounded-[22px] p-5 sm:p-6 lg:p-7 border border-white/5 space-y-5 shadow-sm">
              <h3 className="theme-text text-[16px] font-bold text-white font-heading">
                User profile
              </h3>

              <form onSubmit={handleSaveProfile} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="theme-muted block text-[12px] text-[#8B8AA0] mb-2 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="theme-input w-full h-[42px] sm:h-[44px] rounded-xl bg-[#131129] border border-white/5 px-4 text-white text-[13.5px] focus:outline-none focus:border-[#6F4FF2] transition-colors"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {/* Avatar Badge matching Figma screenshot */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0 shadow-sm">
                    <img
                      src="/assets/images/figma_header_avatar.png"
                      alt={fullName}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <h5 className="theme-text text-[13.5px] font-bold text-white leading-tight">
                      {fullName}
                    </h5>
                    <span className="theme-muted text-[11px] text-[#8B8AA0]">
                      Welcome Setting Page
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-7 py-2.5 rounded-xl bg-[#6F4FF2] hover:bg-[#5E3EE0] text-white text-[13px] font-semibold transition-all shadow-[0_0_15px_rgba(111,79,242,0.3)]"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>

            {/* Right Card: Update Profile */}
            <div className="theme-card bg-[#1B1736] rounded-[22px] p-5 sm:p-6 lg:p-7 border border-white/5 space-y-5 shadow-sm">
              <h3 className="theme-text text-[16px] font-bold text-white font-heading">
                Update Profile
              </h3>

              <form onSubmit={handleSaveAccount} className="space-y-4">
                <div>
                  <label className="theme-muted block text-[12px] text-[#8B8AA0] mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="theme-input w-full h-[42px] sm:h-[44px] rounded-xl bg-[#131129] border border-white/5 px-4 text-white text-[13.5px] focus:outline-none focus:border-[#6F4FF2] transition-colors"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div>
                  <label className="theme-muted block text-[12px] text-[#8B8AA0] mb-2 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="theme-input w-full h-[42px] sm:h-[44px] rounded-xl bg-[#131129] border border-white/5 px-4 text-white text-[13.5px] focus:outline-none focus:border-[#6F4FF2] transition-colors"
                    placeholder="Enter password"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-7 py-2.5 rounded-xl bg-[#6F4FF2] hover:bg-[#5E3EE0] text-white text-[13px] font-semibold transition-all shadow-[0_0_15px_rgba(111,79,242,0.3)]"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Card: Personal Information matching Figma Frame */}
          <div className="theme-card bg-[#1B1736] rounded-[22px] p-5 sm:p-6 lg:p-7 border border-white/5 space-y-5 shadow-sm">
            <h3 className="theme-text text-[16px] font-bold text-white font-heading">
              Personal Information
            </h3>

            <form onSubmit={handleSavePersonalInfo} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                {[
                  { placeholder: 'Info' },
                  { placeholder: 'Info' },
                  { placeholder: 'Info' },
                  { placeholder: 'Info' },
                  { placeholder: 'Info' },
                  { placeholder: 'Info' },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="theme-muted block text-[12px] text-[#8B8AA0] mb-1.5 font-medium">
                      Info
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      className="theme-input w-full h-[42px] sm:h-[44px] rounded-xl bg-[#131129] border border-white/5 px-4 text-white text-[13.5px] focus:outline-none focus:border-[#6F4FF2] transition-colors placeholder-[#4A4A62]"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-[#6F4FF2] hover:bg-[#5E3EE0] text-white text-[13px] font-semibold transition-all shadow-[0_0_15px_rgba(111,79,242,0.3)]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== OTHER TABS ===== */}
      {activeTab !== 'Profile' && (
        <div className="theme-card bg-[#1B1736] rounded-[22px] p-12 border border-white/5 flex flex-col items-center justify-center text-center space-y-3">
          <h3 className="theme-text text-[18px] font-bold text-white font-heading">{activeTab}</h3>
          <p className="theme-muted text-[13px] text-[#8B8AA0]">
            Preferences and configuration for {activeTab}.
          </p>
          <button
            onClick={() => addToast(`${activeTab} saved`, 'success')}
            className="px-6 py-2 rounded-xl bg-[#6F4FF2] text-white text-[13px] font-semibold"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};
