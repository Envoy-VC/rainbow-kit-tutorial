import Head from "next/head";
import { Inter } from "@next/font/google";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>RainbowKit Tutorial</title>
        <meta
          name="description"
          content="A Simple NFT Minting App using RainbowKit and WAGMI"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <nav className="flex items-center justify-between mt-4 p-4 text-white">
            <div className="font-bold text-xl text-black ml-28">
              RainbowKit Tutorial
            </div>

            <div className="w-full block sm:flex sm:items-center sm:w-auto mr-28">
              <ConnectButton
                chainStatus="none"
                showBalance={false}
                accountStatus="avatar"
              />
            </div>
          </nav>
        </div>
      </main>
    </>
  );
}
