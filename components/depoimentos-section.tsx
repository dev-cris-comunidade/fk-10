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
import { ChevronLeft, ChevronRight, User, Quote, Play, Pause, AlertCircle } from "lucide-react"
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
  {
    id: "4",
    name: "Roberto Oliveira",
    since: "2018",
    text: "A FK me ensinou sobre consenso e comunicação não-violenta. Hoje sou uma pessoa melhor em todos os meus relacionamentos, românticos ou não. Gratidão eterna a essa comunidade incrível.",
    photo_url: null,
    status: "aprovado" as const,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Mariana Santos",
    since: "2019",
    text: "Depois de anos frequentando a FK, posso dizer que encontrei minha família escolhida. As conexões que fiz aqui são profundas e duradouras. A FK é muito mais que uma festa, é um lar.",
    photo_url: null,
    status: "aprovado" as const,
    created_at: new Date().toISOString(),
  },
]

export default function DepoimentosSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonials, setTestimonials] = useState<Depoimento[]>(fallbackTestimonials)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(false)
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

  // Auto-carousel effect
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, testimonials.length])

  // Buscar depoimentos aprovados do Supabase
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        // Check if environment variables are available
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.log("Using fallback testimonials: Supabase environment variables not available")
          setIsDatabaseConnected(false)
          return
        }

        const { data, error } = await getApprovedDepoimentos()

        if (error) {
          console.log("Database not set up or error occurred:", error.message)
          setIsDatabaseConnected(false)

          // Show a more user-friendly message for database setup issues
          if (error.message.includes("relation") && error.message.includes("does not exist")) {
            console.log("Database tables not found. Using fallback data.")
          }
          return
        }

        if (data && data.length > 0) {
          setTestimonials(data)
          setIsDatabaseConnected(true)
        } else {
          setIsDatabaseConnected(true) // Database is connected but no data
        }
      } catch (error) {
        console.log("Using fallback testimonials due to error:", error)
        setIsDatabaseConnected(false)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const handlePrev = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
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
      // Check if database is connected
      if (!isDatabaseConnected) {
        toast({
          title: "Modo de demonstração",
          description: "Database não configurado. Em produção, seu depoimento seria salvo no banco de dados.",
        })

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

      await submitDepoimento({
        name: formData.name,
        since: formData.since,
        text: formData.text,
        photo_url: null,
      })

      toast({
        title: "Depoimento enviado!",
        description: "Obrigado por compartilhar sua experiência. Seu depoimento será revisado e publicado em breve.",
      })

      setFormData({
        name: "",
        since: "",
        text: "",
        photo: null,
        consent: false,
      })
    } catch (error: any) {
      let errorMessage = "Ocorreu um erro ao enviar seu depoimento. Por favor, tente novamente."

      if (error.message.includes("Database tables not found")) {
        errorMessage = "Database não configurado. Por favor, execute os scripts de configuração primeiro."
      }

      toast({
        title: "Erro ao enviar",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("Erro ao enviar depoimento:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="depoimentos" className="py-20 md:py-32 gradient-cosmic relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-display font-playfair text-white mb-6">
            Depoimentos da{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
              Comunidade
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-body-large text-white/90 leading-relaxed">
            <span className="font-semibold text-yellow-400">Histórias e experiências</span> de quem viveu e construiu a
            FK ao longo desses <span className="font-bold text-pink-400">10 anos</span>.
          </p>

          {/* Database Status Indicator */}
          {!isDatabaseConnected && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-200 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Modo demonstração - usando dados de exemplo</span>
            </div>
          )}
        </motion.div>

        {/* Enhanced Carousel */}
        <div className="mb-16">
          <div className="relative max-w-5xl mx-auto carousel-container">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="px-4 carousel-slide"
            >
              <Card className="glass border-white/20 shadow-2xl hover-lift card-3d">
                <CardContent className="pt-8 pb-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg">
                      <Quote className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-xl md:text-2xl mb-8 text-white leading-relaxed italic font-light">
                      "{testimonials[currentIndex].text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center shadow-lg">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xl font-semibold text-white">{testimonials[currentIndex].name}</h4>
                        <p className="text-white/70 font-medium">Membro desde {testimonials[currentIndex].since}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Controls */}
            <div className="flex justify-center items-center mt-8 gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="rounded-full glass border-white/30 text-white hover:bg-white/20 hover-lift"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Anterior</span>
              </Button>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleAutoPlay}
                  className="rounded-full text-white hover:bg-white/20"
                >
                  {isAutoPlay ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  <span className="sr-only">{isAutoPlay ? "Pausar" : "Reproduzir"}</span>
                </Button>

                <div className="flex gap-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
                      onClick={() => {
                        setIsAutoPlay(false)
                        setCurrentIndex(index)
                      }}
                    >
                      <span className="sr-only">Depoimento {index + 1}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="rounded-full glass border-white/30 text-white hover:bg-white/20 hover-lift"
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Próximo</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="glass border-white/20 shadow-2xl hover-lift">
            <CardContent className="pt-8">
              <h3 className="text-title font-playfair text-center mb-6 text-white">Compartilhe sua experiência</h3>

              {!isDatabaseConnected && (
                <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-200 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>
                      Modo demonstração: O formulário funcionará normalmente quando o banco de dados estiver
                      configurado.
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome"
                      required
                      className="glass border-white/30 text-white placeholder:text-white/60 focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="since" className="text-white font-medium">
                      Membro desde
                    </Label>
                    <Input
                      id="since"
                      name="since"
                      value={formData.since}
                      onChange={handleInputChange}
                      placeholder="Ex: 2015"
                      required
                      className="glass border-white/30 text-white placeholder:text-white/60 focus:border-purple-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text" className="text-white font-medium">
                    Seu depoimento
                  </Label>
                  <Textarea
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    placeholder="Conte sua experiência com a FK..."
                    rows={5}
                    required
                    className="glass border-white/30 text-white placeholder:text-white/60 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo" className="text-white font-medium">
                    Foto (opcional)
                  </Label>
                  <Input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="glass border-white/30 text-white file:text-white file:bg-white/20 file:border-0 file:rounded-md"
                  />
                  <p className="text-xs text-white/60">Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={handleConsentChange}
                    className="border-white/30 data-[state=checked]:bg-purple-500"
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed text-white/90">
                    Eu autorizo a FK a exibir meu nome, foto e depoimento neste website.
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full btn-primary-gradient text-white font-semibold py-3 rounded-full hover-lift"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="loading-shimmer w-4 h-4 rounded-full"></div>
                      Enviando...
                    </div>
                  ) : (
                    "Enviar Depoimento"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
