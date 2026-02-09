export const get = async (context) => {
  const site = context.site?.toString().replace(/\/$/, "") ?? "";
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${site}/sitemap.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
