'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type React from 'react';
import Image from 'next/image';
import {
  ArrowLeft, ArrowRight, BadgeCheck, Check, ChevronRight, Clock3, ExternalLink,
  Grid2X2, Heart, Home, MapPin, Menu, MessageCircle, Minus, PackageCheck, Plus,
  Search, Share2, ShoppingBag, SlidersHorizontal, Sparkles, Star, Store, UserRound, X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { families, getCatalog, rubros, type Product, type Rubro } from './catalog-data';
import { ReferenceCatalog } from './reference-catalog';
import { MapsReviewButton } from './maps-review-button';

type CartLine = { rubroId: string; productId: string; name: string; price: number; qty: number; variant: string };
type Route = { name: 'portal' | 'rubro' | 'catalogo' | 'favoritos' | 'carrito' | 'perfil'; rubroId?: string; productId?: string };
const storageKeys = { favorites: 'catalogos:favorites', cart: 'catalogos:cart' };

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try { return JSON.parse(localStorage.getItem(key) || '') as T; } catch { return fallback; }
}

function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'rubro' && parts[1]) return { name: 'rubro', rubroId: parts[1] };
  if (parts[0] === 'catalogo' && parts[1]) return { name: 'catalogo', rubroId: parts[1], productId: parts[3] };
  if (parts[0] === 'favoritos') return { name: 'favoritos' };
  if (parts[0] === 'carrito') return { name: 'carrito' };
  if (parts[0] === 'perfil') return { name: 'perfil' };
  return { name: 'portal' };
}

function money(value: number) { return `Bs ${value.toLocaleString('es-BO')}`; }
function go(path = '') { window.location.hash = path ? `#/${path}` : '#/'; }

