import { AppText } from "@/components/atoms/AppText";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white pb-24">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-6 mb-14">
          <div className="hidden sm:flex flex-col gap-1 pt-4">
            <span className="h-px w-10 bg-grey-300" />
            <span className="h-px w-10 bg-grey-300" />
            <span className="h-px w-10 bg-grey-300" />
          </div>
          <div className="flex-1">
            <AppText
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-grey-950 leading-tight"
            >
              SUSTAINABLE IMPACT &mdash; NOT JUST PLANTING,
              <br className="hidden sm:block" />{" "}
              <span className="text-lime-400">BUT LONG-TERM</span> GROWTH
            </AppText>
            <AppText className="mt-5 text-sm text-grey-600 max-w-2xl leading-relaxed">
              FarmCredit combines real-world policy action, funding tree
              planting with equipping farmers with the knowledge to sustain and
              grow their impact over time.
            </AppText>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[200px]">
          <StatCard
            tag="SUSTAINABLE GROWTH"
            title="Beyond Planting"
            description="We help farmers build resilient income streams with ongoing training and support long after the trees go in the ground."
            variant="light"
          />

          <StatCard
            tag="FUNDS DEPLOYED"
            title="100%"
            description="Transparent, on-chain disbursement of every dollar."
            variant="teal"
          />

          <StatCard
            tag="TRACKED IMPACT"
            title="Real-time"
            description="Monitor every tree from sapling to maturity."
            variant="light"
          />

          <StatCard
            tag="FARMERS TRAINED"
            title="10+"
            description="Farmers onboarded into the program."
            variant="dark"
          />

          <div className="md:col-span-2">
            <StatCard
              tag="MULTIPLE PAYMENT OPTIONS"
              title={
                <>
                  <span className="text-lime-700">Crypto</span>
                  <span className="text-grey-950"> + </span>
                  <span className="text-grey-950">Fiat</span>
                </>
              }
              description="Contribute with credit cards, wire transfers, stablecoins or native crypto — whichever works best for you."
              variant="lime"
              wide
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type Variant = "light" | "teal" | "dark" | "lime";

function StatCard({
  tag,
  title,
  description,
  variant,
  wide = false,
}: {
  tag: string;
  title: React.ReactNode;
  description: string;
  variant: Variant;
  wide?: boolean;
}) {
  const palette: Record<Variant, { bg: string; tag: string; body: string; title: string }> = {
    light: {
      bg: "bg-grey-100",
      tag: "text-grey-500",
      body: "text-grey-600",
      title: "text-grey-950",
    },
    teal: {
      bg: "bg-teal-800",
      tag: "text-lime-300",
      body: "text-grey-300",
      title: "text-white",
    },
    dark: {
      bg: "bg-grey-900",
      tag: "text-grey-400",
      body: "text-grey-400",
      title: "text-white",
    },
    lime: {
      bg: "bg-lime-400",
      tag: "text-lime-700",
      body: "text-grey-800",
      title: "text-grey-950",
    },
  };

  const p = palette[variant];

  return (
    <div
      className={`h-full ${p.bg} rounded-2xl p-6 flex flex-col justify-between`}
    >
      <AppText className={`text-[10px] font-semibold tracking-[0.18em] ${p.tag}`}>
        {tag}
      </AppText>
      <div>
        <AppText
          as="h3"
          className={`${wide ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"} font-bold tracking-tight ${p.title} mb-2`}
        >
          {title}
        </AppText>
        <AppText className={`text-xs ${p.body} leading-relaxed`}>
          {description}
        </AppText>
      </div>
    </div>
  );
}
