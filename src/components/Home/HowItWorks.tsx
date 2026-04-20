import { AppText } from "@/components/atoms/AppText";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white pb-16 sm:pb-24">
      <div className="max-w-384 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-10 sm:mb-14">
          <span className="inline-flex items-center justify-center h-7 px-4 rounded-full border border-teal-800 text-[10px] font-semibold tracking-[0.2em] text-teal-800 shrink-0 mt-2">
            WHY US
          </span>
          <div className="flex-1">
            <AppText
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-grey-950 leading-tight"
            >
              SUSTAINABLE IMPACT &ndash; NOT JUST PLANTING,
              <br className="hidden sm:block" />{" "}
              <span className="text-grey-400">BUT LONG-TERM GROWTH</span>
            </AppText>
            <AppText className="mt-5 text-sm text-grey-600 max-w-xl leading-relaxed">
              Donations are converted into real-world action; funding tree
              planting while equipping farmers with the knowledge to sustain and
              scale impact over time.
            </AppText>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:auto-rows-[200px]">
          <div className="lg:col-span-4 lg:col-start-1 lg:row-start-1">
            <StatCard
              tag="SUSTAINABLE GROWTH"
              title="Beyond Planting"
              description="We train farmers with modern techniques to ensure long-term survival, higher yields, and environmental resilience."
              variant="light"
            />
          </div>

          <div className="lg:col-span-2 lg:col-start-7 lg:row-start-1">
            <StatCard
              tag="FUNDS DEPLOYED"
              title={
                <>
                  100<span className="text-grey-400">%</span>
                </>
              }
              description="Allocated to verified farming communities."
              variant="teal"
            />
          </div>

          <div className="lg:col-span-2 lg:col-start-9 lg:row-start-1">
            <StatCard
              tag="TRACKED IMPACT"
              title="Real-time"
              description="Monitor tree growth and outcomes."
              variant="light"
            />
          </div>

          <div className="lg:col-span-2 lg:col-start-5 lg:row-start-2">
            <StatCard
              tag="FARMER TRAINING"
              title={
                <>
                  10<span className="text-grey-500">+</span>
                </>
              }
              description="Extension-led programs."
              variant="dark"
            />
          </div>

          <div className="lg:col-span-3 lg:col-start-7 lg:row-start-2">
            <StatCard
              tag="MULTIPLE PAYMENT OPTIONS"
              title={
                <>
                  Crypto <span className="text-grey-400">+</span> Fiat
                </>
              }
              description="Support using USDC, USDT, or local payment methods with ease."
              variant="cream"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type Variant = "light" | "teal" | "dark" | "cream";

function StatCard({
  tag,
  title,
  description,
  variant,
}: {
  tag: string;
  title: React.ReactNode;
  description: string;
  variant: Variant;
}) {
  const palette: Record<
    Variant,
    { bg: string; tag: string; body: string; title: string }
  > = {
    light: {
      bg: "bg-grey-100",
      tag: "text-grey-950",
      body: "text-grey-500",
      title: "text-grey-950",
    },
    teal: {
      bg: "bg-teal-800",
      tag: "text-grey-100",
      body: "text-grey-300",
      title: "text-white",
    },
    dark: {
      bg: "bg-grey-900",
      tag: "text-white",
      body: "text-grey-400",
      title: "text-white",
    },
    cream: {
      bg: "bg-grey-100",
      tag: "text-grey-950",
      body: "text-grey-500",
      title: "text-grey-950",
    },
  };

  const p = palette[variant];

  return (
    <div
      className={`h-full min-h-[180px] ${p.bg} rounded-2xl p-6 flex flex-col justify-between gap-6`}
    >
      <AppText className={`text-[11px] font-bold tracking-[0.18em] ${p.tag}`}>
        {tag}
      </AppText>
      <div>
        <AppText
          as="h3"
          className={`text-3xl sm:text-4xl font-bold tracking-tight ${p.title} mb-2`}
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
