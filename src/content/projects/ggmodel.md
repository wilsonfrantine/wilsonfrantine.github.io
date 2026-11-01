---
repo: "ggmodel"
title: "ggmodel 📊"
description: "Pacote R em beta com a função ggsurface para criar superfícies 2D a partir de modelos lm, glm e loess."
category: "Data Ecology"
pubDate: 2026-04-03
insight: "Versão beta: a funcionalidade documentada atualmente é ggsurface."
tags: ["R", "Modeling", "Visualization", "ggplot2"]
status: "Em desenvolvimento"
---

## ggmodel

`ggmodel` é um pacote R em beta para visualizar superfícies de modelos estatísticos. A função disponível, `ggsurface`, recebe modelos das classes `lm`, `glm` e `loess` e produz uma superfície 2D com `ggplot2`.

## Uso documentado

O pacote documenta `ggsurface` para modelos com dois preditores de interesse. Como está em beta, a interface e o escopo ainda podem mudar.

```r
# Instalação
remotes::install_github("wilsonfrantine/ggmodel")
library(ggmodel)

meu_modelo <- lm(Riqueza ~ Temperatura * Umidade, data = dados_campo)
ggsurface(meu_modelo, x.var = "Temperatura", y.var = "Umidade")
```
