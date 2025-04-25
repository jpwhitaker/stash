'use client'
import { format, differenceInDays } from 'date-fns';
import hotelData from "../../components/data.json";
import useSearchStore from '@/app/store/searchStore';
import SearchResult from "./SearchResult";
import PaginationControls from "./PaginationControls";
import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import StashPartners from './StashPartners';


function SearchDrawer({
  selectedCity,
  dateRange,
  numberOfDays,
  filteredHotels
}) {
  return (
    <LayoutGroup>
      <motion.div
      className=''
        layout
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.5,
          layout: { type: "tween", duration: 0.5 }
        }}
      >
        <motion.div layout className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">
            Search Results
          </h1>

          <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">
              For {selectedCity}
            </span>
            {dateRange?.from && dateRange?.to && (
              <>
                <span className="mx-2">|</span>
                <span className="font-medium">
                  <span>{format(dateRange.from, "PPP")}</span> - <span>{format(dateRange.to, "PPP")}</span>
                </span>
                <span className="ml-2">
                  ({numberOfDays - 1}{numberOfDays - 1 === 1 ? '\u00A0night' : '\u00A0nights'})
                </span>
              </>
            )}
          </div>
        </motion.div>

        <motion.div layout className=''>
          <SearchResults filteredHotels={filteredHotels} />
        </motion.div>

      </motion.div>
    </LayoutGroup>
  );
}


function SearchResults({ filteredHotels }) {
  console.log("render")
  return (
    <AnimatePresence mode="wait">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 gap-y-28 mb-12">
        {filteredHotels.map((hotel, index) => (
          <motion.div
            key={`hotel-${hotel.id}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.0 + (index * 0.1),
              ease: "backOut"
            }}
          >
            <SearchResult hotel={hotel} />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}




export default function SearchDisplay() {
  const selectedCity = useSearchStore(state => state.selectedCity);
  const dateRange = useSearchStore(state => state.dateRange);
  const itemsPerPage = 20;

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
      <div className="p-8 sm:px-20 sm:py-12">

        <LayoutGroup>
          {selectedCity && (
            <SearchDrawer
              selectedCity={selectedCity}
              dateRange={dateRange}
              numberOfDays={numberOfDays}
              filteredHotels={filteredHotels}
            />
          )}
          
          <motion.div layout>
            <StashPartners
              hotelData={hotelData}
              itemsPerPage={itemsPerPage}
            />
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}