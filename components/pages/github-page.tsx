"use client"

import { useState } from "react"
import { Github, Plus, Search, Tag, User, MessageSquare, Clock, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function GithubPage({ issues = [], onCreateIssue }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [newIssue, setNewIssue] = useState({
    title: "",
    content: "",
    priority: "medium",
    labels: ["bug"],
    assignees: ["admin"],
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredIssues = issues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateIssue = () => {
    onCreateIssue(newIssue)
    setNewIssue({
      title: "",
      content: "",
      priority: "medium",
      labels: ["bug"],
      assignees: ["admin"],
    })
    setIsDialogOpen(false)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      case "medium":
        return "text-amber-400 bg-amber-500/20 border-amber-500/30"
      case "low":
        return "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
      default:
        return "text-slate-400 bg-slate-500/20 border-slate-500/30"
    }
  }

  const getLabelColor = (label) => {
    switch (label) {
      case "bug":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      case "feature":
        return "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
      case "enhancement":
        return "text-cyan-400 bg-cyan-500/20 border-cyan-500/30"
      case "documentation":
        return "text-amber-400 bg-amber-500/20 border-amber-500/30"
      case "critical":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      case "production":
        return "text-purple-400 bg-purple-500/20 border-purple-500/30"
      default:
        return "text-slate-400 bg-slate-500/20 border-slate-500/30"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5 text-emerald-400" />
          <h2 className="text-xl font-semibold text-white">GitHub Integration</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar issues..."
              className="pl-9 bg-slate-800/50 border-slate-700 text-slate-300 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Issue
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700 text-slate-300">
              <DialogHeader>
                <DialogTitle className="text-white">Crear Nuevo Issue</DialogTitle>
                <DialogDescription>Crea un nuevo issue en el repositorio de GitHub.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    placeholder="Título del issue"
                    className="bg-slate-800 border-slate-700"
                    value={newIssue.title}
                    onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Descripción</Label>
                  <Textarea
                    id="content"
                    placeholder="Describe el issue en detalle"
                    className="bg-slate-800 border-slate-700 min-h-[100px]"
                    value={newIssue.content}
                    onChange={(e) => setNewIssue({ ...newIssue, content: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select
                    value={newIssue.priority}
                    onValueChange={(value) => setNewIssue({ ...newIssue, priority: value })}
                  >
                    <SelectTrigger id="priority" className="bg-slate-800 border-slate-700">
                      <SelectValue placeholder="Selecciona la prioridad" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="low">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="border-slate-700" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950" onClick={handleCreateIssue}>
                  Crear Issue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-slate-800/50 mb-4">
          <TabsTrigger value="all" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950">
            Todos
          </TabsTrigger>
          <TabsTrigger value="open" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950">
            Abiertos
          </TabsTrigger>
          <TabsTrigger value="closed" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950">
            Cerrados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader>
              <CardTitle className="text-white">Issues de GitHub</CardTitle>
              <CardDescription>Todos los issues del repositorio</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredIssues.length === 0 ? (
                <div className="text-center py-8">
                  <Github className="h-12 w-12 mx-auto text-slate-600 mb-4" />
                  <h3 className="text-lg font-medium text-slate-400">No hay issues</h3>
                  <p className="text-slate-500 mt-1">Crea un nuevo issue para comenzar</p>
                </div>
              ) : (
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {filteredIssues.map((issue) => (
                      <Card key={issue.id} className="border-slate-800 bg-slate-800/30">
                        <CardHeader className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base text-white flex items-center gap-2">
                                {issue.title}
                                <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                                  {issue.priority}
                                </Badge>
                              </CardTitle>
                              <CardDescription className="mt-1">
                                {issue.id} • Creado por @{issue.user}
                              </CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-slate-300 mb-4">{issue.content}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {issue.labels.map((label) => (
                              <Badge key={label} variant="outline" className={getLabelColor(label)}>
                                <Tag className="h-3 w-3 mr-1" />
                                {label}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {issue.assignees.join(", ")}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {Math.floor(Math.random() * 10)} comentarios
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {issue.timestamp}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                            Comentar
                          </Button>
                          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950">
                            Resolver
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="open" className="mt-0">
          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader>
              <CardTitle className="text-white">Issues Abiertos</CardTitle>
              <CardDescription>Issues que requieren atención</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Github className="h-12 w-12 mx-auto text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-slate-400">Contenido en desarrollo</h3>
                <p className="text-slate-500 mt-1">Esta sección estará disponible pronto</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="closed" className="mt-0">
          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader>
              <CardTitle className="text-white">Issues Cerrados</CardTitle>
              <CardDescription>Issues resueltos o cerrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Github className="h-12 w-12 mx-auto text-slate-600 mb-4" />
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
