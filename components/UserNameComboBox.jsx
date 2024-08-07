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

import {fetchUsername} from '@/src/app/api/UnameComboData'





export function UserNameComboBox({onValueChange }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [userData, setUserData] = React.useState([]);



    React.useEffect(() => {
    const fetchuserData = async () => {
      try {
        const UserData = await fetchUsername();

         // Add the new option "New" with value "Create"
         const newUser = { value: "Create", label: "Create New" };
         const updatedUserData = [newUser, ...UserData];

         setUserData(updatedUserData);
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };

    fetchuserData();
  }, []);


  const handleSelect = (selectedValue) => {
    setValue(selectedValue);
    setOpen(false);
    const selectedUser = userData.find(user => user.value === selectedValue);
    if (selectedUser) {
      onValueChange(selectedUser); // Pass the entire user object
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
                ? userData.find((role) => role.value === value)
                ?.label
                : "Select Username..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-full p-0">
            <Command>
              <CommandInput placeholder="Search Useranme..." />
              <CommandList>
                <CommandEmpty>No usernames found.</CommandEmpty>
                <CommandGroup>
                  {userData.map((role) => (
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
