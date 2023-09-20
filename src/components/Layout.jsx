import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main>
        <div className="container mx-auto">{children}</div>
      </main>
    </>
  );
}
