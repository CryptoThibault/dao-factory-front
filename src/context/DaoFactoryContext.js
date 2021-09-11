import { createContext } from "react";
import { useContract } from "web3-hooks";
import { daoFactoryAbi, daoFactoryAddress } from "../contracts/DaoFactoryAbi";

export const DaoFactoryContext = createContext(null);

const DaoFactoryContextProvider = ({ children }) => {
  const daoFactory = useContract(daoFactoryAddress, daoFactoryAbi)
  return (
    <DaoFactoryContext.Provider value={[daoFactory]}>
      {children}
    </DaoFactoryContext.Provider>
  );
};

export default DaoFactoryContextProvider;