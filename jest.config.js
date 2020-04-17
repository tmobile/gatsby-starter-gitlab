module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.js",
  },
  moduleNameMapper: {
    // Test trivial webpack imports:
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    // Mock static file imports, which Jest can’t handle:
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  // Set testURL to a valid URL; some DOM APIs (e.g. localStorage) are unhappy with the default (about:blank).
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/loadershim.js`],
}
