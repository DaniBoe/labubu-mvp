"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LabubuChecker } from "./labubu-checker"
import { ShieldCheck } from "lucide-react"

export function LabubuCheckerModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <ShieldCheck className="h-4 w-4" />
          Check Authenticity
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Labubu Authenticity Checker</DialogTitle>
        </DialogHeader>
        <LabubuChecker />
      </DialogContent>
    </Dialog>
  )
}
