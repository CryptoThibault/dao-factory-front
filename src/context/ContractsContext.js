import { createContext, useEffect, useState } from "react";
import { useContract } from "web3-hooks";
import { daoFactoryAbi, daoFactoryAddress } from "../contracts/DaoFactoryAbi";
import { daoAbi } from "../contracts/DaoAbi";
import { governanceAbi } from "../contracts/GovernanceAbi";
import { managementAbi } from "../contracts/ManagementAbi";
import { treasuryAbi } from "../contracts/TreasuryAbi";
import { useParams } from "react-router-dom";

export const ContractsContext = createContext(null);

const ContractsContextProvider = ({ children }) => {
  const params = useParams()
  const { id } = params
  const daoFactory = useContract(daoFactoryAddress, daoFactoryAbi)
  const [daoAddress, daoUpdate] = useState("")
  useEffect(() => {
    async function dAddress() {
      return await daoFactory.daoAddressOf(id)
    }
    daoUpdate(dAddress())
  }, [daoFactory, id])
  const dao = useContract(daoAddress, daoAbi)
  const [governanceAddress, governanceUpdate] = useState("")
  const [managementAddress, managementUpdate] = useState("")
  const [treasuryAddress, treasuryUpdate] = useState("")
  useEffect(() => {
    async function govAddress() {
      return await dao.governanceAddress()
    }
    governanceUpdate(govAddress())
  }, [dao])
  useEffect(() => {
    async function manAddress() {
      return await dao.managementAddress()
    }
    managementUpdate(manAddress())
  }, [dao])
  useEffect(() => {
    async function treAddress() {
      return await dao.treasuryAddress()
    }
    treasuryUpdate(treAddress())
  }, [dao])
  const governance = useContract(governanceAddress, governanceAbi)
  const management = useContract(managementAddress, managementAbi)
  const treasury = useContract(treasuryAddress, treasuryAbi)

  return (
    <ContractsContext.Provider value={[daoFactory, dao, governance, management, treasury]}>
      {children}
    </ContractsContext.Provider>
  );
};

export default ContractsContextProvider;