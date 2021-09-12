import { createContext } from "react";
import { useContract } from "web3-hooks";
import { governanceAbi } from "../contracts/GovernanceAbi";
import { managementAbi } from "../contracts/ManagementAbi";
import { treasuryAbi } from "../contracts/TreasuryAbi";

export const ContractsContext = createContext(null);

const ContractsContextProvider = ({ children, address }) => {
  const { governanceAddress, managementAddress, treasuryAddress } = address
  const governance = useContract(governanceAddress, governanceAbi)
  const management = useContract(managementAddress, managementAbi)
  const treasury = useContract(treasuryAddress, treasuryAbi)

  return (
    <ContractsContext.Provider value={[governance, management, treasury]}>
      {children}
    </ContractsContext.Provider>
  );
};

export default ContractsContextProvider;