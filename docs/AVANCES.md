# Registro técnico de avances

## Fase 0 — Base visual y arquitectura

- Estado: completada.
- Directorio general implementado con 45 rubros.
- Navegación interna implementada mediante rutas hash para compatibilidad con hosting estático.
- Búsqueda, filtros por familia, favoritos, carrito/pedido, detalle de producto, selector de variantes y enlaces a WhatsApp funcionales.
- Diseño responsive para escritorio y móvil.
- Imágenes de portada generadas para los cuatro catálogos piloto y referencias visuales normalizadas para todos los rubros.

## Fase 1 — Catálogos piloto

- Estado: completada visualmente.
- Rubros personalizados: calzado, clínica dental, canchas deportivas y ferretería.
- Cada catálogo incluye banner, categorías, productos o servicios, atributos, precio, disponibilidad, acciones y panel de detalle.

## Publicación GitHub Pages

- Estado: publicada y validada el 2026-09-09.
- Repositorio: `jonathan512439/prueba_saas`.
- Rama de publicación: `master`.
- Workflow: `.github/workflows/deploy-pages.yml`.
- Build: Node.js 22, `npm ci`, `npm run build:pages`.
- Artefacto: `pages-dist/` con HTML hidratable, recursos `_next`, imágenes y referencias.
- URL pública: `https://jonathan512439.github.io/prueba_saas/`.
- Validaciones locales: lint correcto y build de Pages correcto.
- Validaciones en producción: documento HTML, hoja de estilos, JavaScript e imagen principal responden con HTTP 200.
- Prueba funcional en navegador: directorio de 45 rubros, navegación al rubro Calzado y catálogo con cuatro productos, sin errores de consola.

## Próximas fases

1. Personalizar el segundo grupo de rubros con banners y productos únicos.
2. Sustituir datos demostrativos por contenido definitivo del negocio.
3. Realizar revisión visual por dispositivo y accesibilidad.

## Corrección de fidelidad visual — 2026-09-09

- Motivo: la primera versión reutilizaba una plantilla web genérica y no replicaba suficientemente las interfaces móviles mostradas en las referencias.
- Referencias auditadas: 02 Calzado, 17 Canchas deportivas, 41 Clínica dental y 44 Ferretería.
- Diferencias detectadas: escala de escritorio incorrecta, jerarquía y orden de bloques distintos, categorías sin tratamiento circular, tarjetas demasiado grandes y fichas sin los controles específicos de cada rubro.
- Corrección implementada: nuevo componente móvil para los cuatro pilotos, con cabecera de marca, buscador, banner compacto, categorías circulares, tarjetas densas, navegación inferior fija y ficha detallada.
- Flujos específicos añadidos: tallas y variantes para Calzado; fechas y horarios para Clínica dental y Canchas; especificaciones, cantidad, carrito y WhatsApp para Ferretería.
- Estado al retomar: implementación y compilación local completadas.
- Revisión visual final: portada y ficha de Calzado verificadas en navegador, con navegación funcional y sin errores de consola.
- Estado de la corrección: lista para publicación en GitHub Pages.

## Fase 2 — Segundo grupo de rubros — 2026-09-09

- Estado: implementada y publicada en GitHub Pages.
- Commit funcional: `8224c48` (`Implement phase 2 catalog experiences`).
- Workflow de publicación verificado: ejecución `34423635185`, estado exitoso.
- Alcance: Veterinaria, Licorerías / bebidas, Servicios del hogar, Computación / servicio técnico, Seguridad / cámaras / alarmas, Carpinterías / metalúrgicas, Estacionamientos / garajes y Consultorías / servicios profesionales.
- Referencias auditadas: láminas 01, 03, 04, 05, 06, 07, 08 y 09.
- Activos: ocho banners fotográficos originales generados para esta fase, sin marcas ni textos incrustados, reutilizados con encuadres diferenciados en las tarjetas.
- Contenido: 32 fichas nuevas, cuatro por rubro, con precios en bolivianos, disponibilidad, calificación, variantes y atributos técnicos específicos.
- Navegación: portada, buscador, categorías, favoritos, carrito cuando corresponde, ficha detallada, selector de opciones, mapa y contacto por WhatsApp.
- Flujos por rubro: agenda o consulta veterinaria; compra responsable de bebidas; solicitud de visita domiciliaria; configuración y compra de tecnología; cotización e instalación de seguridad; acabados y cotización a medida; fecha y duración de parqueo; modalidad y solicitud de consultoría.
- Fidelidad visual: cabeceras oscuras, categorías circulares, banners compactos, grillas densas de tres tarjetas, navegación móvil inferior y CTA principal adaptado al rubro.
- Ajuste responsive: ancho móvil estabilizado, categorías con desplazamiento horizontal y tarjetas sin desbordamiento.
- Verificación local: lint correcto, compilación estática correcta, servidor HTTP 200 y captura móvil revisada.

