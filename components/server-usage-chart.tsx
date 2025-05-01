"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "00:00", cpu: 32, ram: 40, disk: 28 },
  { name: "02:00", cpu: 40, ram: 45, disk: 28 },
  { name: "04:00", cpu: 30, ram: 38, disk: 29 },
  { name: "06:00", cpu: 28, ram: 35, disk: 29 },
  { name: "08:00", cpu: 35, ram: 42, disk: 30 },
  { name: "10:00", cpu: 62, ram: 58, disk: 32 },
  { name: "12:00", cpu: 75, ram: 65, disk: 35 },
  { name: "14:00", cpu: 68, ram: 60, disk: 37 },
  { name: "16:00", cpu: 70, ram: 63, disk: 40 },
  { name: "18:00", cpu: 55, ram: 50, disk: 42 },
  { name: "20:00", cpu: 40, ram: 45, disk: 43 },
  { name: "22:00", cpu: 35, ram: 40, disk: 43 },
]

export default function ServerUsageChart() {
  return (
    <ChartContainer
      config={{
        cpu: {
          label: "CPU",
          color: "hsl(var(--chart-1))",
        },
        ram: {
          label: "RAM",
          color: "hsl(var(--chart-2))",
        },
        disk: {
          label: "Almacenamiento",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="aspect-[16/9]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-sm text-slate-400" />
          <YAxis className="text-sm text-slate-400" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="cpu"
            stackId="1"
            stroke="var(--color-cpu)"
            fill="var(--color-cpu)"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="ram"
            stackId="2"
            stroke="var(--color-ram)"
            fill="var(--color-ram)"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="disk"
            stackId="3"
            stroke="var(--color-disk)"
            fill="var(--color-disk)"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
