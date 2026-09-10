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
