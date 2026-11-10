import { getSiteUrl, type Site } from '../data/sites';

interface Props {
  site: Site;
  index: number;
  active: boolean;
  onSelect: (id: string | null) => void;
}

export function SiteCard({ site, index, active, onSelect }: Props) {
  const url = site.image.trim() ? getSiteUrl(site) : undefined;
  const content = <>
    <div className={`site-preview ${site.category === 'Central' ? 'site-preview-mobile' : ''}`}>
      {site.image ? <img src={site.image} alt={site.imageAlt} style={{ objectPosition: site.imagePosition }} loading="lazy" /> : <span className="site-image-pending">Imagem pendente</span>}
      <span className="preview-number">{String(index + 1).padStart(2, '0')}</span>
      <span className="preview-arrow" aria-hidden="true">↗</span>
    </div>
    <div className="site-info">
      <div><p className="eyebrow">{site.category}</p><h3>{site.name}</h3></div>
      <span className={`site-status ${url ? 'is-ready' : ''}`}>{url ? 'Visitar site ↗' : 'Link pendente'}</span>
    </div>
  </>;

  return (
    <article className={`site-card ${active ? 'is-active' : ''}`} onMouseEnter={() => onSelect(site.id)} onMouseLeave={() => onSelect(null)}>
      {url ? <a className="site-link" href={url} target="_blank" rel="noopener noreferrer" onFocus={() => onSelect(site.id)} onBlur={() => onSelect(null)} aria-label={`Visitar ${site.name} em nova aba`}>{content}</a> : <div className="site-pending">{content}</div>}
    </article>
  );
}
