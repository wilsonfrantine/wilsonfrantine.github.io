---
repo: "ggDAPC"
title: "ggDAPC 📈"
description: "Visualização customizável de resultados de DAPC usando ggplot2 para genética de populações."
category: "Bioinfo Hub"
pubDate: 2026-04-03
insight: "Script R que gera visualizações ggplot2 a partir de resultados de DAPC do adegenet."
tags: ["R", "Genetics", "Visualization", "adegenet"]
---

## Transformando DAPC em Gráficos de Publicação

A Análise de Componentes Principais Discriminantes (DAPC), implementada no pacote `adegenet`, é uma técnica robusta para explorar a diferenciação genética sem as suposições rígidas de modelos clássicos. O `ggDAPC` foi criado para levar o poder visual do `ggplot2` para essas análises, oferecendo gráficos elegantes e totalmente customizáveis.

### Por que usar o ggDAPC?

Embora as funções nativas do `adegenet` sejam funcionais, elas nem sempre atendem às exigências estéticas e de flexibilidade das revistas científicas modernas. O `ggDAPC` atua como uma ponte, permitindo que você controle cores, temas, formas e layouts de forma intuitiva, mantendo a integridade estatística dos resultados originais.

### Destaques Técnicos

*   **Customização Estética**: Controle total sobre a aparência dos plots usando o ecossistema `ggplot2`.
*   **Integração Nativa**: Funciona perfeitamente com os outputs do pacote `adegenet`.
*   **Ready-to-publish**: Gere gráficos de alta qualidade para seus papers com poucas linhas de código.

### Como começar

O repositório inclui o script `DAPC.R` e um [tutorial online](https://wilsonfrantine.github.io/ggDAPC/) com orientações sobre as entradas e os agrupamentos usados na análise.

```r
# Carregar o script
source("DAPC.R")

# Consulte o tutorial e os exemplos do repositório para preparar e executar
# a análise com as funções disponíveis em DAPC.R.
```
