function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

module.exports = function (eleventyConfig) {
  /* -----------------------------
     FILTRO DE FECHA (SOLUCIÓN)
  ----------------------------- */
  eleventyConfig.addFilter("date", (value) => {
    if (!value) return "";
    const d = new Date(value);
    return d.toISOString().split("T")[0]; // yyyy-mm-dd
  });

  /* -----------------------------
     FILTRO SLUG
  ----------------------------- */
  eleventyConfig.addFilter("slug", slugify);

  /* -----------------------------
     COLECCIÓN CATEGORÍAS
  ----------------------------- */
  eleventyConfig.addCollection("categories", (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("src/posts/**/*.{md,njk,html}");
    const set = new Set();

    for (const p of posts) {
      if (p.data && p.data.category) {
        set.add(String(p.data.category));
      }
    }

    return Array.from(set)
      .sort((a, b) => a.localeCompare(b, "es"))
      .map((name) => ({ name, slug: slugify(name) }));
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
