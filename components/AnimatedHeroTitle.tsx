"use client";

export default function AnimatedHeroTitle() {
  return (
    <h1 className="max-w-full text-pretty text-3xl font-bold leading-[1.02] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.8rem] lg:leading-[0.96]">
      <span className="hero-title-word inline-block">
        Creador de CV online con IA
      </span>
      <br />
      <span className="hero-title-word inline-block" style={{ animationDelay: "0.125s" }}>
        listo para entrevistas
      </span>
    </h1>
  );
}