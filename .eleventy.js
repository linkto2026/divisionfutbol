module.exports = function (eleventyConfig) {

  // Filtro seguro para fecha
  eleventyConfig.addFilter("date", (value) => {
    if (!value) return "";
    const d = new Date(value);
    return d.toISOString().split("T")[0];
  });

  // Slug simple
  eleventyConfig.addFilter("slug", (str = "") =>
    String(str)
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );

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
