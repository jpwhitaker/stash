// Create a new file at src/app/components/CitySearchCombobox.js
'use client';

import { useState, useEffect } from 'react';
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function CitySearchCombobox({ cities, hotels = [], initialQuery = '', onSelect, value, className = "" }) {
  const [query, setQuery] = useState(initialQuery);

  // Reset the query when value is null (like when LogoLink is clicked)
  useEffect(() => {
    if (value === null) {
      setQuery('');
    }
  }, [value]);

  const filteredCities = query.length < 3
    ? []
    : cities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
    );
    
  const filteredHotels = query.length < 3
    ? []
    : hotels.filter((hotel) =>
      hotel.toLowerCase().includes(query.toLowerCase())
    );

  // Combine results
  const searchResults = [
    ...filteredCities.map(city => ({ value: city, type: 'city' })),
    ...filteredHotels.map(hotel => ({ value: hotel, type: 'hotel' }))
  ];

  const displayValue = (item) => {
    if (!item) return query;
    return typeof item === 'object' ? item.value : item;
  };

  return (
    <Combobox value={value} onChange={onSelect} className={className}>
      <div className="relative">
        <div className="relative w-full cursor-default overflow-hidden bg-clear text-left focus:outline-none sm:text-sm">
          <ComboboxInput
            className="w-full h-10 border py-2 pl-3 pr-10 text-sm leading-5 placeholder:text-white border-1 border-search-text focus:outline-none focus:ring-0"
            placeholder="Search cities or hotels..."
            displayValue={displayValue}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete='off'
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="w-5 h-5 text-white" aria-hidden="true" />
          </ComboboxButton>
        </div>
        {query.length >= 3 && (
          <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-0 focus:outline-none sm:text-sm z-10">
            {searchResults.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                No results found
              </div>
            ) : (
              <>
                {filteredCities.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">Cities</div>
                    {filteredCities.map((city) => (
                      <ComboboxOption
                        key={`city-${city}`}
                        value={{ value: city, type: 'city' }}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'}`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {city}
                            </span>
                            {selected ? (
                              <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-gray-600' : 'text-teal-600'}`}>
                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ComboboxOption>
                    ))}
                  </>
                )}
                
                {filteredHotels.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">Hotels</div>
                    {filteredHotels.map((hotel) => (
                      <ComboboxOption
                        key={`hotel-${hotel}`}
                        value={{ value: hotel, type: 'hotel' }}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'}`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {hotel}
                            </span>
                            {selected ? (
                              <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-gray-600' : 'text-teal-600'}`}>
                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ComboboxOption>
                    ))}
                  </>
                )}
              </>
            )}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  );
}
