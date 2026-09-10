'use client';

import { useMemo, useState } from 'react';
import type React from 'react';
import {
  ArrowLeft, CalendarDays, ChevronRight, CircleUserRound, Grid2X2, Heart,
  Home, MapPin, Menu, MessageCircle, Search, Share2, ShieldCheck, ShoppingCart,
  Star, X,
} from 'lucide-react';
import type { PilotCatalog, Product, Rubro } from './catalog-data';
import { MapsReviewButton } from './maps-review-button';

type CartLine = { rubroId: string; productId: string; name: string; price: number; qty: number; variant: string };
type CatalogMode = 'commerce' | 'appointment' | 'request' | 'parking';
type Theme = {
  darkHeader: boolean;
  mode: CatalogMode;
  headline: string;
  copy: string;
  cta: string;
  section: string;
  nav: string[];
  categoryIcons: string[];
  feature: string;
  optionLabel?: string;
  primaryLabel?: string;
  contactLabel?: string;
  location?: string;
  categoryFirst?: boolean;
};

const themes: Record<string, Theme> = {
  calzado: {
    darkHeader: true,
    mode: 'commerce',
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
    mode: 'appointment',
    headline: 'EL LUGAR IDEAL PARA TU PASIÓN',
    copy: 'Canchas de calidad, reservas al instante y la mejor experiencia.',
    cta: 'Reservar ahora',
    section: 'Canchas destacadas',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['⚽', '🥅', '🏀', '🏐', '🎾', '🏆'],
    feature: 'Horarios disponibles en tiempo real',
    optionLabel: 'Horarios disponibles', primaryLabel: 'Reservar por WhatsApp', location: 'Zona Sur, La Paz',
  },
  dental: {
    darkHeader: false,
    mode: 'appointment',
    headline: 'Una sonrisa más saludable para ti',
    copy: 'Cuidamos tu salud bucal con profesionales especializados.',
    cta: 'Ver servicios',
    section: 'Servicios destacados',
    nav: ['Inicio', 'Servicios', 'Citas', 'Favoritos', 'Perfil'],
    categoryIcons: ['🦷', '⚙️', '😁', '✨', '🩺', '📅'],
    feature: 'Profesionales y agenda por fecha y hora',
    optionLabel: 'Horarios disponibles', primaryLabel: 'Agendar por WhatsApp', location: 'Sede Calacoto, La Paz',
  },
  ferreteria: {
    darkHeader: false,
    mode: 'commerce',
    headline: 'HERRAMIENTAS PARA GRANDES PROYECTOS',
    copy: 'Calidad, resistencia y confianza para cada trabajo.',
    cta: 'Ver catálogo',
    section: 'Productos destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Pedidos', 'Perfil'],
    categoryIcons: ['🧰', '🧱', '🚰', '💡', '🦺', '🔩'],
    feature: 'Ficha técnica, stock y cotización rápida',
    contactLabel: 'Cotizar por WhatsApp',
  },
  veterinaria: {
    darkHeader: true, mode: 'request',
    headline: 'ATENCIÓN CONFIABLE PARA TU MASCOTA',
    copy: 'Productos, vacunas y servicios con orientación veterinaria.',
    cta: 'Ver cuidados', section: 'Productos destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🩺', '💉', '🥣', '💊', '🛡️', '🦴'],
    feature: 'Agenda rápida y asesoría veterinaria',
    optionLabel: 'Presentación o atención', primaryLabel: 'Consultar o reservar por WhatsApp', location: 'Clínica Zona Sur, La Paz', categoryFirst: true,
  },
  licoreria: {
    darkHeader: true, mode: 'commerce',
    headline: 'BRINDA SIN LÍMITES',
    copy: 'Las mejores bebidas para cada ocasión.',
    cta: 'Ver ofertas', section: 'Selección destacada',
    nav: ['Inicio', 'Categorías', 'Ofertas', 'Pedidos', 'Perfil'],
    categoryIcons: ['🍺', '🍷', '🥃', '🍹', '🍸', '🧊'],
    feature: 'Venta responsable exclusiva para mayores de 18 años',
    optionLabel: 'Selecciona una presentación', contactLabel: 'Pedir por WhatsApp',
  },
  'servicios-hogar': {
    darkHeader: true, mode: 'request',
    headline: 'TU HOGAR EN BUENAS MANOS',
    copy: 'Profesionales verificados para cada necesidad.',
    cta: 'Ver servicios', section: 'Servicios destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Pedidos', 'Perfil'],
    categoryIcons: ['🧹', '🔧', '⚡', '🛠️', '⚙️', '🌿'],
    feature: 'Personal verificado, atención a domicilio y garantía',
    optionLabel: 'Modalidad o disponibilidad', primaryLabel: 'Solicitar por WhatsApp', location: 'La Paz y zonas cercanas', categoryFirst: true,
  },
  computacion: {
    darkHeader: true, mode: 'commerce',
    headline: 'EQUIPOS QUE IMPULSAN TUS IDEAS',
    copy: 'Laptops, PCs, accesorios y soporte técnico.',
    cta: 'Ver productos', section: 'Más vendidos',
    nav: ['Inicio', 'Categorías', 'Ofertas', 'Pedidos', 'Perfil'],
    categoryIcons: ['💻', '🖥️', '🧩', '🖥', '🖱️', '🛠️'],
    feature: 'Ficha técnica completa, garantía y soporte',
    optionLabel: 'Selecciona una configuración', contactLabel: 'Cotizar por WhatsApp',
  },
  seguridad: {
    darkHeader: true, mode: 'commerce',
    headline: 'PROTEGE LO QUE MÁS TE IMPORTA',
    copy: 'Cámaras, alarmas y soluciones para hogar y negocio.',
    cta: 'Ver catálogo', section: 'Productos destacados',
    nav: ['Inicio', 'Categorías', 'Ofertas', 'Pedidos', 'Perfil'],
    categoryIcons: ['📹', '🎥', '🚨', '📟', '💾', '🔌'],
    feature: 'Soporte técnico, instalación y garantía',
    optionLabel: 'Selecciona una versión', contactLabel: 'Cotizar por WhatsApp',
  },
  carpinteria: {
    darkHeader: true, mode: 'request',
    headline: 'FABRICAMOS IDEAS QUE DURAN',
    copy: 'Carpintería y metalurgia a tu medida.',
    cta: 'Ver colecciones', section: 'Trabajos destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🪑', '🚪', '🗄️', '🍽️', '🏗️', '📐'],
    feature: 'Diseño a medida, materiales y acabados personalizados',
    optionLabel: 'Acabado o material', primaryLabel: 'Pedir o cotizar por WhatsApp', categoryFirst: true,
  },
  estacionamientos: {
    darkHeader: true, mode: 'parking',
    headline: 'TU VEHÍCULO EN BUENAS MANOS',
    copy: 'Espacios seguros, accesibles y siempre cerca.',
    cta: 'Ver ubicaciones', section: 'Estacionamientos destacados',
    nav: ['Inicio', 'Ubicaciones', 'Buscar', 'Mis reservas', 'Perfil'],
    categoryIcons: ['🚗', '🏍️', '🚲', '🚚', '🏢', '🕐'],
    feature: 'Vigilancia 24 horas, ubicación y disponibilidad real',
    optionLabel: 'Tiempo de reserva', primaryLabel: 'Reservar este espacio', location: 'Ubicación verificada en el mapa', categoryFirst: true,
  },
  consultoria: {
    darkHeader: true, mode: 'request',
    headline: 'IDEAS · ESTRATEGIAS · RESULTADOS',
    copy: 'Servicios profesionales para un futuro mejor.',
    cta: 'Ver servicios', section: 'Servicios destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['📈', '💰', '📣', '👥', '💻', '⚖️'],
    feature: 'Consultores verificados y asesoría personalizada',
    optionLabel: 'Modalidad del servicio', primaryLabel: 'Solicitar servicio por WhatsApp', location: 'Atención en todo el país', categoryFirst: true,
  },
};

