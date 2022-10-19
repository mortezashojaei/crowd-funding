import { ethers } from "ethers";
import { Contract, utils, Web3Provider } from "zksync-web3";
import { FactoryAbi, FundAbi } from "../abi";

const FACTORY_CONTRACT_ADDRESS = "0xeeA62e030331F190481c02D26e078F1785e58944";
const TOKEN_CONTRACT_ADDRESS = "0xc2927919b5fb0fd5d4558d24517a484c9a68b486";
const PAYMASTER_CONTRACT_ADDRESS = "0x866d3DC46e1f78b9c2e45Faf27124A3689240F18";

export const getFactoryContract = () => {
  const signer = new Web3Provider(window.ethereum).getSigner();
  const Factory = new Contract(FACTORY_CONTRACT_ADDRESS, FactoryAbi, signer);
  return Factory;
};

export const getFundContract = (address) => {
  const signer = new Web3Provider(window.ethereum).getSigner();
  const Fund = new Contract(address, FundAbi, signer);
  return Fund;
};

export const getProjectsAdresses = async () => {
  const Contract = getFactoryContract();
  const list = await Contract.getProjects();
  return list;
};

export const getProjects = async () => {
  const list = await getProjectsAdresses();
  const projects = await Promise.allSettled(
    list.map(async (address) => getProjectInfo(getFundContract(address)))
  );
  return projects
    .filter((item) => item.status === "fulfilled")
    .map((item) => item.value);
};

export async function getProjectInfo(fund) {
  const share = await fund.FUND_SHARE();
  const name = await fund.NAME();
  const goal = await fund.GOAL();
  const balance = await fund.getTotalFundingAmount();
  const isClaimed = await fund.IS_CLAIMED();
  const isCompleted = await fund.IS_COMPLETED();

  return {
    address: fund.address,
    share: share.toNumber(),
    name,
    goal,
    balance,
    isClaimed,
    isCompleted,
  };
}

export const createProject = async ({ name, goal, share }) => {
  const Factory = getFactoryContract();
  const paymasterParams = utils.getPaymasterParams(PAYMASTER_CONTRACT_ADDRESS, {
    type: "ApprovalBased",
    token: TOKEN_CONTRACT_ADDRESS,
    minimalAllowance: ethers.BigNumber.from(1),
    innerInput: new Uint8Array(),
  });
  const transaction = await Factory.createProject(
    TOKEN_CONTRACT_ADDRESS,
    name,
    goal,
    share,
    {
      customData: {
        paymasterParams,
        ergsPerPubdata: utils.DEFAULT_ERGS_PER_PUBDATA_LIMIT,
      },
    }
  );
  await transaction
    .wait()
    .then(() => {
      alert("Done!");
    })
    .catch(() => {
      alert("Error!");
    });
};
