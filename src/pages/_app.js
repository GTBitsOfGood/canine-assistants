import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { EditDogProvider } from "@/context/EditDogContext";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return getLayout(
    <>
      <EditDogProvider>
        <Toaster />
        <Component {...pageProps} />
      </EditDogProvider>
    </>,
  );
}