const secondaryPromos: Record<string, { eyebrow: string; title: string; copy: string; cta: string }> = {
  calzado: { eyebrow: 'Colección destacada', title: 'RENUEVA TU ESTILO', copy: 'Modelos seleccionados para completar cada look.', cta: 'Ver colección' },
  canchas: { eyebrow: 'Reserva rápida', title: 'TU PRÓXIMO PARTIDO EMPIEZA AQUÍ', copy: 'Elige horario y reserva sin complicaciones.', cta: 'Reservar ahora' },
  dental: { eyebrow: 'Atención profesional', title: 'CUIDA TU SONRISA HOY', copy: 'Agenda una valoración y recibe un plan personalizado.', cta: 'Agendar cita' },
  ferreteria: { eyebrow: 'Asesoría especializada', title: 'TODO PARA TU PRÓXIMO PROYECTO', copy: 'Herramientas y materiales para convertir tus ideas en resultados.', cta: 'Solicitar cotización' },
  veterinaria: { eyebrow: 'Cuidado recomendado', title: 'BAÑO Y PELUQUERÍA', copy: 'Cuidado profesional para una mascota sana y feliz.', cta: 'Ver servicio' },
  licoreria: { eyebrow: 'Selección especial', title: 'COMBOS PARA CELEBRAR', copy: 'Bebidas seleccionadas y entrega rápida para tu ocasión.', cta: 'Ver ofertas' },
  'servicios-hogar': { eyebrow: 'Servicio destacado', title: 'PEQUEÑAS SOLUCIONES, GRANDES CAMBIOS', copy: 'Mantenimiento y reparaciones en una sola visita.', cta: 'Solicitar servicio' },
  computacion: { eyebrow: 'Soporte especializado', title: 'SERVICIO TÉCNICO CONFIABLE', copy: 'Diagnóstico, mantenimiento y soporte para tus equipos.', cta: 'Solicitar soporte' },
  seguridad: { eyebrow: 'Protección completa', title: 'INSTALACIÓN QUE TE DA TRANQUILIDAD', copy: 'Cotiza equipos, configuración y soporte técnico.', cta: 'Cotizar instalación' },
  carpinteria: { eyebrow: 'Diseño a medida', title: 'PROYECTOS QUE TRANSFORMAN TU ESPACIO', copy: 'Diseñamos y fabricamos tus ideas a medida.', cta: 'Solicitar cotización' },
  estacionamientos: { eyebrow: 'Acceso inmediato', title: 'PARKING SIN COMPLICACIONES', copy: 'Reserva tu espacio y llega sin estrés.', cta: 'Reservar ahora' },
  consultoria: { eyebrow: 'Asesoría estratégica', title: 'IMPULSA TU PRÓXIMO GRAN PASO', copy: 'Agenda una conversación con un especialista.', cta: 'Solicitar asesoría' },
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
  const promo = secondaryPromos[rubro.id] ?? secondaryPromos.calzado;
  const promoProduct = catalog.products[1] ?? catalog.products[0];

  return <main className={'reference-stage reference-' + rubro.id} style={{ '--ref': rubro.color, '--ref-accent': rubro.accent } as React.CSSProperties}>
    <section className={'reference-phone ' + (theme.categoryFirst ? 'categories-first' : '')}>
      <header className={'reference-header ' + (theme.darkHeader ? 'is-dark' : '')}>
        <div className="reference-brand-row">
          <button onClick={() => notify('Menú disponible')} aria-label="Abrir menú"><Menu /></button>
          <button className="reference-brand" onClick={() => go('rubro/' + rubro.id)}>
            <span>{rubro.icon}</span><strong>{rubro.brand}<small>{rubro.tagline}</small></strong>
          </button>
          <button className="reference-cart" onClick={() => go('carrito')} aria-label={'Abrir pedido con ' + cartCount + ' productos'}><ShoppingCart />{cartCount > 0 && <b>{cartCount}</b>}</button>
        </div>
        <MapsReviewButton brand={rubro.brand} notify={notify} header />
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
        <section className="reference-secondary-banner" aria-label={promo.title}>
          <img src={promoProduct?.image ?? catalog.hero} alt="" />
          <div className="reference-secondary-shade" />
          <article><span>{promo.eyebrow}</span><h3>{promo.title}</h3><p>{promo.copy}</p><button onClick={() => promoProduct && go('catalogo/' + rubro.id + '/item/' + promoProduct.id)}>{promo.cta} <ChevronRight /></button></article>
        </section>
        <button className="reference-feature" onClick={() => notify(theme.feature)}><ShieldCheck /><span><b>{theme.feature}</b><small>Información clara antes de elegir</small></span><ChevronRight /></button>
      </section>

      <ReferenceNav theme={theme} rubro={rubro} />
    </section>
  </main>;
}

