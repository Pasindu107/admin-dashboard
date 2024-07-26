"use client"

import { useEffect, useState } from "react"
import { CartesianGrid, Line, LineChart, YAxis, XAxis } from "recharts"
import { linechartData } from '@/src/app/api/linechart1'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
}

export function LineChart1() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await linechartData();
        // console.log('API response:', response);
        
        if (response) {
          setData(response);
        } else {
          console.error("Failed to fetch line chart data")
        }
      } catch (error) {
        console.error("Error fetching line chart data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <Card className="h-full border-none">
      <CardHeader>
        <CardTitle className="text-gray-400 text-xl font-normal">Supplier Registration</CardTitle>
        <CardDescription> </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="InsertDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            {/* <YAxis /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="SupCount"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">

      </CardFooter>
    </Card>
  )
}
