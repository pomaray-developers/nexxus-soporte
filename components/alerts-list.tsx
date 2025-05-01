"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, XCircle, CheckCircle, Github } from "lucide-react"

export default function AlertsList({ githubIssues = [] }) {
  const alerts = [
    {
      id: 1,
      title: "Uso de CPU elevado",
      description:
        "El servidor API 01 está experimentando un uso de CPU superior al 75% durante los últimos 30 minutos.",
      server: "Servidor API 01",
      timestamp: "Hace 22 minutos",
      severity: "warning",
      source: "system",
    },
    {
      id: 2,
      title: "Servidor fuera de línea",
      description: "El servidor de Backup no responde. Se requiere intervención manual para restaurar el servicio.",
      server: "Servidor de Backup",
      timestamp: "Hace 1 hora",
      severity: "critical",
      source: "system",
    },
    {
      id: 3,
      title: "Espacio en disco bajo",
      description: "El servidor de Archivos tiene menos del 20% de espacio libre en disco. Considere liberar espacio.",
      server: "Servidor de Archivos",
      timestamp: "Hace 45 minutos",
      severity: "warning",
      source: "system",
    },
  ]

  // Convertir los issues de GitHub en alertas
  const githubAlerts = githubIssues.map((issue) => ({
    id: `github-${issue.id}`,
    title: issue.title,
    description: issue.content,
    server: issue.repo,
    timestamp: issue.timestamp,
    severity: "critical",
    source: "github",
    user: issue.user,
    repo: issue.repo,
  }))

  // Combinar las alertas del sistema con las de GitHub
  const allAlerts = [...githubAlerts, ...alerts]

  const getSeverityIcon = (severity, source) => {
    if (source === "github") {
      return <Github className="h-5 w-5 text-red-400" />
    }

    switch (severity) {
      case "critical":
        return <XCircle className="h-5 w-5 text-red-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-400" />
      case "info":
        return <CheckCircle className="h-5 w-5 text-cyan-400" />
      default:
        return null
    }
  }

  const getSeverityBadge = (severity, source) => {
    if (source === "github") {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">GitHub Issue</Badge>
    }

    switch (severity) {
      case "critical":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Crítica</Badge>
      case "warning":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Advertencia</Badge>
      case "info":
        return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Información</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {allAlerts.map((alert) => (
        <Card
          key={alert.id}
          className={`border-slate-800 ${alert.source === "github" ? "bg-red-950/20 border-red-500/30" : "bg-slate-900/50"}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="mt-1">{getSeverityIcon(alert.severity, alert.source)}</div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${alert.source === "github" ? "text-red-300" : "text-slate-300"}`}>
                    {alert.title}
                  </h3>
                  {getSeverityBadge(alert.severity, alert.source)}
                </div>
                <p className="text-sm text-slate-400">{alert.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-500">
                    {alert.server} • {alert.timestamp}
                    {alert.source === "github" && <span className="ml-1">• @{alert.user}</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      Ignorar
                    </Button>
                    <Button
                      size="sm"
                      className={
                        alert.source === "github"
                          ? "bg-red-500 hover:bg-red-400 text-white"
                          : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                      }
                    >
                      Resolver
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
