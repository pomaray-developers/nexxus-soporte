"use client"

import { motion } from "framer-motion"
import { X, Github, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GithubNotification({ issue, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-16 inset-x-0 z-50 mx-auto max-w-md p-4"
    >
      <div className="relative overflow-hidden rounded-lg border border-red-500 bg-gradient-to-r from-red-900/80 to-red-950/80 backdrop-blur-sm shadow-lg shadow-red-500/20 p-4 text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-red-400">
            <Github className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <h3 className="font-semibold text-red-200">Nuevo Issue en GitHub</h3>
            </div>

            <p className="text-sm font-medium mb-1">{issue.title}</p>

            <div className="flex items-center gap-2 text-xs text-red-300">
              <span className="font-semibold">{issue.repo}</span>
              <span>•</span>
              <span>@{issue.user}</span>
              <span>•</span>
              <span>{issue.timestamp}</span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Button size="sm" className="bg-red-500 hover:bg-red-400 text-white" onClick={onClose}>
                Ver detalles
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-red-500/50 text-red-300 hover:bg-red-500/20 hover:text-white"
                onClick={onClose}
              >
                Ignorar
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-red-300 hover:text-white hover:bg-red-500/20"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
