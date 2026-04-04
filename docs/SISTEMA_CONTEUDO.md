# 🗺️ Guia de Conteúdo: Trilhas, Snippets e Projetos

O TATAbox organiza o conhecimento em três categorias principais, todas utilizando o poder do Markdown para flexibilidade narrativa.

## 1. Snippets (Dicas Rápidas) ⚡
Dicas pontuais e one-liners focados em comandos ou funções específicas.
- **Local**: `src/content/snippets/`
- **Formato**: Markdown (.md)
- **Visual**: Focado em blocos de código e rápida absorção.

## 2. Tutoriais (Trilhas) 📚
Conteúdos longos, didáticos e estruturados em capítulos.
- **Local**: `src/content/tutorials/`
- **Formato**: Markdown (.md)
- **Navegação**: Pode ser agrupado em **Séries** (Playlists) via arquivos JSON em `src/content/series/`.

## 3. Projetos (Hub de Ferramentas) 🧬
A vitrine dos seus repositórios do GitHub, mas com uma camada narrativa superior.
- **Local**: `src/content/projects/`
- **Formato**: Markdown (.md)
- **Conceito Híbrido**: 
    - O corpo do arquivo `.md` é o seu **Canvas** (seu texto autoral, imagens, papers relacionados).
    - O campo `repo` no frontmatter busca automaticamente o README original do GitHub para exibir como apêndice técnico no rodapé da página.

## 🚀 Fluxo de Trabalho Recomendado
1. **Criar o Markdown**: Use o `temp/REPOS_SUMMARY.md` como semente para entender o que o repo faz.
2. **Escrever o Wrapper**: Adicione o seu "Toque Humano" no Markdown do projeto.
3. **Atualizar a Vitrine**: Em `src/data/featured.ts`, altere a `url` para apontar para a rota interna (ex: `/projects/meu-repo`) em vez do link externo.
