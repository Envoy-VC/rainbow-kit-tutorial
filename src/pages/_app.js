// Import Styles

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

// RainbowKit Imports
import {
  getDefaultWallets,
  RainbowKitProvider,
  AvatarComponent,
} from "@rainbow-me/rainbowkit";

// Wagmi Imports
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, polygonMumbai],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "RainbowKit Tutorial",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const CustomAvatar = ({ address, size }) => {
  const image = `https://api.dicebear.com/5.x/identicon/svg?seed=${address}&scale=50`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
      alt="avatar"
    />
  );
};

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        avatar={CustomAvatar}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
