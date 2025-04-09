
import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CloneButtonProps {
  onClone: () => void;
  className?: string;
}

export const CloneButton = ({ onClone, className = "" }: CloneButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClone}
            className={`h-8 w-8 p-0 ${className}`}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Clone this item</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
