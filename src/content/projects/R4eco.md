---
repo: "R4eco"
title: "R4eco 🌿"
description: "Funções utilitárias para simplificar análises ecológicas rotineiras no R."
category: "Data Ecology"
pubDate: 2026-04-03
insight: "De dendrogramas UPGMA a modelos mistos, uma caixa de ferramentas para o ecólogo."
tags: ["R", "Ecology", "Statistics", "lme4"]
---

## Simplificando a Análise Ecológica

O `R4eco` nasceu da necessidade de consolidar scripts e funções que facilitam o dia a dia do ecólogo quantitativo. Em vez de reescrever códigos complexos para tarefas comuns, este pacote oferece uma coleção de ferramentas prontas para uso, focadas em clareza e eficiência.

### O que o R4eco oferece?

Atualmente, o pacote abrange desde cálculos de similaridade até a visualização de modelos estatísticos avançados. É um projeto em constante expansão, alimentado pelos desafios reais encontrados na pesquisa ecológica.

### Funcionalidades em Destaque

*   **Modelos Mistos (lme4)**: Visualize predições de modelos lineares mistos de forma intuitiva com a função `lmerPredictionPlot`.
*   **Análise de Comunidades**: Cálculo do índice de similaridade de Renkonen (S) e implementação de bootstrap.
*   **Filogenia e Agrupamento**: Ferramentas para plotagem conveniente de dendrogramas UPGMA.

### Exemplo de Uso

Instale e carregue o pacote para acessar as utilitárias:

```r
# Instalação via remotes
remotes::install_github("wilsonfrantine/R4eco")
library(R4eco)

# Exemplo: Plotando predições de um modelo misto (lme4)
# lmerPredictionPlot(model = seu_modelo_lme4)
```

O `R4eco` é o companheiro ideal para quem busca realizar análises ecológicas rigorosas sem se perder na burocracia do código.
