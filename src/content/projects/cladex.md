---
repo: "cladex"
title: "CladeX 🌿🧬"
description: "Simulador filogenético para quem cansou de entender o mrca em slides estáticos."
category: "Bioinfo Hub"
pubDate: 2026-04-06
insight: "Se a árvore não faz sentido no papel, tente clicar nos nós até a sinapomorfia aparecer."
tags: ["Phylogenetics", "Education", "Bioinformatics", "React", "D3.js"]
---

## > ~/cladex --info

O **CladeX** é um workbench de tree-thinking que eu desenvolvi para parar de explicar a mesma coisa dez vezes em aula. Ele transforma a sistemática filogenética em algo interativo, onde a topologia da árvore responde ao clique e o erro é parte do log de aprendizado.

### > ~/features --list

*   **Tree-Thinking Real:** Nada de figuras coladas. As árvores são geradas via D3.js a partir de arquivos Newick reais.
*   **Homologia Sem Drama:** Localize sinapomorfias e autapomorfias clicando diretamente nos nós e ramos. Se o clado for parafilético, a ferramenta vai te avisar.
*   **Identificação "Quem sou eu?":** Desafios para identificar táxons ocultos usando pistas morfológicas e filogenéticas.
*   **Visuais de Terminal:** UI limpa, modo dark por padrão e silhuetas via PhyloPic API.

### > ~/tech-stack --view

O simulador roda em React 19 com D3 para o layout dos ramos. O estado é gerenciado pelo Zustand porque eu precisava de algo que não quebrasse enquanto eu tentava calcular coordenadas de SVG de forma recursiva.
