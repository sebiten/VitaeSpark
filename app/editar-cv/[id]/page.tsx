import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { EditSavedCVForm } from "@/components/EditSavedCVForm";
import { createClient } from "@/utils/supabase/server";

interface EditCVPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Editar CV | VitaeSpark",
  description: "Edita tu CV guardado y descarga una nueva version en PDF.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditCVPage({ params }: EditCVPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#111113] px-3 py-6 sm:px-6 lg:px-8">
      <EditSavedCVForm cvId={id} />
    </main>
  );
}
