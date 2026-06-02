export default {
  layout: "blog-post.html",
  thumb: {
    base: "assets/thumb.webp",
    sm: "assets/thumb-sm.webp",
    lg: "assets/thumb-lg.webp",
  },
  eleventyComputed: {
    lang: (data) => {
      // Extract language from filename (en.md or es.md)
      const filename = data.page.inputPath.split("/").pop();
      if (filename === "en.md") return "en";
      if (filename === "es.md") return "es";
      // Fallback for old index.md files
      return "en";
    },
    slug: (data) => {
      // Get the parent folder name as the slug
      const pathParts = data.page.inputPath.split("/");
      return pathParts[pathParts.length - 2];
    },
    permalink: (data) => {
      // For backward compatibility, en version uses /blog/slug/
      // es version uses /blog/slug/es/
      const pathParts = data.page.inputPath.split("/");
      const slug = pathParts[pathParts.length - 2];
      const filename = pathParts[pathParts.length - 1];

      if (filename === "es.md") {
        return `/blog/${slug}/es/`;
      }
      // Default (en.md or index.md) uses the base path
      return `/blog/${slug}/`;
    },
  },
};
