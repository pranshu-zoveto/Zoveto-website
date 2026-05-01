/**
 * Next 14 passes sync `params`; Next 15+ may pass `params` as a Promise.
 * `await Promise.resolve(params)` handles both without branching on runtime version.
 */
export async function resolveSlugParams(
  params: { slug: string } | Promise<{ slug: string }>
): Promise<{ slug: string }> {
  return await Promise.resolve(params);
}
