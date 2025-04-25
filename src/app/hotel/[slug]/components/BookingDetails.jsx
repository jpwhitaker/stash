import React from 'react';
import useSearchStore from '@/app/store/searchStore';
import { differenceInDays } from 'date-fns';

export default function BookingDetails({ hotel }) {
  const dateRange = useSearchStore(state => state.dateRange);
  const adults = useSearchStore(state => state.adults);
  const children = useSearchStore(state => state.children);
  
  const hasDateRange = dateRange?.from && dateRange?.to;
  const numberOfDays = hasDateRange 
    ? differenceInDays(dateRange.to, dateRange.from) + 1 
    : 1;
    
  const getEffectiveRate = (rate, hasMemberRate) => {
    const baseRate = Math.floor(rate);
    return hasMemberRate ? Math.floor(baseRate * 0.9) : baseRate;
  };
  
  const effectiveRate = hotel?.daily_rate ? getEffectiveRate(hotel.daily_rate, hotel.has_member_rate) : 0;
  const totalPrice = effectiveRate * numberOfDays;

  return (
    <div className="w-100 p-5 border border-gray-200 rounded-xl shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Check-in</p>
          <p className="font-medium">{hasDateRange ? dateRange.from.toLocaleDateString() : 'Not selected'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Check-out</p>
          <p className="font-medium">{hasDateRange ? dateRange.to.toLocaleDateString() : 'Not selected'}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Duration</p>
          <p className="font-medium">{numberOfDays} {numberOfDays === 1 ? 'night' : 'nights'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Guests</p>
          <p className="font-medium">{adults} {adults === 1 ? 'adult' : 'adults'}{children > 0 ? `, ${children} ${children === 1 ? 'child' : 'children'}` : ''}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-500">Rate per night</p>
          <div className="flex items-center">
            {hotel.has_member_rate && (
              <span className="text-sm text-gray-400 line-through mr-2">${Math.floor(hotel.daily_rate)}</span>
            )}
            <span className="font-semibold text-amber-600">${effectiveRate}</span>
            {hotel.has_member_rate && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Member Rate
              </span>
            )}
          </div>
        </div>
        
        {hasDateRange && numberOfDays > 1 && (
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Total ({numberOfDays} nights)</p>
            <span className="font-bold text-amber-600">${totalPrice}</span>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <button 
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
} 