function ReferenceDetail({ rubro, product, theme, favorite, onFavorite, onAdd, notify }: {
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
  const isCommerce = theme.mode === 'commerce';
  const showDate = theme.mode === 'appointment' || theme.mode === 'parking';
  const detailNoun = theme.mode === 'parking' ? 'del estacionamiento' : theme.mode === 'commerce' ? 'del producto' : 'del servicio';
  const contactLabel = theme.contactLabel ?? theme.primaryLabel ?? 'Consultar por WhatsApp';
  const contact = () => window.open('https://wa.me/59170000000?text=' + encodeURIComponent('Hola ' + rubro.brand + ', me interesa ' + product.name + ', opción ' + variant + '.'), '_blank', 'noopener,noreferrer');
  const share = async () => {
    if (navigator.share) await navigator.share({ title: product.name, url: window.location.href });
    else { await navigator.clipboard.writeText(window.location.href); notify('Enlace copiado'); }
  };

  return <main className={'reference-stage reference-' + rubro.id} style={{ '--ref': rubro.color, '--ref-accent': rubro.accent } as React.CSSProperties}>
    <section className="reference-phone reference-detail">
      <header className="reference-detail-bar">
        <button onClick={() => go('catalogo/' + rubro.id)} aria-label="Volver"><ArrowLeft /></button>
        <b>Detalle {detailNoun}</b>
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

        {theme.location && <div className="reference-location"><MapPin /><b>{theme.location}</b><button onClick={() => window.open('https://maps.google.com', '_blank', 'noopener,noreferrer')}>Ver mapa</button></div>}

        {showDate && <div className="reference-date"><b>Selecciona una fecha</b><div>{['Lun 15', 'Mar 16', 'Mié 17', 'Jue 18', 'Vie 19'].map((day, index) => <button key={day} className={index === 2 ? 'active' : ''} onClick={() => notify(day)}><CalendarDays />{day}</button>)}</div></div>}

        <div className="reference-options">
          <b>{theme.optionLabel ?? (rubro.id === 'calzado' ? 'Selecciona una talla' : 'Selecciona una opción')}</b>
          <div>{product.variants?.map((item) => <button key={item} className={variant === item ? 'active' : ''} onClick={() => setVariant(item)}>{item}</button>)}</div>
        </div>

        <div className="reference-specs">{product.attributes.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div>

        {isCommerce && <div className="reference-quantity"><span>Cantidad</span><div><button onClick={() => setQty((current) => Math.max(1, current - 1))}>−</button><b>{qty}</b><button onClick={() => setQty((current) => current + 1)}>+</button></div></div>}
      </section>

      <footer className="reference-detail-actions">
        <button className="reference-primary" onClick={() => {
          if (!isCommerce) contact();
          else onAdd({ rubroId: rubro.id, productId: product.id, name: product.name, price: product.price, qty, variant });
        }}>{isCommerce ? <><ShoppingCart /> Agregar al carrito</> : contactLabel}</button>
        {isCommerce && <button className="reference-whatsapp" onClick={contact}><MessageCircle /> {contactLabel}</button>}
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
