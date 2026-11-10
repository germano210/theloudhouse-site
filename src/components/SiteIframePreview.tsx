import { getSiteUrl, type Site } from '../data/sites';
import { useIframePreview } from '../hooks/useIframePreview';

interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props {
  site: Site;
  bounds: Bounds;
}

export function IframePreviewFrame({ src, site, bounds }: Props & { src: string }) {
  const preview = useIframePreview(src);
  const viewportWidth = Math.max(240, Math.min(site.iframe?.viewportWidth ?? 390, 1920));
  const scale = bounds.width / viewportWidth;

  return (
    <foreignObject {...bounds} ref={preview.containerRef} className="site-iframe-container" aria-hidden="true" data-preview-state={preview.state}>
      <div className={`site-iframe-viewport ${preview.state === 'ready' ? 'is-ready' : ''}`}>
        {preview.mountFrame && (
          <iframe
            ref={preview.frameRef}
            src={src}
            title={`Prévia ao vivo de ${site.name}`}
            className="site-iframe"
            tabIndex={-1}
            sandbox="allow-scripts allow-same-origin"
            allow="autoplay 'none'; camera 'none'; microphone 'none'; geolocation 'none'"
            referrerPolicy="no-referrer"
            onLoad={preview.onLoad}
            onError={preview.onError}
            style={{ width: viewportWidth, height: Math.ceil(bounds.height / scale), transform: `scale(${scale})` }}
          />
        )}
      </div>
    </foreignObject>
  );
}

export function SiteIframePreview({ site, bounds }: Props) {
  const src = getSiteUrl(site);
  if (!src || !site.image || site.iframe?.enabled === false || window.self !== window.top) return null;
  const url = new URL(src);
  const currentPath = window.location.pathname.replace(/\/$/, '');
  // Impede incorporar o próprio hub e criar uma sequência de iframes.
  if (url.origin === window.location.origin && url.pathname.replace(/\/$/, '') === currentPath) return null;

  return <IframePreviewFrame key={src} src={src} site={site} bounds={bounds} />;
}
