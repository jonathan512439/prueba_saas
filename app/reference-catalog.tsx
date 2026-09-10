'use client';

import { useMemo, useState } from 'react';
import type React from 'react';
import {
  ArrowLeft, CalendarDays, ChevronRight, CircleUserRound, Grid2X2, Heart,
  Home, MapPin, Menu, MessageCircle, Search, Share2, ShieldCheck, ShoppingCart,
  Star, X,
} from 'lucide-react';
import type { PilotCatalog, Product, Rubro } from './catalog-data';

type CartLine = { rubroId: string; productId: string; name: string; price: number; qty: number; variant: string };
type Theme = {
  darkHeader: boolean;
  headline: string;
  copy: string;
  cta: string;
  section: string;
  nav: string[];
  categoryIcons: string[];
  feature: string;
};

const themes: Record<string, Theme> = {
  calzado: {
    darkHeader: true,
    headline: 'ESTILO QUE CAMINA CONTIGO',
    copy: 'Comodidad, diseño y actitud en cada paso.',
    cta: 'Ver colección',
    section: 'Más vendidos',
    nav: ['Inicio', 'Categorías', 'Ofertas', 'Pedidos', 'Perfil'],
    categoryIcons: ['👟', '👞', '🥾', '🩴', '👠', '🧦'],
    feature: 'Guía de tallas y stock real por variante',
  },
  canchas: {
    darkHeader: true,
    headline: 'EL LUGAR IDEAL PARA TU PASIÓN',
    copy: 'Canchas de calidad, reservas al instante y la mejor experiencia.',
    cta: 'Reservar ahora',
    section: 'Canchas destacadas',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['⚽', '🥅', '🏀', '🏐', '🎾', '🏆'],
    feature: 'Horarios disponibles en tiempo real',
  },
  dental: {
    darkHeader: false,
    headline: 'Una sonrisa más saludable para ti',
    copy: 'Cuidamos tu salud bucal con profesionales especializados.',
    cta: 'Ver servicios',
    section: 'Servicios destacados',
    nav: ['Inicio', 'Servicios', 'Citas', 'Favoritos', 'Perfil'],
    categoryIcons: ['🦷', '⚙️', '😁', '✨', '🩺', '📅'],
    feature: 'Profesionales y agenda por fecha y hora',
  },
  ferreteria: {
    darkHeader: false,
    headline: 'HERRAMIENTAS PARA GRANDES PROYECTOS',
    copy: 'Calidad, resistencia y confianza para cada trabajo.',
    cta: 'Ver catálogo',
    section: 'Productos destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Pedidos', 'Perfil'],
    categoryIcons: ['🧰', '🧱', '🚰', '💡', '🦺', '🔩'],
    feature: 'Ficha técnica, stock y cotización rápida',
  },
};

const go = (path = '') => { window.location.hash = path ? '#/' + path : '#/'; };
const money = (value: number) => 'Bs ' + value.toLocaleString('es-BO');

export function ReferenceCatalog({ rubro, catalog, productId, favorites, cart, onFavorite, onAdd, notify }: {
  rubro: Rubro;
  catalog: PilotCatalog;
  productId?: string;
  favorites: string[];
  cart: CartLine[];
  onFavorite: (rubroId: string, productId: string) => void;
  onAdd: (line: CartLine) => void;
  notify: (message: string) => void;
}) {
  const theme = themes[rubro.id] ?? themes.calzado;
  const active = catalog.products.find((product) => product.id === productId);
  if (active) {
    return <ReferenceDetail rubro={rubro} product={active} theme={theme} favorite={favorites.includes(rubro.id + ':' + active.id)} onFavorite={onFavorite} onAdd={onAdd} notify={notify} />;
  }
  return <ReferenceHome rubro={rubro} catalog={catalog} theme={theme} favorites={favorites} cart={cart} onFavorite={onFavorite} notify={notify} />;
}

