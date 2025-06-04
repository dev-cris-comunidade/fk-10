"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CandlestickChartIcon as Candle, AlertCircle } from "lucide-react"
import { submitMemoria } from "@/lib/supabase"

export default function MemoriaSection() {
  const [formData, setFormData] = useState({
    honored_name: "",
    submitter_name: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.honored_name) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, informe o nome da pessoa homenageada.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Check if we're in a development or preview environment without Supabase
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        toast({
          title: "Modo de demonstração",
          description: "Em um ambiente de produção, sua homenagem seria enviada para revisão.",
        })

        setFormData({
          honored_name: "",
          submitter_name: "",
          message: "",
        })
        setIsSubmitting(false)
        return
      }

      await submitMemoria({
        honored_name: formData.honored_name,
        submitter_name: formData.submitter_name || undefined,
        message: formData.message || undefined,
      })

      toast({
        title: "Homenagem enviada",
        description: "Sua homenagem foi enviada com sucesso e será revisada em breve.",
      })

      setFormData({
        honored_name: "",
        submitter_name: "",
        message: "",
      })
    } catch (error: any) {
      let errorMessage = "Ocorreu um erro ao enviar sua homenagem. Por favor, tente novamente."

      if (error.message.includes("Database tables not found")) {
        errorMessage = "Database não configurado. Por favor, execute os scripts de configuração primeiro."
        toast({
          title: "Modo de demonstração",
          description: "Database não configurado. Em produção, sua homenagem seria salva no banco de dados.",
        })

        // Reset form in demo mode
        setFormData({
          honored_name: "",
          submitter_name: "",
          message: "",
        })
      } else {
        toast({
          title: "Erro ao enviar",
          description: errorMessage,
          variant: "destructive",
        })
      }

      console.error("Erro ao enviar homenagem:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Check if database is likely not configured
  const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <section id="memoria" className="py-20 md:py-32 bg-purple-50 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="section-title">
            Em <span className="highlight-gradient">Memória</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
            Nesta década, a comunidade FK cresceu, floresceu e nos brindou com inúmeros momentos{" "}
            <span className="highlight-underline">inesquecíveis</span>. Lamentavelmente, também nos despedimos de pessoas muito queridas, porém temos a honra de poder eternizá-las em nossa história.
          </p>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 mt-4">
            Este espaço é uma <span className="highlight-primary">singela homenagem</span> àqueles que partiram, mas
            as memórias de afeto, intensidade e autenticidade permanecerão vivas em nossos corações e na essência da FK.
          </p>

          {isDemoMode && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-700 dark:text-yellow-200 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Modo demonstração - usando dados de exemplo</span>
            </div>
          )}
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Card className="gradient-border shadow-lg">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <Candle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="subsection-title text-center">
                Homenagear um membro da comunidade
              </h3>

              {isDemoMode && (
                <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-200 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>
                      Modo demonstração: O formulário funcionará normalmente quando o banco de dados estiver
                      configurado.
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="honored_name">Nome do(a) Homenageado(a) *</Label>
                  <Input
                    id="honored_name"
                    name="honored_name"
                    value={formData.honored_name}
                    onChange={handleInputChange}
                    placeholder="Nome da pessoa que você deseja homenagear"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="submitter_name">Seu Nome (Opcional)</Label>
                  <Input
                    id="submitter_name"
                    name="submitter_name"
                    value={formData.submitter_name}
                    onChange={handleInputChange}
                    placeholder="Seu nome (opcional)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem (Opcional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Uma breve mensagem ou lembrança (opcional)"
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar Homenagem"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
