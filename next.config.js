const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withTM = require("next-transpile-modules");
const withSourceMaps = require("@zeit/next-source-maps");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_GITLAB_COMMIT_SHA,
  VERCEL_BITBUCKET_COMMIT_SHA,
} = process.env;

const COMMIT_SHA =
  VERCEL_GITHUB_COMMIT_SHA ||
  VERCEL_GITLAB_COMMIT_SHA ||
  VERCEL_BITBUCKET_COMMIT_SHA;

process.env.SENTRY_DSN = SENTRY_DSN;

module.exports = [
  withCSS(
    withSass(
      withTM(
        withSourceMaps({
          serverRuntimeConfig: {
            rootDir: __dirname,
          },
          webpack: (config, options) => {
            if (!options.isServer) {
              config.resolve.alias["@sentry/node"] = "@sentry/browser";
            }
            if (
              SENTRY_DSN &&
              SENTRY_ORG &&
              SENTRY_PROJECT &&
              SENTRY_AUTH_TOKEN &&
              COMMIT_SHA &&
              NODE_ENV === "production"
            ) {
              config.plugins.push(
                new SentryWebpackPlugin({
                  include: ".next",
                  ignore: ["node_modules"],
                  stripPrefix: ["webpack://_N_E/"],
                  urlPrefix: `~${basePath}/_next`,
                  release: COMMIT_SHA,
                })
              );
              ({
                transpileModules: [
                  "react-flexbox-grid",
                  "react-syntax-highlighter",
                ],
                webpack: function (config) {
                  config.module.rules.push({
                    test: /\.md$/,
                    use: "raw-loader",
                  });
                  return config;
                },
              });
            }
          },
        })
      )
    )
  ),
];