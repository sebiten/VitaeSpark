import CVForm from "@/components/pdf/CVForm";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { normalizeLanguage } from "@/lib/i18n";
import { normalizeCreateIntent } from "@/lib/blog-intent";
import { getRequestCountry } from "@/lib/market";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string; intent?: string }>;
}) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const requestHeaders = await headers();
  const params = await searchParams;
  const language = normalizeLanguage(params?.lang);
  const initialIntent = normalizeCreateIntent(params?.intent);
  const currentUser = data.user
    ? {
        id: data.user.id,
        email: data.user.email ?? null,
      }
    : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111113] px-3 py-3 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <CVForm
          initialLanguage={language}
          initialIntent={initialIntent}
          currentUser={currentUser}
          initialCountryCode={getRequestCountry(requestHeaders)}
        />
      </div>
    </div>
  );
};

export default Page;
