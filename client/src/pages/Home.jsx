import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";

const ZK_SYNC_CHAIN_ID = "280";
const ZK_SYNC_CHAIN_ID_HEX = "0x118";

export const Home = () => {
  const [chainId, setChainId] = useState(() => localStorage.getItem("CHAIN"));
  const [isConnected, setIsConnected] = useState(
    () => !!localStorage.getItem("ACCOUNT")
  );
  const isNetworkSelected = chainId == ZK_SYNC_CHAIN_ID;
  async function handleClick() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setIsConnected(true);
    if (accounts[0]) localStorage.setItem("ACCOUNT", accounts[0]);
  }

  async function handleNetwork() {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ZK_SYNC_CHAIN_ID_HEX }],
      });
    } catch (e) {
      if (e.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: ZK_SYNC_CHAIN_ID_HEX,
                chainName: "zkSync alpha testnet (Goerli (Testnet2))",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://zksync2-testnet.zkscan.io"],
                rpcUrls: ["https://zksync2-testnet.zksync.dev"],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      // console.error(e)
    }
  }

  useEffect(() => {
    if (isConnected) handleClick();
    if (window.ethereum.chainId)
      setChainId(ethers.BigNumber.from(window.ethereum.chainId).toNumber());
    window.ethereum.on("networkChanged", (id) => {
      setChainId(id);
    });
  }, [window.ethereum]);

  useEffect(() => {
    if (
      window.ethereum.chainId &&
      ethers.BigNumber.from(window.ethereum.chainId).toNumber() ===
        ZK_SYNC_CHAIN_ID
    )
      handleNetwork();
  }, [window.ethereum.chainId]);

  useEffect(() => {
    localStorage.setItem("CHAIN", chainId);
  }, [chainId]);
  return (
    <div className="flex flex-col justify-start items-start">
      <h1 className="text-4xl font-bold">Hi There 👋</h1>
      <p className="text-lg font-semibold text-gray-600">
        Connect your wallet, Switch to ZKSync Network and Enjoy using
        CrowdFunding!
      </p>
      {isConnected ? (
        <button className="btn btn-success mt-8 mx-auto">
          Wallet Connected
        </button>
      ) : (
        <button
          onClick={() => handleClick()}
          className="btn btn-active btn-primary mt-8 mx-auto"
        >
          Connect Wallet
        </button>
      )}

      {isNetworkSelected ? (
        <button className="btn btn-success mt-8 mx-auto">
          Connected to ZKSync Network
        </button>
      ) : (
        <button
          onClick={() => handleNetwork()}
          className="btn btn-error btn-primary mt-8 mx-auto"
        >
          Switch to ZKSync Network
        </button>
      )}
    </div>
  );
};
