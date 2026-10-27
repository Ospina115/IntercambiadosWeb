import type { Metadata } from "next";
import ProductDetail from "@/components/ProductDetail";
import { getProductById } from "@/services/products";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Producto | INTERCAMBIADOS",
      description: "Prenda disponible para intercambio en INTERCAMBIADOS.",
    };
  }

  return {
    title: `${product.title} | INTERCAMBIADOS`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  return <ProductDetail id={id} initialProduct={product} />;
}
