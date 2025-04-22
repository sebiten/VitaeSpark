import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

export const MinimalTemplate = React.forwardRef<HTMLDivElement, Props>(
  ({ content }, ref) => (
    <div
      ref={ref}
      className="p-8 max-w-[800px] mx-auto bg-white text-gray-800 font-sans space-y-6"
    >
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mb-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mt-6 mb-1" {...props} />
          ),
          p: ({ node, ...props }) => <p className="leading-relaxed" {...props} />,
          li: ({ node, ...props }) => <li className="ml-4 list-disc" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
);
MinimalTemplate.displayName = "MinimalTemplate";
