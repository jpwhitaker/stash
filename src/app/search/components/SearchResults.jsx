'use client'
import { format, differenceInDays } from 'date-fns';
import hotelData from "../../components/data.json";
import useSearchStore from '@/app/store/searchStore';
import SearchResult from "./SearchResult";
import PaginationControls from "./PaginationControls";
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export default function SearchResults() {
  const selectedCity = useSearchStore(state => state.selectedCity);
  const dateRange = useSearchStore(state => state.dateRange);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredHotels = selectedCity
    ? hotelData.filter(hotel =>
      hotel.city.trim().toLowerCase() === selectedCity.trim().toLowerCase())
    : hotelData;

  // Calculate number of days in the date range
  const numberOfDays = dateRange?.from && dateRange?.to
    ? differenceInDays(dateRange.to, dateRange.from) + 1
    : 0;

  // Calculate pagination for filtered hotels (search results)
  const totalFilteredPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const indexOfLastFilteredItem = currentPage * itemsPerPage;
  const indexOfFirstFilteredItem = indexOfLastFilteredItem - itemsPerPage;
  const currentFilteredHotels = filteredHotels.slice(indexOfFirstFilteredItem, indexOfLastFilteredItem);

  // Calculate pagination for all hotels
  const [allHotelsPage, setAllHotelsPage] = useState(1);
  const totalAllPages = Math.ceil(hotelData.length / itemsPerPage);
  const indexOfLastAllItem = allHotelsPage * itemsPerPage;
  const indexOfFirstAllItem = indexOfLastAllItem - itemsPerPage;
  const currentAllHotels = hotelData.slice(indexOfFirstAllItem, indexOfLastAllItem);

  return (
    <div className="bg-results-bg min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="p-8 sm:px-20 sm:py-12">
        <AnimatePresence>
          {selectedCity && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className=""
            >
              <div className="mb-6">
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
                        {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
                      </span>
                      <span className="ml-2">
                        ({numberOfDays} {numberOfDays === 1 ? 'day' : 'days'})
                      </span>
                    </>
                  )}
                </div>
              </div>

              <AnimatePresence>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 gap-y-28 mb-12">
                  {currentFilteredHotels.map((hotel, index) => (
                    <motion.div
                      key={`search-${index}`}
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
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`mb-8 `}>
          <h2 className="text-2xl font-semibold mb-2">Stash Partners</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 gap-y-28">
          {currentAllHotels.map((hotel, index) => (

            <SearchResult hotel={hotel} key={`more-${index}`}/>

          ))}
        </div>

        <PaginationControls
          currentPage={allHotelsPage}
          totalPages={totalAllPages}
          onPageChange={setAllHotelsPage}
        />
      </div>
    </div>
  );
}