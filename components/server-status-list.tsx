"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react"

const servers = [
  {
    id: 1,
    name: "Servidor Web 01",
    ip: "192.168.1.101",
    status: "online",
    uptime: "15d 7h 23m",
    cpu: "42%",
    ram: "3.2 GB / 8 GB",
    disk: "120 GB / 500 GB",
  },
  {
    id: 2,
    name: "Servidor Web 02",
    ip: "192.168.1.102",
    status: "online",
    uptime: "12d 5h 45m",
    cpu: "38%",
    ram: "2.8 GB / 8 GB",
    disk: "145 GB / 500 GB",
  },
  {
    id: 3,
    name: "Servidor API 01",
    ip: "192.168.1.103",
    status: "warning",
    uptime: "8d 12h 10m",
    cpu: "78%",
    ram: "6.5 GB / 8 GB",
    disk: "210 GB / 500 GB",
  },
  {
    id: 4,
    name: "Servidor API 02",
    ip: "192.168.1.104",
    status: "online",
    uptime: "10d 3h 55m",
    cpu: "35%",
    ram: "2.5 GB / 8 GB",
    disk: "180 GB / 500 GB",
  },
  {
    id: 5,
    name: "Base de Datos 01",
    ip: "192.168.1.105",
    status: "online",
    uptime: "20d 9h 12m",
    cpu: "42%",
    ram: "12 GB / 32 GB",
    disk: "1.2 TB / 4 TB",
  },
  {
    id: 6,
    name: "Base de Datos 02",
    ip: "192.168.1.106",
    status: "online",
    uptime: "18d 2h 30m",
    cpu: "35%",
    ram: "10 GB / 32 GB",
    disk: "1.5 TB / 4 TB",
  },
  {
    id: 7,
    name: "Servidor de Archivos",
    ip: "192.168.1.107",
    status: "warning",
    uptime: "25d 14h 5m",
    cpu: "25%",
    ram: "4 GB / 16 GB",
    disk: "3.8 TB / 8 TB",
  },
  {
    id: 8,
    name: "Servidor de Autenticación",
    ip: "192.168.1.108",
    status: "online",
    uptime: "14d 8h 40m",
    cpu: "30%",
    ram: "2.2 GB / 8 GB",
    disk: "120 GB / 500 GB",
  },
  {
    id: 9,
    name: "Servidor de Caché",
    ip: "192.168.1.109",
    status: "online",
    uptime: "22d 5h 15m",
    cpu: "28%",
    ram: "24 GB / 64 GB",
    disk: "80 GB / 500 GB",
  },
  {
    id: 10,
    name: "Servidor de Backup",
    ip: "192.168.1.110",
    status: "offline",
    uptime: "0d 0h 0m",
    cpu: "0%",
    ram: "0 GB / 16 GB",
    disk: "2.5 TB / 10 TB",
  },
  {
    id: 11,
    name: "Servidor de Monitoreo",
    ip: "192.168.1.111",
    status: "online",
    uptime: "30d 2h 18m",
    cpu: "22%",
    ram: "3.5 GB / 8 GB",
    disk: "220 GB / 500 GB",
  },
  {
    id: 12,
    name: "Servidor de Logs",
    ip: "192.168.1.112",
    status: "online",
    uptime: "28d 6h 42m",
    cpu: "18%",
    ram: "2.8 GB / 8 GB",
    disk: "350 GB / 1 TB",
  },
  {
    id: 13,
    name: "Servidor de Desarrollo",
    ip: "192.168.1.113",
    status: "maintenance",
    uptime: "0d 0h 0m",
    cpu: "0%",
    ram: "0 GB / 16 GB",
    disk: "250 GB / 1 TB",
  },
  {
    id: 14,
    name: "Servidor de Pruebas",
    ip: "192.168.1.114",
    status: "maintenance",
    uptime: "0d 0h 0m",
    cpu: "0%",
    ram: "0 GB / 16 GB",
    disk: "220 GB / 1 TB",
  },
]

export default function ServerStatusList() {
  const getStatusIcon = (status) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-5 w-5 text-emerald-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-400" />
      case "offline":
        return <XCircle className="h-5 w-5 text-red-400" />
      case "maintenance":
        return <Clock className="h-5 w-5 text-cyan-400" />
      default:
        return null
    }
  }

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

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-slate-700">
          <TableHead className="text-slate-300">Servidor</TableHead>
          <TableHead className="text-slate-300">IP</TableHead>
          <TableHead className="text-slate-300">Estado</TableHead>
          <TableHead className="text-slate-300">Tiempo Activo</TableHead>
          <TableHead className="text-slate-300">CPU</TableHead>
          <TableHead className="text-slate-300">RAM</TableHead>
          <TableHead className="text-slate-300">Disco</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {servers.map((server) => (
          <TableRow key={server.id} className="border-slate-800 hover:bg-slate-800/50">
            <TableCell className="font-medium flex items-center gap-2 text-slate-300">
              {getStatusIcon(server.status)}
              {server.name}
            </TableCell>
            <TableCell className="text-slate-400">{server.ip}</TableCell>
            <TableCell>{getStatusBadge(server.status)}</TableCell>
            <TableCell className="text-slate-400">{server.uptime}</TableCell>
            <TableCell className="text-slate-400">{server.cpu}</TableCell>
            <TableCell className="text-slate-400">{server.ram}</TableCell>
            <TableCell className="text-slate-400">{server.disk}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
