"use client"

import { useState } from "react"
import { BarChart2, Calendar, Download, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

import ServerUsageChart from "@/components/server-usage-chart"
import TrafficChart from "@/components/traffic-chart"
import ResponseTimeChart from "@/components/response-time-chart"

export default function MetricsPage() {
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("24h")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)

    toast({
      title: "Actualizando métricas",
      description: "Las métricas se están actualizando...",
    })

    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Métricas actualizadas",
        description: "Las métricas se han actualizado correctamente",
        variant: "success",
      })
    }, 1500)
  }

  const handleExport = () => {
    toast({
      title: "Exportando métricas",
      description: "Las métricas se están exportando a CSV...",
    })

    setTimeout(() => {
      toast({
        title: "Métricas exportadas",
        description: "Las métricas se han exportado correctamente",
        variant: "success",
      })
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-emerald-400" />
          <h2 className="text-xl font-semibold text-white">Métricas y Análisis</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-300 w-full md:w-[150px]">
              <SelectValue placeholder="Rango de tiempo" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-slate-300">
              <SelectItem value="1h">Última hora</SelectItem>
              <SelectItem value="6h">Últimas 6 horas</SelectItem>
              <SelectItem value="24h">Últimas 24 horas</SelectItem>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Actualizando..." : "Actualizar"}
          </Button>
          <Button
            variant="outline"
            className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="bg-slate-800/50 mb-4">
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950"
          >
            Rendimiento
          </TabsTrigger>
          <TabsTrigger
            value="traffic"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950"
          >
            Tráfico
          </TabsTrigger>
          <TabsTrigger
            value="response"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950"
          >
            Tiempo de Respuesta
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-0">
          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-white">Rendimiento del Sistema</CardTitle>
                <CardDescription>Uso de CPU, RAM y almacenamiento</CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar className="h-4 w-4" />
                <span>
                  {timeRange === "1h"
                    ? "Última hora"
                    : timeRange === "6h"
                      ? "Últimas 6 horas"
                      : timeRange === "24h"
                        ? "Últimas 24 horas"
                        : timeRange === "7d"
                          ? "Últimos 7 días"
                          : "Últimos 30 días"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ServerUsageChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="mt-0">
          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-white">Tráfico de Red</CardTitle>
                <CardDescription>Tráfico entrante y saliente (Mbps)</CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar className="h-4 w-4" />
                <span>
                  {timeRange === "1h"
                    ? "Última hora"
                    : timeRange === "6h"
                      ? "Últimas 6 horas"
                      : timeRange === "24h"
                        ? "Últimas 24 horas"
                        : timeRange === "7d"
                          ? "Últimos 7 días"
                          : "Últimos 30 días"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <TrafficChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="response" className="mt-0">
          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-white">Tiempo de Respuesta</CardTitle>
                <CardDescription>Promedio de tiempo de respuesta por servidor (ms)</CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar className="h-4 w-4" />
                <span>
                  {timeRange === "1h"
                    ? "Última hora"
                    : timeRange === "6h"
                      ? "Últimas 6 horas"
                      : timeRange === "24h"
                        ? "Últimas 24 horas"
                        : timeRange === "7d"
                          ? "Últimos 7 días"
                          : "Últimos 30 días"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponseTimeChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
