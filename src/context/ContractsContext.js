import { createContext } from "react";
import { useContract } from "web3-hooks";
import { daoFactoryAbi, daoFactoryAddress } from "../contracts/DaoFactoryAbi";
import { daoAbi } from "../contracts/DaoAbi";
import { governanceAbi } from "../contracts/GovernanceAbi";
import { managementAbi } from "../contracts/ManagementAbi";
import { treasuryAbi } from "../contracts/TreasuryAbi";
import { useDao } from "../hooks/useDao";
import { useParams } from "react-router-dom";

export const ContractsContext = createContext(null);

const ContractsContextProvider = ({ children }) => {
  const id = useParams()
  const daoFactory = useContract(daoFactoryAddress, daoFactoryAbi)
  const [, daoState] = useDao();
  const [, daoFactoryState] = useDao();
  const { daoFactory_data } = daoFactoryState
  const { governanceAddress, managementAddress, treasuryAddress } = daoState
  const dao = useContract(daoFactory_data[id].daoAddress, daoAbi)
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