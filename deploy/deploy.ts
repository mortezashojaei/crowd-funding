import { Wallet } from "zksync-web3";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function (hre: HardhatRuntimeEnvironment) {
  const wallet = new Wallet(String(process.env.DEPLOYER) || "");
  console.log("Wallet connecte");

  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Factory");

  const factoryContract = await deployer.deploy(artifact);

  // Show the contract info.
  const contractAddress = factoryContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
