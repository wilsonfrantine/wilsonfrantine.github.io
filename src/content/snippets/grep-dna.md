---
title: "Filtrar Sequências DNA em Arquivo FASTA com Grep"
description: "Um one-liner simples para contar ou encontrar padrões de DNA em arquivos de sequenciamento."
pubDate: 2026-04-03
category: "Bioinformática"
language: "Bash"
---

# Filtrar Sequências DNA com Grep 🧬

Uma dica rápida para o dia a dia na bioinformática usando o terminal Linux:

### Contando sequências em um arquivo FASTA
Para saber quantas sequências existem em um arquivo `.fasta`, basta procurar pelo caractere `>` que inicia cada registro:

```bash
grep -c ">" arquivo.fasta
```

### Procurando por um padrão específico (ex: motifs)
Se você busca um motif de DNA específico em suas sequências (ignora o cabeçalho):

```bash
grep -v ">" arquivo.fasta | grep "GATTACA"
```

> **Dica**: Use o parâmetro `-i` para ignorar o caso (maiúsculas/minúsculas).
