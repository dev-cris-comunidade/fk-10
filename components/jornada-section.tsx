"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ExternalLink } from "lucide-react"

// Tipos para os eventos
type EventCategory = "Festa" | "Social Teórica" | "Lounge" | "Festa Junina"

interface Event {
  date: string
  name: string
  category: EventCategory
  album: string
  year: number
}

// Dados dos eventos
const events: Event[] = [
  {
    date: "10/07/2015",
    name: "First Kiss! - Primeira festa da Free Kisses",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2015,
  },
  {
    date: "08/08/2015",
    name: "Free Kisses | 2ª Edição",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2015,
  },
  // Adicionando mais alguns eventos para demonstração
  {
    date: "12/09/2015",
    name: "Free Kisses | Edição Especial: Aniversário da Ju",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2015,
  },
  {
    date: "07/11/2015",
    name: "Free Kisses | Edição Fantasia",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2015,
  },
  {
    date: "05/12/2015",
    name: "Free Kisses 80's & 90's | Beija Eu, Beija Eu, Beija eu, Me Beija",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2015,
  },
  {
    date: "16/01/2016",
    name: "Free Kisses | Correio do Amor",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2016,
  },
  {
    date: "30/03/2016",
    name: "Relações Não Monogâmicas - Quebrando o Tabu da Exclusividade Sexual e Afetiva",
    category: "Social Teórica",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2016,
  },
  {
    date: "03/07/2016",
    name: "Arraiá Free Kisses",
    category: "Festa Junina",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2016,
  },
  {
    date: "17/03/2017",
    name: "FK Lounge | Jantar Mexicano",
    category: "Lounge",
    album: "https://www.facebook.com/media/set/?set=oa.846289215509844&type=3",
    year: 2017,
  },
  {
    date: "08/07/2023",
    name: "DESPEDIDA DA FK - SEASON FINALE",
    category: "Festa",
    album: "https://www.facebook.com/media/set/?set=oa.661532725895450&type=3",
    year: 2023,
  },
  {
    date: "12/10/2024",
    name: "FK | 9 Anos",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2024,
  },
]

export default function JornadaSection() {
  const [selectedYear, setSelectedYear] = useState<string>("todos")
  const [selectedCategory, setSelectedCategory] = useState<string>("todas")
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events)

  // Extrair anos únicos dos eventos
  const years = Array.from(new Set(events.map((event) => event.year))).sort()

  // Extrair categorias únicas dos eventos
  const categories = Array.from(new Set(events.map((event) => event.category)))

  // Filtrar eventos com base nos filtros selecionados
  useEffect(() => {
    let filtered = [...events]

    if (selectedYear !== "todos") {
      filtered = filtered.filter((event) => event.year === Number.parseInt(selectedYear))
    }

    if (selectedCategory !== "todas") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    setFilteredEvents(filtered)
  }, [selectedYear, selectedCategory])

  return (
    <section id="jornada" className="py-20 md:py-32 bg-purple-50 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Nossa Jornada</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
            Reviva conosco cada momento especial dos últimos 10 anos. São 77 eventos que marcaram a história da não
            monogamia no Brasil.
          </p>
        </motion.div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          <div className="w-full md:w-48">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os anos</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-48">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Timeline horizontal com anos */}
        <div className="mb-8 overflow-x-auto timeline-container pb-4">
          <div className="flex space-x-2 min-w-max">
            <Button
              variant={selectedYear === "todos" ? "default" : "outline"}
              onClick={() => setSelectedYear("todos")}
              className={selectedYear === "todos" ? "bg-primary hover:bg-primary/90" : ""}
            >
              Todos
            </Button>
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year.toString() ? "default" : "outline"}
                onClick={() => setSelectedYear(year.toString())}
                className={selectedYear === year.toString() ? "bg-primary hover:bg-primary/90" : ""}
              >
                {year}
              </Button>
            ))}
          </div>
        </div>

        {/* Lista de eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={`${event.date}-${event.name}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full border-2 border-primary/10 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {event.category}
                        </span>
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={event.album}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs"
                          >
                            Ver álbum <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Álbum privado: Apenas membros têm acesso.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Nenhum evento encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
