"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { useEffect, useState } from "react"


import { dashData } from '@/src/app/api/dashData';



export function RadialChart() {
    const [data, setData] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [error, setError] = useState(null);
    const [regSuppliers, setregSuppliers] = useState(0);
    const [mothlyIncome, setMonthlyIncome] = useState(0)

    useEffect(() => {
      async function fetchData() {
          try {
              const response = await dashData();
              // console.log('API response:', response);

              if (response && response.length > 0) {
                  setData(response);

                  // Calculate the percentage
                  const totalSuppliers = response[0].Suppliers;
                  const registeredSuppliers = response[0].RegSuppliers;
                  const regPercentage = (registeredSuppliers / totalSuppliers) * 100;
                  setregSuppliers(registeredSuppliers)
                  setPercentage(regPercentage.toFixed(2));  // Set percentage with 2 decimal places
                  setMonthlyIncome(response[0].MonthlyIncome);

              } else {
                  console.error("Response does not contain valid data:", response);
                  setError("Failed to fetch data: Data not found in response");
              }
          } catch (error) {
              console.error("Error fetching data:", error);
              setError("Error fetching data");
          }
      }

      fetchData();
  }, []);

  const chartData = [
    { browser: "safari", Registered: percentage, fill: "var(--color-safari)" },
  ]

  const chartConfig = {
    Registered: {
      label: "Registered",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
  } 

  return (
    <Card className="flex flex-col border-none ">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-gray-500 font-normal text-lg">Suppliers</CardTitle>
        <CardDescription> </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={percentage}
            innerRadius={114}
            outerRadius={150}
            
          >
            <PolarGrid
              gridType="circle"
              radialLines={false} 
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[120, 105]}
            />
            <RadialBar dataKey="Registered" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].Registered.toLocaleString()}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Registered
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 48}
                          className="fill-muted-foreground"
                        >
                          
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        {/* <div className="flex mt-10 gap-4 text-3xl text-white rounded-lg content-center p-6 bg-indigo-500">
            <div className="text-center">
              Income
            </div>
            <div className="text-center">
              |
            </div>
            <div className="text-center">
                Rs. {mothlyIncome}.00
            </div>
        </div> */}

      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
    
      </CardFooter>
    </Card>
  )
}
