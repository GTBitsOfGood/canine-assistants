import Navbar from "./Navbar";

import { Maven_Pro } from "next/font/google";

const mavenPro = Maven_Pro({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main className={`${mavenPro.className}`}>
        <div className="container mx-auto">{children}</div>
      </main>
    </>
  );
}
