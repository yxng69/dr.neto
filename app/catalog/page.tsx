"use client";

import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import CartSidebar from "@/components/CartSidebar";
import { useCartStore } from "@/store/cartStore";

export default function CatalogPage() {
  const { items, toggleCart } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black relative z-20">
      {/* Header Brutalista */}
      <header className="flex justify-between items-center p-6 border-b border-white/20">
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.3em] hover:text-[#ccff00] transition-colors uppercase"
        >
          [ Return to Void ]
        </Link>
        <h1 className="text-xl font-black tracking-tighter uppercase mix-blend-difference">
          Archives // Drop 01
        </h1>
        <button
          onClick={toggleCart}
          className="text-sm font-mono opacity-50 hover:opacity-100 hover:text-[#ccff00] transition-colors uppercase"
        >
          CART ({totalItems})
        </button>
      </header>

      {/* Grid de Productos */}
      <ProductGrid />

      {/* Cart Sidebar */}
      <CartSidebar />
    </main>
  );
}
