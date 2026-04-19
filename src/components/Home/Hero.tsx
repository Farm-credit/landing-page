import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { AppText } from "@/components/atoms/AppText";
import { PaymentCard } from "./PaymentCard";

export function Hero() {
  return (
    <section className="relative bg-white">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-9">
            <AppText
              as="h1"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.25rem] font-extrabold tracking-tight leading-[1.02] text-grey-950"
            >
              <span className="block lg:whitespace-nowrap">
                PLANT <span className="text-lime-400">TREES.</span> RESTORE
              </span>
              <span className="block lg:whitespace-nowrap">
                <span className="text-teal-800">LAND.</span> EARN{" "}
                <span className="text-lime-400">IMPACT.</span>
              </span>
            </AppText>
          </div>

          <div className="lg:col-span-3 flex flex-col items-end gap-5 lg:pt-4 text-right">
            <AppText className="text-sm text-grey-950 leading-relaxed">
              Trees help create a more stable climate, promote biodiversity and
              benefit people. After all, without trees, there would be no
              oxygen, no cooling effect and no clean air.
            </AppText>
            <a
              href="#learn-more"
              className="inline-flex items-center gap-3 group"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-grey-950 text-white transition-transform group-hover:translate-y-0.5">
                <ArrowDown size={14} strokeWidth={2.5} />
              </span>
              <span className="text-xs font-bold tracking-[0.1em] text-grey-950">
                LEARN MORE
              </span>
            </a>
          </div>
        </div>

        <div className="relative mt-8">
          <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] w-full rounded-2xl overflow-hidden">
            <Image
              src="/hero_bg.png"
              alt="Young tree sapling planted in a field of grass"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="object-cover"
            />
          </div>

          <div className="absolute top-48 right-6 hidden sm:block">
            <PaymentCard />
          </div>
        </div>

        <div className="sm:hidden mt-6">
          <PaymentCard />
        </div>

        <div className="mt-6 flex items-center justify-center">
          <AppText className="text-xs tracking-[0.2em] text-grey-400">
            MINT NFTS
          </AppText>
        </div>
      </div>
    </section>
  );
}

