import { Suspense } from "react";
import PerfilCVs from "./PerfilCVs";

export default async function PerfilPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center bg-[#111113] px-4 text-white">
          <div className="rounded-3xl border border-white/10 bg-[#15151A]/80 px-8 py-6 text-center shadow-2xl shadow-black/20">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#7C3AED] border-t-transparent" />
            Cargando perfil...
          </div>
        </div>
      }
    >
      <PerfilCVs />
    </Suspense>
  );
}