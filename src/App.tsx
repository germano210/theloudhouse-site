import { useState } from 'react';
import { TeethShowcase } from './components/TeethShowcase';
import { SiteCard } from './components/SiteCard';
import { getSiteUrl, sites } from './data/sites';

export function App() {
  const [activeSite, setActiveSite] = useState<string | null>(null);

  return (
    <>
      <a className="skip-link" href="#projetos">Pular para os projetos</a>
      <div className="page-shell">
        <header className="header">
          <a className="wordmark" href="#inicio" aria-label="Loudhouse, início">loudhouse<span aria-hidden="true">✳</span></a>
          <span className="header-note">INDEPENDENTES POR NATUREZA.</span>
          <a className="nav-link" href="#projetos">Nossos projetos <span aria-hidden="true">↗</span></a>
        </header>
        <main id="inicio">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow hero-kicker"><span className="status-dot" /> BEM-VINDO À NOSSA CASA</p>
              <h1 id="hero-title">Boas ideias.<br />Sites com<br /><span>personalidade.</span></h1>
              <p className="hero-description">Uma casa para os sites que a gente cria.<br className="desktop-break" /> Explore os projetos. Encontre sua próxima referência.</p>
              <a className="primary-link" href="#projetos">Conheça os projetos <span aria-hidden="true">↘</span></a>
              <div className="hero-footnote"><span aria-hidden="true">( LH — 01 )</span><span>FEITO PARA SAIR DO ÓBVIO.</span></div>
            </div>
            <TeethShowcase sites={sites} activeSite={activeSite} onSelect={setActiveSite} />
          </section>
          <section id="projetos" className="projects" aria-labelledby="projects-title">
            <div className="section-heading">
              <div><p className="eyebrow">O QUE MORA POR AQUI</p><h2 id="projects-title">Projetos da casa<span className="project-count">{String(sites.length).padStart(2, '0')}</span></h2></div>
              <p>Uma seleção do nosso trabalho.<br /> Cada projeto, um universo.</p>
            </div>
            <div className="project-grid">{sites.map((site, index) => <SiteCard key={site.id} site={site} index={index} active={activeSite === site.id} onSelect={setActiveSite} />)}</div>
            {sites.some((site) => !getSiteUrl(site)) && <p className="pending-note">As prévias já estão por aqui. Os links serão adicionados em breve.</p>}
          </section>
        </main>
        <footer className="footer"><a className="wordmark" href="#inicio">loudhouse<span aria-hidden="true">✳</span></a><span>UMA CASA. MUITAS IDEIAS.</span><a className="back-top" href="#inicio">De volta ao topo ↑</a></footer>
      </div>
    </>
  );
}
