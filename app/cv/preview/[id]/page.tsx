// "use client";

// import { useEffect, useState, use } from "react";
// import { useRouter } from "next/navigation";
// import type { RespuestaCV } from "@/lib/types/cv";
// import PDFViewerWrapper from "@/components/PDFPreviewClient";

// export default function CVPreviewPage(props: { params: Promise<{ id: string }> }) {
//   const params = use(props.params);
//   const [cvData, setCvData] = useState<RespuestaCV["cv"] | null>(null);
//   const [template, setTemplate] = useState<string>("harvard");
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCV = async () => {
//       try {
//         const res = await fetch(`/api/get-cv-by-id?id=${params.id}`);
//         if (!res.ok) throw new Error("CV not found");
//         const data = await res.json();
//         setCvData(data.cv_data);
//         setTemplate(data.template || "harvard");
//       } catch (err) {
//         router.push("/not-found");
//       }
//     };

//     fetchCV();
//   }, [params.id, router]);

//   if (!cvData) {
//     return (
//       <p className="text-center text-white mt-10">Cargando vista previa...</p>
//     );
//   }

//   return <PDFViewerWrapper cv={cvData} template={template} />;
// }
