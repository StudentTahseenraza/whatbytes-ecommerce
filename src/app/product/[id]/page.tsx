// src/app/product/[id]/page.tsx
import products from "../../../data/products.json";
import { notFound } from "next/navigation";
import { Metadata} from "next"; // Import notFound
import ProductDetailClient from "./ProductDetailClient";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

interface ProductPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = products.find((p: Product) => p.id === parseInt(params.id));
  if (!product) {
    return {
      title: "Product Not Found | Whatbytes Ecommerce",
      description: "The product you are looking for does not exist.",
    };
  }
  return {
    title: `${product.title} | Whatbytes Ecommerce`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default function ProductDetail({ params }: ProductPageProps) {
  const product = products.find((p: Product) => p.id === parseInt(params.id));
  if (!product) {
    notFound(); // Redirect to 404 page if product is not found
  }

  return <ProductDetailClient product={product} />;
}