import React from 'react'
import logo from '../image/rupplogo.png';
import {Link} from 'react-router-dom';

const Aside = () => {
  return (
    <aside id="application-sidebar-brand"
				class="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full  transform hidden xl:block xl:translate-x-0 xl:end-auto xl:bottom-0 fixed top-0 with-vertical h-screen z-[999] flex-shrink-0 border-r-[1px] w-[270px] border-gray-400  bg-white left-sidebar   transition-all duration-300" >
        <div class="p-5" >

        <a href="#" class="flex justify-between gap-2">
            <img
            src={logo}
            className='h-12 w-12'
            />
            <span className='text-sm my-auto font-semibold'>Department Management Information System</span>
        </a>

        </div>
            <div class="scroll-sidebar" data-simplebar="">
                <div class="px-6 mt-2" >
                    <nav class=" w-full flex flex-col sidebar-nav">
                        <ul  id="sidebarnav" class="text-gray-600 text-sm ">
                            <li class="text-xs font-bold pb-4">
                                <i class="ti ti-dots nav-small-cap-icon text-lg hidden text-center"></i>
                                <span>Pages</span>
                            </li>
                            <li class="sidebar-item mb-2">
                                <Link class="sidebar-link gap-3 py-2 px-3  rounded-md  w-full flex items-center hover:text-blue-600 hover:bg-blue-500" to="/home"
                                >
                                    <i class="ti ti-layout-dashboard text-xl"></i> <span>Home Page</span>
                                </Link>
                            </li>
                            <li class="sidebar-item mb-2">
                                <Link class="sidebar-link gap-3 py-2 px-3  rounded-md  w-full flex items-center hover:text-blue-600 hover:bg-blue-500" to="/about"
                                >
                                    <i class="ti ti-info-circle text-xl"></i> <span>About Page</span>
                                </Link>
                            </li>
                            <li class="sidebar-item mb-2">
                                <Link class="sidebar-link gap-3 py-2 px-3  rounded-md  w-full flex items-center hover:text-blue-600 hover:bg-blue-500" to="/contact"
                                >
                                    <i class="ti ti-phone text-xl"></i> <span>Contact Page</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
  )
}

export default Aside