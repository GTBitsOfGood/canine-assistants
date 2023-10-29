import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";

import { Maven_Pro } from "next/font/google";

const mavenPro = Maven_Pro({ subsets: ["latin"] });

export default function Layout({ children, session }) {
  return (
    <>
      <Navbar />
      <main className={`${mavenPro.className}`}>
        <div className="container mx-auto">{children}</div>
      </main>
    </>
  );
}
