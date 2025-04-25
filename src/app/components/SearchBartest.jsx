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
    <div className={`w-full bg-search-bg flex flex-wrap items-center justify-start text-search-text py-8 px-20 ${className}`}>
      {/* First group that stays together */}
      <div className="flex flex-wrap md:flex-nowrap border-1 border-blue-400 w-full md:w-auto">
        <div className='border-1 border-white h-10 w-full md:w-60'>City</div>
        <div className='border-1 border-white h-10 w-full md:w-60'>Date</div>
      </div>

      {/* Second group that stays together */}
      <div className="flex flex-wrap md:flex-nowrap border-1 border-red-400 w-full md:w-auto">
        <div className='border-1 border-white h-10 w-full md:w-60'>Adult</div>
        <div className='border-1 border-white h-10 w-full md:w-60'>Child</div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap border-1 border-green-400 w-full md:w-auto">
        <div className='border-1 border-white h-10 w-full md:w-60'>Search</div>
      </div>


    </div>
  );
} 