"use client";

export default function AnimatedHeroTitle() {
  return (
    <h1 className="max-w-[14ch] text-balance text-[3.75rem] font-semibold leading-[0.84] tracking-[-0.075em] text-[#F6F2EA] sm:text-[5rem] md:text-[5.8rem] lg:text-[6.9rem] xl:text-[7.45rem]">
      <span className="hero-title-word inline-block">
        CV con IA,
      </span>
      <br />
      <span className="hero-title-word inline-block" style={{ animationDelay: "0.125s" }}>
        listo para postular
      </span>
    </h1>
  );
}
