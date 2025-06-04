# FK 10 Anos - Website Comemorativo

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/cris-almeidas-projects/v0-criar-site-mt)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

Website comemorativo dos 10 anos da FK, celebrando uma década de construção de conexões autênticas e encontros memoráveis.

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Shadcn/ui](https://ui.shadcn.com/)

## 📋 Pré-requisitos

- Node.js 18.17 ou superior
- PNPM (recomendado) ou NPM
- Uma conta no Supabase para o banco de dados

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/dev-cris-comunidade/fk-10.git
cd fk-10
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```
Edite o arquivo `.env.local` com suas credenciais do Supabase.

4. Configure o banco de dados:
- Execute os scripts SQL na pasta `scripts/` no seu projeto Supabase na ordem numérica

5. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

O site estará disponível em `http://localhost:3000`

## 🗄️ Estrutura do Projeto

```
/app                    # Rotas e layouts do Next.js
/components            # Componentes React reutilizáveis
  /ui                  # Componentes de UI (shadcn/ui)
/hooks                 # Custom React hooks
/lib                   # Utilitários e configurações
/public                # Arquivos estáticos
/scripts              # Scripts SQL para Supabase
/styles               # Estilos globais e utilitários CSS
```

## 📚 Funcionalidades

- 🌗 Tema claro/escuro
- 🖼️ Efeitos de paralaxe
- 🎨 Design responsivo
- 🔄 Carrossel de depoimentos
- 📝 Formulários interativos
- 🗃️ Integração com Supabase
- ✨ Animações suaves
- 🎯 SEO otimizado

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Cristiane Almeida** - [GitHubProfile](https://github.com/dev-cris-comunidade)

## 🙏 Agradecimentos

- A toda comunidade FK pelos 10 anos de história
- À equipe de desenvolvimento e design
- A todos que contribuíram com depoimentos e memórias
