---
repo: "lsma"
title: "lsma 🗺️"
description: "Análise multiescala da estrutura da paisagem para ecologia e conservação."
category: "Data Ecology"
pubDate: 2026-04-03
insight: "Decifre padrões espaciais complexos com abordagens de buffers aninhados ou desacoplados."
tags: ["R", "Landscape Ecology", "Spatial Analysis"]
---

## Estrutura da Paisagem em Múltiplas Escalas

Na ecologia de paisagem, entender como os organismos respondem a diferentes escalas espaciais é um dos maiores desafios técnicos. O pacote `lsma` (*Landscape Structure Multiscale Analysis*) foi desenvolvido para automatizar esse fluxo, permitindo que pesquisadores analisem métricas de paisagem em diversos níveis de forma eficiente e reprodutível.

### Por que o lsma é necessário?

Muitas vezes, as respostas biológicas a variáveis ambientais dependem da escala de observação (o famoso *scale of effect*). O `lsma` fornece ferramentas para calcular métricas (como PLAND, ED, SHAPE) utilizando estratégias de amostragem multiescala, integrando-se perfeitamente com outros pacotes como o `landscapemetrics`.

### Destaques Técnicos

*   **Estratégias Flexíveis**: Suporte para análises aninhadas (*nested*) e desacopladas (*decoupled*).
*   **Integração Espacial**: Trabalha nativamente com objetos `raster`, `terra` e `sf`.
*   **Processamento em Paralelo**: Suporte experimental para acelerar cálculos pesados via pacote `future`.

### Início Rápido (Quick Start)

Para começar a analisar sua paisagem, você só precisa definir seus pontos de amostragem e os buffers de interesse:

```r
library(lsma)

# 1. Carregar dados de raster e pontos
r <- terra::rast("sua_paisagem.tif")
p <- terra::vect("seus_pontos.shp")

# 2. Extrair paisagens em múltiplas escalas (ex: 500m, 1000m, 2000m)
ls <- extract_landscapes(r, p, buffers = c(500, 1000, 2000), strategy = "nested")

# 3. Calcular métricas para cada escala
metrics <- calculate_metrics(ls, metric = "pland", level = "class")
```

O `lsma` é uma ferramenta essencial para ecólogos que buscam rigor estatístico e eficiência na manipulação de grandes volumes de dados geoespaciais.
