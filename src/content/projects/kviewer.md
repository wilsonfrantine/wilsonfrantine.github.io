---
repo: "kviewer"
title: "kviewer 📊"
description: "Pacote R para visualizar resultados do STRUCTURE e calcular estimadores de K, incluindo delta K de Evanno."
category: "Bioinfo Hub"
pubDate: 2026-04-03
insight: "Lê resultados do STRUCTURE e oferece estimadores de K para apoiar a escolha do número de agrupamentos."
tags: ["Bioinformatics", "Genetics", "Population Structure"]
---

## Resultados do STRUCTURE em R

`kviewer` é um pacote R para ler e visualizar resultados do software **STRUCTURE**. Também implementa estimadores para auxiliar a escolha de K, incluindo delta K de Evanno e a linearização de lnPr associada a Pritchard.

## Uso

Instalação simples via GitHub:

```r
remotes::install_github("wilsonfrantine/kviewer")
library(kviewer)

results <- kview()
```
