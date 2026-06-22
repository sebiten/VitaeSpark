import CVForm from "@/components/pdf/CVForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { normalizeLanguage } from "@/lib/i18n";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  const params = await searchParams;
  const language = normalizeLanguage(params?.lang);
  const currentUser = {
    id: data.user.id,
    email: data.user.email ?? null,
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111113] px-3 py-3 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <CVForm initialLanguage={language} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Page;
