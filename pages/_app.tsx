import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { UiProvider } from "../context";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <SWRConfig
      value={{
        // refreshInterval:500,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <SessionProvider session={session}>
        <UiProvider>
          <Component {...pageProps} />
        </UiProvider>
      </SessionProvider>
    </SWRConfig>
  );
}

export default MyApp;
