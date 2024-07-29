"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { fetchRole } from "@/src/app/api/ProfComboBoxData";
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

export function SignupComboBox({ onValueChange, selectedValue }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedValue);
  const [roleData, setRoleData] = React.useState([]);

  // Fetch role data on component mount
  React.useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const roles = await fetchRole();
        setRoleData(roles);
      } catch (error) {
        console.error("Error fetching roles data:", error);
      }
    };
    fetchRoleData();
  }, []);

  // Update internal state when selectedValue prop changes
  React.useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  // Handle role selection
  const handleSelect = (selectedRole) => {
    setValue(selectedRole);
    setOpen(false);
    if (onValueChange) {
      onValueChange(selectedRole);
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
                  ? roleData.find((role) => role.value === value)?.label
                  : "Select User Role..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-full p-0">
              <Command>
                <CommandInput placeholder="Search User Role..." />
                <CommandList>
                  <CommandEmpty>No role data found.</CommandEmpty>
                  <CommandGroup>
                    {roleData.map((role) => (
                      <CommandItem
                        key={role.value}
                        onSelect={() => handleSelect(role.value)}
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