## Mejora transversal — Calificación en Google Maps — 2026-09-09

- Estado: implementada en las portadas de los 45 catálogos.
- Componente reutilizable: `MapsReviewButton`, compartido por los catálogos personalizados y las vistas genéricas.
- Ubicación actualizada: integrado directamente en el encabezado de cada negocio; aparece como franja compacta bajo la marca en los catálogos móviles y como acción breve en la barra superior de los catálogos generales.
- Contenido: icono de ubicación, distintivo de estrella, nombre del negocio, valoración visual y franja inspirada en los colores de Google.
- Interacción actual: muestra una confirmación simulada con el nombre del negocio; no abre una URL externa.
- Preparación futura: el controlador puede sustituirse por el enlace específico de Google Maps de cada comercio sin modificar el diseño.
- Validación: lint y compilación de producción correctos.

### Mejora de reconocimiento del CTA — 2026-09-09

- Jerarquía reforzada con pin de Maps, franja multicolor, estrellas, calificación y flecha de avance.
- Microcopy orientado al cliente: “Tu opinión cuenta” y “Déjanos tu reseña en Google Maps”.
- Estados de interacción añadidos para hover, foco mediante teclado y pulsación táctil.
- Versión móvil con texto principal siempre visible y versión de escritorio integrada en la barra superior.

## Mejora transversal — Segundo banner promocional — 2026-09-09

- Estado: implementado en las portadas de los 45 catálogos.
- Ubicación: después de la selección de productos o servicios y antes de la franja informativa final.
- Catálogos personalizados: contenido, llamada a la acción y microcopy específicos para cada uno de los 12 rubros terminados.
- Catálogos generales: banner fotográfico adaptable con mensaje de atención personalizada.
- Activos: se reutilizan las fotografías reales ya preparadas para cada catálogo con un encuadre secundario diferenciado.
- Interacción: cada llamada a la acción abre una ficha relacionada o inicia la consulta por WhatsApp, según el tipo de catálogo.
- Responsive: composición horizontal en escritorio y lectura adaptada para móvil con contraste reforzado.

## Fase 3 — Servicios, entretenimiento y comercio especializado — 2026-09-10

- Estado: implementada, validada y publicada en GitHub Pages.
- Rubros: Transporte / mudanzas, Streaming, Entretenimiento infantil, Gimnasios / entrenamiento, Partes eléctricas / electrónicas, Cajas americanas / saldos importados y Agencias de viaje.
- Referencias auditadas: láminas 10 a 16.
- Activos: siete fotografías originales generadas para portadas y tarjetas, sin marcas, texto ni interfaces incrustadas.
- Contenido: 28 fichas nuevas con precios en bolivianos, disponibilidad, variantes y atributos específicos por rubro.
- Flujos: cotización de mudanzas; selección y renovación de planes digitales; reserva de fiestas; inscripción y compra fitness; cotización técnica; compra de lotes; y reserva de paquetes turísticos.
- Fidelidad visual: cabeceras oscuras, categorías circulares, paletas específicas, banners dobles, grillas densas y ficha detallada móvil.
- Funciones conservadas: búsqueda, favoritos, carrito cuando corresponde, fechas, mapa, reseña simulada de Google Maps y contacto por WhatsApp.
- Validación: análisis de código, compilación de producción y paquete estático de Pages completados correctamente.

