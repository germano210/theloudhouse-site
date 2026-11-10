# Loudhouse

Hub estático em React, TypeScript estrito, Vite e CSS próprio.

## Desenvolvimento

```sh
npm install
npm run dev
```

## Verificação e build

```sh
npm run typecheck
npm run build
```

O build estático é gerado em `dist/`. Não há backend ou deploy configurado.

## Adicionar os links

Edite `src/data/sites.ts` e preencha `url: ''` com a URL HTTPS de cada site.
Endereços vazios ou inválidos aparecem como **Link pendente**, sem navegação.
Links válidos abrem em nova aba com `noopener noreferrer`.

## Imagens e catálogo

As imagens originais permanecem em `assets/`. O catálogo é explícito; novos
arquivos não são publicados automaticamente. Adicione itens em `src/data/sites.ts`.
Os primeiros oito itens podem ocupar os recortes dos dentes. Todos aparecem no
catálogo abaixo, sem limite fixo. O SVG escala imagem e recortes juntos.

## Ajustar o formato dos dentes

Os contornos ficam em `src/data/teeth.ts`, na lista `toothOutlines`. Cada dente
tem um nome de posição e uma sequência de pontos `[x, y]`, nas coordenadas do
PNG original de **769 × 768**. X cresce para a direita e Y para baixo.

Com `npm run dev`, abra `http://127.0.0.1:5173/?recortes=1` para ver os contornos
numerados sobre o desenho: rosa para os superiores e azul para os inferiores.
Os números seguem a ordem dos itens com imagem em `src/data/sites.ts`.

Mova os pontos do contorno desejado e salve: o Vite atualiza a prévia. Para
alargar, afaste os pontos das laterais. Para encurtar, diminua Y nos pontos da
base. Mantenha a divisão entre as fileiras dentro do traço preto do PNG.
A caixa da imagem é calculada automaticamente a partir do contorno, com folga
para cobrir as bordas. O ouro usa o mesmo recorte. Remova `?recortes=1` para
voltar à visualização normal; as guias não são incluídas no site de produção.

As prévias preenchem o dente preservando a proporção (`slice`, como `cover`);
parte da imagem larga será recortada no formato estreito. Isso é independente
do contorno do dente.

## Iframe com imagem de fallback

Os dentes tentam carregar a URL HTTPS do item em um iframe. A imagem escolhida
permanece visível durante a tentativa e só dá lugar à página quando o conteúdo
é confirmado. Sem confirmação em 7 segundos, o iframe é removido e a imagem
continua aparecendo. Os cartões abaixo mantêm as imagens estáticas.

`load` não comprova sucesso: o navegador também dispara esse evento quando
bloqueia um iframe. Para sites externos, a prévia exige uma confirmação por
`postMessage`, conferindo origem, janela e um token da tentativa. Páginas da
mesma origem podem ser conferidas pelo DOM. Uma página externa sem esse
protocolo usa a imagem, mesmo que permita incorporação.

Para ativar a prévia em um site próprio:

1. Copie `public/loudhouse-preview.js` para a pasta pública desse site.
2. Inclua `<script defer src="/loudhouse-preview.js"></script>` no HTML dele.
3. Garanta que `Content-Security-Policy: frame-ancestors` e `X-Frame-Options`
   permitam a origem do hub. O script não altera nem contorna essas políticas.

O script responde quando há conteúdo no documento. Antes da confirmação, uma
aplicação pode marcar uma falha com `data-loudhouse-preview="error"` em um
elemento para solicitar a imagem estática. Nenhum outro projeto deste workspace
foi alterado.

Configurações opcionais por item de `src/data/sites.ts`:

```ts
iframe: { enabled: false }, // Usar sempre a imagem escolhida.
// ou:
iframe: { viewportWidth: 390 }, // Largura da página antes de reduzir ao dente.
```

O item Carlos Tur Central está com iframe desativado porque a política do
endereço do Claude foi consultada e bloqueia a incorporação pelo hub. Os demais
itens tentam o protocolo e continuam na imagem se não houver confirmação.
O clique continua abrindo o endereço em nova aba. O iframe é apenas uma prévia,
não recebe cliques ou foco, e usa os mesmos recortes do efeito dourado.

Referências: [eventos de iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#error_and_load_event_behavior)
e [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).
