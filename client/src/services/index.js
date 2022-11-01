import { BigNumber, ethers } from "ethers";
import { Contract, utils, Web3Provider } from "zksync-web3";
import { FactoryAbi, FundAbi, ERC20Abi } from "../abi";

const FACTORY_CONTRACT_ADDRESS = "0x361da25C73B72F11FeA83eE5968B934D59833577";
const TOKEN_CONTRACT_ADDRESS = "0x48B178cA848465C37EdB666A4ea6c38760731e0d";
const PAYMASTER_CONTRACT_ADDRESS = "0x29aE68C8822b3cE1a83dD17e4A1C31E9Db935466";

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
  const transaction = await Factory.createProject(
    TOKEN_CONTRACT_ADDRESS,
    name,
    goal,
    share,
    getTransactionConfig(1)
  );
  await transaction
    .wait()
    .then(() => {
      alert("Done!");
    })
    .catch((error) => {
      console.log(error);
      alert("Error!");
    });
};

export const getTransactionConfig = () => {
  const paymasterParams = utils.getPaymasterParams(PAYMASTER_CONTRACT_ADDRESS, {
    type: "ApprovalBased",
    token: TOKEN_CONTRACT_ADDRESS,
    minimalAllowance: ethers.BigNumber.from(1),
    innerInput: new Uint8Array(),
  });

  return {
    customData: {
      paymasterParams,
      ergsPerPubdata: utils.DEFAULT_ERGS_PER_PUBDATA_LIMIT,
    },
  };
};

export const invest = async (address, share) => {
  const Fund = getFundContract(address);
  const signer = new Web3Provider(window.ethereum).getSigner();
  const TokenContract = new Contract(TOKEN_CONTRACT_ADDRESS, ERC20Abi, signer);
  const Token = TokenContract.connect(signer);

  const approveTrx = await Token.approve(
    Fund.address,
    share
    // getTransactionConfig(1 + share)
  );
  await approveTrx.wait();
  console.log(approveTrx);
  const transaction = await Fund
    .fund
    // getTransactionConfig()
    ();
  console.log(transaction);
  await transaction
    .wait()
    .then(() => {
      alert("Done!");
    })
    .catch((error) => {
      console.log(error);
      alert("Error!");
    });
};
