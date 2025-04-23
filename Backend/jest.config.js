export default {
  testMatch: ["**/tests/**/*.test.js"],
  transform: {},
  testEnvironment: "node",
  reporters: [
    "default",
    ["jest-junit", {
      outputDirectory: "test-results",
      outputName: "results.xml"
    }]
  ]
};
