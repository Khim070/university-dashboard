import React from 'react'
import user from './image/heng-sovanrith.jpg';

const Header = () => {
  return (
    <header class=" full-container w-full text-sm py-5 px-9">
        <nav class=" w-full flex items-center justify-between" aria-label="Global">
            <ul class="icon-nav flex items-center gap-4">
                <li class="relative xl:hidden">
                    <a class="text-xl icon-hover cursor-pointer text-heading"
                        id="headerCollapse" data-hs-overlay="#application-sidebar-brand"
                        aria-controls="application-sidebar-brand" aria-label="Toggle navigation" href="javascript:void(0)">
                        <i class="ti ti-menu-2 relative z-1"></i>
                    </a>
                </li>
                <li class="relative ">
                    <a href="#" class="btn font-medium text-lg hover:bg-blue-700 py-2" aria-current="page">Save</a>
                </li>
            </ul>
        <div class="flex items-center gap-4">
            <div class="hs-dropdown relative inline-flex ">
                <a class="relative hs-dropdown-toggle cursor-pointer align-middle rounded-full">
                <img class="object-cover w-[40px] h-[40px] rounded-full" src={user} alt=""
                    />
                </a>
            </div>
                </div>
        </nav>
    </header>
  )
}

export default Header