## Fase 4 — Comercio, experiencias, formación y propiedades — 2026-09-10

- Estado: implementada, validada y publicada en GitHub Pages; actualización privada de Sites pendiente por acceso del conector.
- Commit funcional: 5b6abac (Implement phase 5 catalog experiences).
- Workflow de Pages: ejecución 34443793209, completada correctamente.
- Commit funcional: `599d167` (`Implement phase 4 catalog experiences`).
- Workflow de Pages: ejecución `34440147012`, completada correctamente.
- Versión privada de Sites: versión 3, desplegada correctamente.
- Rubros: Distribuidores mayoristas / B2B, Cerámicas / pisos / construcción, Salas de juego, Artesanías / personalizados, Turismo / tours, Educación / cursos, Inmobiliaria y Hotel / alojamiento.
- Referencias auditadas: láminas 18 a 25.
- Activos: ocho banners fotográficos originales, con composición horizontal y zona segura para titulares; el activo de Educación fue regenerado para eliminar rótulos incrustados.
- Contenido: 32 fichas nuevas, cuatro por rubro, con precios en bolivianos, disponibilidad, calificaciones, opciones y atributos técnicos propios de cada actividad.
- Mayoristas: SKU, presentación, pedido mínimo, stock, escalas por volumen, forma de pago y entrega.
- Cerámicas: formato, rendimiento por caja, piezas, espesor, acabado, resistencia, uso y lote.
- Entretenimiento y turismo: plataforma, duración, jugadores o cupos, horarios, inclusiones, dificultad, punto de encuentro y modalidad.
- Artesanías: material, técnica, medidas, acabado, personalización, tiempo de fabricación y cuidados.
- Educación: nivel, duración, modalidad, horario, docente, requisitos, cupos y certificación.
- Inmobiliaria: operación, superficie, ambientes, servicios, expensas, documentación, amenidades y visita.
- Hotel: huéspedes, camas, baño, desayuno, WiFi, parqueo, horarios, disponibilidad y cancelación.
- Diseño: ocho paletas específicas, cabeceras oscuras, categorías circulares, doble banner, tarjetas densas y ficha móvil detallada.
- Navegación funcional: portada, categorías, búsqueda, favoritos, pedidos o reservas, detalle, selectores, contacto por WhatsApp y reseña simulada de Google Maps.
- Cobertura acumulada: 27 de 45 rubros personalizados; quedan 18 para las fases siguientes.

## Fase 5 — Producción, cuidado, impresión y comercio familiar — 2026-09-10

- Estado: implementada, validada y publicada en GitHub Pages y Sites.
- Rubros: Fotografía / video / DJ, Veterinaria / clínica pet, Imprenta / publicidad, Alquiler para fiestas / eventos, Óptica, Juguetería / bebés, Deportes / fitness y Pet shop / mascotas.
- Referencias auditadas: láminas 26 a 33.
- Activos: ocho banners fotográficos originales, horizontales y sin textos incrustados, preparados con zona segura para titulares HTML.
- Contenido: 32 fichas nuevas, cuatro por rubro, con precios en bolivianos, calificación, disponibilidad, variantes y atributos especializados.
- Audiovisual: tipo de cobertura, duración, equipo, profesional, entrega, estilo, capacidad y extras.
- Clínica pet: especie, etapa, peso, historial o registro, profesional, cita, modalidad, preparación y condiciones de cuidado.
- Imprenta: medida, material, gramaje, caras, acabado, cantidad mínima, diseño y plazo de entrega.
- Eventos: unidades, capacidad, dimensiones, material, montaje, transporte, depósito, duración y disponibilidad por fecha.
- Óptica: forma, material, color, medidas, género, protección, graduación compatible y accesorios incluidos.
- Juguetería: edad y etapa recomendadas, material, piezas, medidas, seguridad, certificación y color.
- Deportes: disciplina, nivel, talla, material, tecnología, peso, uso y accesorios.
- Pet shop: tipo de mascota, etapa, tamaño, sabor, peso o presentación, nutrición, higiene y compatibilidad.
- Diseño: ocho identidades cromáticas, cabeceras adaptadas, categorías específicas, dos banners, grilla densa y detalle móvil.
- Flujos previstos: reserva por fecha para servicios y alquileres; configuración y cotización para impresión; selección de variantes y pedido para óptica, juguetes, deportes y mascotas.
- Validación: lint, compilación de producción y paquete estático de Pages completados correctamente.
- Verificación pública: portada, banner de Producción audiovisual y banner de Pet shop responden con HTTP 200.
- Sites: el manifiesto conserva el proyecto existente, pero el conector actual respondió project_not_found; no se creó otro proyecto para evitar duplicados.
- Cobertura acumulada: 35 de 45 rubros personalizados; quedan 10.

