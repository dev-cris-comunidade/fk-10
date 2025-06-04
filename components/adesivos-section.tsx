"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdesivosSection() {
  const [activeTab, setActiveTab] = useState("atracao")

  return (
    <section id="adesivos" className="py-20 md:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="section-title">Sistema de Adesivos FK</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
            Uma forma inovadora e respeitosa de demonstrar interesse e garantir o consentimento.
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          <Tabs defaultValue="atracao" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="atracao">Adesivos da Atração</TabsTrigger>
              <TabsTrigger value="genero">Adesivos de Gênero</TabsTrigger>
              <TabsTrigger value="beijo">Adesivos de Beijo</TabsTrigger>
            </TabsList>

            <TabsContent value="atracao" className="mt-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-2 border-primary/10">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-full md:w-1/2 flex justify-center">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adesivos_atracao.jpg-BcFYlWcfyWyeH5FMuoE7PBnebeBVcA.jpeg"
                          alt="Adesivos da Atração"
                          width={500}
                          height={300}
                          className="rounded-lg shadow-md sticker-hover"
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <h3 className="subsection-title text-primary">Adesivos da Atração</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          São adesivos distribuídos na entrada da FK, eles identificam por qual grupo de pessoas você
                          tem interesse em ser abordada naquela noite.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          São 4 adesivos distintos e cada um representa por qual grupo de pessoas você se sente atraído
                          naquela noite:
                        </p>
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-pink-500"></span>
                            <span>Mulheres (rosa)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                            <span>Homens (azul)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-green-500"></span>
                            <span>Pessoas (verde)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-orange-500"></span>
                            <span>Ninguém (laranja)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="genero" className="mt-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-2 border-primary/10">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-full md:w-1/2 flex justify-center">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adesivos_genero.jpg-U7uLXztBUHlKaGXxOSk2XIREd4vwap.jpeg"
                          alt="Adesivos de Gênero"
                          width={500}
                          height={300}
                          className="rounded-lg shadow-md sticker-hover"
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <h3 className="subsection-title text-primary">Adesivos de Gênero</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Mesma dinâmica dos de atração. Utilizados por pessoas não cis que se sentem mais confortáveis
                          se identificando.
                        </p>
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-green-500"></span>
                            <span>Bigênero / Agênero - Me pergunte!</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                            <span>Masculino</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-pink-500"></span>
                            <span>Feminino</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="beijo" className="mt-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-2 border-primary/10">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-full md:w-1/2 flex justify-center">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beijo-R5dUvTu7Y0UevtphQiGx6MnumbZXME.png"
                          alt="Adesivo de Beijo"
                          width={300}
                          height={300}
                          className="rounded-lg shadow-md sticker-hover"
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <h3 className="subsection-title text-primary">Adesivos de Beijo</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          São adesivos em formato de beijo que são distribuídos durante a festa.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Servem para colar nas pessoas que você quer beijar - desde que o adesivo dela te contemple -
                          sem ficar com medo de não saber como abordar.
                        </p>
                        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold mb-2">Importância para o Consentimento</h4>
                          <p className="text-gray-700 dark:text-gray-300">
                            Este sistema garante que todas as interações sejam baseadas no consentimento mútuo,
                            respeitando os limites e preferências de cada pessoa, criando um ambiente seguro e acolhedor
                            para todos.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
