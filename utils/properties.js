import { HomeIcon, ListChecks, ReceiptText, Upload, User, Users } from 'lucide-react'; 


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
    name: "Purchase Details",
    href: "/uploadpurchase",
    icon: ReceiptText,
  },
  {
    name: "Reimbursement",
    href: "/reimsummery",
    icon: Upload,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },

];

export {sidebarItems};



