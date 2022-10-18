import { Contract, Web3Provider } from "zksync-web3";
import { FactoryAbi, FundAbi } from "../abi";

const FACTORY_CONTRACT_ADDRESS = "0xfcec95008907146cb229fdf2a5b2c7e259ce45ae";
const TOKEN_CONTRACT_ADDRESS = "0xc2927919b5fb0fd5d4558d24517a484c9a68b486";

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
  const projects = list.map((address) => getFundContract(address));
  return projects;
};

export const createProject = async ({ name, goal, share }) => {
  const Factory = getFactoryContract();
  const transaction = await Factory.createProject(
    TOKEN_CONTRACT_ADDRESS,
    name,
    goal,
    share
  );
  await transaction.wait();
};
