import React from "react";
import FacultySection from "./FacultySection";
import FacultySocial from "./FacultySocial";

const Faculty = () => {
  return (
    <section className="px-8 py-2">
      <div className="border-2 rounded-lg overflow-x-scroll hide-scroll-bar">
        <div className="col-span-1 sm:col-span-3">
          <div>
            <ul className="mt-6 md:block cursor-pointer ">
              <details className="group [&_summary::-webkit-details-marker]:hidden ">
                <summary className="flex justify-between cursor-pointer rounded-lg px-2 py-2 text-xl font-medium w-full border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset my-2">
                  <label className="block text-2xl font-medium leading-6 text-gray-900 indent-4 ">
                    Faculty
                  </label>
                  <span className="shrink-0 transition-transform duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                </summary>

                <div>
                  <div className="flex flex-row gap-4 px-4 py-2">
                    <div className="flex-1">
                      <label className="block text-xl font-medium leading-6 text-white-900">
                        Title
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="block w-full border-0 rounded-md py-2 pl-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-2xl sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <label className="block text-xl font-medium leading-6 text-white-900">
                        Languages
                      </label>
                      <div className="mt-2">
                        <select className="block w-full rounded-md border-0 py-2 pl-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6">
                          <option value="">Languages</option>
                          <option value="">English</option>
                          <option value="">Khmer</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex-non">
                      <label className="block text-xl font-medium leading-6 text-white-900">
                        Display
                      </label>
                      <div className="mt-2">
                        <label class="toggle-switch mt-2">
                          <input type="checkbox" />
                          <span class="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 px-4 py-2">
                    <div className="flex-1">
                      <label className="block text-xl font-medium leading-6 text-white-900">
                        Subtitle
                      </label>
                      <div className="mt-2">
                        <textarea className="h-32 block w-full rounded-md border-0 py-2 pl-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <FacultySection />
                <FacultySocial />
              </details>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faculty;
