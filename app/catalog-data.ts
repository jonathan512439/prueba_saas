export type Rubro = {
  id: string;
  name: string;
  brand: string;
  icon: string;
  family: string;
  tagline: string;
  reference: string;
  color: string;
  accent: string;
  ready?: boolean;
};

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  rating: number;
  stock: string;
  badge?: string;
  image: string;
  attributes: [string, string][];
  variants?: string[];
};

export type PilotCatalog = {
  id: string;
  hero: string;
  kicker: string;
  heroTitle: string;
  heroCopy: string;
  categories: string[];
  action: string;
  products: Product[];
};

const publicAsset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

const source = [
  ['veterinaria','Veterinaria','VetCare','🐾','Salud y bienestar','Cuidado, salud y bienestar para tus mascotas.','#087f76','#ffbd59'],
  ['calzado','Calzado','Pisada+','👟','Comercio y moda','Comodidad, diseño y actitud en cada paso.','#d65338','#ffd6bf'],
  ['licoreria','Licorerías / bebidas','Bodega Más','🥃','Alimentos y consumo','Buenas historias siempre empiezan con un brindis.','#681f25','#e3a53d'],
  ['servicios-hogar','Servicios del hogar','MiHogar Pro','🧰','Servicios','Soluciones confiables para un hogar cómodo y seguro.','#168346','#adf25d'],
  ['computacion','Computación / servicio técnico','CompuTech','💻','Tecnología','Equipos que impulsan tus ideas.','#0874b9','#63b9ff'],
  ['seguridad','Seguridad / cámaras / alarmas','SeguriTech','📹','Tecnología','Protege lo que más te importa.','#0f3e69','#ff6a3d'],
  ['carpinteria','Carpinterías / metalúrgicas','Metal & Madera','🪚','Hogar y proyectos','Diseño, fabricación y soluciones a medida.','#693f24','#f2923d'],
  ['estacionamientos','Estacionamientos / garajes','ParkPlus','🅿️','Reservas y espacios','Espacios seguros. Tranquilidad en cada llegada.','#344319','#e6c11d'],
  ['consultoria','Consultoras / servicios profesionales','ProConsult','📊','Servicios','Ideas, estrategias y resultados reales.','#244a75','#8557db'],
  ['mudanzas','Transporte / mudanzas','MoveYa','🚚','Viajes y movilidad','Hacemos tu movimiento más fácil.','#154e76','#6eb8ee'],
  ['streaming','Streaming','StreamHub Plus','▶️','Digital','Entretenimiento digital sin límites.','#2d1759','#a54dff'],
  ['entretenimiento-infantil','Entretenimiento infantil','PartyKids','🎈','Eventos','Sonrisas que crean recuerdos.','#a5166a','#ffd139'],
  ['gimnasio','Gimnasios / entrenamiento','FitLife Center','🏋️','Salud y bienestar','Disciplina, bienestar y resultados.','#153c2e','#9cda2c'],
  ['partes-electricas','Partes eléctricas / electrónicas','ElectroPartes','🔌','Tecnología','Conexiones que hacen posibles tus proyectos.','#174064','#ff8427'],
  ['cajas-americanas','Cajas americanas / saldos','BoxOutlet','📦','Comercio y moda','Oportunidades únicas en cada lote.','#704329','#fb8b2a'],
  ['agencia-viajes','Agencias de viaje','Andes Travel','✈️','Viajes y movilidad','Sueña, explora y reserva.','#144e6f','#ff7c30'],
  ['canchas','Canchas deportivas','CanchaPro','⚽','Reservas y espacios','Juega, reserva y vive el deporte.','#1b653b','#b9ed36'],
  ['mayorista','Distribuidores mayoristas / B2B','Mayorista Central','🏬','Comercio B2B','Más volumen. Más oportunidades.','#44546a','#edb331'],
  ['ceramicas','Cerámicas / pisos / construcción','PisoCasa','◫','Hogar y proyectos','Diseño, acabados y calidad.','#604b39','#d49a5d'],
  ['sala-juegos','Salas de juego','GameZone Arena','🎮','Reservas y espacios','Diversión, tecnología y grandes experiencias.','#321362','#b746ff'],
  ['artesanias','Artesanías / personalizados','Arte Andino','🏺','Regalos y diseño','Historias hechas por manos bolivianas.','#6a3f24','#e18d43'],
  ['tours','Turismo / tours','Andes Explorer','🏔️','Viajes y movilidad','Destinos que inspiran. Experiencias que conectan.','#195077','#ff863d'],
  ['educacion','Educación / cursos','Impulsa Academy','🎓','Servicios','Aprende hoy. Construye tu mañana.','#243769','#8b63f2'],
  ['inmobiliaria','Inmobiliaria','Raíz Urbana','🏠','Propiedades','Propiedades que conectan personas.','#1f5d45','#8ed29a'],
  ['hotel','Hotel / alojamiento','Nido Urbano','🛏️','Viajes y movilidad','Estadías únicas para descansar mejor.','#51382f','#d8aa7b'],
  ['foto-video-dj','Fotografía / video / DJ','Momento Pro','📷','Eventos','Momentos, música y producción.','#273e59','#deac35'],
  ['clinica-pet','Veterinaria / clínica pet','Salud Animal','🐶','Salud y bienestar','Mascotas sanas. Historias más felices.','#057b72','#58d6ca'],
  ['imprenta','Imprenta / publicidad','Imprime+','🖨️','Servicios','Ideas que se imprimen y venden.','#143d62','#ff2c9b'],
  ['alquiler-eventos','Alquiler para fiestas / eventos','Celebra Rent','🎪','Eventos','Todo para celebrar sin complicaciones.','#49335e','#bd85d9'],
  ['optica','Óptica','VisiónPlus','👓','Salud y bienestar','Monturas, lentes y estilo para cada mirada.','#145582','#57b9ea'],
  ['jugueteria','Juguetería / bebés','PequeMundo','🧸','Familia','Diversión, cuidado y regalos para cada etapa.','#91527e','#ffbe4f'],
  ['deportes','Deportes / fitness','MoveSport','🏃','Comercio y moda','Rendimiento, bienestar y movimiento.','#244758','#b7e833'],
  ['pet-shop','Pet shop / mascotas','Patitas Market','🐕','Mascotas','Todo para su bienestar.','#355722','#ef9c31'],
  ['libreria','Librería / papelería','Punto Escolar','📚','Educación','Todo para aprender, crear y organizar.','#15559a','#ffd11f'],
  ['pasteleria','Pastelería / repostería','Dulce Arte','🎂','Alimentos y consumo','Dulces momentos para celebrar.','#70352f','#ff6a86'],
  ['muebleria','Mueblería / decoración','Casa Nativa','🛋️','Hogar y proyectos','Espacios que inspiran y hacen hogar.','#5b422e','#d89b57'],
  ['repuestos','Repuestos automotrices / motos','AutoPartes Pro','🚗','Movilidad','Las piezas correctas para seguir avanzando.','#26394e','#ff7c28'],
  ['floreria','Florería / regalos','Flor & Detalle','💐','Regalos y diseño','Emociones que se entregan.','#315c38','#ed6b9a'],
  ['electronica','Electrónica / tecnología','TechMás','🎧','Tecnología','Tecnología para vivir más y mejor.','#154a78','#2e9cff'],
  ['minimarket','Minimarket / abarrotes','MiMarket','🛒','Alimentos y consumo','Tu despensa completa, siempre cerca.','#27643e','#ff8c1f'],
  ['dental','Clínica dental / salud','Sonrisa Salud','🦷','Salud y bienestar','Una sonrisa más saludable empieza aquí.','#1475a8','#62c7f4'],
  ['barberia','Barbería / belleza','Dösoren','✂️','Salud y bienestar','Un buen estilo siempre habla de ti.','#352c25','#d2a254'],
  ['moda','Moda / boutique','Luna Boutique','👗','Comercio y moda','Estilo que te acompaña siempre.','#715144','#d8a58f'],
  ['ferreteria','Ferretería / hogar','FerreTodo','🔨','Hogar y proyectos','Herramientas para grandes proyectos.','#26313a','#ff7a1a'],
  ['restaurante','Restaurante / comida','Sabor Nuestro','🍔','Alimentos y consumo','Del celular a tu mesa.','#144f4b','#ff753b'],
] as const;

