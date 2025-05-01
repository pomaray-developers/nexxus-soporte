"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  Server,
  Shield,
  Users,
  Zap,
  Activity,
  BarChart2,
  GitPullRequest,
  Github,
  User,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

import ServerUsageChart from "@/components/server-usage-chart"
import TrafficChart from "@/components/traffic-chart"
import ResponseTimeChart from "@/components/response-time-chart"
import ServerStatusList from "@/components/server-status-list"
import AlertsList from "@/components/alerts-list"
import GithubNotification from "@/components/github-notification"
import GithubPage from "@/components/pages/github-page"
import CICDPage from "@/components/pages/cicd-page"
import ServersPage from "@/components/pages/servers-page"
import MetricsPage from "@/components/pages/metrics-page"
import UserPage from "@/components/pages/user-page"
import { useLocalStorage } from "@/hooks/use-local-storage"

export default function DashboardPage() {
  const { toast } = useToast()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showGithubAlert, setShowGithubAlert] = useState(false)
  const [githubIssue, setGithubIssue] = useState(null)
  const [notificationCount, setNotificationCount] = useState(3)
  const [lastUpdate, setLastUpdate] = useState("hace 2 min")
  const [isLive, setIsLive] = useState(true)
  const [activePage, setActivePage] = useState("dashboard")
  const [notifications, setNotifications] = useLocalStorage("notifications", [])
  const [githubIssues, setGithubIssues] = useLocalStorage("githubIssues", [])

  // Simular la llegada de un issue de GitHub después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      const newIssue = {
        id: "GH-1234",
        title: "Error crítico en el servidor de producción",
        user: "alex_developer",
        repo: "nexxus/server-monitor",
        priority: "high",
        timestamp: "ahora mismo",
        content:
          "Se ha detectado un error crítico que afecta a los usuarios en producción. Necesitamos solucionar esto urgentemente.",
        labels: ["bug", "critical", "production"],
        assignees: ["admin"],
        created_at: new Date().toISOString(),
      }

      setGithubIssue(newIssue)
      setShowGithubAlert(true)
      setNotificationCount((prev) => prev + 1)

      // Añadir a la lista de issues
      const updatedIssues = [...githubIssues, newIssue]
      setGithubIssues(updatedIssues)

      // Añadir a notificaciones
      const newNotification = {
        id: Date.now(),
        type: "github",
        title: "Nuevo Issue en GitHub",
        message: `${newIssue.user} ha creado un issue: ${newIssue.title}`,
        timestamp: new Date().toISOString(),
        read: false,
      }
      setNotifications([...notifications, newNotification])

      toast({
        title: "¡Nuevo issue en GitHub!",
        description: `${newIssue.user} ha creado un issue: ${newIssue.title}`,
        variant: "destructive",
      })
    }, 5000)

    return () => clearTimeout(timer)
  }, [toast, githubIssues, setGithubIssues, notifications, setNotifications])

  const handleRefresh = () => {
    toast({
      title: "Actualizando datos",
      description: "Los datos se están actualizando en tiempo real",
    })
    setLastUpdate("ahora mismo")
  }

  const closeGithubAlert = () => {
    setShowGithubAlert(false)
  }

  const createGithubIssue = (issue) => {
    const newIssue = {
      id: `GH-${Math.floor(1000 + Math.random() * 9000)}`,
      title: issue.title,
      user: "admin",
      repo: "nexxus/server-monitor",
      priority: issue.priority || "medium",
      timestamp: "ahora mismo",
      content: issue.content,
      labels: issue.labels || ["bug"],
      assignees: issue.assignees || ["admin"],
      created_at: new Date().toISOString(),
    }

    // Añadir a la lista de issues
    const updatedIssues = [...githubIssues, newIssue]
    setGithubIssues(updatedIssues)

    // Mostrar notificación
    setGithubIssue(newIssue)
    setShowGithubAlert(true)
    setNotificationCount((prev) => prev + 1)

    // Añadir a notificaciones
    const newNotification = {
      id: Date.now(),
      type: "github",
      title: "Nuevo Issue en GitHub",
      message: `${newIssue.user} ha creado un issue: ${newIssue.title}`,
      timestamp: new Date().toISOString(),
      read: false,
    }
    setNotifications([...notifications, newNotification])

    toast({
      title: "¡Issue creado con éxito!",
      description: `Se ha creado el issue: ${newIssue.title}`,
    })

    return newIssue
  }

  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Tabs defaultValue="overview">
            <div className="flex items-center">
              <TabsList className="bg-slate-800/50">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950"
                >
                  Resumen
                </TabsTrigger>
                <TabsTrigger
                  value="servers"
                  className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950"
                >
                  Servidores
                </TabsTrigger>
                <TabsTrigger
                  value="alerts"
                  className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950"
                >
                  Alertas
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Badge variant="outline" className="hidden md:inline-flex border-slate-700 text-slate-300">
                  Última actualización: {lastUpdate}
                </Badge>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Servidores Activos</CardTitle>
                      <Server className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">12/14</div>
                      <div className="flex items-center text-xs text-slate-400 mt-1">
                        <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full mr-1"></span>
                        85.7% de servidores en línea
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Tiempo de Actividad</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-emerald-400"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">99.8%</div>
                      <div className="flex items-center text-xs text-emerald-400 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-3 w-3 mr-1"
                        >
                          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                          <polyline points="16 7 22 7 22 13" />
                        </svg>
                        +0.2% respecto al mes anterior
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-red-400"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">3</div>
                      <div className="flex items-center text-xs text-red-400 mt-1">
                        <span className="inline-block w-2 h-2 bg-red-400 rounded-full mr-1"></span>1 crítica, 2
                        advertencias
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
                      <Users className="h-4 w-4 text-cyan-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">287</div>
                      <div className="flex items-center text-xs text-cyan-400 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-3 w-3 mr-1"
                        >
                          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                          <polyline points="16 7 22 7 22 13" />
                        </svg>
                        +24 en la última hora
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="border-slate-800 bg-slate-900/50 text-slate-300 lg:col-span-4">
                  <CardHeader>
                    <CardTitle className="text-white">Uso de Recursos</CardTitle>
                    <CardDescription>Monitoreo de CPU, RAM y almacenamiento</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ServerUsageChart />
                  </CardContent>
                </Card>

                <Card className="border-slate-800 bg-slate-900/50 text-slate-300 lg:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-white">Tráfico de Red</CardTitle>
                    <CardDescription>Tráfico entrante y saliente (Mbps)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TrafficChart />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="border-slate-800 bg-slate-900/50 text-slate-300 lg:col-span-4">
                  <CardHeader>
                    <CardTitle className="text-white">Tiempo de Respuesta</CardTitle>
                    <CardDescription>Promedio de tiempo de respuesta por servidor (ms)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponseTimeChart />
                  </CardContent>
                </Card>

                <Card className="border-slate-800 bg-slate-900/50 text-slate-300 lg:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-white">Uso de Recursos</CardTitle>
                    <CardDescription>Servidores principales</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Servidor Web 01</div>
                          <div className="text-emerald-400">78%</div>
                        </div>
                        <Progress
                          value={78}
                          className="h-2 bg-slate-800"
                          indicatorClassName="bg-gradient-to-r from-emerald-500 to-cyan-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Servidor Web 02</div>
                          <div className="text-emerald-400">63%</div>
                        </div>
                        <Progress
                          value={63}
                          className="h-2 bg-slate-800"
                          indicatorClassName="bg-gradient-to-r from-emerald-500 to-cyan-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Base de Datos 01</div>
                          <div className="text-emerald-400">42%</div>
                        </div>
                        <Progress
                          value={42}
                          className="h-2 bg-slate-800"
                          indicatorClassName="bg-gradient-to-r from-emerald-500 to-cyan-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Base de Datos 02</div>
                          <div className="text-emerald-400">35%</div>
                        </div>
                        <Progress
                          value={35}
                          className="h-2 bg-slate-800"
                          indicatorClassName="bg-gradient-to-r from-emerald-500 to-cyan-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Servidor de Archivos</div>
                          <div className="text-amber-400">82%</div>
                        </div>
                        <Progress
                          value={82}
                          className="h-2 bg-slate-800"
                          indicatorClassName="bg-gradient-to-r from-amber-500 to-red-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="servers" className="space-y-4">
              <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
                <CardHeader>
                  <CardTitle className="text-white">Estado de Servidores</CardTitle>
                  <CardDescription>Monitoreo en tiempo real de todos los servidores</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <ServerStatusList />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4">
              <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
                <CardHeader>
                  <CardTitle className="text-white">Alertas Activas</CardTitle>
                  <CardDescription>Listado de alertas y notificaciones del sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <AlertsList githubIssues={githubIssues} />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )
      case "servers":
        return <ServersPage />
      case "metrics":
        return <MetricsPage />
      case "github":
        return <GithubPage issues={githubIssues} onCreateIssue={createGithubIssue} />
      case "cicd":
        return <CICDPage />
      case "user":
        return <UserPage />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 to-slate-900 text-white">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm px-6 md:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-400 hover:text-white hover:bg-slate-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-emerald-400" />
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            NEXXUS_MONITOR<span className="text-emerald-400">PRO</span>
          </span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Badge
            variant="outline"
            className={`hidden md:flex items-center gap-1 border-slate-700 ${isLive ? "text-emerald-400" : "text-slate-400"}`}
          >
            <span className={`h-2 w-2 rounded-full ${isLive ? "bg-emerald-400 animate-pulse" : "bg-slate-400"}`}></span>
            {isLive ? "LIVE" : "OFFLINE"}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600"
            onClick={handleRefresh}
          >
            <Zap className="mr-2 h-4 w-4 text-emerald-400" />
            Sync
          </Button>
          <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-slate-800">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
              {notificationCount}
            </span>
            <span className="sr-only">Notificaciones</span>
          </Button>
          <Separator orientation="vertical" className="h-8 bg-slate-700" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-slate-300 hover:text-white hover:bg-slate-800">
                <Avatar className="h-8 w-8 border border-slate-700">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback className="bg-slate-800 text-emerald-400">NX</AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                  <div className="text-sm font-medium">Admin</div>
                  <div className="text-xs text-slate-400">admin@nexxus.com</div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 text-slate-300">
              <DropdownMenuItem className="hover:bg-slate-800 hover:text-white" onClick={() => setActivePage("user")}>
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-800 hover:text-white">Configuración</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-800 hover:text-white">Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <AnimatePresence>
        {showGithubAlert && githubIssue && <GithubNotification issue={githubIssue} onClose={closeGithubAlert} />}
      </AnimatePresence>

      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <aside
          className={`${isMobileMenuOpen ? "block" : "hidden"} border-r border-slate-800 bg-slate-900/50 md:block`}
        >
          <nav className="grid gap-2 p-4 text-sm font-medium">
            <div className="px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Core</div>
            <Button
              variant={activePage === "dashboard" ? "default" : "ghost"}
              className={`justify-start gap-2 ${
                activePage === "dashboard"
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => setActivePage("dashboard")}
            >
              <Activity className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activePage === "servers" ? "default" : "ghost"}
              className={`justify-start gap-2 ${
                activePage === "servers"
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => setActivePage("servers")}
            >
              <Server className="h-4 w-4" />
              Servidores
            </Button>
            <Button
              variant={activePage === "metrics" ? "default" : "ghost"}
              className={`justify-start gap-2 ${
                activePage === "metrics"
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => setActivePage("metrics")}
            >
              <BarChart2 className="h-4 w-4" />
              Métricas
            </Button>
            <Button
              variant={activePage === "user" ? "default" : "ghost"}
              className={`justify-start gap-2 ${
                activePage === "user"
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => setActivePage("user")}
            >
              <User className="h-4 w-4" />
              Usuario
            </Button>

            <div className="px-2 py-1.5 mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Integrations
            </div>
            <Button
              variant={activePage === "github" ? "default" : "ghost"}
              className={`justify-start gap-2 ${
                activePage === "github"
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => setActivePage("github")}
            >
              <Github className="h-4 w-4" />
              GitHub
            </Button>
            <Button
              variant={activePage === "cicd" ? "default" : "ghost"}
              className={`justify-start gap-2 ${
                activePage === "cicd"
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => setActivePage("cicd")}
            >
              <GitPullRequest className="h-4 w-4" />
              CI/CD
            </Button>

            <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3">
              <div className="flex items-center gap-2 text-emerald-400 font-medium mb-2">
                <Zap className="h-4 w-4" />
                <span>Nexxus Pro</span>
              </div>
              <p className="text-xs text-slate-300">Monitoreo avanzado y alertas en tiempo real para tu equipo.</p>
              <Button size="sm" className="mt-2 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950">
                Upgrade
              </Button>
            </div>
          </nav>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <h1 className="flex-1 text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {activePage === "dashboard" && "Mission Control"}
              {activePage === "servers" && "Servidores"}
              {activePage === "metrics" && "Métricas"}
              {activePage === "github" && "GitHub"}
              {activePage === "cicd" && "CI/CD"}
              {activePage === "user" && "Perfil de Usuario"}
            </h1>
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Buscar..."
                className="hidden md:block md:w-[200px] lg:w-[320px] bg-slate-800/50 border-slate-700 text-slate-300 placeholder:text-slate-500 focus-visible:ring-emerald-500"
              />
              <Button
                variant="outline"
                size="icon"
                className="hidden md:flex border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar</span>
              </Button>
            </div>
          </div>

          {renderActivePage()}
        </main>
      </div>
    </div>
  )
}
