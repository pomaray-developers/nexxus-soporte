"use client"

import { useState } from "react"
import {
  Server,
  Plus,
  Search,
  Power,
  RefreshCw,
  HardDrive,
  Cpu,
  MemoryStickIcon as Memory,
  Network,
  Settings,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ServersPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedServer, setSelectedServer] = useState(null)
  const [isRestarting, setIsRestarting] = useState(false)

  const servers = [
    {
      id: 1,
      name: "Servidor Web 01",
      ip: "192.168.1.101",
      status: "online",
      uptime: "15d 7h 23m",
      cpu: 42,
      ram: 40,
      disk: 24,
      type: "web",
      location: "us-east",
      os: "Ubuntu 22.04 LTS",
    },
    {
      id: 2,
      name: "Servidor Web 02",
      ip: "192.168.1.102",
      status: "online",
      uptime: "12d 5h 45m",
      cpu: 38,
      ram: 35,
      disk: 29,
      type: "web",
      location: "us-east",
      os: "Ubuntu 22.04 LTS",
    },
    {
      id: 3,
      name: "Servidor API 01",
      ip: "192.168.1.103",
      status: "warning",
      uptime: "8d 12h 10m",
      cpu: 78,
      ram: 81,
      disk: 42,
      type: "api",
      location: "us-west",
      os: "CentOS 8",
    },
    {
      id: 4,
      name: "Servidor API 02",
      ip: "192.168.1.104",
      status: "online",
      uptime: "10d 3h 55m",
      cpu: 35,
      ram: 31,
      disk: 36,
      type: "api",
      location: "us-west",
      os: "CentOS 8",
    },
    {
      id: 5,
      name: "Base de Datos 01",
      ip: "192.168.1.105",
      status: "online",
      uptime: "20d 9h 12m",
      cpu: 42,
      ram: 38,
      disk: 30,
      type: "database",
      location: "us-central",
      os: "Debian 11",
    },
    {
      id: 6,
      name: "Base de Datos 02",
      ip: "192.168.1.106",
      status: "online",
      uptime: "18d 2h 30m",
      cpu: 35,
      ram: 31,
      disk: 38,
      type: "database",
      location: "us-central",
      os: "Debian 11",
    },
    {
      id: 7,
      name: "Servidor de Archivos",
      ip: "192.168.1.107",
      status: "warning",
      uptime: "25d 14h 5m",
      cpu: 25,
      ram: 25,
      disk: 82,
      type: "storage",
      location: "us-east",
      os: "Ubuntu 20.04 LTS",
    },
    {
      id: 8,
      name: "Servidor de Autenticación",
      ip: "192.168.1.108",
      status: "online",
      uptime: "14d 8h 40m",
      cpu: 30,
      ram: 28,
      disk: 24,
      type: "auth",
      location: "us-east",
      os: "Ubuntu 22.04 LTS",
    },
    {
      id: 9,
      name: "Servidor de Caché",
      ip: "192.168.1.109",
      status: "online",
      uptime: "22d 5h 15m",
      cpu: 28,
      ram: 38,
      disk: 16,
      type: "cache",
      location: "us-central",
      os: "Alpine Linux 3.16",
    },
    {
      id: 10,
      name: "Servidor de Backup",
      ip: "192.168.1.110",
      status: "offline",
      uptime: "0d 0h 0m",
      cpu: 0,
      ram: 0,
      disk: 25,
      type: "backup",
      location: "us-west",
      os: "Ubuntu 20.04 LTS",
    },
  ]

  const filteredServers = servers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.ip.includes(searchQuery) ||
      server.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case "online":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">En línea</Badge>
      case "warning":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Advertencia</Badge>
      case "offline":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Fuera de línea</Badge>
      case "maintenance":
        return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Mantenimiento</Badge>
      default:
        return null
    }
  }

  const handleServerClick = (server) => {
    setSelectedServer(server)
  }

  const handleRestartServer = () => {
    setIsRestarting(true)

    toast({
      title: "Reiniciando servidor",
      description: `El servidor ${selectedServer.name} se está reiniciando...`,
    })

    setTimeout(() => {
      setIsRestarting(false)
      toast({
        title: "Servidor reiniciado",
        description: `El servidor ${selectedServer.name} se ha reiniciado correctamente`,
        variant: "success",
      })
    }, 3000)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="h-5 w-5 text-emerald-400" />
          <h2 className="text-xl font-semibold text-white">Gestión de Servidores</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar servidores..."
              className="pl-9 bg-slate-800/50 border-slate-700 text-slate-300 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Servidor
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-slate-800/50 mb-4">
          <TabsTrigger value="all" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950">
            Todos
          </TabsTrigger>
          <TabsTrigger value="web" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950">
            Web
          </TabsTrigger>
          <TabsTrigger
            value="database"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950"
          >
            Base de Datos
          </TabsTrigger>
          <TabsTrigger value="other" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950">
            Otros
          </TabsTrigger>
        </TabsList>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
              <CardHeader>
                <CardTitle className="text-white">Servidores</CardTitle>
                <CardDescription>Lista de todos los servidores</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-2">
                    {filteredServers.map((server) => (
                      <div
                        key={server.id}
                        className={`p-3 rounded-lg border ${
                          selectedServer?.id === server.id
                            ? "border-emerald-500/50 bg-emerald-500/10"
                            : "border-slate-800 bg-slate-800/30 hover:bg-slate-800/50"
                        } cursor-pointer transition-colors`}
                        onClick={() => handleServerClick(server)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 w-3 rounded-full ${
                                server.status === "online"
                                  ? "bg-emerald-400"
                                  : server.status === "warning"
                                    ? "bg-amber-400"
                                    : "bg-red-400"
                              }`}
                            ></div>
                            <h3 className="font-medium text-white">{server.name}</h3>
                          </div>
                          {getStatusBadge(server.status)}
                        </div>
                        <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                          <span>{server.ip}</span>
                          <span>Uptime: {server.uptime}</span>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>CPU</span>
                              <span className={server.cpu > 70 ? "text-amber-400" : "text-slate-400"}>
                                {server.cpu}%
                              </span>
                            </div>
                            <Progress
                              value={server.cpu}
                              className="h-1 bg-slate-800"
                              indicatorClassName={`${
                                server.cpu > 70
                                  ? "bg-gradient-to-r from-amber-500 to-red-500"
                                  : "bg-gradient-to-r from-emerald-500 to-cyan-500"
                              }`}
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>RAM</span>
                              <span className={server.ram > 70 ? "text-amber-400" : "text-slate-400"}>
                                {server.ram}%
                              </span>
                            </div>
                            <Progress
                              value={server.ram}
                              className="h-1 bg-slate-800"
                              indicatorClassName={`${
                                server.ram > 70
                                  ? "bg-gradient-to-r from-amber-500 to-red-500"
                                  : "bg-gradient-to-r from-emerald-500 to-cyan-500"
                              }`}
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>Disco</span>
                              <span className={server.disk > 70 ? "text-amber-400" : "text-slate-400"}>
                                {server.disk}%
                              </span>
                            </div>
                            <Progress
                              value={server.disk}
                              className="h-1 bg-slate-800"
                              indicatorClassName={`${
                                server.disk > 70
                                  ? "bg-gradient-to-r from-amber-500 to-red-500"
                                  : "bg-gradient-to-r from-emerald-500 to-cyan-500"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div>
            {selectedServer ? (
              <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{selectedServer.name}</CardTitle>
                    {getStatusBadge(selectedServer.status)}
                  </div>
                  <CardDescription>{selectedServer.ip}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-slate-400">Tipo</Label>
                      <div className="font-medium">{selectedServer.type}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-slate-400">Ubicación</Label>
                      <div className="font-medium">{selectedServer.location}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-slate-400">Sistema Operativo</Label>
                      <div className="font-medium">{selectedServer.os}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-slate-400">Tiempo Activo</Label>
                      <div className="font-medium">{selectedServer.uptime}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Uso de Recursos</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-slate-400" />
                            <span>CPU</span>
                          </div>
                          <span className={selectedServer.cpu > 70 ? "text-amber-400" : "text-slate-400"}>
                            {selectedServer.cpu}%
                          </span>
                        </div>
                        <Progress
                          value={selectedServer.cpu}
                          className="h-2 bg-slate-800"
                          indicatorClassName={`${
                            selectedServer.cpu > 70
                              ? "bg-gradient-to-r from-amber-500 to-red-500"
                              : "bg-gradient-to-r from-emerald-500 to-cyan-500"
                          }`}
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Memory className="h-4 w-4 text-slate-400" />
                            <span>RAM</span>
                          </div>
                          <span className={selectedServer.ram > 70 ? "text-amber-400" : "text-slate-400"}>
                            {selectedServer.ram}%
                          </span>
                        </div>
                        <Progress
                          value={selectedServer.ram}
                          className="h-2 bg-slate-800"
                          indicatorClassName={`${
                            selectedServer.ram > 70
                              ? "bg-gradient-to-r from-amber-500 to-red-500"
                              : "bg-gradient-to-r from-emerald-500 to-cyan-500"
                          }`}
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <HardDrive className="h-4 w-4 text-slate-400" />
                            <span>Disco</span>
                          </div>
                          <span className={selectedServer.disk > 70 ? "text-amber-400" : "text-slate-400"}>
                            {selectedServer.disk}%
                          </span>
                        </div>
                        <Progress
                          value={selectedServer.disk}
                          className="h-2 bg-slate-800"
                          indicatorClassName={`${
                            selectedServer.disk > 70
                              ? "bg-gradient-to-r from-amber-500 to-red-500"
                              : "bg-gradient-to-r from-emerald-500 to-cyan-500"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 text-slate-300"
                      disabled={selectedServer.status === "offline"}
                    >
                      <Network className="mr-2 h-4 w-4" />
                      SSH
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 text-slate-300"
                      disabled={selectedServer.status === "offline"}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configurar
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-700 text-slate-300"
                          disabled={selectedServer.status === "offline"}
                        >
                          <Power className="mr-2 h-4 w-4" />
                          Reiniciar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border-slate-700 text-slate-300">
                        <DialogHeader>
                          <DialogTitle className="text-white">Reiniciar Servidor</DialogTitle>
                          <DialogDescription>
                            ¿Estás seguro de que quieres reiniciar el servidor {selectedServer.name}?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-sm text-slate-400">
                            El servidor estará inaccesible durante el reinicio. Esta acción puede tardar unos minutos.
                          </p>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" className="border-slate-700">
                            Cancelar
                          </Button>
                          <Button
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                            onClick={handleRestartServer}
                            disabled={isRestarting}
                          >
                            {isRestarting ? (
                              <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Reiniciando...
                              </>
                            ) : (
                              "Reiniciar"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-slate-800 bg-slate-900/50 text-slate-300 h-full flex items-center justify-center">
                <CardContent className="text-center py-10">
                  <Server className="h-12 w-12 mx-auto text-slate-600 mb-4" />
                  <h3 className="text-lg font-medium text-slate-400">Ningún servidor seleccionado</h3>
                  <p className="text-slate-500 mt-1">Selecciona un servidor para ver sus detalles</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  )
}
