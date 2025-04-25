import Image from "next/image";
import Link from "next/link";
import useSearchStore from '@/app/store/searchStore';
import { differenceInDays } from 'date-fns';

export default function SearchResult({ hotel }, key) {
  const dateRange = useSearchStore(state => state.dateRange);
  
  // Check if a date range is actually selected
  const hasDateRange = dateRange?.from && dateRange?.to;

  const numberOfDays = hasDateRange 
    ? differenceInDays(dateRange.to, dateRange.from) + 1 
    : 1;

  
  const getEffectiveRate = (rate, hasMemberRate) => {
    const baseRate = Math.floor(rate);
    return hasMemberRate ? Math.floor(baseRate * 0.9) : baseRate;
  };

  const effectiveRate = getEffectiveRate(hotel.daily_rate, hotel.has_member_rate);
  const totalPrice = effectiveRate * numberOfDays;

  return (
    <Link href={`/hotel/${hotel.id}`} className="cursor-pointer" key={key}>
      <div className="flex flex-col">
        <div className="aspect-[6/5] bg-gray-200 rounded-3xl shadow overflow-hidden relative">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16.67vw"
          />
          {hotel.has_member_rate && (
            <div className="absolute top-2 right-2 z-10">
              <MemberRateBadge />
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between items-start mt-4 w-full">
          <div className="flex flex-col gap-0">
            <div className="font-semibold">{hotel.name}</div>
            <div className="text-sm">{hotel.city}</div>
          </div>
          <div className="flex flex-col gap-0 items-end">
          {hotel.has_member_rate ? (
              <div className="flex items-center">
                <div className="text-md font-medium text-gray-400 line-through mr-2">${Math.floor(hotel.daily_rate)}</div>
                <div className="text-xl font-bold text-amber-600">${effectiveRate}</div>
              </div>
            ) : (
              <div className="text-xl font-bold text-amber-600">${effectiveRate}</div>
            )}
            {hasDateRange && numberOfDays > 1 ? (
              <div className="text-xs font-normal text-gray-500 text-right">
                ${totalPrice} total for {numberOfDays} nights
              </div>
            ) : (
              <div className="text-xs font-normal text-gray-500">
                per night
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

const MemberRateBadge = ({ text = "Member Rate" }) => {
  return (
    <div className="inline-flex items-center px-2.5 py-1 max-w-full h-fit rounded-full bg-white border border-white shadow-md text-black text-sm font-medium mt-0.5 bg-gradient-to-tr from-gray-100 via-white to-gray-100">
      <span className="text-inherit">{text}</span>
    </div>
  );
};