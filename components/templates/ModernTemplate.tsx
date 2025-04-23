// components/templates/ModernTemplate.tsx
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props { content: string; }

export const ModernTemplate = React.forwardRef<HTMLDivElement, Props>(
  ({ content }, ref) => {
    // Extrae lista tras un heading en español
    const extractList = (section: string) => {
      const idx = content.indexOf(section);
      if (idx === -1) return [] as string[];
      const after = content.slice(idx + section.length);
      return after
        .split("\n")
        .filter((l) => l.trim().startsWith("- "))
        .map((l) => l.replace(/^- /, "").trim());
    };

    const habilidades = extractList("## Habilidades");
    const idiomas = extractList("## Idiomas");

    return (
      <div
        ref={ref}
        className="p-10 max-w-[900px] mx-auto bg-white text-gray-900 font-sans grid grid-cols-3 gap-8"
      >
        {/* Contenido principal */}
        <div className="col-span-2 space-y-6">
          <ReactMarkdown
            components={{
              h1: (props) => <h1 className="text-4xl font-extrabold text-indigo-700" {...props} />,
              h2: (props) => (
                <h2 className="text-2xl font-semibold mt-8 mb-2 border-b-2 border-indigo-300 pb-1" {...props} />
              ),
              p: (props) => <p className="text-gray-800 leading-relaxed" {...props} />,
              li: (props) => <li className="ml-4 list-disc" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Sidebar en español */}
        <aside className="col-span-1 space-y-6 bg-indigo-50 p-6 rounded">
          {habilidades.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-indigo-600">Habilidades</h3>
              <ul className="list-disc ml-4 text-gray-800">
                {habilidades.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </>
          )}

          {idiomas.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-indigo-600 mt-4">Idiomas</h3>
              <ul className="list-disc ml-4 text-gray-800">
                {idiomas.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </>
          )}
        </aside>
      </div>
    );
  }
);
ModernTemplate.displayName = "ModernTemplate";
