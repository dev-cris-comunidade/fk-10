"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HistoriaSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
      },
    }),
  }

  return (
    <section id="historia" className="py-20 md:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.h2
            variants={fadeIn}
            custom={0}
            className="section-title"
          >
            Nossa <span className="highlight-gradient">História</span>
          </motion.h2>
          <motion.p variants={fadeIn} custom={1} className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
            O tempo passa, os <span className="highlight-primary">afetos crescem</span>. E a FK segue viva.
          </motion.p>
          <motion.p
            variants={fadeIn}
            custom={2}
            className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 mt-4"
          >
            Enquanto a não monogamia virava <span className="highlight-box">trend</span> nas redes, a FK seguia sendo{" "}
            <span className="highlight-large">laço, escuta e chão</span>.
          </motion.p>
          <motion.p
            variants={fadeIn}
            custom={3}
            className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 mt-4"
          >
            Seguimos, não pelo palco — mas pra continuar fazendo <span className="highlight-underline">história</span>{" "}
            com quem também escolhe <span className="highlight-gradient">presença, vida real</span>.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            custom={4}
          >
            <Card className="h-full gradient-border shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">O Início de uma Revolução</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                  A FK nasceu no Rio de Janeiro em <span className="highlight-primary">2015</span>, em um momento de
                  efervescência nos debates sobre não monogamia no Brasil. A proposta era ousada: criar um{" "}
                  <span className="highlight-box">espaço seguro</span> para viver relações autênticas, fora dos modelos
                  tradicionais — com <span className="highlight-large">liberdade, respeito e sem julgamentos</span>.
                  <br />
                  <br />
                  Ao longo desses 10 anos, a FK se manteve firme como ponto de encontro, reflexão e afeto, reunindo
                  centenas de pessoas dispostas a construir novas formas de se relacionar. Foi (e continua sendo) um
                  espaço de <span className="highlight-gradient">coragem, escuta e transformação</span>.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            custom={5}
          >
            <Card className="h-full gradient-border shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Inovação e Autenticidade</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                  Os famosos <span className="highlight-primary">adesivos de atração</span> revolucionaram a forma como
                  as pessoas se conectam, inspirados na "festa do sinal" dos anos 90.
                  <br />
                  <br />
                  Uma maneira <span className="highlight-large">lúdica e respeitosa</span> de demonstrar interesse:
                  basta colar um adesivo em forma de beijinho — respeitando o adesivo de atração — e, se houver{" "}
                  <span className="highlight-underline">reciprocidade</span>, a interação continua.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
