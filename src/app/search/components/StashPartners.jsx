import { useState } from "react";
import SearchResult from "./SearchResult";
import PaginationControls from "./PaginationControls";

export default function StashPartners({ hotelData, itemsPerPage }) {
  // Move pagination state and logic here
  const [allHotelsPage, setAllHotelsPage] = useState(1);
  const totalAllPages = Math.ceil(hotelData.length / itemsPerPage);
  const indexOfLastAllItem = allHotelsPage * itemsPerPage;
  const indexOfFirstAllItem = indexOfLastAllItem - itemsPerPage;
  const currentAllHotels = hotelData.slice(indexOfFirstAllItem, indexOfLastAllItem);

  return (
    <div>
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
  );
}