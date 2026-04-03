---
title: "Extrair Regiões Específicas de Arquivos BAM"
description: "Como usar o samtools para extrair sequências de um intervalo genômico específico de forma ultra-rápida."
pubDate: 2026-04-03
category: "Genômica"
language: "Bash"
---

# Extrair Regiões com Samtools 🧬

Se você tem um arquivo de alinhamento gigante (`.bam`) e só precisa analisar um gene ou cromossomo específico, não precisa carregar tudo. Use o indexamento a seu favor.

### Pré-requisito
Seu arquivo BAM deve estar indexado (ter um arquivo `.bai` correspondente):

```bash
samtools index alinhamento.bam
```

### Extraindo um Cromossomo Inteiro
Para extrair apenas o Cromossomo 1:

```bash
samtools view -b alinhamento.bam chr1 > chr1_somente.bam
```

### Extraindo uma Região Específica (Intervalo)
Para extrair apenas a região entre as bases 100.000 e 200.000 do Cromossomo 2:

```bash
samtools view -b alinhamento.bam chr2:100000-200000 > regiao_estudo.bam
```

> **Insight**: O parâmetro `-b` (binary) garante que a saída continue sendo um arquivo BAM compactado, economizando muito espaço em disco.
