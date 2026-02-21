module.exports = function (eleventyConfig) {
  // Copiar carpetas estáticas
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" }); // ✅ necesario para el slider
  // Si tu input es "src" (que es lo típico en tu proyecto)
eleventyConfig.addPassthroughCopy("src/google1a2b3c4d5e6f7g8h.html");

  // Filtro fecha seguro (YYYY-MM-DD)
  eleventyConfig.addFilter("date", (value) => {
    if (!value) return "";
    const d = new Date(value);
    return d.toISOString().split("T")[0];
  });

  // Helper para convertir cualquier texto a slug de categoría
  // Ej: "División Profesional" -> "division-profesional"
  // Ej: "ACF Primera B" -> "acf-primera-b"
  const toSlug = (str = "") =>
    str
      .toString()
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Colección principal de posts (ordenados por fecha desc)
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .filter((p) => p.data && p.data.date)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // Colecciones por categoría (key = slug)
  eleventyConfig.addCollection("byCategory", (collectionApi) => {
    const posts = collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .filter((p) => p.data && p.data.category);

    const map = {};

    posts.forEach((post) => {
      const key = toSlug(post.data.category);
      if (!map[key]) map[key] = [];
      map[key].push(post);
    });

    // Ordenar cada categoría por fecha desc
    Object.keys(map).forEach((key) => {
      map[key].sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
    });

    return map;
  });

  // Destacadas (máximo 5, ordenadas por fecha desc)
  eleventyConfig.addCollection("featuredPosts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .filter((p) => p.data && p.data.featured === true && p.data.date)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
      .slice(0, 5);
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
