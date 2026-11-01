---
repo: "vertebrate-diversity"
title: "Diversidade de Vertebrados 🐟🦎🐦"
description: "Gráfico sunburst interativo para explorar a diversidade de vertebrados por grupos e táxons, usando dados do Catalogue of Life."
category: "Materiais de referência e projetos de ensino"
pubDate: 2026-04-17
insight: "Alterne grupos e escalas para comparar a distribuição das espécies entre os táxons."
tags: ["D3.js", "Taxonomia", "React", "Catalogue of Life", "PhyloPic", "Data Viz"]
---

## Diversidade de vertebrados

Gráfico sunburst interativo feito com D3.js para explorar contagens de espécies de vertebrados por grupo e táxon. A interface permite alternar grupos e comparar escalas logarítmica e linear.

### Recursos

*   **Sunburst duplo**: anel interno por grupo (Mammalia, Aves, Reptilia…), anel externo por táxon específico (Squamata, Anura…).
*   **Escala log₁₀**: sem ela, Actinopterygii (~34.000 spp.) engole visualmente todos os outros grupos.
*   **Filtro de grupos**: desmarque qualquer clado e o gráfico redistribui os ângulos em tempo real.
* **Dados atualizáveis**: o script de build `npm run fetch-taxonomy` consulta a API ChecklistBank.

O projeto usa React e D3.js; os dados são preparados durante o build e servidos como JSON estático.
