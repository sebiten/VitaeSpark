import { createClient } from "@/utils/supabase/server";
import { NextPage } from "next";
import { Navegation } from "@/components/navegation";

interface Props {}

const Navbar: NextPage<Props> = async ({}) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Navegation user={user} />;
};

export default Navbar;
