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
- `/producto/[id]`: detalles de productos predefinidos y publicados en este navegador.
- `/favoritos`: productos guardados en favoritos.
- `/publicar`: formulario para publicar productos con imagen local optimizada.
- `/mis-productos`: publicaciones del usuario activo.
- `/intercambios`: solicitudes recibidas y enviadas; permite aceptar o rechazar.
- `/dashboard`: métricas de los datos simulados y del almacenamiento local.

## Datos y servicios

- `src/types/`: modelos tipados para productos, usuarios e intercambios.
- `src/data/`: datos de prueba; incluye 50 productos, 6 usuarios, 10 propuestas
  de intercambio y 15 favoritos iniciales.
- `src/services/`: funciones de acceso a los datos que pueden sustituirse por
  llamadas a una API sin acoplar los componentes al origen de datos.
- `src/lib/localStorage.ts` y `src/hooks/usePersistentState.ts`: persistencia
  tipada compartida entre componentes y sincronizada entre pestañas.
- `public/products/`: imágenes locales utilizadas por el catálogo.
- `src/components/`: componentes de página, catálogo y tarjetas reutilizables.

Las publicaciones, favoritos, usuario activo y propuestas creadas se guardan en
el `localStorage` del navegador. La imagen de una publicación se reduce a un
máximo de 1200 px y se comprime antes de guardarse. Los datos no se sincronizan
entre dispositivos y se borran si se limpia el almacenamiento del navegador.

Para validar cambios:

```bash
npm run lint
npm run build
```
