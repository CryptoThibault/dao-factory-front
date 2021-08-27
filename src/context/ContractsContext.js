import { createContext } from "react";
import { useContract } from "web3-hooks";
import { daoFactoryAbi, daoFactoryAddress } from "../contracts/DaoFactoryAbi";

export const ContractsContext = createContext(null);

const ContractsContextProvider = ({ children }) => {
  const daoFactory = useContract(daoFactoryAddress, daoFactoryAbi)

  return (
    <ContractsContext.Provider value={[daoFactory]}>
      {children}
    </ContractsContext.Provider>
  );
};

export default ContractsContextProvider;