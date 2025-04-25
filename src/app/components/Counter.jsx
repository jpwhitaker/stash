'use client';

import { Button } from "../../components/ui/button";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export default function Counter({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 10 
}) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* <span className="text-sm font-medium">{label}</span> */}
      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleDecrement}
          disabled={value <= min}
          aria-label="Decrease"
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
        
        <span className="w-6 text-center font-medium">{value}</span>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleIncrement}
          disabled={value >= max}
          aria-label="Increase"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 