import { notFound } from "next/navigation";
export const dynamic = "force-static";
export function generateStaticParams() {
  return [];
}

export default async function IndustryDetailPage({
  params: _params,
}: {
  params: Promise<{ slug: string }>;
}) {
  void _params;
  notFound();
}
