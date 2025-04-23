import Image from "next/image";
import hotelData from "../../components/data.json"

export default async function Search({params}) {
  const { slug } = await params;
  
  return (
    <div className="bg-results-bg min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="w-full h-[20vh] bg-search-bg flex items-center justify-center text-search-text">
        Search: {slug}
      </div>
      
      <div className="p-8 sm:p-20">

        Search results for "{slug}"

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 gap-y-28">
          {Array.from({length: 40}).map((_, index) => (
            <div className="flex flex-col" key={index}>
            <div className="aspect-[4/3] bg-gray-200 rounded-3xl shadow overflow-hidden relative">
              <Image
                src={hotelData[index % hotelData.length].image}
                alt={hotelData[index % hotelData.length].name}
                fill
                className="object-cover"
              />
              
            </div>
            <div>{hotelData[index % hotelData.length].name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
