import { useEffect, useState, type ReactNode } from 'react';
import { ArrowUpRight, ArrowLeft, Phone, Mail } from 'lucide-react';
import { Header, Logo } from './components';
import { services } from './data';
import { solutionContent, serviceRegulations, serviceSlug } from './solutionContent';

export function SolutionRouter({ home }: { home: ReactNode }) {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  const slug = hash.split('/')[2];
  const index = solutionContent.findIndex(s => s.slug === slug);
  const itemIndex = index >= 0 ? services[index].items.findIndex(item => serviceSlug(item) === hash.split('/')[3]) : -1;
  const detail = hash.startsWith('#/soluciones/') && index >= 0;
  useEffect(() => {
    document.title = detail ? `${itemIndex >= 0 ? services[index].items[itemIndex].replace(/\.$/, "") : services[index].title} | ApaRuc` : 'APARUC | Asesoría y capacitación marítima';
    const timer = window.setTimeout(() => {
      if (detail && hash.endsWith('/contacto')) document.getElementById('contacto')?.scrollIntoView();
      else if (detail) window.scrollTo(0, 0);
      else if (hash && !hash.startsWith('#/')) document.getElementById(hash.slice(1))?.scrollIntoView();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [hash, detail, index, itemIndex]);
  return detail ? <SolutionPage key={`${slug}/${itemIndex}`} index={index} itemIndex={itemIndex} /> : home;
}

function SolutionPage({ index, itemIndex }: { index: number; itemIndex: number }) {
  const solution = solutionContent[index];
  const service = services[index];
  const individual = itemIndex >= 0;
  const title = individual ? service.items[itemIndex].replace(/\.$/, '') : service.title;
  const pageHref = `#/soluciones/${solution.slug}${individual ? '/' + serviceSlug(title) : ''}`;
  const regulations = individual ? serviceRegulations[index][itemIndex].map(i => solution.regulations[i]) : solution.regulations;
  const selected = title;
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const contactText = `Hola ApaRuc, ${name.trim() ? `soy ${name.trim()}. ` : ''}Me interesa ${selected}. ${message.trim()}`.trim();
  const consult = (item: string) => {
    if (item !== title) {
      window.location.hash = `#/soluciones/${solution.slug}/${serviceSlug(item)}/contacto`;
      return;
    }
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('servicio-consultado')?.focus({ preventScroll: true });
  };
  return <>
    <a className="skip-link" href="#contenido-solucion" onClick={e => { e.preventDefault(); document.getElementById("contenido-solucion")?.focus(); }}>Saltar al contenido</a>
    <Header contactHref={`${pageHref}/contacto`} />
    <main id="contenido-solucion" tabIndex={-1} className="solution-page">
      <section className="solution-hero">
        <div className="container">
          <a className="text-link" href="#servicios"><ArrowLeft size={18} />Todas las soluciones</a>
          <p className="eyebrow"><span />SOLUCIÓN {String(index + 1).padStart(2, '0')} / 06</p>
          <service.icon size={38} strokeWidth={1.4} />
          <h1>{title}</h1>
          <p>{individual ? solution.details[itemIndex] : solution.description}</p>
          <button className="button" onClick={() => consult(title)}>{individual ? "Consultar este servicio" : "Consultar por esta solución"}<ArrowUpRight size={18} /></button>
        </div>
      </section>
      {!individual && <section className="section">
        <div className="container">
          <h2>Servicios para tu operación</h2>
          <div className="solution-service-grid">
            {service.items.map((item, i) => <article className="solution-service" key={item}>
              <h3><a href={`#/soluciones/${solution.slug}/${serviceSlug(item)}`}>{item.replace(/\.$/, '')}<ArrowUpRight size={18}/></a></h3>
              <p>{solution.details[i]}</p><a className="text-link" href={`#/soluciones/${solution.slug}/${serviceSlug(item)}`}>Ver información del servicio<ArrowUpRight size={16}/></a>
              <button className="text-link" onClick={() => consult(item.replace(/\.$/, ''))}>Consultar este servicio<ArrowUpRight size={16} /></button>
            </article>)}
          </div>
        </div>
      </section>}
      <section className="section solution-regulations" aria-labelledby="respaldo-titulo">
        <div className="container">
          <p className="eyebrow"><span />SEGURIDAD Y CUMPLIMIENTO</p>
          <h2 id="respaldo-titulo">Respaldo normativo</h2>
          <div className="solution-service-grid">
            {regulations.map(([title, text]) => <article className="regulation" key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>
      <section id="contacto" className="section solution-contact">
        <div className="container solution-contact-grid">
          <div>
            <p className="eyebrow"><span />CONVERSEMOS SOBRE TU OPERACIÓN</p>
            <h2>Consulta a ApaRuc</h2>
            <p>Cuéntanos qué necesitas para coordinar la asesoría de tu operación marítima.</p>
            <div className="contact-links">
              <a href="tel:+56991370267"><Phone size={22}/><span><small>LLÁMANOS</small>+56 9 9137 0267</span></a>
              <a href={`mailto:m.apablaza@aparuc.cl?subject=${encodeURIComponent(`Consulta: ${selected}`)}&body=${encodeURIComponent(contactText)}`}><Mail size={22}/><span><small>ESCRÍBENOS</small>m.apablaza@aparuc.cl</span></a>
            </div>
            <p>Puerto Aysén · Patagonia Chilena</p>
          </div>
          <form className="solution-form" onSubmit={event => {
            event.preventDefault();
            window.open(`https://wa.me/56991370267?text=${encodeURIComponent(contactText)}`, '_blank', 'noopener,noreferrer');
          }}>
            <label htmlFor="servicio-consultado">Servicio de interés</label>
            <input id="servicio-consultado" name="servicio" value={selected} readOnly />
            <label htmlFor="consulta-nombre">Tu nombre</label>
            <input id="consulta-nombre" autoComplete="name" value={name} onChange={e => setName(e.target.value)} maxLength={120}/>
            <label htmlFor="consulta-mensaje">¿Qué necesita tu operación?</label>
            <textarea id="consulta-mensaje" rows={4} value={message} onChange={e => setMessage(e.target.value)} maxLength={3000}/>
            <button className="button" type="submit">Continuar por WhatsApp<ArrowUpRight size={18}/></button>
            <p className="contact-channel-note">Tu consulta se abrirá en WhatsApp para que puedas enviarla.</p>
          </form>
        </div>
      </section>
      <nav className="container solution-navigation" aria-label="Otras soluciones marítimas">
        <h2>Otras soluciones marítimas</h2>
        {solutionContent.map((s, i) => i !== index && <a className="text-link" href={`#/soluciones/${s.slug}`} key={s.slug}>{services[i].title}<ArrowUpRight size={16}/></a>)}
      </nav>
    </main>
    <footer><div className="container"><Logo/><p>Puerto Aysén · Patagonia Chilena</p><a href="tel:+56991370267">+56 9 9137 0267</a><p>© {new Date().getFullYear()} ApaRuc</p></div></footer>
  </>;
}
