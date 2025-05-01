"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Mail, Shield, LogOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function UserPage() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveProfile = () => {
    setIsSaving(true)

    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Perfil actualizado",
        description: "Tu perfil se ha actualizado correctamente",
        variant: "success",
      })
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-emerald-500">
              <AvatarImage src="https://source.unsplash.com/featured/?alvin,chipmunk" alt="Alvin" />
              <AvatarFallback className="bg-slate-800 text-emerald-400 text-xl">NX</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl text-white">Admin Nexxus</CardTitle>
              <CardDescription className="text-base">Administrador del Sistema</CardDescription>
              <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                <Mail className="h-4 w-4" />
                <span>admin@nexxus.com</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-slate-700 text-slate-300">
              Editar Perfil
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950">
              <Shield className="mr-2 h-4 w-4" />
              Admin Panel
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-slate-800/50 mb-4">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950"
          >
            Perfil
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950"
          >
            Seguridad
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950"
          >
            Notificaciones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0 space-y-4">
          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader>
              <CardTitle className="text-white">Información Personal</CardTitle>
              <CardDescription>Actualiza tu información personal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    defaultValue="Admin"
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">Apellido</Label>
                  <Input
                    id="lastname"
                    placeholder="Tu apellido"
                    defaultValue="Nexxus"
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Tu email"
                    defaultValue="admin@nexxus.com"
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Input
                    id="role"
                    placeholder="Tu rol"
                    defaultValue="Administrador del Sistema"
                    className="bg-slate-800 border-slate-700"
                    disabled
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" className="border-slate-700 text-slate-300">
                  Cancelar
                </Button>
                <Button
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                >
                  {isSaving ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader>
              <CardTitle className="text-white">Sesiones Activas</CardTitle>
              <CardDescription>Dispositivos donde has iniciado sesión</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Computer className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Este dispositivo</div>
                      <div className="text-xs text-slate-400">Windows 11 • Chrome • Ciudad de México</div>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Activo</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-800/30">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="font-medium">iPhone 13</div>
                      <div className="text-xs text-slate-400">iOS 16 • Safari • Ciudad de México</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-0 space-y-4">
          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader>
              <CardTitle className="text-white">Cambiar Contraseña</CardTitle>
              <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Contraseña Actual</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva Contraseña</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" className="border-slate-700 text-slate-300">
                  Cancelar
                </Button>
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950">Actualizar Contraseña</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader>
              <CardTitle className="text-white">Autenticación de Dos Factores</CardTitle>
              <CardDescription>Añade una capa extra de seguridad a tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Autenticación de Dos Factores</div>
                  <div className="text-sm text-slate-400">Protege tu cuenta con autenticación de dos factores</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0 space-y-4">
          <Card className="border-slate-800 bg-slate-900/50 text-slate-300">
            <CardHeader>
              <CardTitle className="text-white">Preferencias de Notificaciones</CardTitle>
              <CardDescription>Configura cómo quieres recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Alertas de Servidores</div>
                    <div className="text-sm text-slate-400">
                      Recibe notificaciones cuando un servidor tenga problemas
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notificaciones de GitHub</div>
                    <div className="text-sm text-slate-400">Recibe notificaciones cuando se cree un nuevo issue</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Actualizaciones del Sistema</div>
                    <div className="text-sm text-slate-400">
                      Recibe notificaciones sobre actualizaciones del sistema
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notificaciones por Email</div>
                    <div className="text-sm text-slate-400">
                      Recibe notificaciones por email además de en la plataforma
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" className="border-slate-700 text-slate-300">
                  Cancelar
                </Button>
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950">Guardar Preferencias</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Estos componentes no estaban definidos, los añado aquí
function Computer(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  )
}

function Smartphone(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  )
}
