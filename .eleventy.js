module.exports = function (eleventyConfig) {
  // Copiar uploads al sitio final para que /uploads/... funcione
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" });

  // Filtro seguro para fecha (YYYY-MM-DD)
  eleventyConfig.addFilter("date", (value) => {
    if (!value) return "";
    const d = new Date(value);
    return d.toISOString().split("T")[0];
  });
  
    eleventyConfig.addNunjucksGlobal("range", (start, end) => {
    const out = [];
    for (let i = start; i < end; i++) out.push(i);
    return out;
  });

  // Filtrar colección por un valor (ej: data.category == "Selección")
eleventyConfig.addFilter("filterby", (arr, keyPath, value) => {
  if (!Array.isArray(arr)) return [];

  const get = (obj, path) =>
    path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);

  const norm = (v) => {
    if (v === undefined || v === null) return "";
    return String(v)
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // quita tildes
  };

  const target = norm(value);

  return arr.filter((item) => norm(get(item, keyPath)) === target);
  
  });

  // Posts ordenados por fecha (más nuevo primero)
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .filter((p) => p.data && p.data.date)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // Colección: destacadas (featured: true), ordenadas por fecha
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
