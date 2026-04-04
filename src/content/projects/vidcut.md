---
repo: "vidcut"
title: "VidCut ✂️"
description: "Ferramenta local simples para cortar segmentos de vídeo usando Node.js e FFmpeg."
category: "Outros"
pubDate: 2026-04-03
insight: "Corte vídeos de forma precisa via linha de comando sem re-codificação pesada."
tags: ["Multimedia", "FFmpeg", "Node.js", "Tools"]
---

## Edição de Vídeo Sem Complicações

Muitas vezes, durante a preparação de materiais didáticos ou apresentações, precisamos apenas de um pequeno trecho de um vídeo longo. O **VidCut** automatiza esse processo através de um script Node.js que utiliza o poder do **FFmpeg** para realizar cortes cirúrgicos.

### Por que usar o VidCut?

Softwares de edição de vídeo convencionais podem ser pesados e lentos para tarefas simples de corte. O VidCut realiza o "stream copy" sempre que possível, o que significa que o vídeo é cortado quase instantaneamente e sem perda de qualidade original.

### Como usar

Após instalar as dependências (Node.js e FFmpeg), basta executar o comando especificando o tempo de início e fim:

```bash
# Exemplo de uso
node vidcut.js -i entrada.mp4 -s 00:01:30 -e 00:02:00 -o saida.mp4
```

O VidCut é a ferramenta de "bancada" ideal para o pesquisador que precisa manipular arquivos multimídia com precisão e velocidade.
