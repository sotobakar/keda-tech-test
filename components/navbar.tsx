import Head from "next/head";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <Head>
        <title>Sistem Parkir</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="py-8 w-full">
        <ul className="flex justify-center gap-x-6">
          <li className="font-medium hover:underline hover:font-bold">
            <Link href="/">Input Data Parkir</Link>
          </li>
          <li className="font-medium hover:underline hover:font-bold">
            <Link href="/parking">Lihat Data Parkir</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
