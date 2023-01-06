import Navbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto">{children}</main>
    </>
  );
}