export default function HomePage() {
  const [route, setRoute] = useState<Route>({ name: 'portal' });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const sync = () => setRoute(parseHash(window.location.hash));
    queueMicrotask(() => {
      sync();
      setFavorites(readStorage(storageKeys.favorites, []));
      setCart(readStorage(storageKeys.cart, []));
    });
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  useEffect(() => { localStorage.setItem(storageKeys.favorites, JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem(storageKeys.cart, JSON.stringify(cart)); }, [cart]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const activeRubro = rubros.find((r) => r.id === route.rubroId) || rubros[0];
  const favoriteProducts = useMemo(() => favorites.flatMap((key) => {
    const [rubroId, productId] = key.split(':');
    const rubro = rubros.find((r) => r.id === rubroId);
    const product = rubro && getCatalog(rubro).products.find((p) => p.id === productId);
    return rubro && product ? [{ rubro, product }] : [];
  }), [favorites]);

  const toggleFavorite = (rubroId: string, productId: string) => {
    const key = `${rubroId}:${productId}`;
    setFavorites((current) => current.includes(key) ? current.filter((id) => id !== key) : [...current, key]);
    setToast(favorites.includes(key) ? 'Eliminado de favoritos' : 'Guardado en favoritos');
  };
  const addToCart = (line: CartLine) => {
    setCart((current) => {
      const match = current.findIndex((item) => item.rubroId === line.rubroId && item.productId === line.productId && item.variant === line.variant);
      if (match < 0) return [...current, line];
      return current.map((item, index) => index === match ? { ...item, qty: item.qty + line.qty } : item);
    });
    setToast('Agregado correctamente');
  };

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'open_catalog',
      title: 'Abrir catálogo',
      description: 'Abre visualmente el catálogo correspondiente a un identificador de rubro válido.',
      inputSchema: {
        type: 'object',
        properties: { rubroId: { type: 'string' } },
        required: ['rubroId'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const rubroId = typeof input === 'object' && input !== null && 'rubroId' in input ? String(input.rubroId) : '';
        const rubro = rubros.find((item) => item.id === rubroId);
        if (!rubro) throw new Error('El rubro solicitado no existe.');
        go(`catalogo/${rubro.id}`);
        return { status: 'opened', rubroId: rubro.id, catalog: rubro.brand };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  return <div className="site-shell">
    {route.name === 'portal' && <Portal favorites={favorites.length} cart={cart.length} />}
    {route.name === 'rubro' && <RubroView rubro={activeRubro} cart={cart.length} />}
    {route.name === 'catalogo' && <CatalogView rubro={activeRubro} productId={route.productId} favorites={favorites} cart={cart} toggleFavorite={toggleFavorite} addToCart={addToCart} notify={setToast} />}
    {route.name === 'favoritos' && <SavedView title="Tus favoritos" description="Productos y servicios que guardaste para volver después." empty="Todavía no guardaste ningún favorito." count={cart.length}>{favoriteProducts.map(({ rubro, product }) => <ProductCard key={`${rubro.id}:${product.id}`} product={product} rubro={rubro} favorite onFavorite={toggleFavorite} />)}</SavedView>}
    {route.name === 'carrito' && <CartView cart={cart} setCart={setCart} notify={setToast} />}
    {route.name === 'perfil' && <ProfileView cartCount={cart.length} favoriteCount={favorites.length} />}
    {toast && <output className="toast"><Check size={17} /> {toast}</output>}
  </div>;
}

function GlobalHeader({ cart = 0 }: { cart?: number }) {
  return <header className="global-header">
    <button className="brand" onClick={() => go()} aria-label="Ir al directorio"><span className="brand-mark"><Store size={20} /></span><span><b>Catálogo</b><i>uno</i></span></button>
    <nav aria-label="Navegación principal"><button onClick={() => go()}>Rubros</button><button onClick={() => go('favoritos')}>Favoritos</button><button onClick={() => go('perfil')}>Mi espacio</button></nav>
    <button className="header-cart" onClick={() => go('carrito')} aria-label={`Abrir pedido con ${cart} productos`}><ShoppingBag size={19} /><span>Pedido</span>{cart > 0 && <em>{cart}</em>}</button>
  </header>;
}

function Portal({ favorites, cart }: { favorites: number; cart: number }) {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('Todos');
  const results = rubros.filter((r) => (family === 'Todos' || r.family === family) && `${r.name} ${r.brand} ${r.tagline}`.toLowerCase().includes(query.toLowerCase()));
  return <main className="portal">
    <GlobalHeader cart={cart} />
    <section className="portal-hero">
      <div className="portal-copy"><Badge className="portal-badge"><Sparkles size={13} /> 45 experiencias para explorar</Badge><h1>Un catálogo para cada forma de vender.</h1><p>Explora experiencias visuales creadas para comercios, servicios, reservas y negocios especializados.</p>
        <div className="portal-search"><Search size={21} /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca un rubro, negocio o servicio" aria-label="Buscar rubros" />{query && <button onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X size={17} /></button>}</div>
        <div className="portal-stats"><span><b>45</b> catálogos</span><span><b>8</b> experiencias</span><span><b>{favorites}</b> favoritos</span></div>
      </div>
      <div className="portal-mosaic" aria-label="Vista previa de catálogos">{[rubros[1], rubros[40], rubros[16]].map((rubro, index) => <button key={rubro.id} className={`mosaic-card mosaic-${index + 1}`} onClick={() => go(`rubro/${rubro.id}`)}><Image fill sizes="310px" src={rubro.ready ? getCatalog(rubro).hero : rubro.reference} alt="" /><span>{rubro.icon} {rubro.name}</span></button>)}</div>
    </section>
    <section className="directory" id="directorio"><div className="section-heading"><div><span className="eyebrow">Directorio</span><h2>Encuentra el catálogo que quieres ver</h2></div><span className="result-count">{results.length} resultados</span></div>
      <div className="family-tabs" aria-label="Filtrar por familia">{['Todos', ...families].map((item) => <button key={item} className={family === item ? 'active' : ''} onClick={() => setFamily(item)}>{item}</button>)}</div>
      {results.length ? <div className="rubro-grid">{results.map((rubro) => <RubroCard key={rubro.id} rubro={rubro} />)}</div> : <EmptyState action={() => { setQuery(''); setFamily('Todos'); }} />}
    </section>
    <footer className="portal-footer"><span>Catálogouno · demostración visual</span><button onClick={() => go('perfil')}>Acerca del proyecto <ArrowRight size={15} /></button></footer>
  </main>;
}

function RubroCard({ rubro }: { rubro: Rubro }) {
  return <article className="rubro-card" style={{ '--rubro': rubro.color, '--accent': rubro.accent } as React.CSSProperties}><button className="rubro-hit" onClick={() => go(`rubro/${rubro.id}`)} aria-label={`Abrir ${rubro.name}`} /><div className="rubro-art"><Image fill sizes="(max-width: 720px) 50vw, 25vw" src={rubro.ready ? getCatalog(rubro).hero : rubro.reference} alt="" /><span className="rubro-icon">{rubro.icon}</span>{rubro.ready && <Badge className="ready-badge">Vista completa</Badge>}</div><div className="rubro-body"><span>{rubro.family}</span><h3>{rubro.name}</h3><p>{rubro.tagline}</p><div><strong>1 catálogo disponible</strong><ChevronRight size={19} /></div></div></article>;
}

function RubroView({ rubro, cart }: { rubro: Rubro; cart: number }) {
  const catalog = getCatalog(rubro);
  return <main className="rubro-page" style={{ '--rubro': rubro.color, '--accent': rubro.accent } as React.CSSProperties}><GlobalHeader cart={cart} /><section className="rubro-banner"><button className="back-link" onClick={() => go()}><ArrowLeft size={17} /> Todos los rubros</button><div className="rubro-title"><span>{rubro.icon}</span><div><p>{rubro.family}</p><h1>{rubro.name}</h1><small>{rubro.tagline}</small></div></div></section><section className="catalog-list"><div className="section-heading"><div><span className="eyebrow">Catálogos disponibles</span><h2>Elige una experiencia</h2></div><span className="result-count">1 catálogo</span></div><article className="catalog-choice"><button className="catalog-choice-image" onClick={() => go(`catalogo/${rubro.id}`)}><img src={catalog.hero} alt={`Portada de ${rubro.brand}`} /><span className="floating-phone"><img src={rubro.reference} alt="Referencia visual del catálogo" /></span></button><div className="catalog-choice-copy"><div className="catalog-logo"><span>{rubro.icon}</span><b>{rubro.brand}</b></div><Badge variant="outline">Catálogo público</Badge><h2>{catalog.heroTitle}</h2><p>{catalog.heroCopy}</p><ul><li><Check size={15} /> Productos y servicios</li><li><Check size={15} /> Acciones funcionales</li><li><Check size={15} /> Vista móvil y escritorio</li></ul>{!rubro.ready && <p className="phase-note"><Clock3 size={15} /> Estructura navegable; la personalización completa se incorporará en su fase.</p>}<Button className="choice-button" onClick={() => go(`catalogo/${rubro.id}`)}>Abrir catálogo <ArrowRight /></Button></div></article></section></main>;
}

function CatalogView({ rubro, productId, favorites, cart, toggleFavorite, addToCart, notify }: { rubro: Rubro; productId?: string; favorites: string[]; cart: CartLine[]; toggleFavorite: (r: string, p: string) => void; addToCart: (line: CartLine) => void; notify: (message: string) => void }) {
  const catalog = getCatalog(rubro);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todo');
  const productRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const activeProduct = catalog.products.find((product) => product.id === productId);
  const products = catalog.products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  const whatsapp = (product?: Product) => { const text = product ? `Hola ${rubro.brand}, me interesa ${product.name} (${money(product.price)}).` : `Hola ${rubro.brand}, quisiera información sobre su catálogo.`; window.open(`https://wa.me/59170000000?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer'); };
  const share = async () => { const data = { title: rubro.brand, text: catalog.heroTitle, url: window.location.href }; if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify('Enlace copiado'); } };
  if (rubro.ready) return <ReferenceCatalog rubro={rubro} catalog={catalog} productId={productId} favorites={favorites} cart={cart} onFavorite={toggleFavorite} onAdd={addToCart} notify={notify} />;
  return <main className="catalog-page" style={{ '--brand': rubro.color, '--brand-accent': rubro.accent } as React.CSSProperties}>
    <div className="catalog-topline"><span><BadgeCheck size={15} /> Negocio verificado</span><span><PackageCheck size={15} /> Atención en La Paz</span><MapsReviewButton brand={rubro.brand} notify={notify} header /><button onClick={share}><Share2 size={15} /> Compartir</button></div>
    <header className="catalog-header"><button className="catalog-brand" onClick={() => go(`rubro/${rubro.id}`)}><span>{rubro.icon}</span><b>{rubro.brand}</b></button><div className="catalog-search"><Search size={18} /><input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Buscar en ${rubro.brand}`} /><button onClick={() => { setQuery(''); searchRef.current?.focus(); }} aria-label="Limpiar búsqueda"><X size={15} /></button></div><div className="catalog-actions"><button onClick={() => go('favoritos')} aria-label="Favoritos"><Heart size={20} /><em>{favorites.length}</em></button><button onClick={() => go('carrito')} aria-label="Pedido"><ShoppingBag size={20} /><em>{cart.reduce((sum, item) => sum + item.qty, 0)}</em></button><button onClick={() => notify('Menú listo')} aria-label="Abrir menú"><Menu size={21} /></button></div></header>
    <section className="catalog-hero"><img src={catalog.hero} alt={`Portada de ${rubro.brand}`} /><div className="hero-shade" /><div className="hero-content"><span>{catalog.kicker}</span><h1>{catalog.heroTitle}</h1><p>{catalog.heroCopy}</p><div><Button onClick={() => productRef.current?.scrollIntoView({ behavior: 'smooth' })}>{catalog.action} <ArrowRight /></Button><button className="hero-secondary" onClick={() => whatsapp()}><MessageCircle size={18} /> Consultar</button></div></div><div className="hero-trust"><span><b>4.9</b> <Star size={13} fill="currentColor" /> valoración</span><span><b>+320</b> clientes</span><span><b>Hoy</b> disponible</span></div></section>
    <section className="catalog-content" ref={productRef}>
      <div className="catalog-categories"><button className="filter-button" onClick={() => notify('Filtros preparados')}><SlidersHorizontal size={17} /> Filtros</button>{catalog.categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="benefit-row"><span><PackageCheck /> Stock actualizado</span><span><MessageCircle /> Respuesta rápida</span><span><BadgeCheck /> Compra segura</span><span><MapPin /> Cobertura local</span></div>
      <div className="products-heading"><div><span className="eyebrow">{category === 'Todo' ? 'Selección para ti' : category}</span><h2>{query ? `Resultados para “${query}”` : 'Productos y servicios destacados'}</h2></div><button onClick={() => { setCategory('Todo'); setQuery(''); }}>Ver todo <ArrowRight size={16} /></button></div>
      {products.length ? <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} rubro={rubro} favorite={favorites.includes(`${rubro.id}:${product.id}`)} onFavorite={toggleFavorite} />)}</div> : <EmptyState action={() => setQuery('')} />}
      <section className="promo-band promo-band-image">
        <img src={catalog.hero} alt="" />
        <div className="promo-band-shade" />
        <div className="promo-band-content"><span>Atención personalizada</span><h2>{catalog.heroTitle}</h2><p>Cuéntanos qué necesitas y te ayudaremos a encontrar la opción ideal.</p></div>
        <Button onClick={() => whatsapp()}><MessageCircle /> Consultar ahora</Button>
      </section>
    </section>
    <nav className="mobile-nav" aria-label="Navegación del catálogo"><button onClick={() => go(`catalogo/${rubro.id}`)}><Home /><span>Inicio</span></button><button onClick={() => productRef.current?.scrollIntoView({ behavior: 'smooth' })}><Grid2X2 /><span>Categorías</span></button><button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); searchRef.current?.focus(); }}><Search /><span>Buscar</span></button><button onClick={() => go('favoritos')}><Heart /><span>Favoritos</span></button><button onClick={() => go('perfil')}><UserRound /><span>Perfil</span></button></nav>
    <ProductSheet rubro={rubro} product={activeProduct} favorite={activeProduct ? favorites.includes(`${rubro.id}:${activeProduct.id}`) : false} onFavorite={toggleFavorite} onAdd={addToCart} onWhatsApp={whatsapp} />
  </main>;
}

