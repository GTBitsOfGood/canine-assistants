import Navbar from "./Navbar";

export default function Layout({ children, session }) {
  return (
    <>
      <Navbar />
      <main className={`font-maven-pro`}>
        <div className="container mx-auto">{children}</div>
      </main>
    </>
  );
}
