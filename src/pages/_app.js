import "../styles/base.css";

import { ThemeProvider } from "@chakra-ui/core";
import Head from "next/head";

import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  const og = pageProps.data?.og;
  const title = pageProps.data?.title;

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />{" "}
        <meta
          property="og:title"
          content={title || `GuillouTran, code & opinion`}
        />
        <meta property="og:site_name" content="GuillouTran, code & opinion" />
        <meta
          property="og:description"
          content={
            og
              ? og.description
              : `Writing about things I care and my opinion on stuff.`
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@telmo" />
        <meta
          property="og:image"
          content={og ? og.image : `https://telmo.im/og/default.png`}
        />
        <script
          async
          src="https:/ /
      platform.twitter.com / widgets.js "
          charSet="utf-8"
        ></script>
        <title>{title || `GuillouTran: code & opinion`}</title>
      </Head>

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
