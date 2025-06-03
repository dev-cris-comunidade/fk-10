import Image from "next/image"
import { Facebook, Instagram, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20FK-iHYLZuEcu30SEx3wGPleob3wNXNAPA.png"
            alt="Logo FK"
            width={120}
            height={60}
            className="h-12 w-auto mb-6"
          />

          <div className="flex space-x-6 mb-8">
            <a
              href="https://www.facebook.com/groups/566222423516526/files/files"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
            >
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook Grupo</span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100064784706656"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
            >
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook Página</span>
            </a>
            <a
              href="https://www.instagram.com/fkeventosnm/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://wa.me/5521997624521"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="sr-only">WhatsApp</span>
            </a>
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">© 2025 FK. Todos os direitos reservados.</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              <a href="#" className="hover:text-primary transition-colors">
                Política de Privacidade
              </a>{" "}
              • Criado com <span className="text-red-500">❤</span> por Cristiane Almeida
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
