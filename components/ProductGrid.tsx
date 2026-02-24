"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export default function ProductGrid() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full border-t border-l border-white/20">
      {MOCK_PRODUCTS.map((product) => (
        <Link
          href={`/catalog/${product.id}`}
          key={product.id}
          className="group border-r border-b border-white/20 bg-black hover:bg-[#ccff00] hover:text-black transition-colors duration-150 flex flex-col h-[60vh] md:h-[70vh] cursor-pointer"
        >
          {/* Imagen Placeholder (Gris oscuro, se invierte en hover) */}
          <div className="flex-grow bg-[#0a0a0a] group-hover:bg-black/10 transition-colors duration-150 relative overflow-hidden flex items-center justify-center">
            <span className="text-white/10 group-hover:text-black/20 font-black text-6xl tracking-tighter">
              {product.id}
            </span>
          </div>

          {/* Información del Producto */}
          <div className="p-6 flex flex-col justify-between border-t border-white/20 group-hover:border-black/20">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg tracking-widest uppercase">
                  {product.name}
                </h3>
                <span className="text-xs font-mono tracking-tighter bg-white text-black group-hover:bg-black group-hover:text-[#ccff00] px-2 py-1">
                  {product.status}
                </span>
              </div>
              <p className="font-mono text-sm opacity-70 group-hover:opacity-100">
                {product.price}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                });
              }}
              disabled={product.status === "SOLD OUT"}
              className="mt-8 w-full border border-white/30 group-hover:border-black group-hover:bg-black group-hover:text-[#ccff00] py-3 text-xs tracking-[0.2em] uppercase font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.status === "SOLD OUT" ? "UNAVAILABLE" : "Add to Cart"}
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
