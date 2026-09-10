import { HOME_CONTAINER } from "@/lib/home-layout";
import { ProductMediaStage, type ProductMediaSource } from "./ProductMediaStage";

type HomeProductHeroProps = {
  media: ProductMediaSource;
};

export function HomeProductHero({ media }: HomeProductHeroProps) {
  return (
    <section
      aria-labelledby="product-demo-heading"
      className="scroll-mt-[56px] pt-[4.75rem] pb-12 md:pb-16 lg:scroll-mt-[60px] lg:pt-24"
    >
      <div className={HOME_CONTAINER}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">The product</p>
        <h1
          id="product-demo-heading"
          className="max-w-[20ch] text-balance text-[clamp(2.25rem,8vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl"
        >
          See Zoveto running.
        </h1>
        <p className="mt-4 max-w-[62ch] text-pretty text-base font-medium leading-relaxed text-muted sm:text-lg">
          One workspace for Command Center, Sales, Warehouse, and Finance.
        </p>
        <p
          id="product-explore-label"
          className="mt-8 text-base font-medium leading-snug text-muted sm:mt-10 sm:text-lg"
        >
          Explore the product.
        </p>
        <div className="mt-4">
          <ProductMediaStage source={media} />
        </div>
      </div>
    </section>
  );
}
