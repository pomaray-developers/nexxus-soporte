"use client"

import { useState } from "react"
import {
  GitPullRequest,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  GitBranch,
  GitCommit,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

export default function CICDPage() {
  const { toast } = useToast()
  const [isRunningPipeline, setIsRunningPipeline] = useState(false)
  const [pipelineProgress, setPipelineProgress] = useState(0)

  const pipelines = [
    {
      id: "pipe-1234",
      name: "main-deploy",
      status: "success",
      branch: "main",
      commit: "fix: auth issues for third-party integration",
      commitId: "a1b2c3d",
      duration: "2m 35s",
      timestamp: "hace 17 minutos",
      author: "admin",
      stages: [
        { name: "build", status: "success", duration: "45s" },
        { name: "test", status: "success", duration: "1m 10s" },
        { name: "deploy", status: "success", duration: "40s" },
      ],
    },
    {
      id: "pipe-1235",
      name: "feature-test",
      status: "running",
      branch: "feature/user-auth",
      commit: "feat: implement user authentication flow",
      commitId: "e5f6g7h",
      duration: "1m 23s",
      timestamp: "hace 5 minutos",
      author: "developer1",
      stages: [
        { name: "build", status: "success", duration: "48s" },
        { name: "test", status: "running", duration: "35s" },
        { name: "deploy", status: "pending", duration: "-" },
      ],
    },
    {
      id: "pipe-1236",
      name: "hotfix-deploy",
      status: "failed",
      branch: "hotfix/payment-gateway",
      commit: "fix: payment gateway timeout issue",
      commitId: "i9j0k1l",
      duration: "3m 12s",
      timestamp: "hace 1 hora",
      author: "developer2",
      stages: [
        { name: "build", status: "success", duration: "42s" },
        { name: "test", status: "success", duration: "1m 15s" },
        { name: "deploy", status: "failed", duration: "1m 15s" },
      ],
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-emerald-400" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-400" />
      case "running":
        return <RefreshCw className="h-5 w-5 text-cyan-400 animate-spin" />
      case "pending":
        return <Clock className="h-5 w-5 text-amber-400" />
      default:
        return null
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Exitoso</Badge>
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Fallido</Badge>
      case "running":
        return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">En progreso</Badge>
      case "pending":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Pendiente</Badge>
      default:
        return null
    }
  }

  const runPipeline = () => {
    setIsRunningPipeline(true)
    setPipelineProgress(0)

    toast({
      title: "Pipeline iniciado",
      description: "El pipeline se está ejecutando...",
    })

    const interval = setInterval(() => {
      setPipelineProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunningPipeline(false)
          toast({
            title: "Pipeline completado",
            description: "El pipeline se ha ejecutado correctamente",
            variant: "success",
          })
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-2">
          <GitPullRequest className="h-5 w-5 text-emerald-400" />
          <h2 className="text-xl font-semibold text-white">CI/CD Pipelines</h2>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950"
            onClick={runPipeline}
            disabled={isRunningPipeline}
          >
            <Play className="mr-2 h-4 w-4" />
            Ejecutar Pipeline
          </Button>
        </div>
      </div>

      {isRunningPipeline && (
        <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-base">Ejecutando Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso: {pipelineProgress}%</span>
                <span>{pipelineProgress < 100 ? "En progreso..." : "Completado"}</span>
              </div>
              <Progress
                value={pipelineProgress}
                className="h-2 bg-slate-800"
                indicatorClassName="bg-gradient-to-r from-emerald-500 to-cyan-500"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="pipelines" className="w-full">
        <TabsList className="bg-slate-800/50 mb-4">
          <TabsTrigger
            value="pipelines"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950"
          >
            Pipelines
          </TabsTrigger>
          <TabsTrigger
            value="environments"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950"
          >
            Entornos
          </TabsTrigger>
          <TabsTrigger
            value="artifacts"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950"
          >
            Artefactos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipelines" className="mt-0">
          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader>
              <CardTitle className="text-white">Historial de Pipelines</CardTitle>
              <CardDescription>Últimas ejecuciones de pipelines</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {pipelines.map((pipeline) => (
                    <Card key={pipeline.id} className="border-slate-800 bg-slate-800/30">
                      <CardHeader className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(pipeline.status)}
                            <div>
                              <CardTitle className="text-base text-white">{pipeline.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {pipeline.id} • {pipeline.timestamp}
                              </CardDescription>
                            </div>
                          </div>
                          <div>{getStatusBadge(pipeline.status)}</div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <GitBranch className="h-4 w-4 text-slate-400" />
                              <span className="text-slate-300">{pipeline.branch}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <GitCommit className="h-4 w-4 text-slate-400" />
                              <span className="text-slate-300">{pipeline.commit}</span>
                              <Badge variant="outline" className="text-xs bg-slate-800 border-slate-700">
                                {pipeline.commitId.substring(0, 7)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-slate-400" />
                              <span className="text-slate-300">Duración: {pipeline.duration}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-slate-300">Etapas</h4>
                            {pipeline.stages.map((stage) => (
                              <div key={stage.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(stage.status)}
                                  <span className="text-slate-300">{stage.name}</span>
                                </div>
                                <span className="text-slate-400">{stage.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                            Ver detalles
                          </Button>
                          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950">
                            Reiniciar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environments" className="mt-0">
          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader>
              <CardTitle className="text-white">Entornos de Despliegue</CardTitle>
              <CardDescription>Gestión de entornos de desarrollo, pruebas y producción</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <GitPullRequest className="h-12 w-12 mx-auto text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-slate-400">Contenido en desarrollo</h3>
                <p className="text-slate-500 mt-1">Esta sección estará disponible pronto</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="artifacts" className="mt-0">
          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader>
              <CardTitle className="text-white">Artefactos</CardTitle>
              <CardDescription>Artefactos generados por los pipelines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <GitPullRequest className="h-12 w-12 mx-auto text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-slate-400">Contenido en desarrollo</h3>
                <p className="text-slate-500 mt-1">Esta sección estará disponible pronto</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
