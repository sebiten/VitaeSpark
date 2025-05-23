import { CVRecord } from "@/lib/types/cv";

export const CVThumbnail = ({ cv }: { cv: CVRecord }) => {
  return (
    <div className="w-full h-[180px] flex items-center justify-center bg-[#111112] rounded-md overflow-hidden">
      <div className="w-[120px] h-[160px] bg-white rounded shadow-md flex flex-col p-2">
        <div className="w-full h-4 bg-primary mb-2 rounded-sm"></div>
        <div className="w-3/4 h-2 bg-gray-300 mb-1 rounded-sm"></div>
        <div className="w-1/2 h-2 bg-gray-300 mb-3 rounded-sm"></div>

        <div className="w-full h-2 bg-gray-200 mb-1 rounded-sm"></div>
        <div className="w-full h-2 bg-gray-200 mb-1 rounded-sm"></div>
        <div className="w-3/4 h-2 bg-gray-200 mb-3 rounded-sm"></div>

        <div className="w-full h-3 bg-secondary/30 mb-2 rounded-sm"></div>
        <div className="w-full h-2 bg-gray-200 mb-1 rounded-sm"></div>
        <div className="w-full h-2 bg-gray-200 mb-1 rounded-sm"></div>
        <div className="w-1/2 h-2 bg-gray-200 rounded-sm"></div>
      </div>
    </div>
  );
};