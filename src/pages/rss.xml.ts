import rss from "@astrojs/rss";
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

export const get = async (context) => {
  const posts = await getCollection("blog");

  return rss({
    title: "qewer33's blog",
    description: "Personal blog of qewer33.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.created,
      description: post.data.description,
      link: getPostPath(post),
    })),
  });
};
