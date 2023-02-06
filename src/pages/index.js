import Head from "next/head";
import { Inter } from "@next/font/google";
import Image from "next/image";
import logo from "../assets/rainbow-medium.png";

import Link from "next/link";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  useAccount,
  useConnect,
  useContract,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";

import { abi, nft } from "../constants/index.js";
import nftImg from "../assets/nftImg.gif";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
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
      <body className="min-h-screen bg-[#F0F1F5]">
        <div>
          <nav className="flex flex-col items-center justify-between mt-4 p-4 text-white px-28 sm:flex-row sm:justify-between sm:mx-0">
            <div className="flex text-xl text-black sm:text-2xl text-gradient font-extrabold">
              <Image
                src={logo}
                alt="RainbowKit Logo"
                width={28}
                height={28}
                className="mr-5 w-5 h-4 sm:w-7 sm:h-7 mt-2 sm:mt-0"
              />
              RainbowKit Tutorial
            </div>

            <div className="w-full mt-4 flex justify-center sm:flex sm:justify-center sm:w-auto">
              <ConnectButton
                chainStatus="none"
                showBalance={false}
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
              />
            </div>
          </nav>
        </div>
        <div className="w-72 h-96 m-16 rounded-2xl shadow-xl overflow-hidden max-w-screen-md mx-auto box-shadow-md bg-white">
          <Image
            src={nftImg}
            alt={nft.name}
            className="w-full h-64 object-cover rounded-t-2xl backdrop-blur-xl"
          />
          <Link href={nft.openseaLink}>
            <div className="text-black font-bold mt-4 text-xl ml-2">
              {nft.collectionName}
            </div>
          </Link>
          <div className="text-black mt-2 ml-2">{nft.name}</div>
          <div className="flex justify-between mt-2 p-2">
            <div className="text-gray-600 text-sm">{nft.chain}</div>
            <div className="text-gray-600 text-sm">{nft.price}</div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="px-6 py-2 rounded-xl bg-[#0E76FD] hover:scale-105 transition-transform duration-200 text-white font-bold">
            Mint
          </button>
        </div>
      </body>
    </>
  );
}
