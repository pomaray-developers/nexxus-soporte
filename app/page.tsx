import type { Metadata } from "next"
import DashboardPage from "@/components/dashboard-page"

export const metadata: Metadata = {
  title: "Nexxus Monitor Pro | Next-Gen Server Monitoring",
  description: "Plataforma de monitoreo de servidores y aplicaciones web de Nexxus con alertas en tiempo real",
}

export default function Home() {
  return <DashboardPage />
}
