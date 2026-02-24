"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem } = useCartStore();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-black border-l border-white/20 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20 flex justify-between items-center">
          <h2 className="text-xl font-black tracking-tighter uppercase">
            TERMINAL // CART
          </h2>
          <button
            onClick={toggleCart}
            className="text-sm font-bold tracking-[0.3em] hover:text-[#ccff00] transition-colors uppercase"
          >
            [ CLOSE ]
          </button>
        </div>

        {/* Items */}
        <div className="flex-grow overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="font-mono text-sm opacity-50 tracking-widest">
                VOID IS EMPTY
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start border-b border-white/10 pb-4"
                >
                  <div>
                    <h3 className="font-bold tracking-widest uppercase text-sm mb-1">
                      {item.name}
                    </h3>
                    <p className="font-mono text-xs opacity-70">
                      QTY: {item.quantity} × {item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs font-mono text-red-500 hover:text-red-400 uppercase tracking-widest"
                  >
                    REMOVE
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20">
          <button
            className="w-full bg-[#ccff00] text-black py-4 text-sm tracking-[0.3em] uppercase font-black hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={items.length === 0}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}