## Fase 6 — Comercio especializado, celebraciones, hogar y regalos — 2026-09-10

- Estado: implementada, validada y publicada en GitHub Pages; actualización privada de Sites pendiente por acceso del conector.
- Commit funcional: `494538d` (`Implement phase 6 catalog experiences`).
- Workflow de Pages: ejecución `34447863310`, completada correctamente.
- Rubros: Librería / papelería, Pastelería / repostería, Mueblería / decoración, Repuestos automotrices / motos y Florería / regalos.
- Referencias auditadas: láminas 34 a 38.
- Activos: cinco banners fotográficos originales, horizontales, sin marcas ni texto incrustado y con zona segura para titulares HTML.
- Contenido: 20 fichas nuevas, cuatro por rubro, con precios en bolivianos, disponibilidad, calificación, variantes y atributos especializados.
- Librería: marca, hojas, tamaño, formato, color, presentación, nivel educativo, packs y listas escolares personalizadas.
- Pastelería: porciones, sabor, relleno, decoración, mensaje, alérgenos, complementos, fecha y modalidad de entrega.
- Mueblería: dimensiones, materiales, tapiz, colores, acabados, capacidad, armado, fabricación, entrega y garantía.
- Repuestos: compatibilidad por vehículo, motor, año, código equivalente, posición, medidas, normas técnicas e instalación.
- Florería: ocasión, flores, paleta, tamaño, mensaje, complementos, preparación, fecha y hora de entrega.
- Flujos: compra y configuración para Librería, Mueblería y Repuestos; programación por fecha para Pastelería y Florería.
- Diseño: cinco identidades cromáticas, encabezado con reseña simulada de Google Maps, categorías específicas, dos banners, grilla densa y ficha detallada móvil.
- Navegación funcional: portada, categorías, búsqueda, favoritos o pedidos, ficha, selección de opciones y contacto por WhatsApp.
- Validación: lint, compilación de producción y paquete estático de Pages completados correctamente.
- Verificación pública: portada y los cinco banners de la fase responden con HTTP 200.
- Revisión visual en navegador: portada y ficha de Librería comprobadas en producción, con navegación por producto, variantes, especificaciones y CTAs visibles sin errores.
- Sites: el manifiesto conserva el proyecto existente, pero el conector actual respondió `project_not_found`; no se creó otro proyecto para evitar duplicados.
- Cobertura acumulada: 40 de 45 rubros personalizados; quedan 5 para la Fase 7.

## Fase 7 — Tecnología, consumo, belleza, moda y gastronomía — 2026-09-10

