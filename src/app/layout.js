
import { Inter } from "next/font/google";
import "@/styles/globals.css"
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ClientLayout from "./ClientLayout";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  
  
  return (
    <html lang="en">
      <body className={`${inter.className} ` }> 
          {/* <div className="md:pl-2 lg:pl-2 xl:pl-2 py-2 "><Sidebar /></div> */}
          <div className="">
            
            {/* <div className="flex-shrink-0 pb-2 ">
            <Header />
            </div> */}
            
            <ClientLayout>{children}</ClientLayout>
            
            
            
            
          </div>


          

      </body>
    </html> 
  );
}
