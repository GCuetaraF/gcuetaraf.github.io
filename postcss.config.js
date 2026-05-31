import postCssGlobalData from "@csstools/postcss-global-data";

export default {
  map: "inline",
  plugins: [
    postCssGlobalData({
      files: ["src/css/variables.css"],
    }),
  ],
};
