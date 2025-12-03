import { Suspense } from "react";
import PerfilCVs from "./PerfilCVs";

export default function PerfilPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-20 text-white">
          Cargando perfil...
        </div>
      }
    >
      <PerfilCVs />
    </Suspense>
  );
}
