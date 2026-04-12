import Hero from "@/components/hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Crear Curriculum Online con IA",
  description:
    "Crea tu curriculum vitae online con IA, plantillas profesionales, enfoque ATS y descarga en PDF con Vitae Spark.",
  path: "/",
  keywords: [
    "crear curriculum online",
    "crear cv online",
    "hacer curriculum vitae",
    "curriculum ats",
    "crear cv con ia",
  ],
});

export default function GeneradorCV() {
  return (
    <div className=" mx-auto space-y-10">
      <Hero />
    </div>
  );
}
