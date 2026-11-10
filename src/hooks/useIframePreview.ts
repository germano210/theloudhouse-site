import { useEffect, useRef, useState } from 'react';

type PreviewState = 'loading' | 'ready' | 'fallback';

export const PREVIEW_TIMEOUT_MS = 7000;

export function useIframePreview(src: string) {
  const containerRef = useRef<SVGForeignObjectElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<PreviewState>('loading');
  const [navigation, setNavigation] = useState(0);
  const failed = state === 'fallback';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { rootMargin: '150px' });
    // O recorte SVG pode zerar a interseção de um foreignObject.
    // Observar a arte inteira mantém o carregamento sob demanda.
    observer.observe(container.closest('svg') ?? container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || failed) return;

    const origin = new URL(src).origin;
    const token = crypto.randomUUID();
    let finished = false;

    function finish(next: 'ready' | 'fallback') {
      if (finished) return;
      finished = true;
      window.clearTimeout(deadline);
      window.clearInterval(poll);
      setState(next);
    }

    function inspect() {
      const frame = frameRef.current;
      if (!frame || finished) return;
      try {
        // Só podemos ler o DOM de páginas da mesma origem. about:blank
        // inicial e páginas vazias nunca contam como conteúdo carregado.
        const doc = frame.contentDocument;
        if (doc && doc.URL !== 'about:blank' && doc.readyState === 'complete'
          && new URL(doc.URL).origin === origin && doc.body
          && (doc.body.innerText.trim() || doc.body.querySelector('img[src], svg, canvas, video'))) {
          finish('ready');
          return;
        }
      } catch {
        // Outra origem: aguarda confirmação explícita via postMessage.
      }
      frame.contentWindow?.postMessage({ type: 'loudhouse:preview-ping', token }, origin);
    }

    function receive(event: MessageEvent<unknown>) {
      if (event.source !== frameRef.current?.contentWindow || event.origin !== origin) return;
      if (!event.data || typeof event.data !== 'object') return;
      const message = event.data as { type?: unknown; token?: unknown };
      if (message.token !== token) return;
      if (message.type === 'loudhouse:preview-ready') finish('ready');
      if (message.type === 'loudhouse:preview-error') finish('fallback');
    }

    const deadline = window.setTimeout(() => finish('fallback'), PREVIEW_TIMEOUT_MS);
    const poll = window.setInterval(inspect, 400);
    window.addEventListener('message', receive);
    inspect();

    return () => {
      finished = true;
      window.clearTimeout(deadline);
      window.clearInterval(poll);
      window.removeEventListener('message', receive);
    };
  }, [src, visible, failed, navigation]);

  return {
    containerRef,
    frameRef,
    state,
    mountFrame: visible && !failed,
    onLoad: () => {
      // load também ocorre em bloqueios CSP/X-Frame-Options. Revalidar
      // cada navegação impede trocar a imagem por uma página de erro.
      setState('loading');
      setNavigation((value) => value + 1);
    },
    onError: () => setState('fallback'),
  };
}
