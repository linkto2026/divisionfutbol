module.exports = function (eleventyConfig) {

  // Filtro seguro para fecha (YYYY-MM-DD)
  eleventyConfig.addFilter("date", (value) => {
    if (!value) return "";
    const d = new Date(value);
    return d.toISOString().split("T")[0];
  });

  // Colección de posts ORDENADOS POR FECHA
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .filter(p => p.data.date)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    pathPrefix: "/divisionfutbol/"
  };
};
