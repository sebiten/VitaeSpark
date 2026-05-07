import Link from "next/link";

type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalPageProps = {
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPage({ title, updatedAt, intro, sections }: LegalPageProps) {
  return (
    <div className="bg-[#0F0F10] text-[#F4F4F5]">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_34%),radial-gradient(circle_at_right,_rgba(124,58,237,0.18),_transparent_38%),#0F0F10]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex text-sm font-medium text-[#38BDF8] hover:text-[#7DD3FC]"
          >
            Volver a VitaeSpark
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-white/55">
            Ultima actualizacion: {updatedAt}
          </p>
          <p className="mt-8 text-lg leading-8 text-white/76">{intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {sections.map((section) => (
            <section
              key={section.title}
              className="border-b border-white/10 pb-8 last:border-b-0"
            >
              <h2 className="text-2xl font-semibold text-white">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-8 text-white/72"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