- Estado: implementada, validada y publicada en GitHub Pages; actualización privada de Sites pendiente por acceso del conector.
- Commit funcional: `295c19e` (`Complete all 45 catalog experiences`).
- Workflow de Pages: ejecución `34450556505`, completada correctamente.
- Rubros: Electrónica / tecnología, Minimarket / abarrotes, Barbería / belleza, Moda / boutique y Restaurante / comida.
- Referencias auditadas: láminas 39, 40, 42, 43 y 45; las láminas 41 y 44 ya correspondían a los pilotos Dental y Ferretería.
- Activos: cinco banners fotográficos originales, horizontales, sin marcas ni texto incrustado y con zona segura para titulares HTML.
- Contenido: 20 fichas nuevas, cuatro por rubro, con precios en bolivianos, disponibilidad, calificación, variantes y atributos especializados.
- Electrónica: marca, modelo, color, almacenamiento, batería, conectividad, compatibilidad, especificaciones y garantía.
- Minimarket: marca, contenido neto, variedad, presentación, unidad, vencimiento, sustituciones, promociones y delivery.
- Barbería: servicio, profesional, duración, paquete, sede, extras, fecha, horario y reserva.
- Moda: talla, color, material, estilo, marca, temporada, calce, cuidado y stock por variante.
- Restaurante: tamaño o porción, ingredientes, acompañamientos, picante, extras, combos, preparación y modalidad de entrega.
- Flujos: comparación y compra para Electrónica; carrito rápido para Minimarket; agenda para Barbería; talla y color para Moda; menú configurable para Restaurante.
- Diseño: cinco identidades visuales, encabezado con reseña simulada de Google Maps, categorías específicas, dos banners, grilla densa y fichas detalladas.
- Navegación funcional: portada, categorías, búsqueda, favoritos o pedidos, ficha, selección de opciones, cantidad y contacto por WhatsApp.
- Validación: lint, compilación de producción y paquete estático de Pages completados correctamente.
- Verificación pública: portada y los cinco banners de la fase responden con HTTP 200.
- Sites: el manifiesto conserva el proyecto existente, pero el conector actual respondió `project_not_found`; no se creó otro proyecto para evitar duplicados.
- Cobertura acumulada: 45 de 45 rubros personalizados; catálogo multirrubro completo.

## Mejora visual — Alimentos y consumo / Comercio y moda — 2026-09-10

- Estado: implementada, validada y publicada en GitHub Pages y Sites.
- Commit funcional: `10de2fb` (`Refresh food and fashion catalog design`).
- Workflow de Pages: ejecución `34452612509`, completada correctamente.
- Sites: versión 4 publicada correctamente en el proyecto existente `Catálogouno`.
- Alcance: Licorería, Pastelería, Minimarket, Restaurante, Calzado, Cajas americanas, Deportes y Moda.
- Objetivo: acercar las portadas y fichas a las referencias móviles originales con una presentación más fresca, comercial y fotográfica.
- Portadas: encabezado más compacto, reseña de Maps integrada, buscador elevado, banner fotográfico enmarcado y CTA tipo píldora.
- Categorías: botones circulares más amplios, estados activos visibles, mejor espaciado táctil y desplazamiento horizontal.
- Productos: grilla de dos columnas, fotografías de mayor tamaño, tarjetas sin bordes pesados, sombras suaves, badges redondeados, títulos legibles y precio protagonista.
- Segundo banner: mayor altura, composición fotográfica reforzada, contenido más legible y CTA redondeado.
- Fichas: fotografía ampliada, panel de información superpuesto, selectores táctiles, especificaciones en cuadrícula y acciones inferiores más claras.
- Responsive: composición sin marco en teléfonos y presentación tipo dispositivo en pantallas amplias.
- Funciones conservadas: búsqueda, categorías, favoritos, carrito, variantes, cantidad, fechas cuando corresponden, WhatsApp y reseña simulada de Google Maps.
- Validación: lint, compilación estática para Pages y compilación de producción para Sites completadas correctamente.
- Verificación pública: la portada de GitHub Pages responde con HTTP 200 y el despliegue privado de Sites finalizó con estado correcto.

## Mejora visual — Patrones temáticos por rubro — 2026-09-10

- Estado: implementada, validada y publicada en GitHub Pages y Sites.
- Commit funcional: `d206afc` (`Add themed icon patterns to catalogs`).
- Workflow de Pages: ejecución `34457604492`, completada correctamente.
- Sites: versión 5 publicada correctamente en el proyecto existente `Catálogouno`.
- Alcance: los 45 catálogos personalizados, tanto en portada como en ficha de producto o servicio.
- Motivos: combinación del icono principal del rubro con los iconos de sus categorías para que cada fondo sea reconocible y específico.
- Composición: retícula compacta de iconos, variación controlada de rotación y escala, baja opacidad y color suavizado.
- Legibilidad: patrón no interactivo ubicado detrás del contenido; encabezados, tarjetas de producto, avisos y navegación mantienen superficies opacas.
- Responsive: densidad y opacidad ajustadas para escritorio y teléfono sin añadir desplazamiento lateral.
- Validación: lint, compilación de producción, paquete estático para Pages y ambos despliegues completados correctamente.

