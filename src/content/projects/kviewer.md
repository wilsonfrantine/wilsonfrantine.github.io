---
repo: "kviewer"
title: "kviewer 📊"
description: "Visualização rápida de resultados do software STRUCTURE e estimadores de K em R."
category: "Bioinfo Hub"
pubDate: 2026-04-03
insight: "Calcule os melhores estimadores (Evanno, lnPr) com um único comando."
tags: ["Bioinformatics", "Genetics", "Population Structure"]
---

## Estrutura Genética Simplificada

Analisar a estrutura de populações é um passo fundamental em estudos de genética evolutiva e conservação. O `kviewer` foi criado para simplificar o processo de visualização dos resultados gerados pelo software **STRUCTURE**, além de automatizar o cálculo dos estimadores de **K** mais comuns.

### Por que o kviewer existe?

Muitas vezes, extrair informações brutas dos arquivos do *Structure* para gerar gráficos e calcular estatísticas pode ser um processo trabalhoso e propenso a erros manuais. O `kviewer` automatiza esse "hardwork", permitindo que o pesquisador foque na interpretação biológica dos resultados.

### Destaques Técnicos

*   **Estimadores de K**: Implementação direta do método de **Evanno et al. (2005)** e do método de **Pritchard (2000)** (linearização de lnPr(X|M)).
*   **Visualização Instantânea**: Gere plots limpos de estrutura em segundos.
*   **Uso Minimalista**: Carregue o pacote, aponte para o arquivo e obtenha os resultados.

### Como usar o kviewer

Instalação simples via GitHub:

```r
remotes::install_github("wilsonfrantine/kviewer")
library(kviewer)

# Executar a análise principal
results <- kview()

# Personalizar com nomes das populações
kview(pop_names = c("População A", "População B", "Sítio C"))
```

O `kviewer` é uma ferramenta ágil para o geneticista de populações que precisa de respostas rápidas durante a fase de exploração de dados.
