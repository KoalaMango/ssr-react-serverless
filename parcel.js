const Bundler = require("parcel-bundler");
const Path = require("path");

// Entrypoint file location
const server = Path.join(__dirname, "server.js");

// Bundler options
const serverOpt = {
  outDir: "./", // The out directory to put the build files in, defaults to dist
  outFile: "handler.js", // The name of the outputFile
  publicUrl: "./", // The url to server on, defaults to dist
  cacheDir: ".cache", // The directory cache gets put in, defaults to .cache
  minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
  watch: true,
  target: "node", // browser/node/electron, defaults to browser
  logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors
  sourceMaps: false, // Enable or disable sourcemaps, defaults to enabled (not supported in minified builds yet)
  detailedReport: true // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
};

// Entrypoint file location
const browser = Path.join(__dirname, "./src/index.js");

// Bundler options
const browserOpt = {
  outDir: "./build",
  outFile: "bundle.js",
  publicUrl: "./",
  cacheDir: ".cache",
  minify: true,
  target: "browser",
  https: false,
  logLevel: 3,
  hmr: false,
  watch: true,
  sourceMaps: false,
  detailedReport: false
};

(async function() {
  const bundler = new Bundler(server, serverOpt);
  const bundle = await bundler.bundle();

// Initialises a bundler using the entrypoint location and options provided.
  const bundlers = new Bundler(browser, browserOpt);

// Run the bundler, this returns the main bundle
// Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  const bundle1 =  await bundlers.bundle();
})();
