import { Wallet } from "zksync-web3";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const TOKEN_ADDRESS = "0x48B178cA848465C37EdB666A4ea6c38760731e0d";
export default async function (hre: HardhatRuntimeEnvironment) {
  const wallet = new Wallet("PRIVATE_KEY");
  console.log("Wallet connected");

  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Faucet");

  const faucetContract = await deployer.deploy(artifact, [TOKEN_ADDRESS]);

  // Show the contract info.
  const contractAddress = faucetContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
