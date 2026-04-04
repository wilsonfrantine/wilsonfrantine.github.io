# ✍️ Guia de Estilo e Voz: TATAbox Hub

Este guia define as diretrizes para a criação de conteúdo (Markdowns) dos Projetos e Trilhas, garantindo que o hub mantenha uma voz coesa, acadêmica e, ao mesmo tempo, palatável.

## 1. Tom de Voz e Narrativa
- **Conexão Biológica**: Nunca descreva apenas o código. Sempre conecte a ferramenta a um **organismo, ecossistema ou problema biológico real** (ex: citar espécies como *Pimelodus maculatus*, abelhas Euglossini, etc).
- **Abordagem "Problem-Solution"**: Comece explicando o *hardwork* ou a limitação que existia antes da ferramenta e como ela facilita a vida do pesquisador.
- **Autoridade Científica**: Vincule o conteúdo a publicações reais ou papers do seu ORCID. Use termos técnicos corretamente (ex: *kinship*, *relatedness*, *DAPC*), mas explique-os brevemente se necessário.

## 2. Estrutura Visual do Markdown
- **Títulos**: Use Capitalização Padrão (Inter Uppercase desativado no CSS). Use `#`, `##` e `###` para hierarquia.
- **Imagens (Impacto Visual)**:
    - Utilize o componente `<figure class="float-right">` para imagens que devem ser contornadas pelo texto.
    - Sempre inclua um `<figcaption>` traduzido e descritivo, terminando com um convite para checar o paper original.
- **Blocos de Código**:
    - Sempre especifique a linguagem (ex: ` ```r ` ou ` ```bash `).
    - Comente o código para explicar o que cada função principal está fazendo.

## 3. Links e Interatividade
- **Links Externos**: O sistema adiciona automaticamente `target="_blank"` para links `http`. Não é necessário adicionar manualmente.
- **Nomes Científicos**: Sempre em _itálico_ (Ex: _Astro101_, _Apis mellifera_).
- **Destaques**: Use `**negrito**` para termos chave e `> blockquote` para conclusões ou frases de síntese (evite frases de impacto genéricas, prefira sínteses técnicas/filosóficas da área).

## 4. Metadados (Frontmatter)
- `title`: Nome limpo da ferramenta + Emoji temático (opcional).
- `description`: O "Pitch" de 1 parágrafo para o card.
- `insight`: Uma "sacada" rápida de utilidade prática.
- `repo`: O nome exato do repositório no GitHub para o fetch do README automático.
