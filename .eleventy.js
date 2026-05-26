export default async function (eleventyConfig) {
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "data",
      output: "_site",
      layouts: "_layouts",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
