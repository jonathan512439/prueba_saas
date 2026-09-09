# Catálogouno — demo visual multirrubro

Prototipo visual de un SaaS de catálogos para múltiples rubros. Incluye un directorio general de 45 rubros y experiencias completas para calzado, clínica dental, canchas deportivas y ferretería.

## Demo en línea

La publicación se realiza automáticamente con GitHub Actions en:

https://jonathan512439.github.io/prueba_saas/

## Desarrollo local

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev
```

Validaciones disponibles:

```bash
npm run lint
npm run build
```

## Publicación

Cada `push` a `master` ejecuta `.github/workflows/deploy-pages.yml`, genera el artefacto estático en `pages-dist/` y lo publica en GitHub Pages.

El registro técnico de avances está en [`docs/AVANCES.md`](docs/AVANCES.md).
