---
repo: "vidcut"
title: "VidCut ✂️"
description: "Aplicação web local, com servidor Node.js e FFmpeg, para cortar trechos de arquivos de vídeo."
category: "Outros"
pubDate: 2026-04-03
insight: "Requer Node.js e FFmpeg instalados no computador."
tags: ["Node.js", "FFmpeg", "Vídeo", "Aplicação local"]
---

## VidCut

O **VidCut** é uma interface web servida localmente por Node.js. Ela recebe um vídeo disponível no computador e os tempos de início e fim; o servidor usa FFmpeg para produzir o trecho.

### Requisitos

* Node.js instalado.
* FFmpeg disponível no `PATH` do sistema.

Clone o repositório, instale suas dependências, inicie `server.js` e abra `http://localhost:3000` no navegador. Não há demonstração hospedada: a aplicação depende dos arquivos locais e do FFmpeg instalado.
