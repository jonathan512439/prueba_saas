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
  ready: [
    'veterinaria', 'calzado', 'licoreria', 'servicios-hogar', 'computacion',
    'seguridad', 'carpinteria', 'estacionamientos', 'consultoria',
    'mudanzas', 'streaming', 'entretenimiento-infantil', 'gimnasio',
    'partes-electricas', 'cajas-americanas', 'agencia-viajes',
    'mayorista', 'ceramicas', 'sala-juegos', 'artesanias', 'tours',
    'educacion', 'inmobiliaria', 'hotel', 'foto-video-dj', 'clinica-pet',
    'imprenta', 'alquiler-eventos', 'optica', 'jugueteria', 'deportes',
    'pet-shop', 'dental', 'canchas', 'ferreteria',
  ].includes(item[0]),
}));

const photo = (name: string) => publicAsset(`/images/${name}-hero.png`);

export const pilotCatalogs: Record<string, PilotCatalog> = {
  veterinaria: {
    id: 'veterinaria', hero: photo('veterinaria'), kicker: 'Salud y bienestar animal',
    heroTitle: 'Atención confiable para cada patita.',
    heroCopy: 'Productos, vacunas y servicios veterinarios con orientación profesional.',
    categories: ['Todo', 'Consultas', 'Vacunas', 'Alimentos', 'Farmacia', 'Antiparasitarios', 'Accesorios'], action: 'Agendar atención',
    products: [
      { id:'vacuna-quintuple', name:'Vacuna quíntuple canina', subtitle:'Protección esencial · laboratorio certificado', price:120, rating:4.9, stock:'Disponible hoy', badge:'Recomendado', image:photo('veterinaria'), variants:['10:00','11:30','16:00'], attributes:[['Especie','Perro'],['Etapa','Cachorro / adulto'],['Dosis','1 ml'],['Aplicación','Subcutánea'],['Edad recomendada','Desde 6 semanas'],['Requiere valoración','Sí']] },
      { id:'pro-plan-puppy', name:'Alimento Pro Puppy 3 kg', subtitle:'Nutrición completa para cachorros', price:165, rating:4.8, stock:'14 bolsas', image:photo('veterinaria'), variants:['3 kg','7.5 kg'], attributes:[['Especie','Perro'],['Etapa','Cachorro'],['Presentación','Bolsa sellada'],['Marca','NutriPet'],['Proteína','Alta'],['Origen','Importado']] },
      { id:'pipeta-gato', name:'Pipeta antipulgas para gato', subtitle:'Protección mensual · uso externo', price:48, rating:4.7, stock:'22 unidades', badge:'Más vendido', image:photo('veterinaria'), variants:['Hasta 4 kg','4 a 8 kg'], attributes:[['Especie','Gato'],['Duración','30 días'],['Aplicación','Tópica'],['Edad recomendada','Desde 8 semanas'],['Presentación','1 pipeta'],['Precaución','Uso veterinario']] },
      { id:'consulta-general', name:'Consulta veterinaria general', subtitle:'Valoración clínica y plan de cuidado', price:90, rating:4.9, stock:'5 horarios hoy', image:photo('veterinaria'), variants:['09:30','14:00','17:30'], attributes:[['Duración','30 min'],['Profesional','Dra. Camila Rojas'],['Incluye','Valoración completa'],['Especies','Perros y gatos'],['Modalidad','Presencial'],['Sede','Zona Sur']] },
    ],
  },
  licoreria: {
    id: 'licoreria', hero: photo('licoreria'), kicker: 'Sabores para celebrar',
    heroTitle: 'Brinda sin límites.',
    heroCopy: 'Selección premium, stock actualizado y entrega rápida para cada ocasión.',
    categories: ['Todo', 'Cervezas', 'Vinos', 'Whisky', 'Ron', 'Gin', 'Sin alcohol'], action: 'Ver ofertas',
    products: [
      { id:'whisky-reserva', name:'Whisky Reserva Black 750 ml', subtitle:'Whisky escocés premium · 12 años', price:245, rating:4.8, stock:'En stock', badge:'Listo para regalo', image:photo('licoreria'), variants:['750 ml','1 litro'], attributes:[['Marca','North Crown'],['Tipo','Blended Scotch'],['Graduación','40% Alc./Vol.'],['Origen','Escocia'],['Sabor','Madera, vainilla y humo'],['Servicio','Con hielo / solo']] },
      { id:'vino-malbec', name:'Vino Gran Altura Malbec', subtitle:'Tinto seco · cosecha especial', price:135, rating:4.7, stock:'18 botellas', image:photo('licoreria'), variants:['750 ml','Caja × 6'], attributes:[['Variedad','Malbec'],['Graduación','13.5% Alc./Vol.'],['Origen','Mendoza'],['Temperatura','16–18 °C'],['Maridaje','Carnes y quesos'],['Presentación','750 ml']] },
      { id:'cerveza-artesanal', name:'Pack cerveza artesanal', subtitle:'Selección IPA, Lager y Amber', price:92, rating:4.6, stock:'11 packs', badge:'Oferta', image:photo('licoreria'), variants:['Pack × 6','Pack × 12'], attributes:[['Tipo','Cerveza artesanal'],['Graduación','4.8–6.2%'],['Origen','Bolivia'],['Presentación','330 ml'],['Servicio','4–7 °C'],['Incluye','3 variedades']] },
      { id:'gin-botanico', name:'Gin Botánico Andino 700 ml', subtitle:'Enebro, cítricos y hierbas de altura', price:198, rating:4.9, stock:'7 botellas', image:photo('licoreria'), variants:['700 ml','Kit gin tonic'], attributes:[['Tipo','London Dry'],['Graduación','42% Alc./Vol.'],['Origen','Bolivia'],['Notas','Cítricas y herbales'],['Servicio','Gin tonic'],['Restricción','Venta +18']] },
    ],
  },
  'servicios-hogar': {
    id: 'servicios-hogar', hero: photo('servicios-hogar'), kicker: 'Profesionales verificados',
    heroTitle: 'Tu hogar en buenas manos.',
    heroCopy: 'Soluciones rápidas, seguras y garantizadas para cada necesidad.',
    categories: ['Todo', 'Limpieza', 'Plomería', 'Electricidad', 'Reparaciones', 'Mantenimiento', 'Jardinería'], action: 'Solicitar servicio',
    products: [
      { id:'fugas-agua', name:'Reparación de fugas de agua', subtitle:'Lavamanos, fregaderos y tuberías', price:80, rating:4.9, stock:'Hoy · programable', badge:'Más solicitado', image:photo('servicios-hogar'), variants:['Hoy 14:00','Hoy 17:00','Mañana 09:00'], attributes:[['Categoría','Plomería'],['Tipo','Reparación'],['Tiempo estimado','1–2 horas'],['Incluye','Revisión + mano de obra'],['Garantía','30 días'],['Zona','La Paz y El Alto']] },
      { id:'limpieza-profunda', name:'Limpieza profunda de casa', subtitle:'Cocina, baños y áreas comunes', price:150, rating:4.8, stock:'3 cupos mañana', image:photo('servicios-hogar'), variants:['Departamento','Casa'], attributes:[['Categoría','Limpieza'],['Duración','4–6 horas'],['Personal','2 profesionales'],['Materiales','Incluidos'],['Modalidad','A domicilio'],['Garantía','Satisfacción']] },
      { id:'tablero-electrico', name:'Revisión de tablero eléctrico', subtitle:'Diagnóstico y corrección segura', price:120, rating:4.8, stock:'Disponible esta semana', badge:'Certificado', image:photo('servicios-hogar'), variants:['Diagnóstico','Diagnóstico + reparación'], attributes:[['Categoría','Electricidad'],['Duración','1–3 horas'],['Técnico','Certificado'],['Incluye','Informe de revisión'],['Materiales','Según necesidad'],['Zona','Área urbana']] },
      { id:'mantenimiento-integral', name:'Mantenimiento integral', subtitle:'Pequeñas reparaciones en una visita', price:190, rating:4.7, stock:'Agenda abierta', image:photo('servicios-hogar'), variants:['Media jornada','Jornada completa'], attributes:[['Categoría','Mantenimiento'],['Cobertura','Hasta 5 tareas'],['Modalidad','A domicilio'],['Herramientas','Incluidas'],['Repuestos','No incluidos'],['Garantía','30 días']] },
    ],
  },
  computacion: {
    id: 'computacion', hero: photo('computacion'), kicker: 'Tecnología y soporte',
    heroTitle: 'Equipos que impulsan tus ideas.',
    heroCopy: 'Laptops, componentes y servicio técnico con información completa.',
    categories: ['Todo', 'Laptops', 'Computadoras', 'Componentes', 'Monitores', 'Accesorios', 'Servicio técnico'], action: 'Ver productos',
    products: [
      { id:'core-i5-12400f', name:'Procesador Core i5-12400F', subtitle:'12ª generación · alto rendimiento', price:1850, rating:4.8, stock:'En stock', badge:'Más vendido', image:photo('computacion'), variants:['Box','Tray + cooler'], attributes:[['Marca','Intel'],['Modelo','i5-12400F'],['Núcleos / hilos','6 / 12'],['Frecuencia','Hasta 4.4 GHz'],['Socket','LGA 1700'],['Garantía','12 meses']] },
      { id:'laptop-ideapad', name:'Laptop ProBook 15 Ryzen 5', subtitle:'8 GB RAM · SSD 512 GB · 15.6”', price:3950, rating:4.7, stock:'6 unidades', image:photo('computacion'), variants:['8 GB RAM','16 GB RAM'], attributes:[['Procesador','Ryzen 5 7530U'],['Memoria','8 GB DDR4'],['Almacenamiento','512 GB SSD'],['Pantalla','15.6” Full HD'],['Sistema','Windows 11'],['Garantía','1 año']] },
      { id:'mouse-master', name:'Mouse inalámbrico Master 3S', subtitle:'Precisión profesional y conexión múltiple', price:720, rating:4.9, stock:'9 unidades', badge:'Premium', image:photo('computacion'), variants:['Grafito','Gris claro'], attributes:[['Conectividad','Bluetooth / USB'],['Sensor','8.000 DPI'],['Batería','Hasta 70 días'],['Compatibilidad','Windows / macOS'],['Incluye','Cable USB-C'],['Condición','Nuevo']] },
      { id:'diagnostico-pc', name:'Diagnóstico técnico de PC', subtitle:'Hardware, software y reporte completo', price:100, rating:4.8, stock:'Turnos disponibles', image:photo('computacion'), variants:['En taller','A domicilio'], attributes:[['Tipo','Servicio técnico'],['Duración','24–48 horas'],['Incluye','Informe técnico'],['Equipos','Laptop / PC'],['Repuestos','Cotización aparte'],['Garantía','15 días']] },
    ],
  },
  seguridad: {
    id: 'seguridad', hero: photo('seguridad'), kicker: 'Seguridad para tu espacio',
    heroTitle: 'Protege lo que más te importa.',
    heroCopy: 'Cámaras, alarmas y soluciones instaladas por especialistas.',
    categories: ['Todo', 'Cámaras IP', 'Cámaras analógicas', 'Alarmas', 'Videoporteros', 'Grabadores', 'Accesorios'], action: 'Ver catálogo',
    products: [
      { id:'camara-4mp', name:'Cámara IP Bullet 4 MP', subtitle:'Visión nocturna · exterior IP67', price:920, rating:4.8, stock:'En stock', badge:'Más vendido', image:photo('seguridad'), variants:['2.8 mm','3.6 mm'], attributes:[['Marca','SecureVision'],['Modelo','SV-B4P'],['Resolución','4 MP (2560 × 1440)'],['Visión nocturna','Hasta 30 m'],['Conectividad','PoE / RJ45'],['Resistencia','IP67']] },
      { id:'camara-wifi', name:'Cámara interior WiFi 2K', subtitle:'Audio bidireccional y seguimiento', price:350, rating:4.7, stock:'15 unidades', image:photo('seguridad'), variants:['Unidad','Pack × 2'], attributes:[['Tipo','Cámara IP PTZ'],['Resolución','2K'],['Conectividad','WiFi 2.4 GHz'],['Almacenamiento','microSD / nube'],['Funciones','Movimiento + audio'],['Uso','Interior']] },
      { id:'kit-alarma', name:'Kit de alarma residencial Pro', subtitle:'Central, sensores y sirena inalámbrica', price:1950, rating:4.9, stock:'Instalación disponible', badge:'Kit completo', image:photo('seguridad'), variants:['8 zonas','16 zonas'], attributes:[['Tipo','Alarma inalámbrica'],['Incluye','Central + 6 sensores'],['Conectividad','WiFi / 4G'],['Control','App móvil'],['Batería','Respaldo 12 h'],['Garantía','2 años']] },
      { id:'videoportero', name:'Videoportero inteligente 7”', subtitle:'Pantalla táctil y apertura remota', price:1250, rating:4.8, stock:'8 unidades', image:photo('seguridad'), variants:['1 monitor','2 monitores'], attributes:[['Resolución','1080p'],['Pantalla','7 pulgadas'],['Conectividad','Cableada / WiFi'],['Visión nocturna','Sí'],['Uso','Casa / oficina'],['Incluye','Fuente y soporte']] },
    ],
  },
  carpinteria: {
    id: 'carpinteria', hero: photo('carpinteria'), kicker: 'Hecho a medida',
    heroTitle: 'Fabricamos ideas que duran.',
    heroCopy: 'Madera, metal y acabados personalizados para transformar tu espacio.',
    categories: ['Todo', 'Muebles', 'Puertas', 'Closets', 'Cocinas', 'Estructuras', 'Proyectos'], action: 'Solicitar cotización',
    products: [
      { id:'escritorio-industrial', name:'Escritorio industrial a medida', subtitle:'Madera natural y estructura metálica', price:850, rating:4.9, stock:'Fabricación 5–7 días', badge:'Recomendado', image:photo('carpinteria'), variants:['Roble','Nogal','Negro mate','Gris'], attributes:[['Material','MDF + estructura metálica'],['Acabado','Mate / sellado protector'],['Medidas','120 × 60 × 75 cm'],['Personalización','Sí, por encargo'],['Uso','Oficina / estudio'],['Garantía','3 meses']] },
      { id:'puerta-reforzada', name:'Puerta metálica reforzada', subtitle:'Seguridad, diseño y acabado premium', price:1450, rating:4.8, stock:'Cotización previa', image:photo('carpinteria'), variants:['Negro mate','Madera nogal','Gris grafito'], attributes:[['Material','Acero calibre 18'],['Medidas','A requerimiento'],['Acabado','Pintura electrostática'],['Incluye','Marco y cerradura'],['Instalación','Opcional'],['Tiempo','7–10 días']] },
      { id:'mueble-lavabo', name:'Mueble bajo lavabo', subtitle:'Almacenamiento compacto resistente a humedad', price:680, rating:4.7, stock:'Agenda abierta', image:photo('carpinteria'), variants:['Blanco','Roble claro','Nogal'], attributes:[['Material','Melamina RH'],['Medidas','80 × 45 × 60 cm'],['Acabado','Canto PVC'],['Personalización','Sí'],['Instalación','Incluida'],['Tiempo','5 días']] },
      { id:'cocina-integral', name:'Cocina integral personalizada', subtitle:'Diseño, fabricación e instalación', price:5800, rating:4.9, stock:'Visita técnica requerida', badge:'Proyecto', image:photo('carpinteria'), variants:['Melamina premium','Madera sólida','Mixta'], attributes:[['Tipo','Proyecto integral'],['Medidas','Según ambiente'],['Incluye','Diseño 3D'],['Herrajes','Cierre suave'],['Fabricación','20–30 días'],['Garantía','12 meses']] },
    ],
  },
  estacionamientos: {
    id: 'estacionamientos', hero: photo('estacionamientos'), kicker: 'Disponible 24/7',
    heroTitle: 'Tu vehículo en buenas manos.',
    heroCopy: 'Espacios seguros, accesibles y siempre cerca de tu destino.',
    categories: ['Todo', 'Autos', 'Motos', 'Bicicletas', 'Camionetas', 'Techados', '24 horas'], action: 'Ver ubicaciones',
    products: [
      { id:'centro-empresarial', name:'Estacionamiento Centro Empresarial', subtitle:'Centro · seguro, cómodo y techado', price:15, rating:4.8, stock:'32 espacios libres', badge:'Disponible', image:photo('estacionamientos'), variants:['1 hora','3 horas','Día completo'], attributes:[['Ubicación','Av. San Martín 123, Centro'],['Tipo','Techado'],['Capacidad','150 vehículos'],['Altura máxima','2.2 metros'],['Horario','24 horas, todos los días'],['Pago','Efectivo, QR, tarjeta']] },
      { id:'garaje-historico', name:'Garaje Centro Histórico', subtitle:'A dos cuadras de Plaza Murillo', price:15, rating:4.7, stock:'12 espacios libres', image:photo('estacionamientos'), variants:['1 hora','Media jornada','Día completo'], attributes:[['Zona','Centro Histórico'],['Tipo','Cubierto'],['Seguridad','Cámaras + guardia'],['Horario','06:00–23:00'],['Vehículos','Autos / motos'],['Reserva','Opcional']] },
      { id:'parqueo-norte', name:'Parqueo Norte 24/7', subtitle:'Acceso controlado y lavado opcional', price:12, rating:4.6, stock:'45 espacios libres', badge:'Mejor tarifa', image:photo('estacionamientos'), variants:['1 hora','Noche','Mensual'], attributes:[['Zona','Zona Norte'],['Tipo','Al aire libre'],['Capacidad','90 vehículos'],['Seguridad','Control QR'],['Servicio','Lavado opcional'],['Pago','QR / efectivo']] },
      { id:'equipetrol', name:'Parking Equipetrol', subtitle:'Ingreso amplio para camionetas', price:20, rating:4.9, stock:'8 espacios libres', image:photo('estacionamientos'), variants:['1 hora','3 horas','Día completo'], attributes:[['Zona','Equipetrol'],['Tipo','Techado'],['Altura máxima','2.5 metros'],['Accesibilidad','Sí'],['Horario','24/7'],['Seguridad','Cámaras + seguro']] },
    ],
  },
  consultoria: {
    id: 'consultoria', hero: photo('consultoria'), kicker: 'Profesionales verificados',
    heroTitle: 'Ideas, estrategias y resultados.',
    heroCopy: 'Servicios profesionales para impulsar el crecimiento de tu empresa.',
    categories: ['Todo', 'Estrategia', 'Finanzas', 'Marketing', 'Recursos Humanos', 'Tecnología', 'Legal'], action: 'Ver servicios',
    products: [
      { id:'transformacion-digital', name:'Consultoría en transformación digital', subtitle:'Procesos, tecnología y cultura organizacional', price:1500, rating:4.9, stock:'Agenda disponible', badge:'Más solicitado', image:photo('consultoria'), variants:['Presencial','Online','Híbrida'], attributes:[['Área','Transformación digital'],['Duración','4–8 semanas'],['Incluye','Diagnóstico + plan + asesoría'],['Público','PyMEs / empresas'],['Consultor','Equipo certificado'],['Soporte','30 días posteriores']] },
      { id:'planificacion', name:'Planificación estratégica empresarial', subtitle:'Define el rumbo de tu negocio con expertos', price:1200, rating:4.8, stock:'3 cupos este mes', image:photo('consultoria'), variants:['Online','Presencial'], attributes:[['Área','Estrategia'],['Tipo','Asesoría'],['Duración','4 sesiones'],['Incluye','Plan de acción'],['Público','Empresas / emprendedores'],['Materiales','Plantillas e informe']] },
      { id:'asesoria-contable', name:'Asesoría contable y tributaria', subtitle:'Obligaciones claras y decisiones seguras', price:800, rating:4.8, stock:'Inicio inmediato', image:photo('consultoria'), variants:['Mensual','Trimestral'], attributes:[['Área','Finanzas'],['Modalidad','Online / presencial'],['Incluye','Revisión + reporte'],['Cobertura','Todo el país'],['Equipo','Contadores certificados'],['Seguimiento','Mensual']] },
      { id:'marketing-growth', name:'Estrategia de marketing Growth', subtitle:'Adquisición, conversión y medición', price:1350, rating:4.7, stock:'2 cupos disponibles', badge:'Nuevo', image:photo('consultoria'), variants:['Plan esencial','Plan integral'], attributes:[['Área','Marketing'],['Duración','6 semanas'],['Incluye','Auditoría + roadmap'],['Entregables','Informe y tablero'],['Público','PyMEs'],['Soporte','45 días']] },
    ],
  },
  mudanzas: {
    id: 'mudanzas', hero: photo('mudanzas'), kicker: 'Cobertura nacional y agenda disponible',
    heroTitle: 'Hacemos tu movimiento más fácil.',
    heroCopy: 'Mudanzas, carga y embalaje con personal capacitado y seguimiento en cada traslado.',
    categories: ['Todo', 'Mudanzas', 'Carga', 'Encomiendas', 'Embalaje', 'Montaje', 'Camiones'], action: 'Ver servicios',
    products: [
      { id:'mudanza-residencial', name:'Mudanza residencial 1–3 ambientes', subtitle:'Personal, camión y protección básica', price:1200, rating:4.9, stock:'Disponible esta semana', badge:'Más solicitado', image:photo('mudanzas'), variants:['1 ambiente','2 ambientes','3 ambientes'], attributes:[['Tipo de servicio','Mudanza residencial'],['Ambientes','1 a 3'],['Incluye','Personal + camión + protección'],['Tiempo estimado','3–6 horas'],['Capacidad','Hasta 3 toneladas'],['Cobertura','La Paz y alrededores']] },
      { id:'carga-nacional', name:'Transporte de carga interdepartamental', subtitle:'La Paz, Cochabamba y Santa Cruz', price:2500, rating:4.8, stock:'Salida programable', image:photo('mudanzas'), variants:['Carga compartida','Camión exclusivo'], attributes:[['Tipo','Transporte de carga'],['Capacidad','Hasta 5 toneladas'],['Seguimiento','Durante la ruta'],['Seguro','Cobertura básica'],['Entrega','48–72 horas'],['Rutas','Eje troncal']] },
      { id:'embalaje-completo', name:'Embalaje completo de hogar', subtitle:'Cajas, protección y etiquetado', price:380, rating:4.8, stock:'Agenda abierta', badge:'Protección extra', image:photo('mudanzas'), variants:['Hasta 20 cajas','Hasta 40 cajas'], attributes:[['Servicio','Embalaje'],['Materiales','Cajas + film + esquineros'],['Personal','2 especialistas'],['Duración','2–4 horas'],['Objetos frágiles','Protección especial'],['Retiro','Opcional']] },
      { id:'montaje-muebles', name:'Desmontaje y montaje de muebles', subtitle:'Traslado cuidadoso y reinstalación', price:450, rating:4.7, stock:'3 cupos disponibles', image:photo('mudanzas'), variants:['Servicio básico','Servicio integral'], attributes:[['Servicio','Montaje y desmontaje'],['Incluye','Herramientas y protección'],['Muebles','Hasta 6 piezas'],['Duración','3–5 horas'],['Garantía','30 días'],['Cobertura','Área urbana']] },
    ],
  },
  streaming: {
    id: 'streaming', hero: photo('streaming'), kicker: 'Activación rápida y soporte directo',
    heroTitle: 'Entretenimiento para cada momento.',
    heroCopy: 'Planes digitales claros para disfrutar películas, series, música y deportes en tus dispositivos.',
    categories: ['Todo', 'Películas', 'Series', 'Deportes', 'Música', 'TV en vivo', 'Infantil'], action: 'Ver planes',
    products: [
      { id:'plan-familiar', name:'Plan Familiar Premium', subtitle:'4 pantallas · calidad Full HD / 4K', price:35, rating:4.8, stock:'Activación inmediata', badge:'Más elegido', image:photo('streaming'), variants:['Individual','Dúo','Familiar'], attributes:[['Tipo de plan','Familiar'],['Pantallas simultáneas','4'],['Calidad','Full HD / 4K'],['Duración','30 días'],['Dispositivos','TV, celular, tablet, PC'],['Perfiles','5']] },
      { id:'cine-series', name:'Plan Cine y Series', subtitle:'Estrenos, clásicos y contenido familiar', price:25, rating:4.7, stock:'Disponible', image:photo('streaming'), variants:['1 pantalla','2 pantallas'], attributes:[['Contenido','Cine y series'],['Calidad','HD / Full HD'],['Duración','30 días'],['Activación','Inmediata'],['Soporte','WhatsApp'],['Renovación','Manual']] },
      { id:'musica-premium', name:'Música Premium', subtitle:'Audio sin anuncios y listas ilimitadas', price:18, rating:4.8, stock:'Disponible', image:photo('streaming'), variants:['Individual','Dúo','Familiar'], attributes:[['Tipo','Música'],['Calidad','Audio alta calidad'],['Descargas','Disponibles'],['Dispositivos','Móvil, PC, TV'],['Duración','30 días'],['Activación','Inmediata']] },
      { id:'deportes-vivo', name:'Deportes en vivo', subtitle:'Eventos, repeticiones y programación deportiva', price:29, rating:4.6, stock:'Activación hoy', badge:'Temporada', image:photo('streaming'), variants:['1 pantalla','3 pantallas'], attributes:[['Contenido','Deportes'],['Transmisión','En vivo'],['Calidad','Full HD'],['Guía','Programación incluida'],['Compatibilidad','Smart TV y móvil'],['Soporte','Todos los días']] },
    ],
  },
  'entretenimiento-infantil': {
    id: 'entretenimiento-infantil', hero: photo('entretenimiento-infantil'), kicker: 'Fiestas seguras y memorables',
    heroTitle: 'Celebra a lo grande.',
    heroCopy: 'Juegos, decoración y shows preparados para crear una experiencia inolvidable.',
    categories: ['Todo', 'Cumpleaños', 'Inflables', 'Shows', 'Decoración', 'Paquetes', 'Talleres'], action: 'Ver paquetes',
    products: [
      { id:'castillo-inflable', name:'Castillo inflable premium', subtitle:'Diversión segura para grandes aventuras', price:350, rating:4.9, stock:'Fechas disponibles', badge:'Favorito', image:photo('entretenimiento-infantil'), variants:['4 horas','6 horas','Día completo'], attributes:[['Tipo','Alquiler de inflable'],['Dimensiones','4 × 3 × 3 m'],['Edad recomendada','3 a 12 años'],['Capacidad','Hasta 8 niños'],['Incluye','Montaje y supervisión'],['Cobertura','La Paz y alrededores']] },
      { id:'decoracion-tematica', name:'Decoración temática personalizada', subtitle:'Mesa principal, globos y ambientación', price:450, rating:4.8, stock:'Reserva anticipada', image:photo('entretenimiento-infantil'), variants:['Princesas','Aventura','Espacio','Personalizada'], attributes:[['Servicio','Decoración'],['Incluye','Arco + mesa + accesorios'],['Montaje','Incluido'],['Personalización','Nombre y colores'],['Duración','Durante el evento'],['Anticipación','5 días']] },
      { id:'show-personajes', name:'Show de personajes y animación', subtitle:'Juegos guiados, baile y fotografías', price:600, rating:4.8, stock:'2 cupos este fin de semana', badge:'Show completo', image:photo('entretenimiento-infantil'), variants:['1 personaje','2 personajes'], attributes:[['Tipo','Show infantil'],['Duración','60–90 minutos'],['Incluye','Animador + sonido'],['Edad','3 a 10 años'],['Participantes','Hasta 25 niños'],['Temática','A elección']] },
      { id:'paquete-fiesta', name:'Paquete fiesta todo incluido', subtitle:'Juegos, decoración, animación y montaje', price:980, rating:4.9, stock:'Agenda abierta', badge:'Todo incluido', image:photo('entretenimiento-infantil'), variants:['Esencial','Celebración','Gran fiesta'], attributes:[['Modalidad','Paquete integral'],['Duración','4 horas'],['Incluye','Inflable + decoración + show'],['Personal','3 colaboradores'],['Capacidad','Hasta 30 niños'],['Seguridad','Supervisión incluida']] },
    ],
  },
  gimnasio: {
    id: 'gimnasio', hero: photo('gimnasio'), kicker: 'Entrena, avanza y vive mejor',
    heroTitle: 'La disciplina transforma resultados.',
    heroCopy: 'Planes, clases, entrenadores y productos para acompañar cada objetivo.',
    categories: ['Todo', 'Planes', 'Clases', 'Entrenadores', 'Máquinas', 'Suplementos', 'Promociones'], action: 'Conocer planes',
    products: [
      { id:'plan-premium', name:'Plan mensual Premium', subtitle:'Acceso completo y clases incluidas', price:350, rating:4.9, stock:'Cupos disponibles', badge:'Más popular', image:photo('gimnasio'), variants:['1 mes','3 meses','6 meses'], attributes:[['Modalidad','Presencial'],['Acceso','Gimnasio + todas las clases'],['Horarios','Lun–Dom · 06:00–22:00'],['Evaluación inicial','Incluida'],['Rutina personalizada','Incluida'],['Nivel','Todos los niveles']] },
      { id:'clase-funcional', name:'Clase funcional grupal', subtitle:'Fuerza, movilidad y acondicionamiento', price:40, rating:4.8, stock:'8 cupos hoy', image:photo('gimnasio'), variants:['07:00','18:00','20:00'], attributes:[['Tipo','Clase grupal'],['Duración','50 minutos'],['Entrenador','Equipo FitLife'],['Nivel','Adaptable'],['Cupos','12 por clase'],['Incluye','Material deportivo']] },
      { id:'whey-gold', name:'Proteína Whey Gold 2 lb', subtitle:'24 g de proteína por porción', price:320, rating:4.7, stock:'11 unidades', badge:'Nutrición', image:photo('gimnasio'), variants:['Chocolate','Vainilla','Fresa'], attributes:[['Tipo','Suplemento'],['Presentación','2 lb'],['Porciones','30'],['Proteína','24 g'],['Uso','Post entrenamiento'],['Registro','Producto verificado']] },
      { id:'personal-training', name:'Entrenamiento personal', subtitle:'Plan, técnica y seguimiento individual', price:220, rating:4.9, stock:'4 horarios disponibles', image:photo('gimnasio'), variants:['4 sesiones','8 sesiones','12 sesiones'], attributes:[['Modalidad','Presencial'],['Duración','60 minutos'],['Incluye','Evaluación + rutina'],['Objetivo','Personalizado'],['Seguimiento','Semanal'],['Entrenador','Certificado']] },
    ],
  },
  'partes-electricas': {
    id: 'partes-electricas', hero: photo('partes-electricas'), kicker: 'Componentes seguros y confiables',
    heroTitle: 'Conexiones para proyectos que avanzan.',
    heroCopy: 'Material eléctrico y electrónico con datos técnicos, stock y asesoría especializada.',
    categories: ['Todo', 'Breakers', 'Cables', 'Iluminación', 'Sensores', 'Fuentes', 'Conectores'], action: 'Ver productos',
    products: [
      { id:'breaker-40a', name:'Breaker termomagnético 2P 40A', subtitle:'Protección confiable para tablero', price:125, rating:4.9, stock:'18 unidades', badge:'Más vendido', image:photo('partes-electricas'), variants:['20 A','32 A','40 A','63 A'], attributes:[['Modelo','2P 40A'],['Polos','Bipolar'],['Voltaje nominal','230 / 400 V~'],['Poder de corte','6 kA'],['Montaje','Riel DIN'],['Compatibilidad','Tableros estándar']] },
      { id:'panel-led', name:'Panel LED redondo 18 W', subtitle:'Luz uniforme de bajo consumo', price:68, rating:4.7, stock:'34 unidades', image:photo('partes-electricas'), variants:['Luz cálida','Luz neutra','Luz fría'], attributes:[['Potencia','18 W'],['Voltaje','220 V'],['Flujo luminoso','1.440 lm'],['Diámetro','22 cm'],['Instalación','Empotrable'],['Vida útil','25.000 horas']] },
      { id:'fuente-switching', name:'Fuente switching 12 V 10 A', subtitle:'Alimentación estable para sistemas', price:160, rating:4.8, stock:'12 unidades', badge:'Técnico', image:photo('partes-electricas'), variants:['5 A','10 A','20 A'], attributes:[['Entrada','110–220 V AC'],['Salida','12 V DC'],['Corriente','10 A'],['Potencia','120 W'],['Protección','Sobrecarga y cortocircuito'],['Uso','LED, CCTV, automatización']] },
      { id:'cable-cobre', name:'Cable de cobre flexible 25 m', subtitle:'Conductor aislado para instalación segura', price:95, rating:4.8, stock:'26 rollos', image:photo('partes-electricas'), variants:['1.5 mm²','2.5 mm²','4 mm²'], attributes:[['Material','Cobre'],['Longitud','25 m'],['Aislamiento','PVC'],['Voltaje','450 / 750 V'],['Color','A elección'],['Certificación','IEC']] },
    ],
  },
  'cajas-americanas': {
    id: 'cajas-americanas', hero: photo('cajas-americanas'), kicker: 'Nuevos ingresos cada semana',
    heroTitle: 'Sorpresas y oportunidades en cada caja.',
    heroCopy: 'Lotes importados con contenido referencial, precio claro y disponibilidad limitada.',
    categories: ['Todo', 'Tecnología', 'Hogar', 'Ropa', 'Juguetes', 'Belleza', 'Mix'], action: 'Descubrir lotes',
    products: [
      { id:'mix-premium', name:'Caja americana Mix Premium', subtitle:'Hogar, accesorios y tecnología ligera', price:150, rating:4.8, stock:'9 cajas', badge:'Ingreso nuevo', image:photo('cajas-americanas'), variants:['Mediana','Grande'], attributes:[['Tipo de lote','Mix premium'],['Estado','Nuevo / liquidación'],['Tamaño','Mediana'],['Peso aproximado','6 kg'],['Unidades estimadas','10 a 15'],['Origen','Importado']] },
      { id:'sorpresa-tecnologia', name:'Caja sorpresa tecnología', subtitle:'Accesorios y pequeños electrónicos', price:180, rating:4.7, stock:'5 cajas', image:photo('cajas-americanas'), variants:['Básica','Premium'], attributes:[['Categoría','Tecnología'],['Contenido','Accesorios variados'],['Condición','Nuevo / devolución abierta'],['Peso','4–7 kg'],['Unidades','8 a 12'],['Política','Contenido referencial']] },
      { id:'hogar-mix', name:'Lote hogar Mix', subtitle:'Decoración, cocina y organización', price:120, rating:4.6, stock:'14 cajas', badge:'Oportunidad', image:photo('cajas-americanas'), variants:['Cocina','Decoración','Mixta'], attributes:[['Categoría','Hogar'],['Contenido','Artículos variados'],['Estado','Liquidación'],['Peso','5 kg aprox.'],['Unidades','10 a 18'],['Disponibilidad','Limitada']] },
      { id:'mini-box', name:'Mini box accesorios', subtitle:'Belleza, oficina y artículos sorpresa', price:60, rating:4.7, stock:'22 cajas', image:photo('cajas-americanas'), variants:['Belleza','Oficina','Sorpresa'], attributes:[['Tipo','Mini box'],['Tamaño','Compacta'],['Unidades','5 a 8'],['Estado','Nuevo'],['Origen','Importado'],['Cambios','Según condiciones']] },
    ],
  },
  'agencia-viajes': {
    id: 'agencia-viajes', hero: photo('agencia-viajes'), kicker: 'Viajes seguros y experiencias reales',
    heroTitle: 'Explora Bolivia y el mundo.',
    heroCopy: 'Destinos memorables, itinerarios claros y acompañamiento antes y durante tu viaje.',
    categories: ['Todo', 'Tours', 'Paquetes', 'Pasajes', 'Hoteles', 'Seguros', 'Experiencias'], action: 'Ver paquetes',
    products: [
      { id:'uyuni-3-dias', name:'Salar de Uyuni · 3 días', subtitle:'Naturaleza extrema y paisajes de otro planeta', price:1290, rating:4.9, stock:'12 cupos', badge:'Más reservado', image:photo('agencia-viajes'), variants:['Compartido','Privado'], attributes:[['Destino','Salar de Uyuni, Potosí'],['Duración','3 días / 2 noches'],['Incluye','Transporte 4×4 + hospedaje + alimentación'],['Fecha de salida','Programable'],['Dificultad','Baja'],['Guía','Especializado']] },
      { id:'la-paz-cultural', name:'La Paz cultural y aventura', subtitle:'Ciudad, teleférico, gastronomía y miradores', price:890, rating:4.8, stock:'8 cupos', image:photo('agencia-viajes'), variants:['2 días','3 días'], attributes:[['Destino','La Paz'],['Tipo','Cultura y ciudad'],['Hospedaje','Hotel 3 estrellas'],['Incluye','Traslados + guía'],['Modalidad','Compartido'],['Idioma','Español / inglés']] },
      { id:'isla-sol', name:'Isla del Sol y Copacabana', subtitle:'Historia, lago y cultura andina', price:760, rating:4.8, stock:'Salida sábado', badge:'Escapada', image:photo('agencia-viajes'), variants:['Día completo','2 días / 1 noche'], attributes:[['Destino','Lago Titicaca'],['Tipo','Naturaleza y cultura'],['Transporte','Bus + lancha'],['Incluye','Guía y entradas'],['Dificultad','Media'],['Punto de salida','La Paz']] },
      { id:'madidi-aventura', name:'Aventura en el Madidi', subtitle:'Selva, fauna y alojamiento ecológico', price:1650, rating:4.9, stock:'6 cupos', image:photo('agencia-viajes'), variants:['3 días','4 días'], attributes:[['Destino','Parque Madidi'],['Tipo','Ecoturismo'],['Hospedaje','Lodge ecológico'],['Incluye','Traslados + alimentación'],['Guía','Naturalista'],['Dificultad','Media']] },
    ],
  },
  mayorista: {
    id: 'mayorista', hero: photo('mayorista'), kicker: 'Precios por volumen y stock real',
    heroTitle: 'Grandes marcas para grandes negocios.',
    heroCopy: 'Compra por caja o fardo con escalas claras, condiciones comerciales y entrega segura.',
    categories: ['Todo', 'Abarrotes', 'Bebidas', 'Limpieza', 'Hogar', 'Paquetes', 'Ofertas'], action: 'Ver precios mayoristas',
    products: [
      { id:'leche-uht-caja', name:'Leche entera UHT · caja 12 × 1 L', subtitle:'Compra mayorista · rotación diaria', price:198, rating:4.9, stock:'150 cajas', badge:'Alta rotación', image:photo('mayorista'), variants:['1–4 cajas','5–19 cajas','20+ cajas'], attributes:[['SKU','MAY-LEC-12'],['Presentación','Caja × 12 unidades'],['Pedido mínimo','1 caja'],['Stock','150 cajas'],['Entrega','24–48 horas'],['Pago','Transferencia / QR']] },
      { id:'cafe-tradicional', name:'Café tradicional · caja 12 × 170 g', subtitle:'Presentación comercial sellada', price:420, rating:4.8, stock:'48 cajas', image:photo('mayorista'), variants:['1–4 cajas','5–19 cajas','20+ cajas'], attributes:[['SKU','MAY-CAF-170'],['Presentación','Caja × 12 unidades'],['Pedido mínimo','1 caja'],['Origen','Bolivia'],['Vencimiento','Lote vigente'],['Entrega','Programada']] },
      { id:'aceite-vegetal', name:'Aceite vegetal · caja 15 × 1 L', subtitle:'Formato ideal para tienda y restaurante', price:510, rating:4.8, stock:'72 cajas', badge:'Precio escalonado', image:photo('mayorista'), variants:['1–4 cajas','5–19 cajas','20+ cajas'], attributes:[['SKU','MAY-ACE-15'],['Presentación','Caja × 15 botellas'],['Pedido mínimo','1 caja'],['Stock','72 cajas'],['Conservación','Lugar fresco'],['Pago','Contado / comercial']] },
      { id:'detergente-fardo', name:'Detergente regular · fardo 6 kg', subtitle:'Limpieza de alto rendimiento', price:480, rating:4.7, stock:'35 fardos', image:photo('mayorista'), variants:['1–4 fardos','5–19 fardos','20+ fardos'], attributes:[['SKU','MAY-DET-06'],['Presentación','Fardo de 6 kg'],['Pedido mínimo','1 fardo'],['Uso','Ropa y superficies'],['Entrega','24–48 horas'],['Cotización','Vigencia 5 días']] },
    ],
  },
  ceramicas: {
    id: 'ceramicas', hero: photo('ceramicas'), kicker: 'Acabados para cada proyecto',
    heroTitle: 'Espacios que inspiran proyectos reales.',
    heroCopy: 'Pisos, revestimientos y materiales con formatos, rendimiento y uso claramente especificados.',
    categories: ['Todo', 'Porcelanato', 'Cerámica', 'Revestimientos', 'Adhesivos', 'Baños', 'Exteriores'], action: 'Explorar materiales',
    products: [
      { id:'porcelanato-piedra', name:'Porcelanato piedra gris 60 × 60', subtitle:'Acabado mate · alto tránsito', price:110, rating:4.9, stock:'320 m²', badge:'Más elegido', image:photo('ceramicas'), variants:['Gris claro','Grafito','Arena'], attributes:[['Formato','60 × 60 cm'],['Rendimiento','1,44 m² por caja'],['Piezas por caja','4'],['Espesor','9 mm'],['Resistencia','PEI 4'],['Uso','Interior / comercial']] },
      { id:'porcelanato-carrara', name:'Porcelanato Carrara brillante', subtitle:'Veta elegante para interiores', price:120, rating:4.8, stock:'180 m²', image:photo('ceramicas'), variants:['60 × 60 cm','60 × 120 cm'], attributes:[['Acabado','Brillante'],['Rendimiento','1,44 m² por caja'],['Piezas por caja','4'],['Espesor','9 mm'],['Lote','Uniforme'],['Uso','Sala / dormitorio']] },
      { id:'ceramica-madera', name:'Cerámica efecto madera 20 × 120', subtitle:'Calidez visual y fácil mantenimiento', price:95, rating:4.8, stock:'210 m²', badge:'Tendencia', image:photo('ceramicas'), variants:['Roble','Nogal','Natural'], attributes:[['Formato','20 × 120 cm'],['Acabado','Mate texturizado'],['Antideslizante','R10'],['Espesor','8,5 mm'],['Instalación','Junta mínima 3 mm'],['Uso','Interior']] },
      { id:'piso-antideslizante', name:'Piso antideslizante exterior', subtitle:'Superficie segura para áreas húmedas', price:88, rating:4.7, stock:'145 m²', image:photo('ceramicas'), variants:['Gris','Beige','Terracota'], attributes:[['Formato','45 × 45 cm'],['Resistencia','PEI 4'],['Antideslizante','R11'],['Absorción','Baja'],['Uso','Patio / baño'],['Venta','Por caja']] },
    ],
  },
  'sala-juegos': {
    id: 'sala-juegos', hero: photo('sala-juegos'), kicker: 'Gaming, realidad virtual y torneos',
    heroTitle: 'Más que un juego, una experiencia.',
    heroCopy: 'Estaciones listas, horarios disponibles y experiencias para jugar solo o en equipo.',
    categories: ['Todo', 'Consolas', 'PC Gaming', 'Realidad virtual', 'Arcade', 'Snacks', 'Torneos'], action: 'Reservar estación',
    products: [
      { id:'cabina-gamer', name:'Cabina PC Gaming Pro · 2 horas', subtitle:'Equipo de alto rendimiento e internet estable', price:80, rating:4.9, stock:'6 estaciones hoy', badge:'Más reservado', image:photo('sala-juegos'), variants:['14:00','17:00','20:00'], attributes:[['Plataforma','PC Gaming'],['Duración','2 horas'],['Jugadores','1 persona'],['Incluye','Monitor + periféricos'],['Edad','Desde 12 años'],['Ubicación','Sala principal']] },
      { id:'vr-premium', name:'Experiencia VR Premium', subtitle:'Realidad virtual con asistencia inicial', price:60, rating:4.8, stock:'4 horarios hoy', image:photo('sala-juegos'), variants:['30 minutos','60 minutos'], attributes:[['Plataforma','Realidad virtual'],['Jugadores','1 por turno'],['Incluye','Visor + controles'],['Catálogo','10 experiencias'],['Edad','Desde 10 años'],['Asistencia','Incluida']] },
      { id:'arcade-hora', name:'Arcade libre · 1 hora', subtitle:'Clásicos, carreras y acción', price:40, rating:4.7, stock:'Disponible', badge:'Diversión retro', image:photo('sala-juegos'), variants:['1 jugador','2 jugadores'], attributes:[['Zona','Arcade'],['Duración','60 minutos'],['Máquinas','Acceso libre'],['Jugadores','1–2'],['Edad','Todo público'],['Créditos','Incluidos']] },
      { id:'combo-gamer', name:'Combo gamer para compartir', subtitle:'Juego, snack y bebida para dos', price:135, rating:4.8, stock:'10 combos', image:photo('sala-juegos'), variants:['Consola','PC Gaming','Arcade'], attributes:[['Duración','2 horas'],['Personas','2'],['Incluye','Estación + 2 bebidas'],['Snack','Palomitas grandes'],['Reserva','Recomendada'],['Vigencia','Lunes a jueves']] },
    ],
  },
  artesanias: {
    id: 'artesanias', hero: photo('artesanias'), kicker: 'Hecho a mano en Bolivia',
    heroTitle: 'Tradición que se vive en cada detalle.',
    heroCopy: 'Piezas con historia, técnicas artesanales y opciones de personalización para regalar o decorar.',
    categories: ['Todo', 'Tejidos', 'Cerámica', 'Regalos', 'Personalizados', 'Decoración', 'Souvenirs'], action: 'Descubrir piezas',
    products: [
      { id:'taza-personalizada', name:'Taza andina personalizada', subtitle:'Cerámica pintada a mano', price:65, rating:4.9, stock:'Hecha por encargo', badge:'Personalizable', image:photo('artesanias'), variants:['Nombre','Frase corta','Sin texto'], attributes:[['Material','Cerámica esmaltada'],['Técnica','Pintura manual'],['Capacidad','350 ml'],['Acabado','Brillante'],['Fabricación','1–3 días'],['Cuidado','Lavado a mano']] },
      { id:'cojin-andino', name:'Cojín tejido andino 45 × 45', subtitle:'Textura artesanal y relleno incluido', price:120, rating:4.8, stock:'8 unidades', image:photo('artesanias'), variants:['Terracota','Azul profundo','Multicolor'], attributes:[['Material','Lana y algodón'],['Técnica','Telar tradicional'],['Medidas','45 × 45 cm'],['Incluye','Relleno'],['Cierre','Oculto'],['Origen','Altiplano boliviano']] },
      { id:'llama-alpaca', name:'Llama decorativa de alpaca', subtitle:'Pieza suave terminada a mano', price:90, rating:4.8, stock:'12 unidades', badge:'Regalo favorito', image:photo('artesanias'), variants:['Blanco','Crudo','Café'], attributes:[['Material','Fibra de alpaca'],['Altura','24 cm'],['Técnica','Costura artesanal'],['Acabado','Detalles tejidos'],['Pieza','Variación única'],['Cuidado','Limpieza en seco']] },
      { id:'regalo-artesanal', name:'Caja regalo artesanal', subtitle:'Cerámica, tejido y empaque listo para obsequiar', price:145, rating:4.9, stock:'Preparación 24 h', image:photo('artesanias'), variants:['Cumpleaños','Agradecimiento','Corporativo'], attributes:[['Contenido','3 piezas'],['Empaque','Caja kraft'],['Tarjeta','Personalizada'],['Preparación','24 horas'],['Origen','Artesanos locales'],['Pedido mínimo','1 unidad']] },
    ],
  },
  tours: {
    id: 'tours', hero: photo('tours'), kicker: 'Aventura, cultura y naturaleza',
    heroTitle: 'Explora · descubre · vive Bolivia.',
    heroCopy: 'Tours con itinerarios claros, guías especializados y cupos confirmados.',
    categories: ['Todo', 'Salar', 'Ciudad', 'Montaña', 'Lago', 'Aventura', 'Full day'], action: 'Explorar tours',
    products: [
      { id:'uyuni-3-dias-tour', name:'Salar de Uyuni · 3 días', subtitle:'Salar, lagunas de colores y desiertos', price:2890, rating:4.9, stock:'8 cupos', badge:'Imperdible', image:photo('tours'), variants:['Compartido','Privado'], attributes:[['Destino','Uyuni, Potosí'],['Duración','3 días / 2 noches'],['Salida','07:30 desde Uyuni'],['Incluye','4×4 + guía + alimentación'],['Dificultad','Media'],['Temporada','Todo el año']] },
      { id:'la-paz-valle-luna', name:'La Paz y Valle de la Luna', subtitle:'Ciudad, teleférico y paisaje natural', price:450, rating:4.8, stock:'Salida diaria', image:photo('tours'), variants:['Mañana','Tarde'], attributes:[['Destino','La Paz'],['Duración','6 horas'],['Punto de encuentro','Centro histórico'],['Incluye','Transporte + guía'],['Modalidad','Compartido'],['Idioma','Español / inglés']] },
      { id:'isla-sol-full-day', name:'Isla del Sol · full day', subtitle:'Navegación, caminata y cultura andina', price:650, rating:4.8, stock:'12 cupos sábado', badge:'Escapada', image:photo('tours'), variants:['Compartido','Privado'], attributes:[['Destino','Copacabana'],['Duración','Día completo'],['Salida','06:30 desde La Paz'],['Incluye','Bus + lancha + guía'],['Dificultad','Baja / media'],['Alimentación','No incluida']] },
      { id:'sajama-aventura', name:'Sajama naturaleza y termales', subtitle:'Paisajes de altura y descanso natural', price:1190, rating:4.9, stock:'6 cupos', image:photo('tours'), variants:['2 días','3 días'], attributes:[['Destino','Parque Nacional Sajama'],['Duración','2 días / 1 noche'],['Incluye','Transporte + alojamiento'],['Actividad','Caminata y termales'],['Dificultad','Media'],['Altitud','Hasta 4.300 m']] },
    ],
  },
  educacion: {
    id: 'educacion', hero: photo('educacion'), kicker: 'Aprendizaje práctico y certificado',
    heroTitle: 'Tu potencial sin límites.',
    heroCopy: 'Cursos con rutas claras, instructores especializados y modalidades flexibles.',
    categories: ['Todo', 'Idiomas', 'Programación', 'Diseño', 'Ofimática', 'Apoyo escolar', 'Talleres'], action: 'Ver cursos',
    products: [
      { id:'web-full-stack', name:'Desarrollo web Full Stack', subtitle:'Proyectos reales desde fundamentos hasta despliegue', price:420, rating:4.9, stock:'9 cupos', badge:'Más solicitado', image:photo('educacion'), variants:['Presencial','En vivo online'], attributes:[['Nivel','Inicial / intermedio'],['Duración','4 meses'],['Horario','Martes y jueves 19:00'],['Instructor','Especialista certificado'],['Certificación','Incluida'],['Requisito','Laptop personal']] },
      { id:'ingles-a1', name:'Inglés comunicativo A1', subtitle:'Conversación y bases para avanzar con confianza', price:250, rating:4.8, stock:'12 cupos', image:photo('educacion'), variants:['Mañana','Noche','Sábado'], attributes:[['Nivel','Principiante'],['Duración','3 meses'],['Modalidad','Presencial / online'],['Evaluación','Inicial incluida'],['Material','Digital'],['Edad','Desde 15 años']] },
      { id:'excel-profesional', name:'Excel profesional aplicado', subtitle:'Fórmulas, análisis y tableros de gestión', price:320, rating:4.8, stock:'7 cupos', badge:'Certificado', image:photo('educacion'), variants:['Intensivo','Regular'], attributes:[['Nivel','Intermedio'],['Duración','6 semanas'],['Horario','Sábados 09:00'],['Incluye','Archivos de práctica'],['Certificación','Digital'],['Requisito','Excel instalado']] },
      { id:'diseno-grafico', name:'Diseño gráfico esencial', subtitle:'Composición, color y piezas para redes', price:280, rating:4.7, stock:'10 cupos', image:photo('educacion'), variants:['Presencial','En vivo online'], attributes:[['Nivel','Inicial'],['Duración','8 semanas'],['Instructor','Diseñador senior'],['Proyecto final','Incluido'],['Software','Laboratorio disponible'],['Certificación','Incluida']] },
    ],
  },
  inmobiliaria: {
    id: 'inmobiliaria', hero: photo('inmobiliaria'), kicker: 'Propiedades verificadas',
    heroTitle: 'Encuentra el lugar donde quieres estar.',
    heroCopy: 'Opciones de venta y alquiler con información completa, ubicación y visita programada.',
    categories: ['Todo', 'Venta', 'Alquiler', 'Casas', 'Departamentos', 'Terrenos', 'Oficinas'], action: 'Ver propiedades',
    products: [
      { id:'departamento-centro', name:'Departamento premium · zona central', subtitle:'Venta · vista panorámica y excelente ubicación', price:960000, rating:4.9, stock:'Disponible', badge:'Verificado', image:photo('inmobiliaria'), variants:['Visita presencial','Recorrido virtual'], attributes:[['Operación','Venta'],['Superficie','138 m²'],['Dormitorios','3'],['Baños','2'],['Antigüedad','3 años'],['Servicios','Agua, luz, gas y fibra']] },
      { id:'departamento-equipetrol', name:'Departamento moderno · Equipetrol', subtitle:'Venta · diseño contemporáneo', price:870000, rating:4.8, stock:'Disponible', image:photo('inmobiliaria'), variants:['Visita presencial','Recorrido virtual'], attributes:[['Operación','Venta'],['Superficie','112 m²'],['Dormitorios','2'],['Baños','2'],['Parqueo','1 espacio'],['Amenidades','Piscina y gimnasio']] },
      { id:'casa-condominio', name:'Casa familiar en condominio', subtitle:'Alquiler mensual · áreas verdes y seguridad', price:7500, rating:4.8, stock:'Ingreso inmediato', badge:'Ideal familia', image:photo('inmobiliaria'), variants:['Sin muebles','Amoblada'], attributes:[['Operación','Alquiler'],['Superficie','220 m²'],['Dormitorios','4'],['Baños','3'],['Expensas','Bs 650 / mes'],['Seguridad','24 horas']] },
      { id:'terreno-urubo', name:'Terreno residencial · Urubó', subtitle:'Venta · acceso pavimentado y servicios', price:590000, rating:4.7, stock:'Documentación lista', image:photo('inmobiliaria'), variants:['Visita entre semana','Visita sábado'], attributes:[['Operación','Venta'],['Superficie','520 m²'],['Frente','16 m'],['Servicios','Agua y electricidad'],['Uso','Residencial'],['Documentación','Folio real verificado']] },
    ],
  },
  hotel: {
    id: 'hotel', hero: photo('hotel'), kicker: 'Hospitalidad y descanso',
    heroTitle: 'Más que alojamiento, una experiencia.',
    heroCopy: 'Habitaciones confortables, servicios claros y disponibilidad para reservar con confianza.',
    categories: ['Todo', 'Habitaciones', 'Suites', 'Ofertas', 'Desayuno', 'Servicios', 'Experiencias'], action: 'Ver habitaciones',
    products: [
      { id:'habitacion-ejecutiva', name:'Habitación ejecutiva', subtitle:'Comodidad, escritorio y vista urbana', price:590, rating:4.9, stock:'3 disponibles', badge:'Más reservada', image:photo('hotel'), variants:['1 huésped','2 huéspedes'], attributes:[['Huéspedes','Hasta 2'],['Cama','Queen'],['Baño','Privado'],['Desayuno','Incluido'],['Check-in','Desde 14:00'],['Cancelación','Flexible 48 h']] },
      { id:'habitacion-estandar', name:'Habitación estándar doble', subtitle:'Descanso práctico con todos los esenciales', price:420, rating:4.8, stock:'5 disponibles', image:photo('hotel'), variants:['1 cama doble','2 camas simples'], attributes:[['Huéspedes','Hasta 2'],['Baño','Privado'],['WiFi','Incluido'],['Desayuno','Opcional'],['Check-out','Hasta 11:00'],['Parqueo','Sujeto a disponibilidad']] },
      { id:'suite-deluxe', name:'Suite Deluxe panorámica', subtitle:'Sala privada, amenities y vista de la ciudad', price:890, rating:4.9, stock:'1 disponible', badge:'Premium', image:photo('hotel'), variants:['2 huéspedes','3 huéspedes'], attributes:[['Superficie','48 m²'],['Cama','King'],['Sala','Privada'],['Desayuno','Incluido'],['Amenidades','Bata + minibar'],['Cancelación','Flexible 72 h']] },
      { id:'escapada-fin-semana', name:'Escapada de fin de semana', subtitle:'Dos noches, desayuno y experiencia para dos', price:1150, rating:4.8, stock:'4 paquetes', image:photo('hotel'), variants:['Viernes a domingo','Sábado a lunes'], attributes:[['Noches','2'],['Huéspedes','2'],['Habitación','Ejecutiva'],['Incluye','Desayuno + detalle de bienvenida'],['Check-in','14:00'],['Vigencia','Según disponibilidad']] },
    ],
  },
  'foto-video-dj': {
    id: 'foto-video-dj', hero: photo('foto-video-dj'), kicker: 'Historias, música y producción',
    heroTitle: 'Convierte cada momento en una historia inolvidable.',
    heroCopy: 'Fotografía, video y ambientación profesional con paquetes claros y fechas disponibles.',
    categories: ['Todo', 'Fotografía', 'Video', 'DJ', 'Paquetes', 'Eventos', 'Cabina 360', 'Luces y sonido'], action: 'Ver servicios',
    products: [
      { id:'boda-premium', name:'Paquete boda premium', subtitle:'Fotografía y video cinematográfico', price:5500, rating:4.9, stock:'3 fechas disponibles', badge:'Más reservado', image:photo('foto-video-dj'), variants:['Ceremonia','Ceremonia + recepción','Cobertura completa'], attributes:[['Tipo de servicio','Foto + video'],['Duración','8 horas'],['Cobertura','Ceremonia + recepción'],['Capacidad','Hasta 300 invitados'],['Incluye','2 fotógrafos + 2 cámaras + drone'],['Entrega','Galería y video editado']] },
      { id:'sesion-preboda', name:'Sesión fotográfica preboda', subtitle:'Retratos guiados en locación', price:450, rating:4.8, stock:'Agenda abierta', image:photo('foto-video-dj'), variants:['1 hora','2 horas'], attributes:[['Servicio','Fotografía'],['Entrega','30 fotos editadas'],['Locación','La Paz y alrededores'],['Profesional','Fotógrafo asignado'],['Estilo','Natural / editorial'],['Plazo','7 días hábiles']] },
      { id:'dj-eventos', name:'DJ profesional para eventos', subtitle:'Música, mezcla y conducción', price:700, rating:4.8, stock:'Disponible este mes', badge:'Fiesta completa', image:photo('foto-video-dj'), variants:['4 horas','6 horas','8 horas'], attributes:[['Servicio','DJ'],['Equipo','Controlador + sonido'],['Cobertura','Hasta 180 personas'],['Música','Selección personalizada'],['Montaje','Incluido'],['Extras','Luces opcionales']] },
      { id:'video-4k', name:'Video 4K de evento completo', subtitle:'Cobertura multicámara y edición profesional', price:1200, rating:4.9, stock:'4 fechas disponibles', image:photo('foto-video-dj'), variants:['Resumen 5 min','Película 20 min'], attributes:[['Servicio','Video'],['Resolución','4K'],['Duración','Hasta 6 horas'],['Equipo','2 cámaras + audio'],['Entrega','Digital'],['Plazo','15 días hábiles']] },
    ],
  },
  'clinica-pet': {
    id: 'clinica-pet', hero: photo('clinica-pet'), kicker: 'Cuidado profesional de confianza',
    heroTitle: 'Ellos también son familia.',
    heroCopy: 'Consultas, prevención y productos con información clara para cada etapa de su vida.',
    categories: ['Todo', 'Consulta', 'Vacunas', 'Desparasitación', 'Baño', 'Alimento', 'Farmacia', 'Urgencias'], action: 'Agendar atención',
    products: [
      { id:'consulta-integral-pet', name:'Consulta veterinaria integral', subtitle:'Evaluación completa y plan de salud', price:120, rating:4.9, stock:'Citas hoy', badge:'Recomendado', image:photo('clinica-pet'), variants:['10:00','14:30','17:00'], attributes:[['Tipo','Consulta veterinaria'],['Duración','30–40 minutos'],['Especies','Perros y gatos'],['Etapa','Cachorro / adulto / senior'],['Profesional','Dra. Mariana Torres'],['Modalidad','Presencial con cita']] },
      { id:'vacuna-antirrabica-pet', name:'Vacuna antirrábica', subtitle:'Aplicación y registro de vacunación', price:100, rating:4.9, stock:'Disponible', image:photo('clinica-pet'), variants:['Perro','Gato'], attributes:[['Servicio','Vacunación'],['Edad','Desde 3 meses'],['Incluye','Valoración previa'],['Registro','Carnet actualizado'],['Aplicación','Subcutánea'],['Preparación','Mascota clínicamente sana']] },
      { id:'alimento-premium-pet', name:'Alimento premium adulto 10 kg', subtitle:'Nutrición completa para perros', price:350, rating:4.8, stock:'18 bolsas', badge:'Nutrición', image:photo('clinica-pet'), variants:['Raza mediana','Raza grande'], attributes:[['Especie','Perro'],['Etapa','Adulto'],['Peso','10 kg'],['Proteína','Alta digestibilidad'],['Requiere receta','No'],['Conservación','Lugar seco']] },
      { id:'bano-peluqueria-pet', name:'Baño y peluquería completa', subtitle:'Higiene, corte y cuidado de piel', price:140, rating:4.8, stock:'5 cupos sábado', image:photo('clinica-pet'), variants:['Pequeño','Mediano','Grande'], attributes:[['Servicio','Higiene y estética'],['Duración','60–90 minutos'],['Incluye','Baño + corte + uñas'],['Peso','Según tamaño'],['Condición','Sin heridas activas'],['Profesional','Groomer certificado']] },
    ],
  },
  imprenta: {
    id: 'imprenta', hero: photo('imprenta'), kicker: 'Diseño e impresión profesional',
    heroTitle: 'Tu marca en todas partes.',
    heroCopy: 'Productos configurables, acabados reales y cotización clara por cantidad.',
    categories: ['Todo', 'Tarjetas', 'Volantes', 'Banners', 'Stickers', 'Letreros', 'Merchandising', 'Diseño'], action: 'Ver catálogo',
    products: [
      { id:'tarjetas-premium', name:'Tarjetas personales premium', subtitle:'Impresión nítida desde el primer contacto', price:120, rating:4.9, stock:'Entrega en 2–4 días', badge:'Más pedido', image:photo('imprenta'), variants:['Mate','Brillante','Soft touch'], attributes:[['Tamaño','9 × 5 cm'],['Material','Cartulina premium'],['Gramaje','300 g/m²'],['Impresión','Full color, 2 caras'],['Cantidad mínima','100 unidades'],['Diseño incluido','Sí']] },
      { id:'volantes-a5', name:'Volantes A5 full color', subtitle:'Promoción clara en papel de alto impacto', price:180, rating:4.8, stock:'Producción disponible', image:photo('imprenta'), variants:['500 unidades','1.000 unidades','5.000 unidades'], attributes:[['Tamaño','A5'],['Material','Couché'],['Gramaje','150 g/m²'],['Impresión','Una o dos caras'],['Acabado','Corte recto'],['Plazo','2–3 días hábiles']] },
      { id:'banner-enrollable', name:'Banner enrollable 85 × 200', subtitle:'Estructura portátil e impresión de alta calidad', price:350, rating:4.8, stock:'12 estructuras', badge:'Listo para eventos', image:photo('imprenta'), variants:['Solo impresión','Impresión + estructura'], attributes:[['Medida','85 × 200 cm'],['Material','Lona front'],['Impresión','Full color'],['Acabado','Estructura enrollable'],['Uso','Interior'],['Entrega','3 días hábiles']] },
      { id:'stickers-personalizados', name:'Stickers personalizados troquelados', subtitle:'Forma libre y adhesivo resistente', price:90, rating:4.7, stock:'Producción diaria', image:photo('imprenta'), variants:['Mate','Brillante','Transparente'], attributes:[['Tamaño','Hasta 7 cm'],['Material','Vinilo adhesivo'],['Impresión','Full color'],['Corte','Troquelado'],['Cantidad mínima','50 unidades'],['Resistencia','Agua y uso exterior']] },
    ],
  },
  'alquiler-eventos': {
    id: 'alquiler-eventos', hero: photo('alquiler-eventos'), kicker: 'Todo listo para celebrar',
    heroTitle: 'Espacios únicos para momentos inolvidables.',
    heroCopy: 'Mobiliario, carpas y producción con disponibilidad por fecha y montaje incluido.',
    categories: ['Todo', 'Sillas', 'Mesas', 'Decoración', 'Sonido', 'Iluminación', 'Toldos', 'Carpas'], action: 'Ver catálogo',
    products: [
      { id:'silla-tiffany', name:'Silla Tiffany blanca', subtitle:'Elegancia para todo tipo de evento', price:25, rating:4.9, stock:'120 unidades', badge:'Más alquilada', image:photo('alquiler-eventos'), variants:['1 día','Fin de semana'], attributes:[['Cantidad disponible','120 unidades'],['Capacidad','120 kg'],['Dimensiones','40 × 45 × 92 cm'],['Material','Polipropileno reforzado'],['Montaje','Incluido'],['Depósito','Según cantidad']] },
      { id:'mesa-redonda', name:'Mesa redonda para 10 personas', subtitle:'Vestida y lista para recepción', price:80, rating:4.8, stock:'24 unidades', image:photo('alquiler-eventos'), variants:['Solo mesa','Mesa + mantel'], attributes:[['Capacidad','10 personas'],['Diámetro','180 cm'],['Material','Madera y metal'],['Color','Blanco'],['Transporte','Consultar zona'],['Duración','Por día']] },
      { id:'carpa-3x6', name:'Carpa elegante 3 × 6 m', subtitle:'Cobertura segura para celebración exterior', price:350, rating:4.9, stock:'6 disponibles', badge:'Con montaje', image:photo('alquiler-eventos'), variants:['1 día','2 días'], attributes:[['Dimensiones','3 × 6 m'],['Capacidad','30 personas'],['Material','Lona impermeable'],['Montaje','Incluido'],['Transporte','Área urbana'],['Garantía','Depósito reembolsable']] },
      { id:'combo-recepcion', name:'Combo recepción para 80 personas', subtitle:'Sillas, mesas, mantelería e iluminación', price:1850, rating:4.9, stock:'3 fechas disponibles', image:photo('alquiler-eventos'), variants:['Clásico','Romántico','Moderno'], attributes:[['Capacidad','80 personas'],['Incluye','80 sillas + 8 mesas'],['Decoración','Centros de mesa'],['Iluminación','Guirnaldas cálidas'],['Montaje','Incluido'],['Duración','1 evento']] },
    ],
  },
  optica: {
    id: 'optica', hero: photo('optica'), kicker: 'Visión y estilo para cada día',
    heroTitle: 'Tu mirada, tu mejor versión.',
    heroCopy: 'Monturas, lentes y asesoría con medidas, compatibilidad y variantes claras.',
    categories: ['Todo', 'Monturas', 'Lentes de sol', 'Contacto', 'Accesorios', 'Promociones', 'Niños', 'Graduados'], action: 'Ver catálogo',
    products: [
      { id:'montura-urban', name:'Montura Urban Classic', subtitle:'Estilo atemporal para uso diario', price:320, rating:4.9, stock:'En stock', badge:'Más elegida', image:photo('optica'), variants:['Negro','Carey','Transparente','Azul'], attributes:[['Tipo','Montura óptica'],['Forma','Rectangular'],['Material','Acetato'],['Medidas','52–18–140'],['Género','Unisex'],['Lente compatible','Monofocal / progresivo']] },
      { id:'lentes-sol-polarizados', name:'Lentes de sol polarizados', subtitle:'Protección UV y visión confortable', price:520, rating:4.8, stock:'9 unidades', image:photo('optica'), variants:['Negro','Carey','Azul'], attributes:[['Tipo','Lente de sol'],['Forma','Aviador'],['Material','Metal'],['Protección','UV400'],['Lente','Polarizado'],['Incluye','Estuche y paño']] },
      { id:'lentes-contacto', name:'Lentes de contacto mensuales', subtitle:'Comodidad y corrección visual', price:280, rating:4.8, stock:'Graduaciones disponibles', badge:'Consulta previa', image:photo('optica'), variants:['Miopía','Hipermetropía','Astigmatismo'], attributes:[['Tipo','Lente de contacto'],['Duración','30 días'],['Material','Hidrogel de silicona'],['Unidades','Caja × 6'],['Curva base','8,6 mm'],['Evaluación','Recomendada']] },
      { id:'montura-infantil', name:'Montura infantil flexible', subtitle:'Ligera, resistente y segura', price:260, rating:4.7, stock:'12 unidades', image:photo('optica'), variants:['Azul','Rosa','Verde'], attributes:[['Tipo','Montura óptica'],['Forma','Redonda'],['Material','TR90 flexible'],['Medidas','46–16–125'],['Edad','5–12 años'],['Incluye','Estuche rígido']] },
    ],
  },
  jugueteria: {
    id: 'jugueteria', hero: photo('jugueteria'), kicker: 'Pequeños momentos, grandes historias',
    heroTitle: 'Crecer también es jugar.',
    heroCopy: 'Juguetes, artículos para bebé y regalos organizados por edad, etapa y seguridad.',
    categories: ['Todo', 'Juguetes', 'Bebés', 'Lactancia', 'Ropa bebé', 'Escolar', 'Regalos', 'Seguridad'], action: 'Descubrir productos',
    products: [
      { id:'bloques-didacticos', name:'Set de bloques didácticos', subtitle:'Crear, imaginar y desarrollar habilidades', price:120, rating:4.9, stock:'En stock', badge:'3+ años', image:photo('jugueteria'), variants:['50 piezas'], attributes:[['Edad recomendada','3+ años'],['Material','Madera no tóxica'],['Incluye','50 piezas'],['Medidas','Bloque aprox. 4 cm'],['Seguridad','Bordes redondeados'],['Certificación','Juguete seguro']] },
      { id:'coche-plegable', name:'Coche plegable para bebé', subtitle:'Paseos cómodos y almacenamiento sencillo', price:950, rating:4.8, stock:'6 unidades', image:photo('jugueteria'), variants:['Negro','Gris','Rosa'], attributes:[['Etapa','6–36 meses'],['Capacidad','Hasta 22 kg'],['Estructura','Aluminio'],['Plegado','Una mano'],['Seguridad','Arnés de 5 puntos'],['Incluye','Canasto y capota']] },
      { id:'peluche-oso', name:'Peluche oso suave', subtitle:'Compañero tierno para regalar', price:85, rating:4.8, stock:'18 unidades', badge:'Regalo favorito', image:photo('jugueteria'), variants:['Beige','Café','Rosa'], attributes:[['Edad','Desde 12 meses'],['Material','Felpa hipoalergénica'],['Altura','35 cm'],['Relleno','Fibra siliconada'],['Lavado','A mano'],['Seguridad','Ojos bordados']] },
      { id:'set-sonajeros', name:'Set de sonajeros sensoriales', subtitle:'Texturas y sonidos para primera infancia', price:95, rating:4.7, stock:'14 sets', image:photo('jugueteria'), variants:['Pastel','Multicolor'], attributes:[['Etapa','3–12 meses'],['Piezas','4'],['Material','Silicona grado alimenticio'],['Función','Estimulación sensorial'],['Libre de BPA','Sí'],['Incluye','Estuche']] },
    ],
  },
  deportes: {
    id: 'deportes', hero: photo('deportes'), kicker: 'Equipamiento para cada meta',
    heroTitle: 'Disciplina en cada paso.',
    heroCopy: 'Ropa, accesorios y equipamiento con tallas, tecnología y uso recomendado.',
    categories: ['Todo', 'Running', 'Gym', 'Fútbol', 'Yoga', 'Suplementos', 'Accesorios', 'Ropa'], action: 'Ver productos',
    products: [
      { id:'runner-pro-sport', name:'Zapatillas Runner Pro', subtitle:'Comodidad y velocidad en cada kilómetro', price:450, rating:4.9, stock:'En stock', badge:'Más vendido', image:photo('deportes'), variants:['38','39','40','41','42','43','44'], attributes:[['Disciplina','Running'],['Nivel','Principiante / intermedio'],['Material','Malla transpirable'],['Suela','Caucho de alto agarre'],['Uso','Entrenamiento / competencia'],['Peso','270 g talla 42']] },
      { id:'mancuernas-10kg', name:'Mancuernas hexagonales 10 kg', subtitle:'Agarre firme para fuerza y funcional', price:320, rating:4.8, stock:'10 pares', image:photo('deportes'), variants:['5 kg','10 kg','15 kg'], attributes:[['Disciplina','Gym'],['Material','Acero recubierto'],['Peso','10 kg por unidad'],['Agarre','Ergonómico'],['Uso','Fuerza / funcional'],['Incluye','Par']] },
      { id:'whey-sport', name:'Proteína Whey Gold 2 lb', subtitle:'Recuperación y aporte proteico diario', price:280, rating:4.8, stock:'15 unidades', badge:'Nutrición', image:photo('deportes'), variants:['Chocolate','Vainilla','Fresa'], attributes:[['Tipo','Suplemento'],['Presentación','2 lb'],['Porciones','30'],['Proteína','24 g'],['Uso','Post entrenamiento'],['Registro','Producto verificado']] },
      { id:'kit-yoga', name:'Kit de yoga esencial', subtitle:'Mat, bloques y correa para tu práctica', price:240, rating:4.7, stock:'8 kits', image:photo('deportes'), variants:['Azul','Verde','Morado'], attributes:[['Disciplina','Yoga'],['Nivel','Todos'],['Mat','6 mm antideslizante'],['Material','TPE'],['Incluye','2 bloques + correa'],['Uso','Casa / estudio']] },
    ],
  },
  'pet-shop': {
    id: 'pet-shop', hero: photo('pet-shop'), kicker: 'Productos para su bienestar',
    heroTitle: 'Mascotas más felices, vidas más lindas.',
    heroCopy: 'Alimentos y accesorios con compatibilidad clara para comprar con confianza.',
    categories: ['Todo', 'Perros', 'Gatos', 'Alimentos', 'Accesorios', 'Higiene', 'Juguetes'], action: 'Ver productos',
    products: [
      { id:'alimento-maxi-adult', name:'Alimento Maxi Adult 15 kg', subtitle:'Nutrición para perros adultos de raza grande', price:420, rating:4.9, stock:'En stock', badge:'Más vendido', image:photo('pet-shop'), variants:['Pollo','Cordero'], attributes:[['Mascota','Perro'],['Etapa','Adulto, 1–7 años'],['Tamaño','Grande, 26–44 kg'],['Sabor','Pollo'],['Presentación','15 kg'],['Nutrición','Proteína + articulaciones']] },
      { id:'juguete-dispensador', name:'Juguete dispensador resistente', subtitle:'Juego, premio y estimulación mental', price:120, rating:4.8, stock:'16 unidades', image:photo('pet-shop'), variants:['Pequeño','Mediano','Grande'], attributes:[['Mascota','Perro'],['Etapa','Todas'],['Material','Caucho resistente'],['Uso','Premios / entretenimiento'],['Tamaño','Según raza'],['Lavado','Agua y jabón']] },
      { id:'arena-aglomerante', name:'Arena aglomerante para gatos', subtitle:'Control de olores y limpieza sencilla', price:85, rating:4.8, stock:'24 bolsas', badge:'Compra frecuente', image:photo('pet-shop'), variants:['5 kg','10 kg'], attributes:[['Mascota','Gato'],['Tipo','Aglomerante'],['Presentación','5 kg'],['Aroma','Neutro'],['Control de olor','Alto'],['Composición','Mineral seleccionada']] },
      { id:'kit-higiene-pet', name:'Kit de higiene para mascota', subtitle:'Cuidado diario de piel, pelo y paseo', price:145, rating:4.7, stock:'11 kits', image:photo('pet-shop'), variants:['Perro','Gato'], attributes:[['Mascota','Perro / gato'],['Incluye','Shampoo + cepillo + toalla'],['Etapa','Adulto'],['Fórmula','Suave'],['Condición','Piel normal'],['Presentación','Kit de 3 piezas']] },
    ],
  },
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
