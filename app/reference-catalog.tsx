'use client';

import { memo, useMemo, useState } from 'react';
import type React from 'react';
import {
  ArrowLeft, CalendarDays, ChevronRight, CircleUserRound, Clock3, Grid2X2, Heart,
  Home, MapPin, Menu, MessageCircle, Search, Share2, ShieldCheck, ShoppingCart,
  Star, X,
} from 'lucide-react';
import type { PilotCatalog, Product, Rubro } from './catalog-data';
import { MapsReviewButton } from './maps-review-button';

type CartLine = { rubroId: string; productId: string; name: string; price: number; qty: number; variant: string };
type CatalogMode = 'commerce' | 'appointment' | 'request' | 'parking';
type CatalogVisualPreset = 'editorial' | 'gastronomic' | 'service' | 'technical' | 'experience' | 'friendly' | 'clinical';
type PremiumQuickAction = {
  icon: string;
  label: string;
  note: string;
  behavior: 'item' | 'products' | 'whatsapp' | 'maps' | 'notify';
  productIndex?: number;
  message?: string;
  urgent?: boolean;
};
type PremiumQuickConfig = {
  icon: string;
  eyebrow: string;
  title: string;
  status: string;
  stripTitle: string;
  stripCopy: string;
  actions: PremiumQuickAction[];
};
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

const PATTERN_ICON_COUNT = 240;

const premiumVisualPresets: Partial<Record<string, CatalogVisualPreset>> = {
  moda: 'editorial',
  restaurante: 'gastronomic',
  barberia: 'service',
  electronica: 'technical',
  hotel: 'experience',
  jugueteria: 'friendly',
  veterinaria: 'clinical',
};

const premiumQuickConfigs: Record<string, PremiumQuickConfig> = {
  moda: {
    icon: '✨', eyebrow: 'Compra fácil', title: 'Encuentra tu estilo', status: 'Nuevos hoy',
    stripTitle: 'Despachos disponibles', stripCopy: 'Pedidos confirmados hasta las 16:00',
    actions: [
      { icon: '📏', label: 'Guía de tallas', note: 'Encuentra tu medida', behavior: 'notify', message: 'Guía de tallas disponible por prenda' },
      { icon: '🛍️', label: 'Nuevos ingresos', note: 'Colección actual', behavior: 'products' },
      { icon: '🚚', label: 'Envíos', note: 'Consulta cobertura', behavior: 'notify', message: 'Envíos disponibles en La Paz y El Alto' },
    ],
  },
  restaurante: {
    icon: '🍽️', eyebrow: 'Servicio rápido', title: '¿Qué se te antoja?', status: 'Cocina abierta',
    stripTitle: 'Abierto hoy', stripCopy: 'Pedidos y reservas hasta las 22:30',
    actions: [
      { icon: '🛵', label: 'Pedir ahora', note: 'Elige tu plato', behavior: 'item', productIndex: 0 },
      { icon: '📅', label: 'Reservar mesa', note: 'Confirma tu horario', behavior: 'whatsapp' },
      { icon: '📍', label: 'Cómo llegar', note: 'Ver ubicación', behavior: 'maps' },
    ],
  },
  barberia: {
    icon: '✂️', eyebrow: 'Tu próxima visita', title: 'Elige cómo atenderte', status: 'Citas hoy',
    stripTitle: 'Horario disponible', stripCopy: 'Lunes a sábado · 09:00–20:00',
    actions: [
      { icon: '📅', label: 'Reservar cita', note: 'Horarios de hoy', behavior: 'item', productIndex: 0 },
      { icon: '🪒', label: 'Ver servicios', note: 'Corte, barba y más', behavior: 'products' },
      { icon: '📍', label: 'Cómo llegar', note: 'Abrir ubicación', behavior: 'maps' },
    ],
  },
  electronica: {
    icon: '⚡', eyebrow: 'Compra informada', title: 'Encuentra el equipo ideal', status: 'Soporte activo',
    stripTitle: 'Retiro disponible', stripCopy: 'Confirma stock y recoge el mismo día',
    actions: [
      { icon: '⚖️', label: 'Comparar equipos', note: 'Revisa diferencias', behavior: 'notify', message: 'Comparador de características activado en modo demostración' },
      { icon: '💬', label: 'Consultar stock', note: 'Respuesta rápida', behavior: 'whatsapp' },
      { icon: '🛡️', label: 'Garantía', note: 'Compra protegida', behavior: 'notify', message: 'Todos los equipos incluyen información de garantía' },
    ],
  },
  hotel: {
    icon: '🛎️', eyebrow: 'Tu estadía en un lugar', title: 'Planea tu próxima visita', status: 'Disponible',
    stripTitle: 'Recepción 24 horas', stripCopy: 'Check-in desde las 14:00 · asistencia continua',
    actions: [
      { icon: '🛏️', label: 'Reservar habitación', note: 'Ver disponibilidad', behavior: 'item', productIndex: 0 },
      { icon: '✨', label: 'Servicios', note: 'Todo lo incluido', behavior: 'products' },
      { icon: '📍', label: 'Cómo llegar', note: 'Abrir ubicación', behavior: 'maps' },
    ],
  },
  jugueteria: {
    icon: '🎁', eyebrow: 'El regalo indicado', title: 'Encuentra algo especial', status: 'Novedades',
    stripTitle: 'Entregas disponibles', stripCopy: 'Compra hoy y coordina tu entrega',
    actions: [
      { icon: '🧒', label: 'Comprar por edad', note: 'Opciones recomendadas', behavior: 'notify', message: 'Filtro por edad activado en modo demostración' },
      { icon: '🎁', label: 'Ideas de regalo', note: 'Descubre favoritos', behavior: 'item', productIndex: 0 },
      { icon: '🚚', label: 'Envíos', note: 'Consulta cobertura', behavior: 'notify', message: 'Entrega coordinada disponible' },
    ],
  },
  veterinaria: {
    icon: '🩺', eyebrow: 'Cuidado sin esperas', title: '¿Qué necesita tu mascota?', status: 'Atendiendo',
    stripTitle: 'Abierto hoy', stripCopy: '08:00–20:00 · atención con cita',
    actions: [
      { icon: '📅', label: 'Agendar consulta', note: 'Horarios para hoy', behavior: 'item', productIndex: 3 },
      { icon: '💬', label: 'Urgencias 24/7', note: 'Orientación inmediata', behavior: 'whatsapp', urgent: true },
      { icon: '📍', label: 'Cómo llegar', note: 'Clínica Zona Sur', behavior: 'maps' },
    ],
  },
};

