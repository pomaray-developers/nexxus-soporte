"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Web 01", tiempo: 42 },
  { name: "Web 02", tiempo: 38 },
  { name: "API 01", tiempo: 55 },
  { name: "API 02", tiempo: 60 },
  { name: "DB 01", tiempo: 28 },
  { name: "DB 02", tiempo: 32 },
  { name: "Cache", tiempo: 15 },
  { name: "Auth", tiempo: 48 },
]

export default function ResponseTimeChart() {
  return (
    <ChartContainer
      config={{
        tiempo: {
          label: "Tiempo de Respuesta (ms)",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="aspect-[16/9]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-800" />
          <XAxis dataKey="name" className="text-sm text-slate-400" />
          <YAxis className="text-sm text-slate-400" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="tiempo" fill="var(--color-tiempo)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
