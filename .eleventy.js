module.exports = function (eleventyConfig) {
  // Copiar carpetas estáticas
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  // Filtro fecha seguro
  eleventyConfig.addFilter("date", (value) => {
    if (!value) return "";
    const d = new Date(value);
    return d.toISOString().split("T")[0];
  });

  // Helper para normalizar texto (categorías)
  const normalize = (str = "") =>
    str
      .toString()
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // Colección principal de posts
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .filter((p) => p.data && p.data.date)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // Colecciones por categoría
  eleventyConfig.addCollection("byCategory", (collectionApi) => {
    const posts = collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .filter((p) => p.data && p.data.category);

    const map = {};

    posts.forEach((post) => {
      const key = normalize(post.data.category);
      if (!map[key]) map[key] = [];
      map[key].push(post);
    });

    // ordenar cada categoría por fecha
    Object.keys(map).forEach((key) => {
      map[key].sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
    });

    return map;
  });

  // Destacadas
  eleventyConfig.addCollection("featuredPosts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .filter((p) => p.data && p.data.featured === true && p.data.date)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html"],
    pathPrefix: "/divisionfutbol/",
  };
};
