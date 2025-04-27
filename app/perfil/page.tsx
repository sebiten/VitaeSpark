import { getUser } from "@/utils/supabase/getUser";
import { createClient } from "@/utils/supabase/server";
import { NextPage } from "next";

const Page: NextPage = async ({}) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1>{user?.email ? `Welcome ${user.email}` : "No user found"}</h1>
    </div>
  );
};

export default Page;
