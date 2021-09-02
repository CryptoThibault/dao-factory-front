import CreateCompany from "./CreateCompany"
import CompanyList from "./CompanyList"
import { Box, Button, Text } from "@chakra-ui/react";
import ContractsContextProvider from "../context/ContractsContext";
import { useContext } from "react";
import { Web3Context } from "web3-hooks";

const Dapp = () => {
  const [web3State, login] = useContext(Web3Context)

  const handleClickLogin = () => {
    if (!web3State.isLogged) {
      login()
    }
  }
  return (
    <ContractsContextProvider>
      <Button onClick={handleClickLogin}>{!web3State.isLogged ? 'Log in' : 'Log out'}</Button>
      <Box margin={5}>
        <Text>Dao Factory</Text>
        <CreateCompany />
        <CompanyList />
      </Box>
    </ContractsContextProvider>
  );
};

export default Dapp;
