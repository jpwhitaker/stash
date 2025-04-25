// Create a new file at src/app/components/CitySearchCombobox.js
'use client';

import { useState } from 'react';
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function CitySearchCombobox({ cities, initialQuery = '', onSelect, value }) {
  const [query, setQuery] = useState(initialQuery);

  const filteredCities = query === ''
    ? cities
    : cities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <Combobox value={value} onChange={onSelect}>
      <div className="relative">
        <div className="relative w-full  cursor-default overflow-hidden bg-clear  text-left  focus:outline-none  sm:text-sm">
          <ComboboxInput
            className="w-full h-10 border py-2 pl-3 pr-10 text-sm leading-5 placeholder:text-white border-1 border-search-text focus:outline-none focus:ring-0"
            placeholder="Search cities..."
            displayValue={(city) => city || query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete='off'
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="w-5 h-5 text-white" aria-hidden="true" />
          </ComboboxButton>
        </div>
        <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-0 focus:outline-none sm:text-sm z-10">
          {filteredCities.length === 0 && query !== '' ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              Nothing found.
            </div>
          ) : (
            filteredCities.map((city) => (
              <ComboboxOption
                key={city}
                value={city}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                  }`
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
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}
