---
title: "Tree-Thinking com CladeX"
description: "Guia prático para não confundir mais grupos parafiléticos e entender onde os caracteres surgem."
category: "Bioinformatics"
pubDate: 2026-04-06
author: "Wilson Frantine"
image: "https://cdn-icons-png.flaticon.com/512/3222/3222792.png"
tags: ["Sistemática", "Educação", "Filogenia"]
---

## > ~/tutorial --start

A sistemática filogenética costuma ser ensinada como uma série de definições estáticas: monofilético, parafilético, polifilético. No papel, tudo parece fazer sentido até que a árvore cresce e você se perde nos ramos. O **CladeX** foi criado para você quebrar essa barreira clicando na árvore.

### > ~/conceitos --node

#### 1. O ancestral comum mais recente (MRCA)

No CladeX, cada nó interno é um evento de especiação — o ancestral comum dos táxons acima dele. Clique nos nós. O simulador vai destacar todos os descendentes. Se você selecionou um grupo que não inclui *todos* esses descendentes, parabéns, você acaba de criar um grupo **parafilético** (e o sistema vai te dar um log de erro por isso).

#### 2. Sinapomorfias (a herança compartilhada)

Caracteres não surgem do nada nos terminais. Eles aparecem nos nós internos (ancestrais). No modo de treinamento:

*   Observe o caráter destacado (quadrado preenchido).
*   Tente rastrear até o nó mais profundo que possui todos os táxons com esse caráter.
*   Ali é o ponto de origem (a sinapomorfia).

### > ~/pratica --run

Eu recomendo começar pelo módulo de **Annelida** ou **Chordata**. São grupos com histórias evolutivas bem documentadas e sinapomorfias claras (como a notocorda ou o clitelo). 

1. Escolha um módulo.
2. Tente identificar os clados principais.
3. Se errar, leia a explicação. O log de erro no CladeX foi feito para ser lido, não ignorado.

Lembre-se: filogenia não é sobre decorar nomes, é sobre entender a geografia do tempo biológico.
