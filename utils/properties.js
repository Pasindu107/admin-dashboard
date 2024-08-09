import { BookCheck, HomeIcon, ListChecks, ReceiptText, Upload, User, Users } from 'lucide-react'; 


const sidebarItems = [
  {
    id: 1,
    name: "Dashboard",
    href: "/",
    icon: HomeIcon,
  },
  {
    id: 2,
    name: "Items",
    href: "/items",
    icon: ListChecks,
  },
  {
    id: 3,
    name: "Supplier",
    href: "/supplier",
    icon: Users,
  },
  {
    id: 7,
    name: "Purchase Details",
    href: "/uploadpurchase",
    icon: ReceiptText,
  },
  {
    id: 10,
    name: "Reimbursement",
    href: "/reimsummery",
    icon: Upload,
  },

  {
    id: 15,
    name: "App Packages",
    href: "/apppackages",
    icon: BookCheck,
  },

  {
    id: 13,
    name: "Profile",
    href: "/profile",
    icon: User,
  },

];

export {sidebarItems};



