# Loudhouse — instruções do projeto

## Objetivo

Construir um hub visual da Loudhouse, empresa que cria sites para clientes e também projetos próprios. O hub será usado inicialmente pelos vendedores para conhecer e apresentar apenas os sites que a equipe escolher. Cada site continua hospedado separadamente: o Loudhouse mostra uma imagem escolhida pela equipe na janela correspondente e, ao clicar, abre o endereço externo do site.

O mesmo link do hub será compartilhado com quem precisar acessá-lo. Não há login previsto nesta primeira versão. Trate o conteúdo publicado como acessível a qualquer pessoa que receba o link; não inclua dados confidenciais de clientes, credenciais, arquivos internos ou informações comerciais não aprovadas.

## Contexto antes de implementar

1. Leia `D:\trabalhos\CONTEXTOS.md` e `D:\trabalhos\CONTEXTO-loudhouse.md` antes de planejar ou alterar o projeto. O contexto central diferencia decisões confirmadas de propostas.
2. Consulte apenas os arquivos necessários desta pasta. Outros projetos em `D:\trabalhos` não entram automaticamente no catálogo e não podem ser alterados por tarefas do Loudhouse.
3. Se uma decisão do produto mudar, atualize o contexto central e o índice quando necessário. Não crie uma segunda cópia do contexto nesta pasta.

## Direção de produto e visual

- A página inicial deve parecer a fachada do projeto "the Loudhouse", que fique de forma de que se adeque ao PNG posto como background. O conjunto precisa funcionar em telas pequenas e grandes, mesmo quando o número de sites mudar.
- Cada janela é um link reconhecível e mantém a imagem fornecida pela equipe como fallback. Por solicitação do usuário em 25/10/2026, pode exibir `iframe` quando houver confirmação de conteúdo carregado; sem confirmação ou com bloqueio, deve continuar com a imagem. Nome e identificação do site devem continuar legíveis.
- Clicar numa janela abre o site hospedado separadamente, preferencialmente em nova aba para manter o hub disponível. Use URLs HTTPS válidas e `rel="noopener noreferrer"` em links com `target="_blank"`.
- Mantenha uma lista curada de sites. Não publique todos os projetos da pasta principal por inferência, nem invente clientes, URLs, imagens, resultados ou estados de publicação.
- Permita navegação por teclado, foco visível, texto alternativo ou nome acessível para cada janela, contraste adequado e respeito a `prefers-reduced-motion`.

## Arquitetura proposta

- Preferência inicial: React, TypeScript estrito, Vite e CSS próprio para a fachada e as janelas. Esta é a stack recomendada na conversa; confirme-a antes de instalar dependências ou iniciar a aplicação.
- A primeira versão deve ser um site estático com um catálogo explícito de itens selecionados. Iframes com fallback foram aprovados pelo usuário; não há backend, banco de dados, autenticação ou roteamento interno por projeto aprovado.
- Separe dados do catálogo, componentes de janela/casa e estilos. Garanta que adicionar ou remover um site não exija duplicar marcação da interface.
- Não adicione bibliotecas além da stack confirmada sem autorização. Não introduza captura automática de telas, sincronização de repositórios ou integração com serviços externos sem pedido específico.

## Critérios para a primeira entrega

- A fachada deixa claro que a marca é Loudhouse e que as janelas representam sites selecionados.
- Cada janela exibe a imagem escolhida, identifica o site e leva à URL externa correta.
- O layout se adapta a celular e desktop sem cortar janelas nem tornar os links difíceis de usar.
- Itens sem imagem ou URL aprovada ficam identificados como pendentes e não são publicados como se estivessem prontos.
- Quando houver código, execute a verificação de tipos, o build de produção e os testes relevantes; registre apenas verificações realmente executadas.

## Estado atual

Este arquivo descreve o trabalho a realizar. Na criação dele, ainda não há aplicação, catálogo de sites, imagens escolhidas, hospedagem ou deploy do Loudhouse implementados nesta pasta.
