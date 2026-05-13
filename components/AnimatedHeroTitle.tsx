const words = [
  "Creador",
  "de",
  "CV",
  "online",
  "con",
  "IA",
  "listo",
  "para",
  "entrevistas",
];

export default function AnimatedHeroTitle() {
  return (
    <h1 className="max-w-full text-pretty text-[2.45rem] font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.8rem] lg:leading-[0.96]">
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="hero-title-word inline-block whitespace-pre"
          style={{ animationDelay: `${0.08 + index * 0.045}s` }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}
