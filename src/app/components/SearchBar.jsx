'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CitySearchCombobox from './CitySearchCombobox';
import useSearchStore from '../store/searchStore';
import { DatePicker } from './Datepicker';
import Counter from './Counter';

export default function SearchBar({ cities, className = "" }) {
  const router = useRouter();
  const {
    searchQuery,
    selectedCity,
    adults,
    children,
    setSearchQuery,
    setSelectedCity,
    setAdults,
    setChildren
  } = useSearchStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    // Update URL without navigation using history API
    if (window.history) {
      window.history.pushState(null, '', `/search/${encodeURIComponent(city)}`);
    }
  };

  const handleSearch = () => {
    if (selectedCity) {
      router.push(`/search/${encodeURIComponent(selectedCity)}`);
    }
  };

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div className={`w-full bg-search-bg flex items-center justify-center text-search-text py-8 ${className}`}>
      <div className="w-full px-20 flex md:flex-row items-center gap-4">
        <div className="w-full flex flex-col xl:flex-row items-center gap-4 xl:gap-8">
          <div className='flex flex-col gap-4 sm:flex-row w-full sm:w-auto'>
            <CitySearchCombobox
              className="w-full sm:w-60"
              cities={cities}
              initialQuery={localQuery}
              onSelect={handleCitySelect}
              value={selectedCity}
            />
            <DatePicker className="w-full sm:w-60" />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Counter
              label="Adults"
              value={adults}
              onChange={setAdults}
              min={1}
            />
            <div className="hidden sm:block w-px self-stretch bg-search-text mx-2" />
            <Counter
              label="Children"
              value={children}
              onChange={setChildren}
            />
          </div>

          <button
            onClick={handleSearch}
            className="h-10 px-6 border border-search-text bg-transparent text-search-text text-sm cursor-pointer overflow-hidden relative group flex-shrink-0 w-full sm:w-auto"
          >
            <span className="relative z-10">Search</span>
            <div className="absolute inset-0 bg-search-text opacity-10 -translate-x-[170%] group-hover:-translate-x-[20%] transition-transform duration-300 ease-out transform-gpu origin-left skew-x-[-30deg] scale-x-[1.5]" />
          </button>
        </div>
      </div>
    </div>
  );
} 