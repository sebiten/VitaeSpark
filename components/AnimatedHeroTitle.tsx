"use client";

export default function AnimatedHeroTitle() {
  return (
    <h1 className="max-w-full text-pretty text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#F6F2EA] sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[0.92]">
      <span className="hero-title-word inline-block">
        Creador de CV con IA
      </span>
      <br />
      <span className="hero-title-word inline-block" style={{ animationDelay: "0.125s" }}>
        listo para entrevistas
      </span>
    </h1>
  );
}
