'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CitySearchCombobox from './CitySearchCombobox';
import useSearchStore from '../store/searchStore';

export default function SearchBar({ cities, className = "" }) {
  const router = useRouter();
  const { searchQuery, selectedCity, setSearchQuery, setSelectedCity } = useSearchStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    router.push(`/search/${encodeURIComponent(city)}`);
  };

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div className={`w-full bg-search-bg flex items-center justify-center text-search-text py-20 ${className}`}>
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">
        
        <div className="w-full md:w-1/3">
          <CitySearchCombobox
            cities={cities}
            initialQuery={localQuery}
            onSelect={handleCitySelect}
            value={selectedCity}
          />
        </div>
      </div>
    </div>
  );
} 