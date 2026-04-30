import CVForm from "@/components/pdf/CVForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0F0F10] px-3 py-3 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <CVForm />
      </div>
    </div>
  );
};

export default Page;
