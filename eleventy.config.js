export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "src/assets": "assets",
  });
  eleventyConfig.addPassthroughCopy("src/files");
  eleventyConfig.addPassthroughCopy("src/wp-content");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/_headers");

  eleventyConfig.addFilter("sameUrl", (a, b) => {
    if (!a || !b) return false;
    return a.replace(/\/$/, "") === b.replace(/\/$/, "");
  });

  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());

  eleventyConfig.addFilter("groupMediaByCategory", (items) => {
    const order = [
      "Presentations",
      "Television",
      "Print",
      "Radio",
      "Podcasts / YouTube",
      "Independent Publishers",
    ];
    const groups = {};
    for (const item of items || []) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    for (const cat of Object.keys(groups)) {
      groups[cat].sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    return order
      .filter((cat) => groups[cat]?.length)
      .map((cat) => ({ category: cat, items: groups[cat] }));
  });

  eleventyConfig.addFilter("externalLink", (url) => {
    if (!url) return false;
    return url.startsWith("http://") || url.startsWith("https://");
  });

  eleventyConfig.addFilter("findById", (collection, id) => {
    if (!id || !collection) return null;
    return collection.find((item) => item.id === id) || null;
  });

  eleventyConfig.addFilter("mediaDisplayDate", (item) => {
    if (!item) return "";
    if (item.month && item.year) {
      if (item.day) return `${item.month} ${item.day}, ${item.year}`;
      return `${item.month} ${item.year}`;
    }
    return item.date || "";
  });

  eleventyConfig.addFilter("mediaDisplayOutlet", (item) => {
    if (!item?.outlet) return "";
    if (item.outlet_nationality) {
      return `${item.outlet} (${item.outlet_nationality})`;
    }
    return item.outlet;
  });

  eleventyConfig.addFilter("accentTerms", (text, terms) => {
    if (!text) return "";
    let out = String(text);
    const sorted = [...(terms || [])].sort((a, b) => b.length - a.length);
    for (const term of sorted) {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      out = out.replace(new RegExp(escaped, "g"), `<span>${term}</span>`);
    }
    return out;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
