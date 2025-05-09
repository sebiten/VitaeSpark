// app/cv/preview/[id]/page.tsx
import { DocumentoCV } from "@/components/pdf/CVDocument";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getCVById } from "@/utils/supabase/getCvById";

type Props = {
  params: { id: string };
};

export default async function CVPreviewPage({ params }: Props) {
  const cv = await getCVById(params.id); // ✅ esto está bien si es un `async` server component
  if (!cv) return notFound();

  return (
    <div style={{ width: "794px", height: "1123px", margin: "0 auto" }}>
        
      <DocumentoCV cv={cv.cv_data} template={cv.template} />
    </div>
  );
}
