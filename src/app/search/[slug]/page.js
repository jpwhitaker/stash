import hotelData from "../../components/data.json"
import SearchResult from "./SearchResult";


export default async function Search({ params }) {
  const { slug } = await params;

  return (
    <div className="bg-results-bg min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="w-full h-[20vh] bg-search-bg flex items-center justify-center text-search-text">
        Search: {slug}
      </div>

      <div className="p-8 sm:p-20">

        Search results for "{slug}"

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 gap-y-28">
          {Array.from({ length: 40 }).map((_, index) => (
            <SearchResult hotel={hotelData[index % hotelData.length]} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}
