"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/lib/mockData";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (
      product.sizes.length > 0 &&
      !selectedSize &&
      product.sizes[0] !== "ONE SIZE"
    ) {
      alert("PLEASE SELECT A SIZE");
      return;
    }

    addItem({
      id: product.id,
      name: `${product.name} ${selectedSize && selectedSize !== "ONE SIZE" ? `[${selectedSize}]` : ""}`,
      price: product.price,
    });
  };

  return (
    <div className="mt-12">
      {/* Size Selector */}
      {product.sizes.length > 0 && product.sizes[0] !== "ONE SIZE" && (
        <div className="mb-8">
          <div className="text-sm font-mono tracking-widest opacity-50 mb-4">
            SELECT SIZE:
          </div>
          <div className="flex flex-wrap gap-4">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-16 h-16 border border-white/30 flex items-center justify-center font-mono text-sm tracking-widest transition-colors ${
                  selectedSize === size
                    ? "bg-[#ccff00] text-black border-[#ccff00]"
                    : "hover:bg-white hover:text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA Button */}
      <button
        onClick={handleAddToCart}
        disabled={product.status === "SOLD OUT"}
        className="w-full py-8 border-2 border-[#ccff00] text-[#ccff00] text-2xl font-black tracking-[0.3em] uppercase transition-all hover:bg-[#ccff00] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#ccff00]"
      >
        {product.status === "SOLD OUT" ? "UNAVAILABLE" : "ADD TO CART"}
      </button>
    </div>
  );
}