function ProductCard({ product, rubro, favorite, onFavorite }: { product: Product; rubro: Rubro; favorite: boolean; onFavorite: (r: string, p: string) => void }) {
  return <article className="product-card"><button className="product-image" onClick={() => go(`catalogo/${rubro.id}/item/${product.id}`)} aria-label={`Ver ${product.name}`}><img src={product.image} alt={product.name} loading="lazy" />{product.badge && <span>{product.badge}</span>}</button><button className={`favorite ${favorite ? 'is-favorite' : ''}`} onClick={() => onFavorite(rubro.id, product.id)} aria-label={favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}><Heart fill={favorite ? 'currentColor' : 'none'} /></button><div className="product-copy"><div className="rating"><Star size={13} fill="currentColor" /> {product.rating} <small>(128)</small></div><button onClick={() => go(`catalogo/${rubro.id}/item/${product.id}`)}><h3>{product.name}</h3><p>{product.subtitle}</p></button><div className="price"><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div><span className="stock"><i /> {product.stock}</span></div></article>;
}

function ProductSheet({ rubro, product, favorite, onFavorite, onAdd, onWhatsApp }: { rubro: Rubro; product?: Product; favorite: boolean; onFavorite: (r: string, p: string) => void; onAdd: (line: CartLine) => void; onWhatsApp: (p?: Product) => void }) {
  const [qty, setQty] = useState(1); const [variant, setVariant] = useState('');
  useEffect(() => { queueMicrotask(() => { setQty(1); setVariant(product?.variants?.[0] || 'Estándar'); }); }, [product]);
  return <Sheet open={!!product} onOpenChange={(open) => { if (!open) go(`catalogo/${rubro.id}`); }}><SheetContent className="product-sheet" side="right">{product && <><SheetHeader><SheetTitle>{product.name}</SheetTitle><SheetDescription>{product.subtitle}</SheetDescription></SheetHeader><div className="sheet-scroll"><div className="sheet-image"><img src={product.image} alt={product.name} />{product.badge && <Badge>{product.badge}</Badge>}<button onClick={() => onFavorite(rubro.id, product.id)} className={favorite ? 'is-favorite' : ''}><Heart fill={favorite ? 'currentColor' : 'none'} /></button></div><div className="sheet-rating"><Star fill="currentColor" /> <b>{product.rating}</b><span>128 reseñas</span><i /><span>{product.stock}</span></div><div className="sheet-price"><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div><p className="sheet-description-copy">Una opción seleccionada por su calidad, disponibilidad e información clara. Configúrala y continúa por el canal que prefieras.</p>{product.variants && <div className="variant-block"><label>Selecciona una opción</label><div>{product.variants.map((item) => <button key={item} className={variant === item ? 'active' : ''} onClick={() => setVariant(item)}>{item}</button>)}</div></div>}<div className="attribute-list">{product.attributes.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div><div className="quantity-row"><span>Cantidad</span><div><button onClick={() => setQty((value) => Math.max(1, value - 1))}><Minus /></button><b>{qty}</b><button onClick={() => setQty((value) => value + 1)}><Plus /></button></div></div></div><div className="sheet-actions"><Button variant="outline" onClick={() => onWhatsApp(product)}><MessageCircle /> Consultar</Button><Button onClick={() => onAdd({ rubroId:rubro.id, productId:product.id, name:product.name, price:product.price, qty, variant })}><ShoppingBag /> Agregar · {money(product.price * qty)}</Button></div></>}</SheetContent></Sheet>;
}

function SavedView({ title, description, empty, count, children }: { title: string; description: string; empty: string; count: number; children: React.ReactNode }) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : !!children;
  return <main className="utility-page"><GlobalHeader cart={count} /><section><button className="back-link" onClick={() => history.back()}><ArrowLeft /> Volver</button><span className="eyebrow">Tu selección</span><h1>{title}</h1><p>{description}</p>{hasChildren ? <div className="product-grid utility-grid">{children}</div> : <div className="utility-empty"><Heart /><h2>{empty}</h2><Button onClick={() => go()}>Explorar catálogos</Button></div>}</section></main>;
}

