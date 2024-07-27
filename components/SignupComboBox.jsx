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


import {fetchRole} from '@/src/app/api/ProfComboBoxData'


export function SignupComboBox({onValueChange }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [roleData, setRoleData] = React.useState([]);


  React.useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const roleData = await fetchRole();

        setRoleData(roleData);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchRoleData();
  }, []);


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
              className="w-full justify-between shadow-sm border-none"
            >
              {value
                ? roleData.find((role) => role.value === value)
                ?.label
                : "Select User Role..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-full p-0">
            <Command>
              <CommandInput placeholder="Search User Role..." />
              <CommandList>
                <CommandEmpty>No Role data found.</CommandEmpty>
                <CommandGroup>
                  {roleData.map((role) => (
                    <CommandItem
                      key={role.value}
                      onSelect={() => {
                        setValue(role.value);
                        handleSelect(role.value)
                        setOpen(false);
                        
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === role.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {role.label}
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
