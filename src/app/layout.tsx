// app/layout.tsx
import { CartProvider } from "../components/CartContext";
import "./globals.css";

export const metadata = {
  title: "Whatbytes Ecommerce",
  description: "Ecommerce app built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="hydrated">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}