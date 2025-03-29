import React, { useState } from 'react';
import user from '../image/heng-sovanrith.jpg';

const ImageHeader = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass the search query to the parent component
  };

  return (
    <header className="w-full text-sm py-5 ">
      <nav className="w-full flex items-center justify-between" aria-label="Global">
        <ul className="icon-nav flex items-center gap-4">
          <li className="relative xl:hidden">
            <a className="text-xl icon-hover cursor-pointer text-heading"
              id="headerCollapse" data-hs-overlay="#application-sidebar-brand"
              aria-controls="application-sidebar-brand" aria-label="Toggle navigation" href="#">
              <i className="ti ti-menu-2 relative z-1"></i>
            </a>
          </li>
          <li className="flex items-center gap-2 ">
            <div className="relative max-w-sm mx-auto">
              <input
                className="w-60 md:w-96 py-2 px-4 rounded-md shadow-sm border"
                type="search"
                placeholder="Search images"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <div className="hs-dropdown relative inline-flex">
            <a className="relative hs-dropdown-toggle cursor-pointer align-middle rounded-full">
              <img className="object-cover w-[40px] h-[40px] rounded-full" src={user} alt="User Avatar" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ImageHeader;