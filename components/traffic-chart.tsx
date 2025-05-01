"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "00:00", entrada: 12, salida: 8 },
  { name: "02:00", entrada: 10, salida: 7 },
  { name: "04:00", entrada: 8, salida: 5 },
  { name: "06:00", entrada: 9, salida: 6 },
  { name: "08:00", entrada: 15, salida: 10 },
  { name: "10:00", entrada: 25, salida: 18 },
  { name: "12:00", entrada: 30, salida: 22 },
  { name: "14:00", entrada: 28, salida: 20 },
  { name: "16:00", entrada: 26, salida: 19 },
  { name: "18:00", entrada: 20, salida: 15 },
  { name: "20:00", entrada: 18, salida: 12 },
  { name: "22:00", entrada: 15, salida: 10 },
]

export default function TrafficChart() {
  return (
    <ChartContainer
      config={{
        entrada: {
          label: "Tráfico Entrante",
          color: "hsl(var(--chart-1))",
        },
        salida: {
          label: "Tráfico Saliente",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="aspect-[16/9]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Line
            type="monotone"
            dataKey="entrada"
            stroke="var(--color-entrada)"
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="salida"
            stroke="var(--color-salida)"
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
