// components/ComboBox.jsx

"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { fetchSuppliers } from "@/src/app/api/supdata";
import { Label } from '@/components/ui/label' 

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


const suppliers = [
    {
        value: 1,
        label: "Admin", 
    },

    {
        value: 2,
        label: "User", 
    }

]






export function ProfileComboBox({onValueChange }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (selectedValue) => {
    setValue(selectedValue);
    setOpen(false);
    if (onValueChange) {
      onValueChange(selectedValue); // Call the callback with the selected value
    }
  };



  return (
    <div className="flex flex-col space-y-6">
      <div className="flex gap-4">
      <div className="w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between border-none shadow-sm"
            >
              {value
                ? suppliers.find((supplier) => supplier.value === value)
                ?.label
                : "Select User Role..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-full p-0">
            <Command>
              <CommandInput placeholder="Search User Role..." />
              <CommandList>
                <CommandEmpty>No supplier found.</CommandEmpty>
                <CommandGroup>
                  {suppliers.map((supplier) => (
                    <CommandItem
                      key={supplier.value}
                      onSelect={() => {
                        setValue(supplier.value);
                        handleSelect(supplier.value)
                        setOpen(false);
                        
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === supplier.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {supplier.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        </div>
     

        </div>

        
 
    </div>
  );
}
