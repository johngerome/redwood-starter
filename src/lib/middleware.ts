export async function requireAuth({
  ctx,
  request,
}: {
  ctx: { user?: unknown };
  request: Request;
}) {
  if (!ctx.user) {
    const url = new URL(request.url);
    const redirectTo = encodeURIComponent(url.pathname + url.search);
    return new Response(null, {
      status: 302,
      headers: { Location: `/login?redirectTo=${redirectTo}` },
    });
  }
}
