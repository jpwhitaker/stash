import Image from "next/image";

export default function SearchResult({hotel}, key){

  return (
    <div className="flex flex-col" key={key}>
      <div className="aspect-[5/4] bg-gray-200 rounded-3xl shadow overflow-hidden relative">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16.67vw"
        />

      </div>
      <div className="flex gap-2 items-center">
        <div className="font-semibold">{hotel.name}</div>
        <div className="text-sm">{hotel.city}</div>
      </div>
    </div>
  )
}

