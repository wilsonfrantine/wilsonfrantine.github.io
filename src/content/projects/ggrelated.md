---
repo: "ggrelated"
title: "ggrelated"
description: "Quem é parente de quem? Estime o parentesco (relatedness) sem precisar ler o manual do related dez vezes e com gráficos que não parecem de 1995."
category: "Bioinfo Hub"
pubDate: 2026-04-03
insight: "Transforme matrizes de genótipos em laços familiares sem perder o juízo (ou a paciência com o FigTree)."
tags: ["R", "Genetics", "Visualization"]
---

## Por que o ggrelated existe?

Em estudos de **genética de populações** e **ecologia reprodutiva**, entender o parentesco (*kinship*) entre indivíduos é fundamental para desvendar sistemas de acasalamento e padrões de dispersão. Softwares como o **Colony** ou pacotes em R como o **related** são poderosos e concentrados no *hardwork*, mas suas saídas gráficas nem sempre estão prontas para publicação.

<figure class="float-right">
  <img src="https://www.researchgate.net/profile/Mario-Orsi-2/publication/366192301/figure/fig1/AS:11431281107194678@1670956344672/Heat-map-for-Linch-Ritland-relatedness-estimator-for-each-larvae-pair-and-sample-site.png" alt="Heatmap de parentesco">
  <figcaption>
    Mapa de calor das estimativas de parentesco (Lynch & Ritland) para cada par de larvas e locais de amostragem. Para detalhes e alta resolução, consulte o artigo original.
  </figcaption>
</figure>

Esse foi o nosso caso no estudo com a biologia reprodutiva do mandí (*Pimelodus maculatus*), um belo bagre de água doce, bastante comum nos rios do sul do Brasil. Você pode conferir todos os gráficos da publicação original [neste link do ResearchGate](https://www.researchgate.net/publication/366192301_Polygynandry_and_high_genetic_diversity_supported_by_kinship_and_population_genetics_from_neotropical_catfish_ichthyoplankton).

O `ggrelated` preenche essa lacuna, permitindo que você transforme dados brutos em gráficos `ggplot2` totalmente customizáveis. O padrão das matrizes de saída está alinhado com as melhores práticas de visualização de dados, incluindo paletas *colorblind friendly*.

### Destaques do Projeto

*   **Integração Direta**: Funciona perfeitamente com os outputs do pacote R `related`.
*   **Narrativa Científica**: Este script foi o motor visual dos resultados apresentados em **Frantine-Silva et al. (2022)**.
*   **Customização Estética**: Controle cores, temas e anotações para combinar com o layout da sua revista científica.

### Exemplo de Uso Prático

Imagine que você coletou larvas de peixes em um rio e precisa saber se elas são filhas do mesmo casal ou se possuem apenas um progenitor em comum. Ao utilizar o `ggrelated`, você transforma as matrizes de *relatedness* em heatmaps ou histogramas de frequências de parentesco em segundos:

```r
# Instalação simplificada via devtools
devtools::install_github("wilsonfrantine/ggrelated")

# Carregando a biblioteca e gerando o gráfico principal
library(ggrelated)
plot_kinship(data)
```

Fique à vontade para sugerir melhorias ou relatar bugs diretamente no repositório oficial!
