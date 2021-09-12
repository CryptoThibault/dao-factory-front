import { createContext } from "react";
import { useContract } from "web3-hooks";
import { daoAbi } from "../contracts/DaoAbi";

export const DaoContext = createContext(null);

const DaoContextProvider = ({ children, daoAddress }) => {
  const dao = useContract(daoAddress, daoAbi)
  return (
    <DaoContext.Provider value={[dao]}>
      {children}
    </DaoContext.Provider>
  );
};

export default DaoContextProvider;