"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, ChevronRight, User, Quote } from "lucide-react"
import { submitDepoimento, getApprovedDepoimentos, type Depoimento } from "@/lib/supabase"

// Depoimentos de exemplo para fallback
const fallbackTestimonials = [
  {
    id: "1",
    name: "Ana Silva",
    since: "2015",
    text: "A FK mudou completamente minha forma de ver relacionamentos. Encontrei um espaço onde posso ser eu mesma, sem julgamentos. Fiz amizades que levarei para a vida toda e aprendi muito sobre comunicação e respeito.",
    photo_url: null,
    status: "aprovado" as const,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Carlos Mendes",
    since: "2016",
    text: "Participar da FK me ajudou a desconstruir muitos preconceitos que eu tinha sobre relacionamentos não-monogâmicos. O ambiente acolhedor e as conversas profundas me transformaram como pessoa.",
    photo_url: null,
    status: "aprovado" as const,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Juliana Costa",
    since: "2017",
    text: "Conheci meus melhores amigos na FK. É mais que uma festa, é uma comunidade de pessoas que se apoiam e se respeitam. Os valores da FK são algo que levo para todos os aspectos da minha vida.",
    photo_url: null,
    status: "aprovado" as const,
    created_at: new Date().toISOString(),
  },
]

export default function DepoimentosSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonials, setTestimonials] = useState<Depoimento[]>(fallbackTestimonials)
  const [formData, setFormData] = useState({
    name: "",
    since: "",
    text: "",
    photo: null as File | null,
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Buscar depoimentos aprovados do Supabase
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        // Check if we're in a development or preview environment without Supabase
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.log("Using fallback testimonials: Supabase environment variables not available")
          return // Just use the fallback testimonials
        }

        const { data, error } = await getApprovedDepoimentos()

        if (error) {
          console.error("Erro ao buscar depoimentos:", error)
          return // Continue with fallback testimonials
        }

        if (data && data.length > 0) {
          setTestimonials(data)
        }
      } catch (error) {
        console.log("Using fallback testimonials due to error:", error)
        // Continue with fallback testimonials
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

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
        description: "Por favor, marque a caixa de consentimento para enviar seu depoimento.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Check if we're in a development or preview environment without Supabase
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        // Show a success message in development/preview even without Supabase
        toast({
          title: "Modo de demonstração",
          description: "Em um ambiente de produção, seu depoimento seria enviado para revisão.",
        })

        // Reset form
        setFormData({
          name: "",
          since: "",
          text: "",
          photo: null,
          consent: false,
        })
        setIsSubmitting(false)
        return
      }

      // Enviar para o Supabase
      await submitDepoimento({
        name: formData.name,
        since: formData.since,
        text: formData.text,
        photo_url: null, // Implementação de upload de imagem seria feita aqui
      })

      toast({
        title: "Depoimento enviado!",
        description: "Obrigado por compartilhar sua experiência. Seu depoimento será revisado e publicado em breve.",
      })

      // Resetar formulário
      setFormData({
        name: "",
        since: "",
        text: "",
        photo: null,
        consent: false,
      })
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar seu depoimento. Por favor, tente novamente.",
        variant: "destructive",
      })
      console.error("Erro ao enviar depoimento:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="depoimentos"
      className="py-20 md:py-32 bg-gradient-to-b from-purple-50 to-white dark:from-gray-800 dark:to-gray-900"
    >
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
            Depoimentos da <span className="highlight-gradient">Comunidade</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
            <span className="highlight-large">Histórias e experiências</span> de quem viveu e construiu a FK ao longo
            desses <span className="highlight-primary">10 anos</span>.
          </p>
        </motion.div>

        {/* Carrossel de Depoimentos */}
        <div className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="px-4"
            >
              <Card className="gradient-border shadow-lg">
                <CardContent className="pt-6 pb-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-primary/10">
                      <Quote className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-lg md:text-xl mb-6 text-gray-700 dark:text-gray-300 italic">
                      "{testimonials[currentIndex].text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Membro desde {testimonials[currentIndex].since}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Controles do carrossel */}
            <div className="flex justify-center mt-6 gap-4">
              <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-full">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Anterior</span>
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <span className="sr-only">Depoimento {index + 1}</span>
                  </button>
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full">
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Próximo</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Formulário de Submissão */}
        <div className="max-w-2xl mx-auto">
          <Card className="gradient-border shadow-lg">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-center" style={{ fontFamily: "var(--font-playfair)" }}>
                Compartilhe sua experiência
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="since">Membro desde</Label>
                    <Input
                      id="since"
                      name="since"
                      value={formData.since}
                      onChange={handleInputChange}
                      placeholder="Ex: 2015"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text">Seu depoimento</Label>
                  <Textarea
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    placeholder="Conte sua experiência com a FK..."
                    rows={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Foto (opcional)</Label>
                  <Input id="photo" name="photo" type="file" accept="image/*" onChange={handleFileChange} />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="consent" checked={formData.consent} onCheckedChange={handleConsentChange} />
                  <Label htmlFor="consent" className="text-sm leading-relaxed">
                    Eu autorizo a FK a exibir meu nome, foto e depoimento neste website.
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar Depoimento"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
