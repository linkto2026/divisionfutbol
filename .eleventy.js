module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],

    // 👇 importante para GitHub Pages Project Pages
    pathPrefix: "/divisionfutbol/"
  };
};
