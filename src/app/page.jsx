"use client";

import { AChart } from "@/components/AreaChart";
//import { AChart } from '@/components/AreaChart'
import { BarChart1 } from "@/components/BarChart1";
import { BarChart2 } from "@/components/Barchart2";
import DashMonthlyIncome from "@/components/DashMonthlyIncome";
import DashPaymentCard from "@/components/DashPaymentCard";
import DashSupRegPercentage from "@/components/DashSupRegPercentage";
import { LineChart1 } from "@/components/LineChart1";
import { PieChart1 } from "@/components/PieChart1";

//import LogOut from '@/components/LogOut'

import ProtectedRoute from "@/components/ProtectRoute";
import { RadialChart } from "@/components/RadialChart";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute>
      {/* <div className='bg-red-100'>
          <DashPaymentCard />
      </div> */}

      <div className="grid grid--1 lg:grid-cols-3 sm:grid-cols-1 gap-2  h-full">
        <div className="flex flex-col gap-2 lg:col-span-2 ">
          <div className="">
            <DashPaymentCard />
          </div>
          <div className="h-full">
            <LineChart1 />
          </div>
        </div>

        <div className="grid gap-2 h-full">
          <DashMonthlyIncome />

          <RadialChart />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default page;
