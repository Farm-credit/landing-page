import { AppText } from "@/components/atoms/AppText";

const pillars = [
  {
    title: "Built on Blockchain",
    description:
      "Every new artifact on-chain with GPS coordinates — its visibly transparent, immutable proof that your trees are truly planted and growing.",
  },
  {
    title: "Farmer-First Economics",
    description:
      "70% of contributions go directly to farmers, with transparent profit-sharing mechanisms. No middlemen, no extraction — just real impact.",
  },
  {
    title: "Privacy + Impact",
    description:
      "Donate anonymously with zero-knowledge proofs. Choose what to reveal about your impact journey while staying in control of your data.",
  },
];

export function Solutions() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <AppText
          as="h2"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center text-grey-950 max-w-4xl mx-auto leading-tight"
        >
          WE DON&rsquo;T JUST FUND{" "}
          <span className="text-lime-400">TREES</span> —
          <br className="hidden sm:block" /> WE BUILD{" "}
          <span className="text-lime-400">SUSTAINABLE</span> IMPACT.
        </AppText>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl bg-grey-50 p-6 flex flex-col gap-5 border border-grey-100"
            >
              <StripedCircleIcon />
              <div className="border-t border-grey-200 pt-5">
                <AppText
                  as="h3"
                  className="text-sm font-semibold text-grey-950 mb-2"
                >
                  {pillar.title}
                </AppText>
                <AppText className="text-sm text-grey-600 leading-relaxed">
                  {pillar.description}
                </AppText>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StripedCircleIcon() {
  return (
    <div
      aria-hidden
      className="h-12 w-12 rounded-full bg-lime-400 overflow-hidden relative"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #365314 0 4px, transparent 4px 10px)",
        }}
      />
    </div>
  );
}
