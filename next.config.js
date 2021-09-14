const { merge } = require("webpack-merge");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) =>
    merge(config, {
      resolve: {
        fallback: {
          buffer: require.resolve("buffer"),
          events: require.resolve("events"),
          string_decoder: require.resolve("string_decoder"),
          process: require.resolve("process/browser"),
        },
      },
    }),
};
