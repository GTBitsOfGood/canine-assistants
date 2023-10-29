import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <SessionProvider session={session}>
      {getLayout(
        <>
          <Toaster />
          <Component {...pageProps} />
        </>
      )}
    </SessionProvider>
  );
}
