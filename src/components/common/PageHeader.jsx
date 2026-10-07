import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const PageHeader = ({ title, subtitle, breadcrumb }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
      <div>
        <h1 className="theme-text text-[26px] lg:text-[28px] font-bold text-white font-heading leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="theme-muted text-[13px] text-[#8B8AA0] mt-1">{subtitle}</p>
        )}
      </div>

      <nav className="flex items-center gap-1.5 text-[12.5px] text-[#8B8AA0] flex-shrink-0" aria-label="Breadcrumb">
        <Link to="/" className="theme-muted hover:text-[#6F4FF2] transition-colors">
          Home
        </Link>
        <ChevronRight size={13} className="text-[#6E6D82]" />
        <span className="text-[#6F4FF2] font-semibold">{breadcrumb}</span>
      </nav>
    </div>
  );
};
