'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CitySearchCombobox from './CitySearchCombobox';
import useSearchStore from '../store/searchStore';
import { DatePicker } from './Datepicker';

export default function SearchBar({ cities, className = "" }) {
  const router = useRouter();
  const { searchQuery, selectedCity, setSearchQuery, setSelectedCity } = useSearchStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    // Update URL without navigation using history API
    if (window.history) {
      window.history.pushState(null, '', `/search/${encodeURIComponent(city)}`);
    }
  };

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div className={`w-full bg-search-bg flex items-center justify-center text-search-text py-8 ${className}`}>
      <div className="w-full px-20 flex md:flex-row items-center gap-4">
        
        <div className="w-full flex flex-col md:flex-row items-center gap-4">
          
            <CitySearchCombobox
              cities={cities}
              initialQuery={localQuery}
              onSelect={handleCitySelect}
              value={selectedCity}
            />
          
          
            <DatePicker/>
        </div>
      </div>
    </div>
  );
} 