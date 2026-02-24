import Link from "next/link";

export default function Home() {
  return (
    <main className="relative w-full h-[300vh] pointer-events-none">
      {/* Grid Brutalista Expuesto de Fondo (fixed to viewport) */}
      <div className="fixed top-0 left-0 w-full h-screen grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20 z-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-white/20"></div>
        ))}
      </div>

      <div className="relative z-10 w-full">
        {/* Sección 1: Título */}
        <section className="h-screen flex flex-col items-center justify-center text-center pointer-events-auto">
          <p className="text-[#ccff00] text-sm tracking-[0.5em] uppercase mb-4 font-bold">
            Drop 01 // Active
          </p>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8 mix-blend-difference">
            Digital
            <br />
            Threads
          </h1>
          <Link
            href="/catalog"
            className="border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black transition-colors duration-300 px-8 py-4 text-sm tracking-widest uppercase font-bold cursor-pointer inline-block"
          >
            Enter Catalog
          </Link>
        </section>

        {/* Sección 2: Vacía para contemplar el 3D */}
        <section className="h-screen flex items-center justify-center pointer-events-none">
          {/* Espacio vacío intencional */}
        </section>

        {/* Sección 3: Enter the Void */}
        <section className="h-screen flex flex-col items-center justify-center text-center pointer-events-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8 mix-blend-difference">
            ENTER THE VOID
            <br />
            <span className="text-[#ccff00] text-3xl md:text-5xl tracking-widest">{`// DROP 01`}</span>
          </h2>
          <Link
            href="/catalog"
            className="border-2 border-white text-white hover:bg-white hover:text-black transition-colors duration-300 px-12 py-6 text-lg tracking-[0.3em] uppercase font-bold cursor-pointer inline-block"
          >
            EXPLORE CATALOG
          </Link>
        </section>
      </div>
    </main>
  );
}