function catalogStageClass(rubroId: string) {
  const preset = premiumVisualPresets[rubroId];
  return ['reference-stage', 'reference-' + rubroId, preset && 'catalog-premium', preset && 'premium-' + preset].filter(Boolean).join(' ');
}

const CatalogIconPattern = memo(function CatalogIconPattern({
  primaryIcon,
  categoryIcons,
}: {
  primaryIcon: string;
  categoryIcons: string[];
}) {
  const motifs = [primaryIcon, ...categoryIcons].filter(Boolean);

  return <div className="catalog-icon-pattern" aria-hidden="true">
    {Array.from({ length: PATTERN_ICON_COUNT }, (_, index) => <span key={index}>{motifs[index % motifs.length]}</span>)}
  </div>;
});

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
    optionLabel: 'Presentación o atención', primaryLabel: 'Consultar o reservar por WhatsApp', location: 'Clínica Zona Sur, La Paz',
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
  mudanzas: {
    darkHeader: true, mode: 'request',
    headline: 'HACEMOS TU MOVIMIENTO MÁS FÁCIL',
    copy: 'Mudanzas y transporte de carga con acompañamiento en cada traslado.',
    cta: 'Ver servicios', section: 'Servicios destacados',
    nav: ['Inicio', 'Categorías', 'Solicitudes', 'Favoritos', 'Perfil'],
    categoryIcons: ['📦', '🚚', '🧳', '🛡️', '🛠️', '🚛'],
    feature: 'Personal capacitado, cobertura y seguro para cada traslado',
    optionLabel: 'Selecciona el alcance', primaryLabel: 'Solicitar servicio por WhatsApp', location: 'La Paz y rutas nacionales',
  },
  streaming: {
    darkHeader: true, mode: 'commerce',
    headline: 'PLANES QUE SE ADAPTAN A TU FORMA DE VER',
    copy: 'Entretenimiento digital, activación rápida y soporte cuando lo necesitas.',
    cta: 'Ver planes', section: 'Planes destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🎬', '📺', '⚽', '🎵', '▶️', '👨‍👩‍👧'],
    feature: 'Acceso seguro, activación inmediata y renovación sencilla',
    optionLabel: 'Selecciona tu plan', contactLabel: 'Pedir o renovar por WhatsApp',
  },
  'entretenimiento-infantil': {
    darkHeader: true, mode: 'appointment',
    headline: 'CELEBRA A LO GRANDE',
    copy: 'Fiestas, juegos y diversión preparados para momentos inolvidables.',
    cta: 'Ver paquetes', section: 'Servicios destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🎂', '🏰', '⭐', '🎈', '🎁', '🎨'],
    feature: 'Personal capacitado, espacios seguros y atención personalizada',
    optionLabel: 'Duración o temática', primaryLabel: 'Reservar por WhatsApp', location: 'Cobertura en La Paz y alrededores',
  },
  gimnasio: {
    darkHeader: true, mode: 'commerce',
    headline: 'DISCIPLINA PARA TU MEJOR VERSIÓN',
    copy: 'Entrenamiento profesional, comunidad y resultados medibles.',
    cta: 'Conocer planes', section: 'Productos y servicios destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['👑', '🏃', '👥', '🏋️', '🥤', '🏷️'],
    feature: 'Evaluación inicial, rutina personalizada y seguimiento',
    optionLabel: 'Selecciona una modalidad', contactLabel: 'Inscribirme por WhatsApp',
  },
  'partes-electricas': {
    darkHeader: true, mode: 'commerce',
    headline: 'SOLUCIONES ELÉCTRICAS PARA UN MUNDO EN MOVIMIENTO',
    copy: 'Componentes confiables y asesoría técnica para cada proyecto.',
    cta: 'Ver productos', section: 'Productos destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['⚡', '🧵', '💡', '📡', '🔌', '🛠️'],
    feature: 'Datos técnicos, compatibilidad y stock verificado',
    optionLabel: 'Selecciona la especificación', contactLabel: 'Cotizar por WhatsApp',
  },
  'cajas-americanas': {
    darkHeader: true, mode: 'commerce',
    headline: 'CAJAS AMERICANAS Y SALDOS IMPORTADOS',
    copy: 'Productos variados, oportunidades únicas y nuevos ingresos cada semana.',
    cta: 'Descubrir lotes', section: 'Lotes destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🎧', '🏠', '👕', '🧸', '🧴', '📦'],
    feature: 'Contenido referencial, stock limitado y compra informada',
    optionLabel: 'Selecciona el tipo de lote', contactLabel: 'Consultar o pedir por WhatsApp',
  },
  'agencia-viajes': {
    darkHeader: true, mode: 'appointment',
    headline: 'EXPLORA BOLIVIA Y EL MUNDO',
    copy: 'Destinos increíbles, itinerarios claros y experiencias reales.',
    cta: 'Ver paquetes', section: 'Destinos destacados',
    nav: ['Inicio', 'Destinos', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🏔️', '🧳', '✈️', '🏨', '🛡️', '📷'],
    feature: 'Salidas confirmadas, pago seguro y soporte durante el viaje',
    optionLabel: 'Modalidad del viaje', primaryLabel: 'Reservar o consultar por WhatsApp', location: 'Salidas desde La Paz',
  },
  mayorista: {
    darkHeader: true, mode: 'commerce',
    headline: 'GRANDES MARCAS, MEJORES NEGOCIOS',
    copy: 'Precios especiales y stock real para hacer crecer tu empresa.',
    cta: 'Ver precios', section: 'Productos destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Pedidos', 'Perfil'],
    categoryIcons: ['📦', '🥤', '🧴', '🏠', '🎁', '🏷️'],
    feature: 'Escalas por volumen, stock verificado y entrega programada',
    optionLabel: 'Presentación o escala', contactLabel: 'Solicitar cotización por WhatsApp',
  },
  ceramicas: {
    darkHeader: true, mode: 'commerce',
    headline: 'ESPACIOS QUE INSPIRAN PROYECTOS REALES',
    copy: 'Cerámicas, pisos y materiales para cada etapa de tu obra.',
    cta: 'Ver colección', section: 'Materiales destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['◫', '◩', '◈', '🧱', '🛁', '🌿'],
    feature: 'Formatos, rendimiento por caja y cálculo de materiales',
    optionLabel: 'Formato o acabado', contactLabel: 'Cotizar por WhatsApp',
  },
  'sala-juegos': {
    darkHeader: true, mode: 'appointment',
    headline: 'MÁS QUE UN JUEGO, UNA EXPERIENCIA',
    copy: 'Consolas, PC Gaming, VR y torneos en un solo lugar.',
    cta: 'Reservar ahora', section: 'Experiencias destacadas',
    nav: ['Inicio', 'Experiencias', 'Buscar', 'Reservas', 'Perfil'],
    categoryIcons: ['🎮', '🖥️', '🥽', '🕹️', '🍿', '🏆'],
    feature: 'Equipos listos, horarios disponibles y soporte en sala',
    optionLabel: 'Duración o experiencia', primaryLabel: 'Reservar por WhatsApp', location: 'GameZone Arena · La Paz',
  },
  artesanias: {
    darkHeader: true, mode: 'request',
    headline: 'TRADICIÓN QUE SE VIVE EN CADA DETALLE',
    copy: 'Artesanías bolivianas hechas con historia y dedicación.',
    cta: 'Descubrir piezas', section: 'Piezas destacadas',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🧶', '🏺', '🎁', '✍️', '🪴', '🦙'],
    feature: 'Técnicas artesanales, piezas únicas y personalización',
    optionLabel: 'Color o personalización', primaryLabel: 'Pedir o cotizar por WhatsApp', location: 'Envíos desde La Paz',
  },
  tours: {
    darkHeader: true, mode: 'appointment',
    headline: 'EXPLORA · DESCUBRE · VIVE BOLIVIA',
    copy: 'Aventura, cultura y paisajes inolvidables con guías especializados.',
    cta: 'Explorar tours', section: 'Experiencias destacadas',
    nav: ['Inicio', 'Destinos', 'Buscar', 'Reservas', 'Perfil'],
    categoryIcons: ['🏔️', '🏙️', '🥾', '⛵', '🧗', '☀️'],
    feature: 'Cupos, itinerarios e inclusiones claramente detallados',
    optionLabel: 'Modalidad del tour', primaryLabel: 'Reservar o consultar por WhatsApp', location: 'Punto de encuentro confirmado',
  },
  educacion: {
    darkHeader: true, mode: 'appointment',
    headline: 'TU POTENCIAL SIN LÍMITES',
    copy: 'Aprende con rutas prácticas, docentes expertos y certificación.',
    cta: 'Ver cursos', section: 'Cursos destacados',
    nav: ['Inicio', 'Cursos', 'Buscar', 'Inscripciones', 'Perfil'],
    categoryIcons: ['🌐', '💻', '🎨', '📊', '📚', '🧠'],
    feature: 'Modalidades flexibles, cupos y certificación verificable',
    optionLabel: 'Modalidad u horario', primaryLabel: 'Inscribirme o consultar por WhatsApp', location: 'Sede / aula virtual',
  },
  inmobiliaria: {
    darkHeader: true, mode: 'appointment',
    headline: 'ENCUENTRA EL LUGAR DONDE QUIERES ESTAR',
    copy: 'Propiedades verificadas para vivir, trabajar o invertir.',
    cta: 'Ver propiedades', section: 'Propiedades destacadas',
    nav: ['Inicio', 'Propiedades', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🏷️', '🔑', '🏡', '🏢', '📐', '🏬'],
    feature: 'Datos completos, ubicación verificada y visita programada',
    optionLabel: 'Modalidad de visita', primaryLabel: 'Agendar visita por WhatsApp', location: 'Ubicación verificada en mapa',
  },
  hotel: {
    darkHeader: true, mode: 'appointment',
    headline: 'MÁS QUE UN ALOJAMIENTO, UNA EXPERIENCIA',
    copy: 'Descanso, atención cálida y servicios para disfrutar cada estadía.',
    cta: 'Ver habitaciones', section: 'Habitaciones y experiencias',
    nav: ['Inicio', 'Habitaciones', 'Buscar', 'Reservas', 'Perfil'],
    categoryIcons: ['🛏️', '✨', '🏷️', '☕', '🛎️', '🌆'],
    feature: 'Disponibilidad, servicios y políticas antes de reservar',
    optionLabel: 'Huéspedes o habitación', primaryLabel: 'Reservar o consultar por WhatsApp', location: 'Zona central · La Paz',
  },
  'foto-video-dj': {
    darkHeader: true, mode: 'appointment',
    headline: 'CONVIERTE CADA MOMENTO EN UNA HISTORIA',
    copy: 'Fotografía, video, música y producción para eventos inolvidables.',
    cta: 'Ver servicios', section: 'Servicios destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['📷', '🎥', '🎧', '🎁', '📅', '✨', '🔊'],
    feature: 'Profesionales verificados y disponibilidad por fecha',
    optionLabel: 'Cobertura o duración', primaryLabel: 'Consultar o reservar por WhatsApp', location: 'Cobertura en La Paz y alrededores',
  },
  'clinica-pet': {
    darkHeader: true, mode: 'appointment',
    headline: 'ELLOS TAMBIÉN SON FAMILIA',
    copy: 'Cuidado profesional en cada etapa de su vida.',
    cta: 'Agendar ahora', section: 'Productos y servicios destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🩺', '💉', '🛡️', '✂️', '🥣', '💊', '🚑'],
    feature: 'Veterinarios especializados, historial y agenda rápida',
    optionLabel: 'Horario, especie o tamaño', primaryLabel: 'Agendar por WhatsApp', location: 'Clínica Salud Animal · La Paz',
  },
  imprenta: {
    darkHeader: true, mode: 'commerce',
    headline: 'TU MARCA EN TODAS PARTES',
    copy: 'Diseño e impresión de alta calidad para hacer crecer tu negocio.',
    cta: 'Ver catálogo', section: 'Productos destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🪪', '📄', '🖼️', '🏷️', '🪧', '🛍️', '🎨'],
    feature: 'Opciones configurables, vista clara y precios por volumen',
    optionLabel: 'Acabado o cantidad', contactLabel: 'Cotizar por WhatsApp',
  },
  'alquiler-eventos': {
    darkHeader: true, mode: 'appointment',
    headline: 'ESPACIOS ÚNICOS PARA MOMENTOS INOLVIDABLES',
    copy: 'Mobiliario, carpas y producción para celebrar sin complicaciones.',
    cta: 'Ver catálogo', section: 'Productos destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🪑', '◯', '💐', '🔊', '💡', '⛺', '🎉'],
    feature: 'Entrega a tiempo, montaje y disponibilidad por fecha',
    optionLabel: 'Duración o paquete', primaryLabel: 'Cotizar o reservar por WhatsApp', location: 'Transporte sujeto a zona',
  },
  optica: {
    darkHeader: true, mode: 'commerce',
    headline: 'TU MIRADA, TU MEJOR VERSIÓN',
    copy: 'Monturas y lentes para cada momento de tu vida.',
    cta: 'Ver catálogo', section: 'Productos destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['👓', '🕶️', '◉', '🧴', '🏷️', '🧒', '👁️'],
    feature: 'Productos confiables y asesoría óptica especializada',
    optionLabel: 'Color o graduación', contactLabel: 'Consultar o reservar por WhatsApp',
  },
  jugueteria: {
    darkHeader: false, mode: 'commerce',
    headline: 'CRECER TAMBIÉN ES JUGAR',
    copy: 'Todo para cada etapa de su gran aventura.',
    cta: 'Ver productos', section: 'Productos destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Mi negocio'],
    categoryIcons: ['🧸', '🍼', '💗', '👕', '🎒', '🎁', '🛡️'],
    feature: 'Edad, seguridad y materiales visibles antes de comprar',
    optionLabel: 'Color o variante', contactLabel: 'Pedir por WhatsApp',
  },
  deportes: {
    darkHeader: true, mode: 'commerce',
    headline: 'DISCIPLINA EN CADA PASO',
    copy: 'Equipamiento, ropa y accesorios para tu mejor versión.',
    cta: 'Ver productos', section: 'Productos destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🏃', '🏋️', '⚽', '🧘', '🥤', '🎒', '👕'],
    feature: 'Marcas confiables, ficha técnica y guía de tallas',
    optionLabel: 'Talla o variante', contactLabel: 'Consultar o comprar por WhatsApp',
  },
  'pet-shop': {
    darkHeader: true, mode: 'commerce',
    headline: 'MASCOTAS MÁS FELICES, VIDAS MÁS LINDAS',
    copy: 'Alimentos, higiene, juguetes y accesorios para su bienestar.',
    cta: 'Ver productos', section: 'Productos destacados',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🐶', '🐱', '🥣', '🦴', '🧴', '🎾'],
    feature: 'Compatibilidad por mascota, etapa y tamaño',
    optionLabel: 'Sabor, peso o tamaño', contactLabel: 'Consultar o comprar por WhatsApp',
  },
  libreria: {
    darkHeader: true, mode: 'commerce',
    headline: 'TODO PARA UN GRAN AÑO ESCOLAR',
    copy: 'Aprende, crea y organiza con todo lo que necesitas.',
    cta: 'Ver productos', section: 'Esenciales para estudiar',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Listas', 'Perfil'],
    categoryIcons: ['📓', '🖊️', '🎨', '📎', '🎒', '📋'],
    feature: 'Listas escolares completas, packs y stock real',
    optionLabel: 'Color, formato o presentación', contactLabel: 'Pedir por WhatsApp',
  },
  pasteleria: {
    darkHeader: true, mode: 'appointment',
    headline: 'TORTAS QUE CONVIERTEN MOMENTOS EN RECUERDOS',
    copy: 'Diseños artesanales preparados para tu celebración.',
    cta: 'Diseñar mi torta', section: 'Dulces favoritos',
    nav: ['Inicio', 'Categorías', 'Diseñar', 'Pedidos', 'Perfil'],
    categoryIcons: ['🎂', '🧁', '🍰', '🍮', '✨', '🏷️'],
    feature: 'Sabor, porciones, diseño y fecha en un solo pedido',
    optionLabel: 'Sabor, tamaño o paquete', primaryLabel: 'Reservar por WhatsApp', contactLabel: 'Personalizar mi pedido', location: 'Entrega o recojo programado',
  },
  muebleria: {
    darkHeader: true, mode: 'commerce',
    headline: 'ESPACIOS QUE INSPIRAN Y HACEN HOGAR',
    copy: 'Diseño funcional, confort y acabados para cada ambiente.',
    cta: 'Explorar muebles', section: 'Muebles destacados',
    nav: ['Inicio', 'Ambientes', 'Buscar', 'Favoritos', 'Perfil'],
    categoryIcons: ['🛋️', '🪑', '🛏️', '🗄️', '🪴', '📐'],
    feature: 'Medidas, materiales, colores y entrega visibles',
    optionLabel: 'Color, acabado o tamaño', contactLabel: 'Consultar o comprar por WhatsApp',
  },
  repuestos: {
    darkHeader: true, mode: 'commerce',
    headline: 'COMPATIBILIDAD REAL, REPUESTOS EN LOS QUE CONFÍAS',
    copy: 'Encuentra la pieza correcta por vehículo, año o código.',
    cta: 'Buscar repuestos', section: 'Repuestos destacados',
    nav: ['Inicio', 'Categorías', 'Mi vehículo', 'Favoritos', 'Perfil'],
    categoryIcons: ['🛑', '🛢️', '⚙️', '🔋', '🛞', '🔧'],
    feature: 'Compatibilidad por marca, modelo, año y código',
    optionLabel: 'Vehículo, medida o variante', contactLabel: 'Confirmar compatibilidad por WhatsApp',
  },
  floreria: {
    darkHeader: true, mode: 'appointment',
    headline: 'EMOCIONES QUE SE ENTREGAN',
    copy: 'Flores, regalos y detalles personalizados para cada ocasión.',
    cta: 'Elegir un detalle', section: 'Detalles destacados',
    nav: ['Inicio', 'Ocasiones', 'Buscar', 'Pedidos', 'Perfil'],
    categoryIcons: ['💐', '🎁', '🧸', '🍫', '💌', '🏷️'],
    feature: 'Personaliza colores, mensaje y horario de entrega',
    optionLabel: 'Tamaño, color o presentación', primaryLabel: 'Programar por WhatsApp', contactLabel: 'Personalizar mi detalle', location: 'Entrega o recojo programado',
  },
  electronica: {
    darkHeader: true, mode: 'commerce',
    headline: 'TECNOLOGÍA QUE TE CONECTA CON LO QUE IMPORTA',
    copy: 'Equipos, audio y accesorios con especificaciones claras.',
    cta: 'Ver productos', section: 'Tecnología destacada',
    nav: ['Inicio', 'Categorías', 'Comparar', 'Pedidos', 'Perfil'],
    categoryIcons: ['📱', '💻', '🎧', '📷', '🎮', '⌚', '💡'],
    feature: 'Compara capacidad, conectividad, compatibilidad y garantía',
    optionLabel: 'Color, capacidad o modelo', contactLabel: 'Consultar o comprar por WhatsApp',
  },
  minimarket: {
    darkHeader: false, mode: 'commerce',
    headline: 'DESPENSA COMPLETA AL MEJOR PRECIO',
    copy: 'Calidad y productos esenciales para tu día a día.',
    cta: 'Ver ofertas', section: 'Ofertas de la semana',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Pedidos', 'Perfil'],
    categoryIcons: ['🛍️', '🥤', '🥛', '🍿', '🧴', '🥬'],
    feature: 'Delivery en tu zona entre 30 y 60 minutos',
    optionLabel: 'Presentación, tamaño o variedad', contactLabel: 'Pedir por WhatsApp',
  },
  barberia: {
    darkHeader: false, mode: 'appointment',
    headline: 'UN BUEN ESTILO SIEMPRE HABLA DE TI',
    copy: 'Cortes, barba y cuidado profesional. Reserva tu cita.',
    cta: 'Ver servicios', section: 'Servicios populares',
    nav: ['Inicio', 'Servicios', 'Agenda', 'Profesionales', 'Perfil'],
    categoryIcons: ['✂️', '🧔', '✨', '💧', '🎁'],
    feature: 'Profesionales, fechas y horarios disponibles',
    optionLabel: 'Profesional y horario', primaryLabel: 'Reservar por WhatsApp', contactLabel: 'Consultar o agendar mi cita', location: 'Barber Shop · Sede Centro',
  },
  moda: {
    darkHeader: false, mode: 'commerce',
    headline: 'NUEVA COLECCIÓN',
    copy: 'Estilo que te acompaña siempre.',
    cta: 'Ver colección', section: 'Más vendidos',
    nav: ['Inicio', 'Categorías', 'Buscar', 'Pedidos', 'Perfil'],
    categoryIcons: ['👚', '👖', '👗', '🧥', '👜'],
    feature: 'Guía de tallas, colores y stock por variante',
    optionLabel: 'Selecciona tu talla', contactLabel: 'Consultar o comprar por WhatsApp',
  },
  restaurante: {
    darkHeader: false, mode: 'commerce',
    headline: 'HAMBURGUESAS QUE HACEN FELICES',
    copy: 'Ingredientes reales, mejores momentos.',
    cta: 'Ver menú', section: 'Más pedidos',
    nav: ['Inicio', 'Menú', 'Buscar', 'Pedidos', 'Perfil'],
    categoryIcons: ['🍔', '🍕', '🥩', '🥗', '🥤', '🍟'],
    feature: 'Delivery en La Paz entre 30 y 60 minutos',
    optionLabel: 'Tamaño, porción o combo', contactLabel: 'Pedir por WhatsApp',
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
  mudanzas: { eyebrow: 'Traslado protegido', title: 'GRANDES DESTINOS, NUEVAS OPORTUNIDADES', copy: 'Planifica tu mudanza con un equipo que cuida cada detalle.', cta: 'Cotizar mudanza' },
  streaming: { eyebrow: 'Combos digitales', title: 'MÁS ENTRETENIMIENTO, MÁS MOMENTOS', copy: 'Combina tus contenidos favoritos en un plan simple.', cta: 'Ver combos' },
  'entretenimiento-infantil': { eyebrow: 'Paquetes todo incluido', title: 'HOY CELEBRAMOS GRANDES HISTORIAS', copy: 'Juegos, decoración y show en una sola reserva.', cta: 'Ver paquetes' },
  gimnasio: { eyebrow: 'Entrenamiento integral', title: 'MÁS QUE UN GIMNASIO, UNA COMUNIDAD', copy: 'Entrena, conecta y alcanza tus objetivos.', cta: 'Conocer planes' },
  'partes-electricas': { eyebrow: 'Marcas que conectan', title: 'ENERGÍA PARA GRANDES IDEAS', copy: 'Encuentra componentes compatibles para tu instalación.', cta: 'Ver productos' },
  'cajas-americanas': { eyebrow: 'Ingresos semanales', title: 'CADA LOTE, UNA NUEVA OPORTUNIDAD', copy: 'Descubre categorías y unidades limitadas recién llegadas.', cta: 'Ver novedades' },
  'agencia-viajes': { eyebrow: 'Próximo destino', title: 'MÁS VIAJES, MÁS HISTORIAS', copy: 'Encuentra una experiencia preparada para recordar.', cta: 'Explorar destinos' },
  mayorista: { eyebrow: 'Logística confiable', title: 'TU PEDIDO EN BUENAS MANOS', copy: 'Stock real, condiciones claras y entrega segura para tu negocio.', cta: 'Conocer condiciones' },
  ceramicas: { eyebrow: 'Construye con confianza', title: 'MATERIALES QUE DAN FORMA A TUS IDEAS', copy: 'Elige acabados y recibe orientación para calcular tu proyecto.', cta: 'Cotizar materiales' },
  'sala-juegos': { eyebrow: 'Competencia y comunidad', title: 'TORNEOS TODOS LOS MESES', copy: 'Reúne a tu equipo y vive cada partida al máximo.', cta: 'Ver experiencias' },
  artesanias: { eyebrow: 'Detalles con historia', title: 'REGALOS CON ALMA', copy: 'Personaliza una pieza única preparada por manos bolivianas.', cta: 'Crear mi regalo' },
  tours: { eyebrow: 'Descubre Bolivia', title: 'MÁS QUE VIAJES, EXPERIENCIAS QUE TRANSFORMAN', copy: 'Elige una ruta y prepárate con toda la información.', cta: 'Explorar destinos' },
  educacion: { eyebrow: 'Aprende a tu ritmo', title: 'MÁS QUE CURSOS, NUEVAS OPORTUNIDADES', copy: 'Encuentra la ruta que impulsa tu siguiente objetivo.', cta: 'Conocer programas' },
  inmobiliaria: { eyebrow: 'Decisiones con respaldo', title: 'INVIERTE EN TU FUTURO', copy: 'Conoce propiedades verificadas y agenda una visita.', cta: 'Buscar propiedad' },
  hotel: { eyebrow: 'Descanso y hospitalidad', title: 'ESCAPADAS QUE SE VIVEN', copy: 'Reserva una estadía pensada para reconectar y disfrutar.', cta: 'Ver disponibilidad' },
  'foto-video-dj': { eyebrow: 'Paquetes especiales', title: 'MÁS QUE EVENTOS, SON HISTORIAS', copy: 'Combina fotografía, video, música y producción para tu fecha.', cta: 'Ver paquetes' },
  'clinica-pet': { eyebrow: 'Cuidado preventivo', title: 'PREVENIR TAMBIÉN ES AMOR', copy: 'Vacunas, desparasitación y chequeos en una misma agenda.', cta: 'Conocer cuidados' },
  imprenta: { eyebrow: 'Producción para empresas', title: 'DISEÑO E IMPRESIÓN PARA HACER CRECER TU MARCA', copy: 'Configura cantidad, material y acabado con asesoría incluida.', cta: 'Solicitar cotización' },
  'alquiler-eventos': { eyebrow: 'Paquetes por fecha', title: 'GRANDES MOMENTOS COMIENZAN AQUÍ', copy: 'Mobiliario, montaje e iluminación en una sola reserva.', cta: 'Ver paquetes' },
  optica: { eyebrow: 'Protección y estilo', title: 'LENTES PARA GRANDES PLANES', copy: 'Encuentra la forma, medida y protección ideal para ti.', cta: 'Ver colección' },
  jugueteria: { eyebrow: 'Regalos por etapa', title: 'INFINITAS ETAPAS, UN SOLO LUGAR', copy: 'Elige productos seguros que acompañan su crecimiento.', cta: 'Encontrar un regalo' },
  deportes: { eyebrow: 'Combos de entrenamiento', title: 'EQUÍPATE SIN LÍMITES', copy: 'Todo lo necesario para entrenar, competir y avanzar.', cta: 'Ver combos' },
  'pet-shop': { eyebrow: 'Diversión y bienestar', title: 'JUEGA, EXPLORA, DISFRUTA JUNTOS', copy: 'Juguetes y accesorios adecuados para cada mascota.', cta: 'Ver juguetes' },
  libreria: { eyebrow: 'Listas sin complicaciones', title: 'TODO LISTO PARA VOLVER A CLASES', copy: 'Envíanos tu lista y la preparamos completa para recoger o recibir.', cta: 'Armar mi lista' },
  pasteleria: { eyebrow: 'Celebra a tu manera', title: 'MESAS DULCES PARA TUS EVENTOS', copy: 'Sabores, decoración y montaje coordinados con tu celebración.', cta: 'Ver paquetes' },
  muebleria: { eyebrow: 'Diseño para vivir mejor', title: 'ESPACIOS CON PERSONALIDAD', copy: 'Combina muebles, materiales y acabados para transformar tu hogar.', cta: 'Inspirarme' },
  repuestos: { eyebrow: 'Conduce con confianza', title: 'LISTO PARA CUALQUIER CAMINO', copy: 'Frenos, lubricantes, baterías y llantas compatibles con tu vehículo.', cta: 'Ver repuestos' },
  floreria: { eyebrow: 'Detalles con intención', title: 'HAZ ESPECIAL CUALQUIER OCASIÓN', copy: 'Elige flores, mensaje y complemento para una entrega inolvidable.', cta: 'Crear mi detalle' },
  electronica: { eyebrow: 'Equipos conectados', title: 'TECNOLOGÍA HOY, MÁS POSIBILIDADES MAÑANA', copy: 'Compara funciones, compatibilidad y garantía antes de decidir.', cta: 'Comparar equipos' },
  minimarket: { eyebrow: 'Compra fácil y rápida', title: 'TU HOGAR EN BUENAS MANOS', copy: 'Completa tu despensa y recibe productos frescos en tu zona.', cta: 'Armar mi pedido' },
  barberia: { eyebrow: 'Más que un corte', title: 'ESTILO QUE TE HACE SENTIR BIEN', copy: 'Elige profesional, fecha y horario para tu próxima visita.', cta: 'Reservar cita' },
  moda: { eyebrow: 'Ideas para combinar', title: 'TU ESTILO EN CADA MOMENTO', copy: 'Descubre prendas versátiles y encuentra tu talla ideal.', cta: 'Ver looks' },
  restaurante: { eyebrow: 'Combos para compartir', title: 'BUENA COMIDA, MEJORES MOMENTOS', copy: 'Personaliza tu plato y pide en pocos pasos.', cta: 'Elegir mi combo' },
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
  const quickConfig = premiumQuickConfigs[rubro.id];
  const runQuickAction = (action: PremiumQuickAction) => {
    if (action.behavior === 'item') {
      const product = catalog.products[action.productIndex ?? 0] ?? catalog.products[0];
      if (product) go('catalogo/' + rubro.id + '/item/' + product.id);
      return;
    }
    if (action.behavior === 'products') {
      document.getElementById('productos-' + rubro.id)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (action.behavior === 'whatsapp') {
      window.open('https://wa.me/59170000000?text=' + encodeURIComponent('Hola ' + rubro.brand + ', quisiera recibir más información.'), '_blank', 'noopener,noreferrer');
      return;
    }
    if (action.behavior === 'maps') {
      window.open('https://maps.google.com', '_blank', 'noopener,noreferrer');
      return;
    }
    notify(action.message ?? 'Función disponible en modo demostración');
  };

  return <main className={catalogStageClass(rubro.id)} style={{ '--ref': rubro.color, '--ref-accent': rubro.accent } as React.CSSProperties}>
    <section className={'reference-phone ' + (theme.categoryFirst ? 'categories-first' : '')}>
      <CatalogIconPattern primaryIcon={rubro.icon} categoryIcons={theme.categoryIcons} />
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

      {quickConfig && <section className="premium-quick-panel" aria-label={'Accesos rápidos de ' + rubro.brand}>
        <div className="premium-quick-heading">
          <span>{quickConfig.icon}</span>
          <div><small>{quickConfig.eyebrow}</small><b>{quickConfig.title}</b></div>
          <em><i /> {quickConfig.status}</em>
        </div>
        <div className="premium-quick-actions">
          {quickConfig.actions.map((action) => <button key={action.label} className={action.urgent ? 'is-urgent' : ''} onClick={() => runQuickAction(action)}>
            <span>{action.icon}</span><b>{action.label}</b><small>{action.note}</small><ChevronRight />
          </button>)}
        </div>
        <button className="premium-quick-strip" onClick={() => notify(quickConfig.stripTitle + ': ' + quickConfig.stripCopy)}><Clock3 /><span><b>{quickConfig.stripTitle}</b><small>{quickConfig.stripCopy}</small></span><ChevronRight /></button>
      </section>}

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

  return <main className={catalogStageClass(rubro.id)} style={{ '--ref': rubro.color, '--ref-accent': rubro.accent } as React.CSSProperties}>
    <section className="reference-phone reference-detail">
      <CatalogIconPattern primaryIcon={rubro.icon} categoryIcons={theme.categoryIcons} />
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
