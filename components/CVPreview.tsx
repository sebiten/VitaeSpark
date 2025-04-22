// components/CVPreview.tsx
import React from "react";
import ReactMarkdown from "react-markdown";

interface CVPreviewProps {
  content: string;
}

export const CVPreview = React.forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ content }, ref) => (
    <div
      ref={ref}
      className="p-10 w-[800px] bg-white text-black font-sans space-y-6"
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
);

CVPreview.displayName = "CVPreview";
