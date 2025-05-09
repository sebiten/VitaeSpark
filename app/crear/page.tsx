// app/page.tsx
import CVForm from "@/components/pdf/CVForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  return (
    <div className="min-h-screen bg-[#0F0F10]">
      {/* padding general en mobile, centrado en desktop */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 flex justify-center">
        {/* límite de ancho para todo el CVForm */}
        <div className="w-full max-w-3xl">
          <CVForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
