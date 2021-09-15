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
    const getAddress = async () => {
      const gov = await dao.governanceAddress();
      const man = await dao.managementAddress();
      const tre = await dao.treasuryAddress();
      daoDispatch({ type: "UPDATE_ADDRESS", payload: { governanceAddress: gov, managementAddress: man, treasuryAddress: tre } })
    }
    if (dao) {
      getAddress()
    }
  }, [dao, daoDispatch])
  return (
    <Box>
      {treasuryAddress !== "" ?
        <ContractsContextProvider address={{ governanceAddress, managementAddress, treasuryAddress }}>
          <Governance contractAddress={governanceAddress} />
          <Management contractAddress={managementAddress} />
          <Treasury contractAddress={treasuryAddress} />
        </ContractsContextProvider>
        : <Text>Contracts interface is loading</Text>}
    </Box>
  );
};

export default ContractsLayout;