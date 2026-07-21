import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { TrackedCtaLink } from "./TrackedCtaLink";
import {
  getBlogCreateHref,
  type BlogCtaContent,
} from "@/lib/blog-intent";
import { PRICING } from "@/lib/pricing";

export { getBlogCtaContent } from "@/lib/blog-intent";
export type { BlogCtaContent } from "@/lib/blog-intent";

type BlogConversionCtaProps = {
  path: string;
  content: BlogCtaContent;
};

export function BlogConversionCta({ path, content }: BlogConversionCtaProps) {
  return (
    <section
      className="relative overflow-hidden border-y border-white/10 py-8 sm:py-10"
      aria-label="Crear CV con VitaeSpark"
    >
      <div className="absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_center,rgba(122,92,255,0.12),transparent_68%)]" />
      <div className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(240px,0.42fr)] md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
            Tu siguiente paso
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-2xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-3xl">
            {content.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/62">
            {content.description}
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm text-white/64">
            <CheckCircle2 className="h-4 w-4 text-[#A78BFA]" aria-hidden="true" />
            {content.proof}
          </div>
        </div>

        <div className="md:text-right">
          <TrackedCtaLink
            href={getBlogCreateHref(path)}
            label={content.primaryLabel}
            sourcePath={path}
            sourceType="blog"
            trackingLabel="blog_final_cta"
            buttonClassName="w-full rounded-full bg-[#F6F2EA] text-[#121114] shadow-none hover:bg-white md:w-auto"
          />
          <p className="mt-3 text-xs leading-5 text-white/46">
            Revisalo gratis. El PDF final cuesta {PRICING.mercadoPago.label} en Argentina o {PRICING.paypal.label} en otros países, sin suscripción.
          </p>
          <Link
            href={content.secondaryHref}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/54 transition hover:text-white"
          >
            {content.secondaryLabel}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
