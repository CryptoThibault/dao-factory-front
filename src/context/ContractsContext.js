import { createContext } from "react";
import { useContract } from "web3-hooks";
import { daoFactoryAbi, daoFactoryAddress } from "../contracts/DaoFactoryAbi";
import { daoAbi } from "../contracts/DaoAbi";
import { governanceAbi } from "../contracts/GovernanceAbi";
import { managementAbi } from "../contracts/ManagementAbi";
import { treasuryAbi } from "../contracts/TreasuryAbi";

export const ContractsContext = createContext(null);

const ContractsContextProvider = ({ children }) => {
  let daoAddress, governanceAddress, managementAddress, treasuryAddress
  const daoFactory = useContract(daoFactoryAddress, daoFactoryAbi)
  const dao = useContract(daoAddress, daoAbi)
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