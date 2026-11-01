---
repo: "criptykey"
title: "criptykey 🔐"
description: "Gerador local de senhas determinísticas com PBKDF2-HMAC-SHA256, usando uma frase mestre e o nome do serviço."
category: "Outros"
pubDate: 2026-04-03
insight: "CLI e versão web; os mesmos dados geram o mesmo resultado sem enviar informações a um servidor."
tags: ["Security", "Cryptography", "JavaScript", "Tools"]
---

## Segurança Determinística e Sem Armazenamento

**CriptyKey** gera senhas a partir de uma frase mestre e do nome de um site ou serviço. A derivação usa PBKDF2-HMAC-SHA256; o gerador não mantém um cofre de senhas.

### Como funciona?

Para a mesma frase mestre, serviço, estilo e versão do algoritmo, a saída é determinística. Alterar um desses valores produz outra senha.

### Vantagens Principais

*   **Sem armazenamento pelo app**: A ferramenta não guarda as senhas geradas.
*   **Totalmente Offline**: O processamento ocorre 100% no seu dispositivo.
*   **Múltiplos Estilos**: Gere senhas alfanuméricas, apenas números ou frases amigáveis.

O repositório contém a versão web e uma interface de linha de comando.
