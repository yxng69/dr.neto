import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import AddToCartButton from "@/components/AddToCartButton";
import CartSidebar from "@/components/CartSidebar";
import ProductViewer3D from "@/components/ProductViewer3D";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center selection:bg-[#ccff00] selection:text-black font-mono">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase text-red-500 mb-8">
          404
        </h1>
        <p className="text-2xl tracking-widest uppercase mb-12">
          PRODUCT NOT FOUND
        </p>
        <Link
          href="/catalog"
          className="border border-white/20 hover:border-[#ccff00] hover:text-[#ccff00] px-8 py-4 text-sm tracking-widest uppercase font-bold transition-colors"
        >
          [ RETURN TO CATALOG ]
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black font-mono">
      {/* Header Brutalista */}
      <header className="flex justify-between items-center p-6 border-b border-white/20 sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <Link
          href="/catalog"
          className="text-sm font-bold tracking-[0.3em] hover:text-[#ccff00] transition-colors uppercase"
        >
          [ BACK TO CATALOG ]
        </Link>
        <h1 className="text-xl font-black tracking-tighter uppercase mix-blend-difference">
          SYS // {product.id}
        </h1>
        <div className="text-sm font-mono opacity-50">
          {/* The cart button is handled globally or via CartSidebar, but we can just leave a placeholder or the actual button if we had a global header */}
        </div>
      </header>

      {/* Split Screen Layout */}
      <main className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Left Column: Visual (Sticky) */}
        <div className="relative h-[50vh] lg:h-[calc(100vh-80px)] lg:sticky lg:top-[80px] border-b lg:border-b-0 lg:border-r border-white/20 bg-[#050505] flex items-center justify-center overflow-hidden">
          {/* Decorative Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-10">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/20"></div>
            ))}
          </div>

          <div className="absolute inset-0 z-10">
            <ProductViewer3D />
          </div>

          <span className="text-white/5 font-black text-[15rem] tracking-tighter select-none mix-blend-difference z-0">
            {product.id}
          </span>
          <div className="absolute bottom-6 left-6 text-xs font-mono tracking-widest opacity-50 uppercase z-20 pointer-events-none">
            TEXTURE_VIEWER // ACTIVE
          </div>
        </div>

        {/* Right Column: Info (Scrollable) */}
        <div className="p-6 md:p-12 lg:p-24 flex flex-col justify-center">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-mono tracking-widest bg-white text-black px-3 py-1 font-bold">
                {product.status}
              </span>
              <span className="text-[#ccff00] font-mono tracking-widest text-sm">
                ID: {product.id}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
              {product.name}
            </h1>

            <div className="text-3xl font-mono tracking-widest mb-12">
              {product.price}
            </div>

            <div className="border-t border-white/20 pt-8">
              <h3 className="text-sm font-bold tracking-[0.3em] uppercase mb-4 opacity-50">
                DESCRIPTION //
              </h3>
              <p className="text-lg leading-relaxed font-mono opacity-80 max-w-2xl">
                {product.description}
              </p>
            </div>
          </div>

          <AddToCartButton product={product} />
        </div>
      </main>

      <CartSidebar />
    </div>
  );
}
