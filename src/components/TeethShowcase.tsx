import { useId, type PointerEvent } from 'react';
import illustration from '../../assets/bg/dentes.png';
import { getSiteUrl, type Site } from '../data/sites';
import { useToothShine } from '../hooks/useToothShine';
import { artboard, toothSlots as slots } from '../data/teeth';
import { SiteIframePreview } from './SiteIframePreview';

interface Props {
  sites: readonly Site[];
  activeSite: string | null;
  onSelect: (id: string | null) => void;
}

export function TeethShowcase({ sites, activeSite, onSelect }: Props) {
  const prefix = useId().replaceAll(':', '');
  const visibleSites = sites.filter((site) => site.image.trim()).slice(0, slots.length);
  const { shine, followPointer, showAt, clear } = useToothShine();
  const showGuides = import.meta.env.DEV && new URLSearchParams(window.location.search).has('recortes');

  function clearHighlight() {
    clear();
    onSelect(null);
  }

  return (
    <div className="showcase">
      <div className="showcase-orbit" aria-hidden="true" />
      <span className="art-note" aria-hidden="true">sorriso amarelo e não é cárie ↙</span>
      <svg className="teeth-art" viewBox={`0 0 ${artboard.width} ${artboard.height}`} role="group" aria-label="Projetos nos dentes da ilustração Loudhouse">
        <defs>
          <linearGradient id={`${prefix}-silver`} x1="0" y1="0" x2="1" y2="0.7">
            <stop offset="0" stopColor="#566171" />
            <stop offset="0.16" stopColor="#aeb9c7" />
            <stop offset="0.32" stopColor="#e5ebf3" />
            <stop offset="0.43" stopColor="#ffffff" />
            <stop offset="0.49" stopColor="#b8c3d1" />
            <stop offset="0.64" stopColor="#6e7a8b" />
            <stop offset="0.78" stopColor="#c3cdd9" />
            <stop offset="0.9" stopColor="#f7faff" />
            <stop offset="1" stopColor="#8c99aa" />
          </linearGradient>
          <linearGradient id={`${prefix}-gold`} x1="0" y1="0" x2="1" y2="0.7">
            <stop offset="0" stopColor="#6f3808" />
            <stop offset="0.16" stopColor="#c98b24" />
            <stop offset="0.32" stopColor="#ffe99a" />
            <stop offset="0.43" stopColor="#fff7ce" />
            <stop offset="0.49" stopColor="#dfa633" />
            <stop offset="0.64" stopColor="#92520d" />
            <stop offset="0.78" stopColor="#e4af3d" />
            <stop offset="0.9" stopColor="#fff0ac" />
            <stop offset="1" stopColor="#b77518" />
          </linearGradient>
          <radialGradient id={`${prefix}-shine-halo`}>
            <stop offset="0" stopColor="#fffef0" stopOpacity="0.8" />
            <stop offset="0.3" stopColor="#ffde72" stopOpacity="0.35" />
            <stop offset="1" stopColor="#ffd66a" stopOpacity="0" />
          </radialGradient>
          <filter id={`${prefix}-shine-glow`} x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffe69b" floodOpacity="0.9" />
          </filter>
          {slots.map((slot, index) => (
            <clipPath id={`${prefix}-tooth-${index}`} key={slot.id}><path d={slot.path} /></clipPath>
          ))}
        </defs>
        <path d="M195 492 Q201 394 270 342 Q315 286 357 293 L385 295 Q424 286 480 326 Q516 390 512 482 L428 520 L335 563 L255 618 Q225 664 205 638 Q184 614 195 492" fill="#f8f4e8" />
        {visibleSites.map((site, index) => {
          const slot = slots[index];
          const url = getSiteUrl(site);
          const content = <>
            <image href={site.image} x={slot.x} y={slot.y} width={slot.width} height={slot.height} preserveAspectRatio="xMidYMin slice" />
            <SiteIframePreview site={site} bounds={{ x: slot.x, y: slot.y, width: slot.width, height: slot.height }} />
            <path className="tooth-silver" d={slot.path} fill={`url(#${prefix}-silver)`} />
            <path className="tooth-gold" d={slot.path} fill={`url(#${prefix}-gold)`} />
          </>;
          const shared = {
            className: `tooth ${activeSite === site.id ? 'is-active' : ''}`,
            clipPath: `url(#${prefix}-tooth-${index})`,
            onPointerEnter: (event: PointerEvent<Element>) => {
              if (event.pointerType === 'touch') return;
              onSelect(site.id);
              followPointer(event, site.id);
            },
            onPointerMove: (event: PointerEvent<Element>) => followPointer(event, site.id),
            onPointerLeave: clearHighlight,
          };
          return url ? (
            <a {...shared} key={site.id} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${site.name} em nova aba`}
              onFocus={(event) => {
                if (!event.currentTarget.matches(':focus-visible')) return;
                onSelect(site.id);
                showAt(site.id, slot.x + slot.width / 2, slot.y + slot.height / 2);
              }}
              onBlur={clearHighlight}>{content}</a>
          ) : (
            <g {...shared} key={site.id}><title>{site.name} — link pendente</title>{content}</g>
          );
        })}
        <image href={illustration} width={artboard.width} height={artboard.height} className="illustration-overlay" aria-hidden="true" />
        {showGuides && (
          <g className="tooth-guides" aria-hidden="true">
            {slots.map((slot, index) => (
              <g key={slot.id}>
                <path d={slot.path} fill="none" stroke={index < 4 ? '#eb2871' : '#168bba'} strokeWidth="1.5" />
                <text x={slot.x + slot.width / 2} y={slot.y + slot.height / 2} textAnchor="middle" fill="#172127" stroke="#fff" strokeWidth="3" paintOrder="stroke" fontSize="14" fontWeight="700">{index + 1}</text>
              </g>
            ))}
          </g>
        )}
        {shine && activeSite === shine.siteId && (
          <g className="tooth-shine" transform={`translate(${shine.x} ${shine.y})`} aria-hidden="true">
            <circle r="62" fill={`url(#${prefix}-shine-halo)`} />
            <path d="M0 -45 C3 -10 10 -3 45 0 C10 3 3 10 0 45 C-3 10 -10 3 -45 0 C-10 -3 -3 -10 0 -45Z" fill="#fffef4" filter={`url(#${prefix}-shine-glow)`} />
          </g>
        )}
      </svg>
      <div className="art-caption"><span className="status-dot" /> A CRIATIVIDADE MORA AQUI.</div>
    </div>
  );
}
