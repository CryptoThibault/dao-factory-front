import CreateCompany from "./CreateCompany"
import CompanyList from "./CompanyList"
import { Box, Text } from "@chakra-ui/react";
import ContractsContextProvider from "../context/ContractsContext";

const Dapp = () => {
  return (
    <ContractsContextProvider>
      <Box margin={5}>
        <Text>Dao Factory</Text>
        <CreateCompany />
        <CompanyList />
      </Box>
    </ContractsContextProvider>
  );
};

export default Dapp;
