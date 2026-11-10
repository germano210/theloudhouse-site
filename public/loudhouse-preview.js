// Inclua este arquivo nos sites próprios que devem confirmar a prévia.
// Ele só responde à janela pai e não envia conteúdo ou dados do site.
(() => {
  if (window.parent === window) return;

  window.addEventListener('message', (event) => {
    if (event.source !== window.parent || event.origin === 'null') return;
    const message = event.data;
    if (!message || message.type !== 'loudhouse:preview-ping'
      || typeof message.token !== 'string' || message.token.length > 128) return;

    const failed = document.querySelector('[data-loudhouse-preview="error"]');
    const ready = document.readyState === 'complete' && document.body
      && (document.body.innerText.trim() || document.body.querySelector('img[src], svg, canvas, video'));
    if (!ready && !failed) return;

    window.parent.postMessage({
      type: failed ? 'loudhouse:preview-error' : 'loudhouse:preview-ready',
      token: message.token,
    }, event.origin);
  });
})();
