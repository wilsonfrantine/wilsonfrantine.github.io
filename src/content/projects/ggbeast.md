---
repo: "ggbeast"
title: "ggbeast 🧬"
description: "Visualização de árvores filogenéticas e dados do BEAST integrados ao ggplot2."
category: "Data Ecology"
pubDate: 2026-04-03
insight: "Plote Extended Bayesian Skyline Plots (EBSP) com facilidade e estética refinada."
tags: ["R", "Phylogenetics", "Evolutionary Biology"]
---

## Visualizando o Tempo Evolutivo

Entender a dinâmica populacional ao longo do tempo é um dos pilares da biologia evolutiva. O `ggbeast` foi desenvolvido para facilitar a visualização de resultados complexos vindos de análises do software **BEAST2**, trazendo a flexibilidade do `ggplot2` para o mundo da filogenética e demografia histórica.

### Por que o ggbeast é útil?

Muitas vezes, interpretar e visualizar os arquivos de saída (*log* e *trees*) de softwares bayesianos pode ser uma tarefa árdua. O `ggbeast` automatiza a leitura e a geração de gráficos como o **Extended Bayesian Skyline Plot (EBSP)**, permitindo que você visualize as mudanças no tamanho efetivo da população (Ne) através do tempo geológico de forma clara e profissional.

### Destaques Técnicos

*   **EBSP Simplificado**: Plote seus resultados de demografia histórica com apenas alguns comandos.
*   **Poder do ggplot2**: Aplique temas, cores e escalas customizadas de forma nativa.
*   **Reprodutibilidade**: Facilita o compartilhamento e a recriação de figuras para publicações científicas.

### Como instalar e usar

Você pode instalar a versão de desenvolvimento diretamente do GitHub:

```r
remotes::install_github("wilsonfrantine/ggbeast")
library(ggbeast)

# Gerar o gráfico EBSP principal
# Altere o caminho abaixo para o seu arquivo .log do BEAST
p1 <- ggebsp("caminho_para_seu_arquivo_log")

# Visualize e customize como qualquer outro ggplot
p1 + theme_minimal() + labs(title = "Dinâmica Populacional Histórica")
```

O `ggbeast` é uma ferramenta ágil para o pesquisador que precisa converter resultados estatísticos complexos em narrativas visuais impactantes sobre a evolução biológica.
