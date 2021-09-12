import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import ContractsContextProvider from "../context/ContractsContext";
import { useDao } from "../hooks/useDao";
import Governance from "./Governance";
import Management from "./Management";
import Treasury from "./Treasury";

const ContractsLayout = () => {
  const [dao, daoState, daoDispatch] = useDao()
  const { governanceAddress, managementAddress, treasuryAddress } = daoState

  useEffect(() => {
    let gov, man, tre;
    const getAddress = async () => {
      gov = await dao.governanceAddress();
      man = await dao.managementAddress();
      tre = await dao.treasuryAddress();
    }
    getAddress()
    daoDispatch({ type: "UPDATE_ADDRESS", payload: { governanceAddress: gov, managementAddress: man, treasuryAddress: tre } })
  }, [dao, daoDispatch])
  return (
    <Box>
      {governanceAddress !== "" ?
        <ContractsContextProvider address={{ governanceAddress, managementAddress, treasuryAddress }}>
          <Governance />
          <Management />
          <Treasury />
        </ContractsContextProvider>
        : <Text>Contracts interface is loading</Text>}

    </Box>
  );
};

export default ContractsLayout;