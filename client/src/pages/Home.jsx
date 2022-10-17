import { useEffect, useState } from "react";

export const Home = () => {
  const [isConnected, setIsConnected] = useState(
    () => !!localStorage.getItem("ACCOUNT")
  );
  async function handleClick() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setIsConnected(true);
    if (accounts[0]) localStorage.setItem("ACCOUNT", accounts[0]);
  }

  useEffect(() => {
    if (isConnected) handleClick();
  }, []);
  return (
    <div className="flex flex-col justify-start items-start">
      <h1 className="text-4xl font-bold">Hi There 👋</h1>
      <p className="text-lg font-semibold text-gray-600">
        Connect your wallet and Enjoy using CrowdFunding!
      </p>
      {isConnected ? (
        <button className="btn btn-success mt-8 mx-auto">
          Wallet Connected
        </button>
      ) : (
        <button
          onClick={() => handleClick()}
          class="btn btn-active btn-primary mt-8 mx-auto"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};
