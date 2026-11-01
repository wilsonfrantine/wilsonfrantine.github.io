Os scripts nesse diretório foram feitos para serem rodados na raiz, mas estão no presente diretório para modularização.

## Capturar previews de projetos

Instale o Chromium do Playwright uma vez com `npx playwright install chromium` e rode `npm run capture:previews`. As capturas são feitas em viewport desktop consistente e salvas em `public/projects/previews/`.

Se o Chromium já estiver instalado em um caminho diferente do padrão do Playwright, informe-o em `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` antes de rodar o comando.