export const rubros: Rubro[] = source.map((item, index) => ({
  id: item[0], name: item[1], brand: item[2], icon: item[3], family: item[4],
  tagline: item[5], color: item[6], accent: item[7],
  reference: publicAsset(`/references/${String(index + 1).padStart(2, '0')}.jpeg`),
  ready: ['calzado', 'dental', 'canchas', 'ferreteria'].includes(item[0]),
}));

const photo = (name: string) => publicAsset(`/images/${name}-hero.png`);

export const pilotCatalogs: Record<string, PilotCatalog> = {
  calzado: {
    id: 'calzado', hero: photo('calzado'), kicker: 'Nueva colección · 2026',
    heroTitle: 'Comodidad que se mueve contigo.',
    heroCopy: 'Siluetas urbanas, materiales ligeros y el ajuste perfecto para cada paso.',
    categories: ['Todo', 'Urbanas', 'Running', 'Botas', 'Sandalias', 'Accesorios'], action: 'Comprar ahora',
    products: [
      { id:'runner-x1', name:'Urban Step Runner X1', subtitle:'Zapatilla unisex · tejido transpirable', price:289, oldPrice:329, rating:4.8, stock:'12 disponibles', badge:'Más vendido', image:photo('calzado'), variants:['38','39','40','41','42'], attributes:[['Material','Malla técnica'],['Suela','Antideslizante'],['Uso','Diario / running'],['Garantía','6 meses']] },
      { id:'terra-knit', name:'Terra Knit Motion', subtitle:'Ligera, flexible y urbana', price:345, rating:4.7, stock:'8 disponibles', badge:'Nuevo', image:photo('calzado'), variants:['37','38','39','40'], attributes:[['Material','Tejido premium'],['Color','Negro'],['Género','Unisex'],['Origen','Importado']] },
      { id:'street-core', name:'Street Core Mono', subtitle:'Perfil casual contemporáneo', price:245, rating:4.6, stock:'Últimas 4', image:photo('calzado'), variants:['39','40','41','42','43'], attributes:[['Material','Sintético'],['Plantilla','Memory foam'],['Estilo','Casual'],['Temporada','Todo el año']] },
      { id:'runner-pro', name:'Runner Pro Carbon', subtitle:'Respuesta y amortiguación avanzada', price:420, rating:4.9, stock:'6 disponibles', badge:'Premium', image:photo('calzado'), variants:['40','41','42','43'], attributes:[['Material','Malla técnica'],['Peso','265 g'],['Uso','Entrenamiento'],['Suela','Carbon grip']] },
    ],
  },
  dental: {
    id: 'dental', hero: photo('dental'), kicker: 'Profesionales verificados',
    heroTitle: 'Tu sonrisa, en buenas manos.',
    heroCopy: 'Tratamientos claros, horarios disponibles y atención cercana en un solo lugar.',
    categories: ['Todo', 'Limpieza', 'Ortodoncia', 'Implantes', 'Estética', 'Consulta'], action: 'Agendar cita',
    products: [
      { id:'limpieza', name:'Limpieza dental profesional', subtitle:'Evaluación, limpieza y pulido', price:120, rating:4.9, stock:'Hoy · 3 horarios', badge:'Recomendado', image:photo('dental'), variants:['10:00','11:30','16:00'], attributes:[['Duración','40 min'],['Profesional','Dra. Mariana López'],['Preparación','No requerida'],['Sede','Calacoto']] },
      { id:'valoracion', name:'Valoración odontológica', subtitle:'Diagnóstico y plan personalizado', price:80, rating:4.8, stock:'Mañana · 5 horarios', image:photo('dental'), variants:['09:00','14:30','17:00'], attributes:[['Duración','30 min'],['Incluye','Diagnóstico'],['Edad','Todas'],['Modalidad','Presencial']] },
      { id:'blanqueamiento', name:'Blanqueamiento clínico', subtitle:'Sesión profesional de alta eficacia', price:620, rating:4.8, stock:'Jueves · 2 horarios', badge:'Popular', image:photo('dental'), variants:['11:00','15:30'], attributes:[['Duración','60 min'],['Sesiones','1 a 2'],['Control','Incluido'],['Sede','Calacoto']] },
      { id:'ortodoncia', name:'Consulta de ortodoncia', subtitle:'Evaluación especializada y escaneo', price:150, rating:4.9, stock:'Viernes · 4 horarios', image:photo('dental'), variants:['09:30','12:00','16:30'], attributes:[['Duración','45 min'],['Profesional','Dr. Gabriel Paz'],['Incluye','Escaneo'],['Resultado','Plan digital']] },
    ],
  },
  canchas: {
    id: 'canchas', hero: photo('canchas'), kicker: 'Reserva inmediata',
    heroTitle: 'La cancha ideal para tu próximo partido.',
    heroCopy: 'Horarios en tiempo real, iluminación profesional y espacios listos para jugar.',
    categories: ['Todo', 'Fútbol 5', 'Fútbol 7', 'Pádel', 'Básquet', 'Vóley'], action: 'Reservar cancha',
    products: [
      { id:'sur-5', name:'Cancha sintética 5 vs 5', subtitle:'Zona Sur · césped premium', price:120, rating:4.9, stock:'Hoy · 6 horarios', badge:'Más reservada', image:photo('canchas'), variants:['18:00','19:00','20:00','21:00'], attributes:[['Superficie','Césped sintético'],['Medidas','30 × 20 m'],['Iluminación','LED'],['Incluye','Balón y petos']] },
      { id:'norte-7', name:'Arena Norte 7 vs 7', subtitle:'Achumani · graderías', price:180, rating:4.8, stock:'Hoy · 3 horarios', image:photo('canchas'), variants:['17:00','19:00','21:00'], attributes:[['Superficie','Sintética'],['Capacidad','14 jugadores'],['Duchas','Sí'],['Parqueo','Gratuito']] },
      { id:'padel-one', name:'Pádel One panorámica', subtitle:'Calacoto · cancha cubierta', price:140, rating:4.7, stock:'Mañana · 8 horarios', badge:'Nuevo', image:photo('canchas'), variants:['08:00','10:00','18:00','20:00'], attributes:[['Superficie','Pasto fibrilado'],['Jugadores','4'],['Cubierta','Sí'],['Raquetas','Opcional']] },
      { id:'basket-central', name:'Basket Central', subtitle:'Centro · parquet profesional', price:160, rating:4.8, stock:'Sábado · 5 horarios', image:photo('canchas'), variants:['09:00','12:00','15:00'], attributes:[['Superficie','Parquet'],['Capacidad','10 jugadores'],['Vestuarios','Sí'],['Marcador','Digital']] },
    ],
  },
  ferreteria: {
    id: 'ferreteria', hero: photo('ferreteria'), kicker: 'Stock verificado hoy',
    heroTitle: 'Herramientas para proyectos que avanzan.',
    heroCopy: 'Especificaciones claras, disponibilidad real y asesoría para elegir con confianza.',
    categories: ['Todo', 'Herramientas', 'Construcción', 'Plomería', 'Electricidad', 'Seguridad'], action: 'Solicitar cotización',
    products: [
      { id:'taladro-20v', name:'Taladro inalámbrico 20 V', subtitle:'2 baterías + cargador + maletín', price:550, oldPrice:620, rating:4.9, stock:'9 unidades', badge:'Oferta', image:photo('ferreteria'), variants:['Kit completo','Solo herramienta'], attributes:[['Mandril','13 mm'],['Velocidad','0–1500 rpm'],['Torque','42 Nm'],['Garantía','12 meses']] },
      { id:'cemento', name:'Cemento Portland IP-40', subtitle:'Bolsa de 50 kg · alta resistencia', price:85, rating:4.7, stock:'120 bolsas', image:photo('ferreteria'), variants:['1 bolsa','Pack × 10'], attributes:[['Peso','50 kg'],['Uso','Construcción'],['Tipo','IP-40'],['Entrega','Disponible']] },
      { id:'llaves', name:'Juego de llaves 12 piezas', subtitle:'Acero cromo vanadio', price:195, rating:4.8, stock:'16 unidades', badge:'Taller', image:photo('ferreteria'), variants:['Métrico','Mixto'], attributes:[['Piezas','12'],['Material','Cr-V'],['Estuche','Incluido'],['Uso','Profesional']] },
      { id:'metro', name:'Flexómetro reforzado 8 m', subtitle:'Cinta ancha con freno seguro', price:68, rating:4.6, stock:'24 unidades', image:photo('ferreteria'), variants:['5 m','8 m'], attributes:[['Longitud','8 m'],['Cinta','25 mm'],['Carcasa','Reforzada'],['Unidad','Pieza']] },
    ],
  },
};

