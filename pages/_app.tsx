import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { UiProvider } from "../context";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <SessionProvider session={session}>
      <UiProvider>
        <Component {...pageProps} />
      </UiProvider>
    </SessionProvider>
  );
}

export default MyApp;
