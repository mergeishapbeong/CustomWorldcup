module.exports = {
  testPathIgnorePatterns: ["/node_modules/"],
  verbose: true,
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./utils/jest-test-report",
        filename: "report.html",
        openReport: true,
        includeFailureMsg: true,
      },
    ],
  ],
};
