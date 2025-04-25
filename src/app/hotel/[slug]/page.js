'use client';
import React, { useEffect } from 'react';
import Image from "next/image";
import hotelsData from "../../components/data.json";
import BookingDetails from './components/BookingDetails';

export default function Hotel({params}) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find the hotel by ID (convert slug to number)
  const unwrappedParams = React.use(params);
  const hotelId = parseInt(unwrappedParams.slug, 10);
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
      <div className="">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left Column - Image and Hotel Info */}
          <div className="lg:w-3/5 xl:w-2/3">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Hotel Image */}
              <div className="md:w-1/2">
                <div className="relative w-full aspect-[6/5] rounded-lg overflow-hidden">
                  <Image 
                    src={hotel.image} 
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              
              {/* Hotel Info */}
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-3xl mb-0 font-[family-name:var(--font-geist-sans)] font-bold">{hotel.name}</h1>
                <p className="text-lg">{hotel.city}</p>
                
                <div className="mt-4 space-y-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis cursus dolor venenatis malesuada. Maecenas ex nibh, convallis eu ipsum eget, tincidunt elementum nisl.
                  </p>
                  <p>
                    Duis eu justo pulvinar, consequat erat et, euismod massa. Ut eget dui nunc. Integer eleifend malesuada ante, ut aliquet velit porttitor in. Curabitur vitae nunc sit amet felis vestibulum semper maximus in diam. Maecenas viverra eget erat sed dapibus. Sed ut odio ultrices, hendrerit eros id, luctus erat. Sed ornare, odio quis dignissim efficitur.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Details */}
          <div className="lg:w-1/3 flex justify-end self-start">
            <BookingDetails hotel={hotel} />
          </div>
        </div>
      </div>
    </div>
  );
}
