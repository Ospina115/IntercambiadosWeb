# INTERCAMBIADOS

Marketplace de moda circular construido con Next.js App Router. La aplicación
usa datos locales simulados para productos, usuarios, favoritos e intercambios;
no necesita una API o base de datos para ejecutarse.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Rutas

- `/`: portada y selección de productos destacados.
- `/marketplace`: catálogo completo con filtros y búsqueda.
- `/producto/[id]`: detalle de cada producto, por ejemplo `/producto/1`.

## Datos y servicios

- `src/types/`: modelos tipados para productos, usuarios e intercambios.
- `src/data/`: datos de prueba; incluye 24 productos, 6 usuarios, 10 propuestas
  de intercambio y una lista inicial de favoritos.
- `src/services/`: funciones de acceso a los datos que pueden sustituirse por
  llamadas a una API sin acoplar los componentes al origen de datos.
- `public/products/`: imágenes locales utilizadas por el catálogo.
- `src/components/`: componentes de página, catálogo y tarjetas reutilizables.

Para validar cambios:

```bash
npm run lint
npm run build
```
