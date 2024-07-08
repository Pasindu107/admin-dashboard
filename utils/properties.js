import { HomeIcon, ListChecks, Upload, Users } from 'lucide-react'; 

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Items",
    href: "/items",
    icon: ListChecks,
  },
  {
    name: "Supplier",
    href: "/supplier",
    icon: Users,
  },
  {
    name: " Upload Purchase",
    href: "/uploadpurchase",
    icon: ListChecks,
  },
  {
    name: "Reimbursement",
    href: "/reimsummery",
    icon: Upload,
  },
];

export {sidebarItems};



