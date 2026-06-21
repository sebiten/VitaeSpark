import { Suspense } from "react";
import PerfilCVs from "./PerfilCVs";

function PerfilFallback() {
  return (
    <main className="min-h-screen bg-[#0D0D10] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="h-32 animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.04]" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-52 animate-pulse rounded-[1.5rem] border border-white/10 bg-white/[0.035]" />
          <div className="h-52 animate-pulse rounded-[1.5rem] border border-white/10 bg-white/[0.035]" />
          <div className="h-52 animate-pulse rounded-[1.5rem] border border-white/10 bg-white/[0.035]" />
        </div>
      </div>
    </main>
  );
}

export default function PerfilPage() {
  return (
    <Suspense fallback={<PerfilFallback />}>
      <PerfilCVs />
    </Suspense>
  );
}
