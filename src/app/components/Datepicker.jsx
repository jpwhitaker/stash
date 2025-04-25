"use client"

import * as React from "react"
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
  
  const [date, setDate] = React.useState(
    dateRange && dateRange.from ? dateRange : {
      from: today,
      to: today,
    }
  );

  // Initialize store with today's date if not already set
  React.useEffect(() => {
    if (!dateRange?.from) {
      setDateRange({ from: today, to: today });
    }
  }, []);

  const handleDateSelect = (newDate) => {
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
              "w-[300px] justify-start text-left text-foreground font-normal",
              !date && "text-muted-foreground"
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
