import Layout from "@/layouts/Layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <title>Canine Assistants</title>
        <meta
          name="description"
          content="Main dashboard page for Canine Assistants."
        />
      </Head>
      <SessionProvider session={session}>
        {getLayout(
          <>
            <Toaster />
            <Component {...pageProps} />
          </>,
        )}
      </SessionProvider>
    </>
  );
}
