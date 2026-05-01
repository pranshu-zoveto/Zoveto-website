import { MARKETING_PRICING_PLANS } from "@/lib/pricing-plans";
import { siteUrl } from "@/lib/site";

/**
 * Offer / AggregateOffer JSON-LD for the pricing page (list prices in INR).
 */
export function PricingOfferSchema() {
  const base = siteUrl();
  const priced = MARKETING_PRICING_PLANS.filter((p) => p.pricing !== null);
  const prices = priced.map((p) => p.pricing!.listMonthly);
  const low = Math.min(...prices);
  const high = Math.max(...prices);

  const offers = priced.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: String(p.pricing!.listMonthly),
    priceCurrency: "INR",
    url: `${base}/pricing`,
    description: p.segmentTagline ?? undefined,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    url: `${base}/pricing`,
    name: "Zoveto subscription plans",
    priceCurrency: "INR",
    lowPrice: String(low),
    highPrice: String(high),
    offerCount: String(offers.length),
    offers,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
