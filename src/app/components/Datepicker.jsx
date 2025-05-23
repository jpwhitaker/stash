"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import useSearchStore from "../store/searchStore"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({
  className,
}) {
  const { dateRange, setDateRange } = useSearchStore();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const [date, setDate] = useState(
    dateRange?.from && dateRange?.to ? dateRange : {
      from: today,
      to: tomorrow,
    }
  );

  //set store with today's date if not already set
  useEffect(() => {
    if (!dateRange?.from) {
      setDateRange({ from: today, to: tomorrow });
    }
  }, []);

  const handleDateSelect = (newDate) => {
    console.log(newDate)
    // user selected only the "from" date
    if (newDate?.from && !newDate.to) {
      // Automatically set "to" date to the next day
      const nextDay = new Date(newDate.from);
      nextDay.setDate(nextDay.getDate() + 1);
      newDate = { 
        from: newDate.from,
        to: nextDay 
      };
    }
    
    // user selected the same day for both "from" and "to"
    if (newDate?.from && newDate?.to && 
        newDate.from.getFullYear() === newDate.to.getFullYear() &&
        newDate.from.getMonth() === newDate.to.getMonth() &&
        newDate.from.getDate() === newDate.to.getDate()) {
      // Set "to" date to the next day to ensure at least one night
      const nextDay = new Date(newDate.from);
      nextDay.setDate(nextDay.getDate() + 1);
      newDate = {
        from: newDate.from,
        to: nextDay
      };
    }
    
    // update both local state and store state
    setDate(newDate);
    setDateRange(newDate);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "h-10 justify-start text-left bg-transparent font-normal rounded-none text-search-text text-sm border border-search-text w-full",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            showOutsideDays={true}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
