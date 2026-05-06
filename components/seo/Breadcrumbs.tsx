import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-8 min-w-0">
        <ol className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-white/60">
          {items.map((item, index) => (
            <li
              key={`${item.label}-${index}`}
              className={`min-w-0 items-center gap-2 ${
                index === items.length - 1 && index > 1
                  ? "hidden sm:flex"
                  : "flex"
              }`}
            >
              {index > 0 ? <span>/</span> : null}
              {item.href && index < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="break-words hover:text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="min-w-0 break-words text-white/85">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
