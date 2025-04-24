'use client'
import { use, useEffect } from 'react';
import hotelData from "../../components/data.json"
import SearchResult from "./SearchResult";
import useSearchStore from '@/app/store/searchStore';
import { format, differenceInDays } from 'date-fns';

export default function Search({ params }) {
  const selectedCity = useSearchStore(state => state.selectedCity);
  const dateRange = useSearchStore(state => state.dateRange);

  const filteredHotels = selectedCity 
    ? hotelData.filter(hotel => 
        hotel.city.trim().toLowerCase() === selectedCity.trim().toLowerCase())
    : hotelData;

  // Calculate number of days in the date range
  const numberOfDays = dateRange?.from && dateRange?.to 
    ? differenceInDays(dateRange.to, dateRange.from) + 1 
    : 0;

  return (
    <div className="bg-results-bg min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="p-8 sm:p-20">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">
            Search results for {selectedCity || "all cities"}
          </h1>
          
          {dateRange?.from && dateRange?.to ? (
            <div className="text-sm text-gray-600">
              <span className="font-medium">
                {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
              </span>
              <span className="ml-2">
                ({numberOfDays} {numberOfDays === 1 ? 'day' : 'days'})
              </span>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 gap-y-28">
          {filteredHotels.map((hotel, index) => (
            <SearchResult hotel={hotel} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}
