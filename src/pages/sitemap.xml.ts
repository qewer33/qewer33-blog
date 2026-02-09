import { getCollection } from "astro:content";

const getPostPath = (post) => {
  const date = post.data.created.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const [day, month, year] = date.split("/");
  return `/${year}/${month}/${day}/${post.slug}`;
};

const toUrlEntry = (loc, lastmod) => {
  const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
  return `<url><loc>${loc}</loc>${lastmodTag}</url>`;
};

export const get = async (context) => {
  const site = context.site?.toString().replace(/\/$/, "") ?? "";
  const posts = await getCollection("blog");

  const urls = [
    toUrlEntry(`${site}/`, new Date().toISOString()),
    ...posts.map((post) => {
      const lastmod = post.data.updated
        ? post.data.updated.toISOString()
        : "";
      return toUrlEntry(`${site}${getPostPath(post)}`, lastmod);
    }),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
