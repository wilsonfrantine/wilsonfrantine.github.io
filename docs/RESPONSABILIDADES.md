# ⚖️ Responsabilidades e Manutenção

Para manter a integridade do TATAbox à medida que o hub cresce, é importante saber quem faz o quê no sistema.

## 🛠️ Wilson (O Pesquisador/Autor)
- **Produção de Conteúdo**: Escrever e revisar arquivos `.md` e `.json`.
- **Curadoria**: Manter a lista de `featured.ts` atualizada com os projetos de maior destaque.
- **Identidade**: Decidir quais novas Trilhas serão criadas e em qual sequência.

## 🤖 Gemini CLI (O Arquiteto/Mantenedor)
- **Estrutura Técnica**: Ajustar layouts (`.astro`), corrigir estilos (`.css`) e garantir que as rotas dinâmicas funcionem.
- **Automação**: Otimizar builds e garantir que o deploy no GitHub Actions não falhe.
- **Evolução**: Implementar novas funcionalidades (ex: Busca, Modo Escuro, Integração com ORCID/GitHub API) conforme solicitado.

## ⚙️ Manutenção de Rotina
1. **Adicionar novo Projeto**: Adicionar o objeto ao array em `src/data/featured.ts`.
2. **Atualizar Biografia**: Editar o componente `Hero.astro` ou o próprio `README.md`.
3. **Mudar de Domínio**: Alterar a propriedade `site` em `astro.config.mjs`.
