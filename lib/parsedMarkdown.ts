export function parseMarkdownCV(markdown: string) {
    const result: Record<string, string> = {};
  
    const sections = markdown.split(/^## /gm);
    sections.forEach((block, i) => {
      if (i === 0 && block.includes("# ")) {
        // encabezado principal: nombre
        const [nameLine, ...rest] = block.trim().split("\n");
        result["name"] = nameLine.replace(/^# /, "").trim();
  
        // puede contener el título debajo
        if (rest[0]?.startsWith("## ")) {
          result["title"] = rest[0].replace(/^## /, "").trim();
        }
      } else {
        const [title, ...content] = block.trim().split("\n");
        const key = title.toLowerCase().replace(/\s+/g, "_");
        result[key] = content.join("\n").trim();
      }
    });
  
    return result;
  }
  