export const families = [...new Set(rubros.map((r) => r.family))];

export function getCatalog(rubro: Rubro): PilotCatalog {
  if (pilotCatalogs[rubro.id]) return pilotCatalogs[rubro.id];
  return {
    id: rubro.id,
    hero: rubro.reference,
    kicker: 'Vista de referencia',
    heroTitle: rubro.tagline,
    heroCopy: `Explora cómo se organizará el catálogo de ${rubro.name.toLowerCase()} dentro de la plataforma.`,
    categories: ['Todo', 'Destacados', 'Servicios', 'Novedades', 'Ofertas'],
    action: 'Consultar por WhatsApp',
    products: [
      { id:'demo-1', name:`Opción destacada de ${rubro.name}`, subtitle:'Presentación visual del catálogo', price:120, rating:4.8, stock:'Disponible', badge:'Demo', image:rubro.reference, variants:['Estándar','Premium'], attributes:[['Categoría',rubro.name],['Disponibilidad','Inmediata'],['Atención','WhatsApp'],['Estado','Vista visual']] },
      { id:'demo-2', name:'Servicio recomendado', subtitle:'Información clara y organizada', price:180, rating:4.7, stock:'Disponible', image:rubro.reference, variants:['Opción A','Opción B'], attributes:[['Rubro',rubro.name],['Modalidad','A elección'],['Respuesta','Rápida'],['Cobertura','La Paz']] },
      { id:'demo-3', name:'Alternativa especial', subtitle:'Configuración adaptada al rubro', price:250, rating:4.9, stock:'Consultar', image:rubro.reference, variants:['Básico','Completo'], attributes:[['Tipo','Personalizable'],['Entrega','A coordinar'],['Asesoría','Incluida'],['Canal','WhatsApp']] },
    ],
  };
}