function ReferenceHome({ rubro, catalog, theme, favorites, cart, onFavorite, notify }: {
  rubro: Rubro;
  catalog: PilotCatalog;
  theme: Theme;
  favorites: string[];
  cart: CartLine[];
  onFavorite: (rubroId: string, productId: string) => void;
  notify: (message: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(catalog.categories[1] ?? catalog.categories[0]);
  const products = useMemo(
    () => catalog.products.filter((product) => (product.name + ' ' + product.subtitle).toLowerCase().includes(query.toLowerCase())),
    [catalog.products, query],
  );
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  return <main className={'reference-stage reference-' + rubro.id} style={{ '--ref': rubro.color, '--ref-accent': rubro.accent } as React.CSSProperties}>
    <section className="reference-phone">
      <header className={'reference-header ' + (theme.darkHeader ? 'is-dark' : '')}>
        <div className="reference-brand-row">
          <button onClick={() => notify('Menú disponible')} aria-label="Abrir menú"><Menu /></button>
          <button className="reference-brand" onClick={() => go('rubro/' + rubro.id)}>
            <span>{rubro.icon}</span><strong>{rubro.brand}<small>{rubro.tagline}</small></strong>
          </button>
          <button className="reference-cart" onClick={() => go('carrito')} aria-label={'Abrir pedido con ' + cartCount + ' productos'}><ShoppingCart />{cartCount > 0 && <b>{cartCount}</b>}</button>
        </div>
        <label className="reference-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={'Buscar en ' + rubro.brand + '...'} />{query && <button onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X /></button>}</label>
      </header>

      <div className="reference-categories" aria-label="Categorías">
        {catalog.categories.slice(1, 7).map((item, index) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}><span>{theme.categoryIcons[index] ?? '●'}</span><b>{item}</b></button>)}
      </div>

      <section className="reference-hero">
        <img src={catalog.hero} alt="" />
        <div />
        <article><h1>{theme.headline}</h1><p>{theme.copy}</p><button onClick={() => document.getElementById('productos-' + rubro.id)?.scrollIntoView({ behavior: 'smooth' })}>{theme.cta} <ChevronRight /></button></article>
      </section>

      <section className="reference-products" id={'productos-' + rubro.id}>
        <div className="reference-section-title"><h2>{query ? 'Resultados para “' + query + '”' : theme.section}</h2><button onClick={() => setQuery('')}>Ver todo <ChevronRight /></button></div>
        {products.length ? <div className="reference-product-grid">{products.slice(0, 4).map((product) => <article key={product.id}>
          <button className="reference-product-image" onClick={() => go('catalogo/' + rubro.id + '/item/' + product.id)}><img src={product.image} alt={product.name} />{product.badge && <span>{product.badge}</span>}</button>
          <button className={'reference-heart ' + (favorites.includes(rubro.id + ':' + product.id) ? 'active' : '')} onClick={() => onFavorite(rubro.id, product.id)} aria-label="Guardar en favoritos"><Heart fill="currentColor" /></button>
          <button className="reference-product-copy" onClick={() => go('catalogo/' + rubro.id + '/item/' + product.id)}><b>{product.name}</b><small>{product.subtitle}</small><strong>{money(product.price)}</strong></button>
          <button className="reference-mini-cart" onClick={() => go('catalogo/' + rubro.id + '/item/' + product.id)} aria-label={'Ver ' + product.name}><ShoppingCart /></button>
        </article>)}</div> : <div className="reference-empty"><Search /><b>No encontramos resultados</b><button onClick={() => setQuery('')}>Limpiar búsqueda</button></div>}
        <button className="reference-feature" onClick={() => notify(theme.feature)}><ShieldCheck /><span><b>{theme.feature}</b><small>Información clara antes de elegir</small></span><ChevronRight /></button>
      </section>

      <ReferenceNav theme={theme} rubro={rubro} />
    </section>
  </main>;
}

function ReferenceDetail({ rubro, product, favorite, onFavorite, onAdd, notify }: {
  rubro: Rubro;
  product: Product;
  theme: Theme;
  favorite: boolean;
  onFavorite: (rubroId: string, productId: string) => void;
  onAdd: (line: CartLine) => void;
  notify: (message: string) => void;
}) {
  const [variant, setVariant] = useState(product.variants?.[0] ?? 'Estándar');
  const [qty, setQty] = useState(1);
  const isSchedule = rubro.id === 'dental' || rubro.id === 'canchas';
  const contactLabel = rubro.id === 'dental' ? 'Agendar por WhatsApp' : rubro.id === 'canchas' ? 'Reservar por WhatsApp' : 'Consultar por WhatsApp';
  const contact = () => window.open('https://wa.me/59170000000?text=' + encodeURIComponent('Hola ' + rubro.brand + ', me interesa ' + product.name + ', opción ' + variant + '.'), '_blank', 'noopener,noreferrer');
  const share = async () => {
    if (navigator.share) await navigator.share({ title: product.name, url: window.location.href });
    else { await navigator.clipboard.writeText(window.location.href); notify('Enlace copiado'); }
  };

  return <main className={'reference-stage reference-' + rubro.id} style={{ '--ref': rubro.color, '--ref-accent': rubro.accent } as React.CSSProperties}>
    <section className="reference-phone reference-detail">
      <header className="reference-detail-bar">
        <button onClick={() => go('catalogo/' + rubro.id)} aria-label="Volver"><ArrowLeft /></button>
        <b>Detalle {isSchedule ? (rubro.id === 'dental' ? 'del servicio' : 'de la reserva') : 'del producto'}</b>
        <span>
          <button onClick={() => onFavorite(rubro.id, product.id)} aria-label="Favorito"><Heart fill={favorite ? 'currentColor' : 'none'} /></button>
          <button onClick={share} aria-label="Compartir"><Share2 /></button>
        </span>
      </header>

      <section className="reference-detail-media">
        <img src={product.image} alt={product.name} />
        <div className="reference-thumbnails">{[0, 1, 2].map((item) => <button key={item} aria-label={'Mostrar vista ' + (item + 1)} className={item === 0 ? 'active' : ''} onClick={() => notify('Vista ' + (item + 1))}><img src={product.image} alt="" /></button>)}</div>
      </section>

      <section className="reference-detail-copy">
        <div className="reference-detail-heading"><div><h1>{product.name}</h1><p>{product.subtitle}</p></div><strong>{money(product.price)}</strong></div>
        <div className="reference-meta"><span><Star fill="currentColor" /> {product.rating} <small>(128 reseñas)</small></span><b>● {product.stock}</b></div>
        <p>Información clara y detallada para que elijas con confianza. Confirma disponibilidad antes de finalizar.</p>

        {isSchedule && <div className="reference-location"><MapPin /><b>{rubro.id === 'dental' ? 'Sede Calacoto, La Paz' : 'Zona Sur, La Paz'}</b><button onClick={() => window.open('https://maps.google.com', '_blank', 'noopener,noreferrer')}>Ver mapa</button></div>}

        {isSchedule && <div className="reference-date"><b>Selecciona una fecha</b><div>{['Lun 15', 'Mar 16', 'Mié 17', 'Jue 18', 'Vie 19'].map((day, index) => <button key={day} className={index === 2 ? 'active' : ''} onClick={() => notify(day)}><CalendarDays />{day}</button>)}</div></div>}

        <div className="reference-options">
          <b>{isSchedule ? 'Horarios disponibles' : (rubro.id === 'calzado' ? 'Selecciona una talla' : 'Selecciona una opción')}</b>
          <div>{product.variants?.map((item) => <button key={item} className={variant === item ? 'active' : ''} onClick={() => setVariant(item)}>{item}</button>)}</div>
        </div>

        <div className="reference-specs">{product.attributes.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div>

        {!isSchedule && <div className="reference-quantity"><span>Cantidad</span><div><button onClick={() => setQty((current) => Math.max(1, current - 1))}>−</button><b>{qty}</b><button onClick={() => setQty((current) => current + 1)}>+</button></div></div>}
      </section>

      <footer className="reference-detail-actions">
        <button className="reference-primary" onClick={() => {
          if (isSchedule) contact();
          else onAdd({ rubroId: rubro.id, productId: product.id, name: product.name, price: product.price, qty, variant });
        }}>{isSchedule ? contactLabel : <><ShoppingCart /> Agregar al carrito</>}</button>
        {!isSchedule && <button className="reference-whatsapp" onClick={contact}><MessageCircle /> {contactLabel}</button>}
      </footer>
    </section>
  </main>;
}

function ReferenceNav({ theme, rubro }: { theme: Theme; rubro: Rubro }) {
  const icons = [Home, Grid2X2, Search, Heart, CircleUserRound];
  return <nav className="reference-nav" aria-label="Navegación del catálogo">
    {theme.nav.map((item, index) => {
      const Icon = icons[index];
      return <button key={item} className={index === 0 ? 'active' : ''} onClick={() => {
        if (index === 0) go('catalogo/' + rubro.id);
        else if (index === 3) go('favoritos');
        else if (index === 4) go('perfil');
        else document.getElementById('productos-' + rubro.id)?.scrollIntoView({ behavior: 'smooth' });
      }}><Icon /><span>{item}</span></button>;
    })}
  </nav>;
}