function CartView({ cart, setCart, notify }: { cart: CartLine[]; setCart: React.Dispatch<React.SetStateAction<CartLine[]>>; notify: (message: string) => void }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const send = () => { const lines = cart.map((item) => `• ${item.qty} × ${item.name} (${item.variant}) — ${money(item.price * item.qty)}`).join('\n'); window.open(`https://wa.me/59170000000?text=${encodeURIComponent(`Hola, quisiera solicitar:\n${lines}\nTotal referencial: ${money(total)}`)}`, '_blank', 'noopener,noreferrer'); };
  return <main className="utility-page"><GlobalHeader cart={cart.length} /><section><button className="back-link" onClick={() => history.back()}><ArrowLeft /> Volver</button><span className="eyebrow">Resumen</span><h1>Tu pedido</h1><p>Revisa cantidades y continúa por WhatsApp.</p>{cart.length ? <div className="cart-layout"><div className="cart-lines">{cart.map((item, index) => <article key={`${item.productId}-${index}`}><div><ShoppingBag /><span><b>{item.name}</b><small>{item.variant}</small></span></div><div className="cart-qty"><button onClick={() => setCart((current) => current.map((line, i) => i === index ? { ...line, qty: Math.max(1, line.qty - 1) } : line))}><Minus /></button><b>{item.qty}</b><button onClick={() => setCart((current) => current.map((line, i) => i === index ? { ...line, qty: line.qty + 1 } : line))}><Plus /></button></div><strong>{money(item.price * item.qty)}</strong><button className="remove-line" onClick={() => { setCart((current) => current.filter((_, i) => i !== index)); notify('Producto eliminado'); }}><X /></button></article>)}</div><aside><span>Total referencial</span><strong>{money(total)}</strong><p>El negocio confirmará disponibilidad y condiciones.</p><Button onClick={send}><MessageCircle /> Continuar por WhatsApp</Button><button onClick={() => go()}>Seguir explorando</button></aside></div> : <div className="utility-empty"><ShoppingBag /><h2>Tu pedido está vacío</h2><Button onClick={() => go()}>Explorar catálogos</Button></div>}</section></main>;
}

