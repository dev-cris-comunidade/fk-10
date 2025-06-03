"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Users, Heart, AlertCircle } from "lucide-react"
import { submitFamilia } from "@/lib/supabase"

export default function FamiliasSection() {
  const [formData, setFormData] = useState({
    name: "",
    story: "",
    photo: null as File | null,
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photo: e.target.files![0] }))
    }
  }

  const handleConsentChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, consent: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.consent) {
      toast({
        title: "Consentimento necessário",
        description: "Por favor, marque a caixa de consentimento para enviar sua história.",
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
          description: "Em um ambiente de produção, sua história seria enviada para revisão.",
        })

        setFormData({
          name: "",
          story: "",
          photo: null,
          consent: false,
        })
        setIsSubmitting(false)
        return
      }

      await submitFamilia({
        name: formData.name,
        story: formData.story,
        photo_url: null,
      })

      toast({
        title: "História enviada!",
        description: "Obrigada por compartilhar sua família FK. Sua história será revisada e publicada em breve.",
      })

      setFormData({
        name: "",
        story: "",
        photo: null,
        consent: false,
      })
    } catch (error: any) {
      let errorMessage = "Ocorreu um erro ao enviar sua história. Por favor, tente novamente."

      if (error.message.includes("Database tables not found")) {
        errorMessage = "Database não configurado. Por favor, execute os scripts de configuração primeiro."
        toast({
          title: "Modo de demonstração",
          description: "Database não configurado. Em produção, sua história seria salva no banco de dados.",
        })

        // Reset form in demo mode
        setFormData({
          name: "",
          story: "",
          photo: null,
          consent: false,
        })
      } else {
        toast({
          title: "Erro ao enviar",
          description: errorMessage,
          variant: "destructive",
        })
      }

      console.error("Erro ao enviar história:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Check if database is likely not configured
  const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <section id="familias" className="py-20 md:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="font-playfair text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Famílias <span className="highlight-gradient">FK</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
            Muitos encontros, amizades e relacionamentos nasceram na FK. Compartilhe sua história de{" "}
            <span className="highlight-primary">conexão</span> que começou em uma de nossas festas.
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
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-6 text-center" style={{ fontFamily: "var(--font-playfair)" }}>
                Conte sua história
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
                  <Label htmlFor="name">Nome da Família/Grupo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Família Arco-Íris, Tribo Livre, etc."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="story">Sua História</Label>
                  <Textarea
                    id="story"
                    name="story"
                    value={formData.story}
                    onChange={handleInputChange}
                    placeholder="Conte como vocês se conheceram na FK e como a comunidade impactou suas vidas..."
                    rows={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Foto do Grupo (opcional)</Label>
                  <Input id="photo" name="photo" type="file" accept="image/*" onChange={handleFileChange} />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="consent" checked={formData.consent} onCheckedChange={handleConsentChange} />
                  <Label htmlFor="consent" className="text-sm leading-relaxed">
                    Eu confirmo que todos os membros do grupo autorizaram o compartilhamento desta história e foto.
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar História"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-6">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Histórias de Conexão
          </h3>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Em breve, este espaço será preenchido com histórias incríveis de famílias que se formaram na FK. Envie a sua
            e faça parte desta celebração de 10 anos!
          </p>
        </div>
      </div>
    </section>
  )
}
