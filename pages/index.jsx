import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
// import Homepage from "./Homepage";

// PAGES

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <section className="oo">
      <Head>
        <title>AJIS STORE</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/icons/icon-192x192.png" />
      </Head>
      <main className="app-main-con">
        {/* HOOME PAE */}

        <Homepage />
      </main>
    </section>
  );
}