function ProfileView({ cartCount, favoriteCount }: { cartCount: number; favoriteCount: number }) {
  return <main className="utility-page"><GlobalHeader cart={cartCount} /><section><button className="back-link" onClick={() => history.back()}><ArrowLeft /> Volver</button><span className="eyebrow">Demostración visual</span><h1>Tu espacio</h1><p>Esta vista reúne las acciones que funcionan localmente, sin crear una cuenta real.</p><div className="profile-grid"><button onClick={() => go('favoritos')}><Heart /><span><b>{favoriteCount}</b> favoritos guardados</span><ChevronRight /></button><button onClick={() => go('carrito')}><ShoppingBag /><span><b>{cartCount}</b> líneas en tu pedido</span><ChevronRight /></button><button onClick={() => go()}><Grid2X2 /><span><b>45</b> rubros disponibles</span><ChevronRight /></button><button onClick={() => window.open('https://wa.me/59170000000', '_blank', 'noopener,noreferrer')}><MessageCircle /><span><b>Ayuda</b> por WhatsApp</span><ExternalLink /></button></div></section></main>;
}

function EmptyState({ action }: { action: () => void }) { return <div className="empty-state"><Search /><h3>No encontramos coincidencias</h3><p>Prueba con otra palabra o restablece los filtros.</p><Button variant="outline" onClick={action}>Ver todos</Button></div>; }
