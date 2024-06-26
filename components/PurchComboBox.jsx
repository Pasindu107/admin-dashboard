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

export function PurchComboBox({ onEmailSelect }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [suppliers, setSuppliers] = React.useState([]);

  React.useEffect(() => {
    const fetchSuppliersData = async () => {
      try {
        const suppliersData = await fetchSuppliers();
        setSuppliers(suppliersData);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliersData();
  }, []);

  // Function to handle email selection
  const handleEmailSelection = (selectedEmail) => {
    setEmail(selectedEmail);
    if (onEmailSelect) {
      onEmailSelect(selectedEmail);
    }
    setOpen(false);
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
              className="w-full justify-between"
            >
              {value
                ? suppliers.find((supplier) => supplier.value === value)
                ?.label
                : "Select Supplier..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-full p-0">
            <Command>
              <CommandInput placeholder="Search supplier..." />
              <CommandList>
                <CommandEmpty>No supplier found.</CommandEmpty>
                <CommandGroup>
                  {suppliers.map((supplier) => (
                    <CommandItem
                      key={supplier.value}
                      onSelect={() => {
                        handleEmailSelection(supplier.email);
                        setValue(supplier.value);                        
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
        
          <Label className='content-center rounded p-2 bg-slate-100'>{value}</Label>     

        </div>
        <Label className='rounded p-3 bg-slate-100'>{email}</Label>
        

    </div>
  );
}
