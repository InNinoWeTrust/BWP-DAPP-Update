"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "public/brownwatersproductions Complete.png";
import { client } from "./client";
import { polygon } from "thirdweb/chains";
import { defineChain } from "thirdweb";
import { inAppWallet, smartWallet } from "thirdweb/wallets";

const chain = defineChain(137);

/ Home Component
export default function Home() {
  const [smartAccount, setSmartAccount] = useState<any>(null);
  const [personalAccount, setPersonalAccount] = useState<any>(null);

  useEffect(() => {
    async function setupWallet() {
      try {
        // Connect the personal wallet
        const personalWallet = inAppWallet();
        const connectedPersonalAccount = await personalWallet.connect({
          client,
          chain,
          strategy: "google",
        });
        setPersonalAccount(connectedPersonalAccount);

        // Connect the Smart Account
        const wallet = smartWallet({
          chain, // the chain where your account will be or is deployed
          factoryAddress: "0x71A54d6f0D219568113D37FC12Fc91E8Dfe4F846", // your own deployed account factory address
          gasless: true, // enable or disable gasless transactions
        });
        const connectedSmartAccount = await wallet.connect({
          client,
          personalWallet,
        });
        setSmartAccount(connectedSmartAccount);
      } catch (error) {
        console.error("Failed to set up wallet:", error);
      }
    }

    // Initialize wallet setup when component mounts
    setupWallet();
  }, []);

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        <div className="flex justify-center mb-20">
          <ConnectButton
            client={client}
            accountAbstraction={{
              chain: polygon,
              sponsorGas: true,
            }}
          />
        </div>

        <ThirdwebResources />
      </div>
    </main>
  );
}

// Header Component
function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt="BrownWaters Productions Logo"
        className="w-[150px] h-[150px] md:w-[150px] md:h-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        BrownWaters DAO{" "}
        <span className="inline-block -skew-x-6 text-blue-500">Brown Waters Productions LLC</span>
      </h1>

      <p className="text-zinc-300 text-base">
        Welcome To{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          The Home of {" "}$BWP
        </code>{" "}
        Brownie Points Ecosystem.
      </p>
    </header>
  );
}

// TypeScript interface for ArticleCard props
interface ArticleCardProps {
  title: string;
  href: string;
  description: string;
}

// ArticleCard Component
function ArticleCard({ title, href, description }: ArticleCardProps) {
  return (
    <a
      href={`${href}?utm_source=next-template`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
      aria-label={title}
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-zinc-400">{description}</p>
      </article>
    </a>
  );
}

// Array of resources for ThirdwebResources component
const resources = [
  {
    title: "Brown Waters Productions Discord",
    href: "https://discord.gg/qETmz5MpQ3",
    description: "Join the Brown Waters Productions Discord community.",
  },
  {
    title: "Brown Waters Productions YouTube Channel",
    href: "https://portal.thirdweb.com/typescript/v5/react",
    description: "Subscribe to the Brown Waters Productions YouTube channel.",
  },
  {
    title: "Linktree",
    href: "https://linktr.ee/brownwatersdao",
    description: "Book an Appointment for one of our Many Services"
];

// ThirdwebResources Component
function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      {resources.map((resource) => (
        <ArticleCard key={resource.href} {...resource} />
      ))}
    </div>
  );
}
