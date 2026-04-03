# 🏗️ Arquitetura do TATAbox Hub

Este site foi construído sobre o **Astro 6**, priorizando performance extrema (zero JS no cliente por padrão) e uma experiência de desenvolvimento moderna.

## 🛠️ Tecnologias Principais
- **Framework**: [Astro 6.1](https://astro.build/) (Static Site Generation).
- **CSS**: [Tailwind CSS 4.0](https://tailwindcss.com/) (Estilização via utilitários).
- **Icons**: [Lucide-Astro](https://lucide.dev/guide/astro).
- **Content Engine**: Astro Content Collections (Astro 6) com Zod para validação de esquemas.

## 📁 Estrutura de Diretórios
- `/src/content/`: Todo o "cérebro" do site (Markdown e JSON).
- `/src/components/`: Blocos de UI reutilizáveis (Hero, Cards, Footer).
- `/src/pages/`: Roteamento baseado em arquivos (Index, Tutoriais dinâmicos).
- `/src/layouts/`: Templates globais de página (SEO, Google Fonts, Scripts).
- `/docs/`: Documentação técnica para manutenção do sistema.

## 🤖 Automação e Deploy
- **GitHub Actions**: Configurado para realizar build e deploy automático para o GitHub Pages sempre que um novo conteúdo é enviado à branch principal.
- **Sitemap**: Gerado automaticamente via `@astrojs/sitemap` para indexação em motores de busca.
