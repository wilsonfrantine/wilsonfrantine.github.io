---
repo: "ggmodel"
title: "ggmodel 📊"
description: "Visualização de superfícies de modelos estatísticos do R base usando ggplot2."
category: "Data Ecology"
pubDate: 2026-04-03
insight: "Transforme outputs de lm, glm e loess em superfícies 2D elegantes."
tags: ["R", "Modeling", "Visualization", "ggplot2"]
---

## Visualizando Superfícies de Resposta

Na modelagem ecológica, entender a interação entre dois preditores é crucial. O pacote `ggmodel` foi desenvolvido para preencher a lacuna entre os modelos estatísticos clássicos do R base e o poder visual do `ggplot2`, focando na geração de superfícies de resposta 2D.

### Por que o ggmodel?

Embora o R possua funções nativas para visualizar modelos, customizar esses gráficos para publicações pode ser um processo trabalhoso. O `ggmodel` simplifica isso através da função `ggsurface`, que traduz a complexidade do modelo em uma linguagem visual familiar aos usuários de `ggplot2`.

### Destaques do Pacote

*   **Compatibilidade**: Funciona com objetos de classe `lm`, `glm` e `loess`.
*   **Customização**: Altere cores, grades e legendas usando argumentos intuitivos.
*   **Pronto para Publicação**: Gere gráficos com estética profissional e mínima necessidade de pós-processamento.

### Exemplo de Uso

Instale a versão beta diretamente do GitHub e comece a plotar suas interações:

```r
# Instalação
remotes::install_github("wilsonfrantine/ggmodel")
library(ggmodel)

# Supondo um modelo de interação
meu_modelo <- lm(Riqueza ~ Temperatura * Umidade, data = dados_campo)

# Gerando a superfície 2D
ggsurface(meu_modelo, x = "Temperatura", y = "Umidade")
```

O `ggmodel` é a ferramenta ideal para ecólogos que buscam clareza na interpretação de modelos de regressão e interações multivariadas.
