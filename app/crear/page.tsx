import CVForm from "@/components/pdf/CVForm";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { normalizeLanguage } from "@/lib/i18n";
import { normalizeCreateIntent } from "@/lib/blog-intent";
import { getRequestCountry } from "@/lib/market";
import { isGuestCheckoutEnabled } from "@/lib/guest-checkout-server";
import { normalizeCreateRole } from "@/lib/job-landing";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    lang?: string;
    intent?: string;
    resume?: string;
    role?: string;
  }>;
}) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const requestHeaders = await headers();
  const params = await searchParams;
  const language = normalizeLanguage(params?.lang);
  const initialIntent = normalizeCreateIntent(params?.intent);
  const initialRole = normalizeCreateRole(params?.role);
  const initialResumeAction =
    params?.resume === "generate" ||
    params?.resume === "photo" ||
    params?.resume === "checkout"
      ? params.resume
      : null;
  const currentUser = data.user
    ? {
        id: data.user.id,
        email: data.user.email ?? null,
        isAnonymous: data.user.is_anonymous === true,
      }
    : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111113] px-3 py-3 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <CVForm
          initialLanguage={language}
          initialIntent={initialIntent}
          initialRole={initialRole}
          initialResumeAction={initialResumeAction}
          currentUser={currentUser}
          guestCheckoutEnabled={isGuestCheckoutEnabled()}
          initialCountryCode={getRequestCountry(requestHeaders)}
        />
      </div>
    </div>
  );
};

export default Page;
