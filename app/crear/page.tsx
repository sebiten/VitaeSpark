import CVForm from "@/components/pdf/CVForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F0F10] p-4">
      <CVForm />
    </div>
  );
};

export default Page;
