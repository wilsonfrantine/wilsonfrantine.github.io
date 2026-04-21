---
repo: "vertebrate-diversity"
title: "Diversidade de Vertebrados 🐟🦎🐦"
description: "Sunburst interativo da diversidade de espécies por grupo taxonômico, com dados do Catalogue of Life."
category: "Data Ecology"
pubDate: 2026-04-17
insight: "~86 mil espécies de vertebrados, distribuídas de forma radicalmente desigual — e o gráfico faz isso óbvio."
tags: ["D3.js", "Taxonomia", "React", "Catalogue of Life", "PhyloPic", "Data Viz"]
---

## > ~/vertebrate-diversity --info

Recriei o gráfico radial de diversidade de vertebrados como ferramenta interativa. O original era uma imagem estática — agora é um sunburst D3 onde você pode alternar grupos, trocar entre escala logarítmica e linear, e ver contagens reais de espécies por táxon.

### > ~/features --list

*   **Sunburst duplo**: anel interno por grupo (Mammalia, Aves, Reptilia…), anel externo por táxon específico (Squamata, Anura…).
*   **Escala log₁₀**: sem ela, Actinopterygii (~34.000 spp.) engole visualmente todos os outros grupos.
*   **Filtro de grupos**: desmarque qualquer clado e o gráfico redistribui os ângulos em tempo real.
*   **Dados vivos**: script de build (`npm run fetch-taxonomy`) busca contagens atualizadas no ChecklistBank API.

### > ~/tech-stack --view

React 19 + D3.js para cálculo dos arcos (sem manipulação direta de DOM — D3 só faz math). Dados pre-fetched em build-time e servidos como JSON estático. Zero fetch em runtime.
