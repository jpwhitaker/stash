import Image from "next/image";
import hotelsData from "../../components/data.json";

export default function Hotel({params}) {
  // Find the hotel by ID (convert slug to number)
  const hotelId = parseInt(params.slug, 10);
  const hotel = hotelsData.find(h => h.id === hotelId);

  if (!hotel) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-3xl font-bold">Hotel not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 lg:w-2/5">
            <div className="relative w-full aspect-[6/5] rounded-lg overflow-hidden">
              <Image 
                src={hotel.image} 
                alt={hotel.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="md:flex-1 space-y-6">
   
              <h1 className="text-3xl font-[family-name:var(--font-geist-sans)] font-bold">{hotel.name}</h1>
   
            <div className="grid gap-2">
              <p className="text-lg"><span className="font-medium">Location:</span> {hotel.city}</p>
              <p className="text-lg"><span className="font-medium">Daily Rate:</span> ${hotel.daily_rate.toFixed(2)}</p>
              {hotel.has_member_rate && (
                <p className="text-sm text-green-600 font-medium">Member rate available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
