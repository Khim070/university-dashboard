import React, { useState } from 'react';
import EnglishContent from './EnglishContent';
import KhmerContent from './KhmerContent';

const Language = () => {
    const [activeTab, setActiveTab] = useState('english');

    return (
        <section>
            <div className="mb-4 border-b border-gray-200 px-8">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block px-4 py-2 border-b-2 rounded-t-lg text-lg ${
                                activeTab === 'english' ? 'bg-blue-600 text-white' : 'border-transparent text-gray-800'
                            }`}
                            id="english-tab"
                            type="button"
                            role="tab"
                            onClick={() => setActiveTab('english')}
                        >
                            English
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block px-4 py-2 border-b-2 rounded-t-lg text-lg ${
                                activeTab === 'khmer' ? 'bg-blue-600 text-white' : 'border-transparent text-gray-800'
                            }`}
                            id="khmer-tab"
                            type="button"
                            role="tab"
                            onClick={() => setActiveTab('khmer')}
                        >
                            Khmer
                        </button>
                    </li>
                </ul>
            </div>
            <div id="default-tab-content" className="">
                {activeTab === 'english' && <EnglishContent/>}
                {activeTab === 'khmer' && <KhmerContent/>}
            </div>
        </section>
    );
};

export default Language;