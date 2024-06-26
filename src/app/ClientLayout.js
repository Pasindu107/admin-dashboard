// src/app/ClientLayout.js
"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";
import { AuthProvider } from "@/src/context/AuthContext";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isRegisterPage = pathname === '/register';




  return (
    <div className="flex h-screen bg-slate-200">
      {!isLoginPage && !isRegisterPage && (
        <div className="md:pl-2 lg:pl-2 xl:pl-2 py-2">
          <Sidebar />
        </div>
      )}
      <div className={`flex flex-col w-full p-2 ${isLoginPage || isRegisterPage ? '' : 'pl-2'}`}>
        {!isLoginPage && !isRegisterPage && (
          <div className="flex-shrink-0 pb-2">
            <Header />
          </div>
        )}
        <AuthProvider>
        <div className="p-4 flex-grow bg-white rounded-[10px] overflow-auto">{children}</div>
        </AuthProvider>
      </div>
    </div>
  );
}