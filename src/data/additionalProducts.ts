import type { Product } from "@/types/product";

const additionalItems: Omit<Product, "ownerId">[] = [
  { id: "25", title: "Suéter tejido", description: "Suéter suave para días frescos.", category: "ropa", condition: "Muy buen estado", price: 48000, imageUrl: "/products/ropa-colores.jpg", imageAlt: "Suéter tejido" },
  { id: "26", title: "Top de algodón", description: "Top básico de algodón ligero.", category: "ropa", condition: "Como nuevo", price: 21000, imageUrl: "/products/camisa-blanca.jpg", imageAlt: "Top claro de algodón" },
  { id: "27", title: "Falda midi", description: "Falda midi fluida para combinar.", category: "ropa", condition: "Excelente estado", price: 37000, imageUrl: "/products/ropa-colores.jpg", imageAlt: "Falda midi" },
  { id: "28", title: "Pantalón palazzo", description: "Pantalón cómodo de pierna amplia.", category: "ropa", condition: "Buen estado", price: 43000, imageUrl: "/products/look-casual.jpg", imageAlt: "Pantalón casual" },
  { id: "29", title: "Blazer ligero", description: "Blazer casual para llevar en capas.", category: "ropa", condition: "Muy buen estado", price: 62000, imageUrl: "/products/ropa-colores.jpg", imageAlt: "Blazer ligero" },
  { id: "30", title: "Camiseta gráfica", description: "Camiseta cómoda con estampado discreto.", category: "ropa", condition: "Excelente estado", price: 25000, imageUrl: "/products/camisa-blanca.jpg", imageAlt: "Camiseta gráfica" },
  { id: "31", title: "Bolso shopper", description: "Bolso amplio para llevar todo lo esencial.", category: "bolsos", condition: "Muy buen estado", price: 51000, imageUrl: "/products/bolso-beige.jpg", imageAlt: "Bolso shopper" },
  { id: "32", title: "Riñonera urbana", description: "Riñonera práctica para paseos y viajes.", category: "bolsos", condition: "Como nuevo", price: 29000, imageUrl: "/products/bolso-beige.jpg", imageAlt: "Riñonera urbana" },
  { id: "33", title: "Bolso de mano", description: "Bolso compacto para una salida especial.", category: "bolsos", condition: "Excelente estado", price: 44000, imageUrl: "/products/bolso-beige.jpg", imageAlt: "Bolso de mano" },
  { id: "34", title: "Mochila casual", description: "Mochila liviana con espacio para diario.", category: "bolsos", condition: "Buen estado", price: 56000, imageUrl: "/products/look-casual.jpg", imageAlt: "Mochila casual" },
  { id: "35", title: "Gafas aviador", description: "Gafas de sol clásicas de estilo aviador.", category: "gafas", condition: "Muy buen estado", price: 35000, imageUrl: "/products/gafas-vintage.jpg", imageAlt: "Gafas estilo aviador" },
  { id: "36", title: "Gafas ovaladas", description: "Montura ovalada de inspiración retro.", category: "gafas", condition: "Como nuevo", price: 27000, imageUrl: "/products/gafas-vintage.jpg", imageAlt: "Gafas ovaladas" },
  { id: "37", title: "Gafas de marco claro", description: "Armazón claro, ligero y versátil.", category: "gafas", condition: "Excelente estado", price: 30000, imageUrl: "/products/gafas-vintage.jpg", imageAlt: "Gafas de marco claro" },
  { id: "38", title: "Gafas cat eye", description: "Silueta cat eye para un look llamativo.", category: "gafas", condition: "Muy buen estado", price: 39000, imageUrl: "/products/gafas-vintage.jpg", imageAlt: "Gafas cat eye" },
  { id: "39", title: "Lentes redondos", description: "Armazón redondo liviano para diario.", category: "gafas", condition: "Buen estado", price: 24000, imageUrl: "/products/gafas-vintage.jpg", imageAlt: "Lentes redondos" },
  { id: "40", title: "Set de anillos", description: "Anillos delicados para combinar entre sí.", category: "accesorios", condition: "Como nuevo", price: 20000, imageUrl: "/products/detalles-dorados.jpg", imageAlt: "Set de anillos" },
  { id: "41", title: "Cadena fina", description: "Cadena fina de estilo minimalista.", category: "accesorios", condition: "Excelente estado", price: 17000, imageUrl: "/products/detalles-dorados.jpg", imageAlt: "Cadena fina" },
  { id: "42", title: "Pañoleta colorida", description: "Pañoleta liviana con tonos alegres.", category: "accesorios", condition: "Muy buen estado", price: 16000, imageUrl: "/products/ropa-colores.jpg", imageAlt: "Pañoleta colorida" },
  { id: "43", title: "Broche floral", description: "Broche decorativo para chaquetas y bolsos.", category: "accesorios", condition: "Como nuevo", price: 13000, imageUrl: "/products/detalles-dorados.jpg", imageAlt: "Broche floral" },
  { id: "44", title: "Gorra clásica", description: "Gorra cómoda de estilo casual.", category: "accesorios", condition: "Buen estado", price: 18000, imageUrl: "/products/look-casual.jpg", imageAlt: "Gorra clásica" },
  { id: "45", title: "Cardigan liviano", description: "Cardigan suave para usar todo el año.", category: "ropa", condition: "Como nuevo", price: 46000, imageUrl: "/products/ropa-colores.jpg", imageAlt: "Cardigan liviano" },
  { id: "46", title: "Blusa de botones", description: "Blusa ligera con botones al frente.", category: "ropa", condition: "Muy buen estado", price: 33000, imageUrl: "/products/camisa-blanca.jpg", imageAlt: "Blusa de botones" },
  { id: "47", title: "Bolso pequeño", description: "Bolso pequeño y práctico para salir.", category: "bolsos", condition: "Excelente estado", price: 32000, imageUrl: "/products/bolso-beige.jpg", imageAlt: "Bolso pequeño" },
  { id: "48", title: "Bolso tipo sobre", description: "Diseño compacto para llevar lo esencial.", category: "bolsos", condition: "Muy buen estado", price: 28000, imageUrl: "/products/bolso-beige.jpg", imageAlt: "Bolso tipo sobre" },
  { id: "49", title: "Gafas geométricas", description: "Montura geométrica de estilo moderno.", category: "gafas", condition: "Como nuevo", price: 36000, imageUrl: "/products/gafas-vintage.jpg", imageAlt: "Gafas geométricas" },
  { id: "50", title: "Set de pulseras", description: "Pulseras combinables en tonos dorados.", category: "accesorios", condition: "Excelente estado", price: 23000, imageUrl: "/products/detalles-dorados.jpg", imageAlt: "Set de pulseras" },
];

export const additionalProducts: Product[] = additionalItems.map(
  (product, index) => ({
    ...product,
    ownerId: `user-${(index % 6) + 1}`,
  }),
);
