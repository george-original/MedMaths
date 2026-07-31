const goneHeaders = {
  "Cache-Control": "public, max-age=86400",
  "Content-Type": "text/plain; charset=utf-8",
  "X-Robots-Tag": "noindex, nofollow",
}

export function goneResponse(includeBody = true) {
  return new Response(includeBody ? "This resource has been permanently removed.\n" : null, {
    status: 410,
    headers: goneHeaders,
  })
}
