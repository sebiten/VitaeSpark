import CVForm from "@/components/pdf/CVForm";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="bg-[#1F1F22]">
      <CVForm />
    </div>
  );
};

export default Page;
