import { AppText } from "@/components/atoms/AppText";

type IconVariant = "blockchain" | "farmer" | "privacy";

const pillars: {
  title: string;
  description: string;
  variant: IconVariant;
}[] = [
  {
    title: "Built on Blockchain",
    description:
      "Every tree verified on-chain with GPS coordinates. No hidden transactions. No opaque certifications. Just transparent, immutable proof that your trees exist and are thriving.",
    variant: "blockchain",
  },
  {
    title: "Farmer-First Economics",
    description:
      "75% of your donation goes directly to farmers — paid in seconds via Stellar. No NGO middlemen. No delayed payments. Farmers earn recurring income for maintenance, building stable livelihoods.",
    variant: "farmer",
  },
  {
    title: "Privacy + Impact",
    description:
      "Donate anonymously with Zero-Knowledge proofs if you want. Or track every tree you planted. You choose. We deliver both privacy and proof; not a tradeoff.",
    variant: "privacy",
  },
];

export function Solutions() {
  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <div className="max-w-384 mx-auto px-4 sm:px-6 lg:px-8">
        <AppText
          as="h2"
          className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center text-grey-950 max-w-5xl mx-auto leading-tight"
        >
          WE DON&rsquo;T JUST FUND <span className="text-teal-800">TREES </span>
          <br className="hidden sm:block" /> WE BUILD{" "}
          <span className="text-lime-400">SUSTAINABLE</span> IMPACT.
        </AppText>

        <div className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl bg-white border border-grey-200 overflow-hidden flex flex-col"
            >
              <div className="p-6 pb-12 bg-white">
                <PillarIcon variant={pillar.variant} />
              </div>
              <div className="bg-grey-50 p-6 border-t border-grey-200 flex-1">
                <AppText
                  as="h3"
                  className="text-base font-semibold text-teal-800 mb-2"
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

function PillarIcon({ variant }: { variant: IconVariant }) {
  const stripedStyle = {
    backgroundColor: "#a3e635",
    backgroundImage:
      "repeating-linear-gradient(-45deg, #1f4746 0 3px, transparent 3px 9px)",
  };

  const left =
    variant === "blockchain"
      ? "bg-teal-800"
      : variant === "farmer"
        ? "bg-white border-2 border-teal-800"
        : "striped";
  const right = variant === "privacy" ? "bg-teal-800" : "striped";

  return (
    <div className="relative h-12 w-[76px]" aria-hidden>
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full overflow-hidden ${
          left === "striped" ? "border-2 border-teal-800" : left
        }`}
        style={left === "striped" ? stripedStyle : undefined}
      />
      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full overflow-hidden ${
          right === "striped" ? "border-2 border-teal-800" : right
        }`}
        style={right === "striped" ? stripedStyle : undefined}
      />
    </div>
  );
}