## Piloto visual premium del catálogo SaaS — 2026-09-10

- Estado: implementada, validada técnicamente y publicada.
- Alcance: Moda, Restaurante, Barbería, Electrónica, Hotel y Juguetería.
- Modelo: se conserva un único componente de catálogo; cada negocio recibe un preset visual controlado, no una landing independiente.
- Prioridad móvil: catálogo de ancho completo, encabezado compacto, categorías táctiles, dos columnas de productos, segundo banner y acciones inferiores adaptadas al área segura.
- Escritorio: contenedor amplio, encabezado en tres zonas, cuatro columnas de productos y ficha de producto en dos columnas.
- Activos: se conservan sin reemplazos todos los banners y fotografías existentes.
- Interacciones conservadas: búsqueda, categorías, favoritos, carrito, detalle, variantes, cantidad, reserva o consulta, WhatsApp, compartir y reseña simulada en Maps.
- Validación previa al despliegue: `oxlint`, compilación de producción y generación estática con base `/prueba_saas` completadas sin errores.
- Validación visual asistida: pendiente de revisión en los enlaces públicos porque esta sesión no dispone de una superficie de navegador habilitada.
- GitHub: commit `f3384a0d11cce80625882fc6274184857685eb98`; workflow `Deploy GitHub Pages` #34465148545 completado correctamente; URL pública respondió HTTP 200.
- Sites: versión privada 6 (`appgprj_6aa1d744bdb4819188d8cf7320cb2418~appgver_6a142fcbaf1081918845963c1ced99c5`) publicada correctamente en el proyecto existente.

## Rediseño visible de Veterinaria — 2026-09-10

- Estado: implementada, validada y publicada.
- Catálogo: Veterinaria / VetCare.
- Dirección visual: clínica veterinaria moderna, verde profundo y menta, con hero más dominante, tarjetas de atención rápida y productos en formato horizontal.
- Acciones simuladas añadidas: agendar consulta, urgencias por WhatsApp, ubicación en Maps y consulta del horario.
- Responsive: composición móvil de una columna y escritorio con panel de atención superpuesto y productos en dos columnas.
- Patrones: se conserva `CatalogIconPattern` en los 45 catálogos; Veterinaria recibe una opacidad ligeramente mayor sin cubrir productos ni controles.
- Activos: se mantienen intactos el banner y todas las fotografías existentes.
- Validación: linter, compilación de producción y paquete estático para GitHub Pages completados sin errores.
- GitHub: commit funcional `5ae8f3ce02b69ca50c615653fed48be07468e704`; workflow `Deploy GitHub Pages` #34481443431 completado correctamente.
- Sites: versión privada 7 (`appgprj_6aa1d744bdb4819188d8cf7320cb2418~appgver_05945aad89488191904523e1127bfa93`) publicada correctamente.

## Unificación de banners premium — 2026-09-10

- Estado: implementada y validada; publicación en curso.
- Alcance: Moda, Restaurante, Barbería, Electrónica, Hotel, Juguetería y Veterinaria.
- Cambio: el banner superior y el banner inferior usan una única variable de altura compartida.
- Móvil: ambos banners tienen 220 px de alto y el mismo ancho útil de catálogo.
- Escritorio: ambos banners tienen 300 px de alto y márgenes laterales equivalentes.
- Forma: ambos banners comparten también el radio de esquina definido por cada preset.
- Veterinaria: tipografía del hero reajustada para conservar legibilidad sin perder sus accesos rápidos.
- Patrones: los patrones de iconos permanecen habilitados en todos los catálogos.
- Validación: linter y compilación estática de GitHub Pages completados sin errores.
