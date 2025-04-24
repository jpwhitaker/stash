'use client'
import { use, useEffect } from 'react';
import hotelData from "../../components/data.json"
import SearchResult from "./SearchResult";
import useSearchStore from '@/app/store/searchStore';

export default function Search({ params }) {


  return (
    <div className="bg-results-bg min-h-screen font-[family-name:var(--font-geist-sans)]">

      <div className="p-8 sm:p-20">

        Search results for {useSearchStore(state => state.selectedCity)}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 gap-y-28">
          {hotelData.slice(0,40).map((hotel, index) => (
            <SearchResult hotel={hotel} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}
