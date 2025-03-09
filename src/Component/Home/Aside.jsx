import React from 'react'
import logo from '../image/rupplogo.png';
import {Link, useLocation} from 'react-router-dom';

const Aside = () => {
    const location = useLocation();

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
                            <li className="sidebar-item mb-2">
                                <Link className={`sidebar-link gap-3 py-2 px-3 rounded-md w-full flex items-center
                                    ${location.pathname === "/home" ? "bg-blue-600 text-white" : "hover:text-blue-600 hover:bg-blue-100"}`} to="/home">
                                    <i className="ti ti-layout-dashboard text-xl"></i> <span>Home Page</span>
                                </Link>
                            </li>
                            <li className="sidebar-item mb-2">
                                <Link className={`sidebar-link gap-3 py-2 px-3 rounded-md w-full flex items-center
                                    ${location.pathname === "/about" ? "bg-blue-600 text-white" : "hover:text-blue-600 hover:bg-blue-100"}`} to="/about">
                                    <i className="ti ti-info-circle text-xl"></i> <span>About Page</span>
                                </Link>
                            </li>
                            <li className="sidebar-item mb-2">
                                <Link className={`sidebar-link gap-3 py-2 px-3 rounded-md w-full flex items-center
                                    ${location.pathname === "/contact" ? "bg-blue-600 text-white" : "hover:text-blue-600 hover:bg-blue-100"}`} to="/contact">
                                    <i className="ti ti-phone text-xl"></i> <span>Contact Page</span>
                                </Link>
                            </li>
                            <li class="text-xs font-bold pb-4">
                                <i class="ti ti-dots nav-small-cap-icon text-lg hidden text-center"></i>
                                <span>Upload</span>
                            </li>
                            <li className="sidebar-item mb-2">
                                <Link className={`sidebar-link gap-3 py-2 px-3 rounded-md w-full flex items-center
                                    ${location.pathname === "/images" ? "bg-blue-600 text-white" : "hover:text-blue-600 hover:bg-blue-100"}`} to="/images">
                                    <i className="ti ti-photo text-xl"></i> <span>Images</span>
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