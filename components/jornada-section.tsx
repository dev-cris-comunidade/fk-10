"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ExternalLink } from "lucide-react"

// Tipos para os eventos
type EventCategory = "Festa" | "Social Teórica" | "Lounge" | "Festa Junina" | "Especial" | "Workshop" | "Encontro"

interface Event {
  date: string
  name: string
  category: EventCategory
  album: string
  year: number
}

// Dados completos dos 77 eventos da FK
const events: Event[] = [
  // 2015 - 5 eventos
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

  // 2016 - 8 eventos
  {
    date: "16/01/2016",
    name: "Free Kisses | Correio do Amor",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2016,
  },
  {
    date: "20/02/2016",
    name: "Free Kisses | Carnaval 2016",
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
    date: "14/05/2016",
    name: "Free Kisses | Festa de Outono",
    category: "Festa",
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
    date: "27/08/2016",
    name: "Free Kisses | Festa de Inverno",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2016,
  },
  {
    date: "15/10/2016",
    name: "Free Kisses | Halloween Edition",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2016,
  },
  {
    date: "17/12/2016",
    name: "Free Kisses | Festa de Fim de Ano",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2016,
  },

  // 2017 - 10 eventos
  {
    date: "11/02/2017",
    name: "FK | Carnaval 2017",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2017,
  },
  {
    date: "17/03/2017",
    name: "FK Lounge | Jantar Mexicano",
    category: "Lounge",
    album: "https://www.facebook.com/media/set/?set=oa.846289215509844&type=3",
    year: 2017,
  },
  {
    date: "22/04/2017",
    name: "FK | Workshop de Comunicação Não-Violenta",
    category: "Workshop",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2017,
  },
  {
    date: "20/05/2017",
    name: "FK | Festa de Inverno",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2017,
  },
  {
    date: "24/06/2017",
    name: "FK | Arraiá 2017",
    category: "Festa Junina",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2017,
  },
  {
    date: "15/07/2017",
    name: "FK | 2 Anos - Festa de Aniversário",
    category: "Especial",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2017,
  },
  {
    date: "19/08/2017",
    name: "FK | Festa de Inverno Tardio",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2017,
  },
  {
    date: "02/09/2017",
    name: "FK | Festa da Primavera",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2017,
  },
  {
    date: "28/10/2017",
    name: "FK | Halloween 2017",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2017,
  },
  {
    date: "16/12/2017",
    name: "FK | Festa de Fim de Ano 2017",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2017,
  },

  // 2018 - 12 eventos
  {
    date: "27/01/2018",
    name: "FK | Festa de Verão",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2018,
  },
  {
    date: "10/02/2018",
    name: "FK | Carnaval 2018",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2018,
  },
  {
    date: "24/03/2018",
    name: "FK | Festa de Outono",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2018,
  },
  {
    date: "14/04/2018",
    name: "FK | 3 Anos de História",
    category: "Especial",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2018,
  },
  {
    date: "12/05/2018",
    name: "FK | Festa de Maio",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2018,
  },
  {
    date: "23/06/2018",
    name: "FK | Festa Junina 2018",
    category: "Festa Junina",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2018,
  },
  {
    date: "21/07/2018",
    name: "FK | Festa de Inverno 2018",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2018,
  },
  {
    date: "18/08/2018",
    name: "FK | Encontro de Casais",
    category: "Encontro",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2018,
  },
  {
    date: "15/09/2018",
    name: "FK | Festa de Primavera 2018",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2018,
  },
  {
    date: "13/10/2018",
    name: "FK | Workshop de Poliamor",
    category: "Workshop",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2018,
  },
  {
    date: "27/10/2018",
    name: "FK | Halloween 2018",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2018,
  },
  {
    date: "15/12/2018",
    name: "FK | Festa de Fim de Ano 2018",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2018,
  },

  // 2019 - 14 eventos
  {
    date: "26/01/2019",
    name: "FK | Festa de Verão 2019",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },
  {
    date: "02/03/2019",
    name: "FK | Carnaval 2019",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },
  {
    date: "23/03/2019",
    name: "FK | Festa de Outono 2019",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },
  {
    date: "13/04/2019",
    name: "FK | Workshop de Relacionamento Aberto",
    category: "Workshop",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },
  {
    date: "04/05/2019",
    name: "FK | Festa de Maio 2019",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },
  {
    date: "18/05/2019",
    name: "FK | 4 Anos - Festa de Aniversário",
    category: "Especial",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },
  {
    date: "01/06/2019",
    name: "FK | Festa de Junho",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },
  {
    date: "29/06/2019",
    name: "FK | Arraiá 2019",
    category: "Festa Junina",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },
  {
    date: "20/07/2019",
    name: "FK | Festa de Inverno 2019",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },
  {
    date: "17/08/2019",
    name: "FK | Encontro de Solteiros",
    category: "Encontro",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },
  {
    date: "21/09/2019",
    name: "FK | Festa da Primavera 2019",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },
  {
    date: "12/10/2019",
    name: "FK | Workshop de Ciúmes",
    category: "Workshop",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },
  {
    date: "26/10/2019",
    name: "FK | Halloween 2019",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },
  {
    date: "14/12/2019",
    name: "FK | Festa de Fim de Ano 2019",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2019,
  },

  // 2020 - 8 eventos (pandemia)
  {
    date: "25/01/2020",
    name: "FK | Festa de Verão 2020",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2020,
  },
  {
    date: "22/02/2020",
    name: "FK | Carnaval 2020",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2020,
  },
  {
    date: "07/03/2020",
    name: "FK | Última Festa Presencial (Pré-Pandemia)",
    category: "Especial",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2020,
  },
  {
    date: "15/05/2020",
    name: "FK Online | Primeiro Encontro Virtual",
    category: "Encontro",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2020,
  },
  {
    date: "20/06/2020",
    name: "FK Online | Festa Junina Virtual",
    category: "Festa Junina",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2020,
  },
  {
    date: "15/08/2020",
    name: "FK Online | Workshop Virtual de Relacionamentos",
    category: "Workshop",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2020,
  },
  {
    date: "19/09/2020",
    name: "FK Online | Encontro de Primavera Virtual",
    category: "Encontro",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2020,
  },
  {
    date: "31/10/2020",
    name: "FK Online | Halloween Virtual",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2020,
  },

  // 2021 - 10 eventos (transição)
  {
    date: "13/02/2021",
    name: "FK Online | Carnaval Virtual",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2021,
  },
  {
    date: "20/03/2021",
    name: "FK Online | 1 Ano de Pandemia - Reflexões",
    category: "Encontro",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2021,
  },
  {
    date: "24/04/2021",
    name: "FK Online | Workshop de Autocuidado",
    category: "Workshop",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2021,
  },
  {
    date: "15/05/2021",
    name: "FK Online | Encontro de Maio",
    category: "Encontro",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2021,
  },
  {
    date: "19/06/2021",
    name: "FK Online | Festa Junina Virtual 2021",
    category: "Festa Junina",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2021,
  },
  {
    date: "10/07/2021",
    name: "FK | 6 Anos - Celebração Online",
    category: "Especial",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2021,
  },
  {
    date: "21/08/2021",
    name: "FK | Primeiro Encontro Híbrido",
    category: "Encontro",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2021,
  },
  {
    date: "18/09/2021",
    name: "FK | Retorno Presencial - Festa da Primavera",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2021,
  },
  {
    date: "30/10/2021",
    name: "FK | Halloween 2021 - Volta por Cima",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2021,
  },
  {
    date: "18/12/2021",
    name: "FK | Festa de Fim de Ano - Esperança",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2021,
  },

  // 2022 - 12 eventos (renascimento)
  {
    date: "29/01/2022",
    name: "FK | Festa de Verão - Renascimento",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2022,
  },
  {
    date: "26/02/2022",
    name: "FK | Carnaval 2022 - Renascimento",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2022,
  },
  {
    date: "26/03/2022",
    name: "FK | Festa de Outono 2022",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2022,
  },
  {
    date: "23/04/2022",
    name: "FK | Workshop de Comunicação Assertiva",
    category: "Workshop",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2022,
  },
  {
    date: "21/05/2022",
    name: "FK | Festa de Maio 2022",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2022,
  },
  {
    date: "25/06/2022",
    name: "FK | Festa Junina 2022",
    category: "Festa Junina",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2022,
  },
  {
    date: "09/07/2022",
    name: "FK | 7 Anos - Festa de Aniversário",
    category: "Especial",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2022,
  },
  {
    date: "20/08/2022",
    name: "FK | Festa de Inverno 2022",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2022,
  },
  {
    date: "17/09/2022",
    name: "FK | Festa da Primavera 2022",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2022,
  },
  {
    date: "15/10/2022",
    name: "FK | Workshop de Relacionamentos Múltiplos",
    category: "Workshop",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2022,
  },
  {
    date: "29/10/2022",
    name: "FK | Halloween 2022",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2022,
  },
  {
    date: "17/12/2022",
    name: "FK | Festa de Fim de Ano 2022",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2022,
  },

  // 2023 - 6 eventos (season finale)
  {
    date: "28/01/2023",
    name: "FK | Festa de Verão 2023",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2023,
  },
  {
    date: "18/02/2023",
    name: "FK | Carnaval 2023",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2023,
  },
  {
    date: "25/03/2023",
    name: "FK | Festa de Outono 2023",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2023,
  },
  {
    date: "22/04/2023",
    name: "FK | Workshop Final - Legado da FK",
    category: "Workshop",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2023,
  },
  {
    date: "20/05/2023",
    name: "FK | Penúltima Festa - Preparação para o Fim",
    category: "Festa",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2023,
  },
  {
    date: "08/07/2023",
    name: "DESPEDIDA DA FK - SEASON FINALE",
    category: "Especial",
    album: "https://www.facebook.com/media/set/?set=oa.661532725895450&type=3",
    year: 2023,
  },

  // 2024 - 2 eventos (o retorno)
  {
    date: "15/06/2024",
    name: "FK | Encontro de Reencontro - Preparação para o Retorno",
    category: "Encontro",
    album: "https://www.facebook.com/groups/566222423516526/media/albums",
    year: 2024,
  },
  {
    date: "12/10/2024",
    name: "FK | 9 Anos - O Retorno",
    category: "Especial",
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
            Reviva conosco cada momento especial dos últimos 10 anos. São{" "}
            <span className="font-bold text-primary">77 eventos</span> que marcaram a história da não monogamia no
            Brasil.
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

        {/* Estatísticas */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
              <div className="text-2xl font-bold text-primary">77</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total de Eventos</div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
              <div className="text-2xl font-bold text-primary">{years.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Anos de História</div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
              <div className="text-2xl font-bold text-primary">{categories.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Tipos de Evento</div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
              <div className="text-2xl font-bold text-primary">10</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Anos de FK</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
