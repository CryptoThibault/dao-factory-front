import CreateCompany from "./CreateCompany"
import CompanyList from "./CompanyList"
import { Box } from "@chakra-ui/react";

const Dapp = () => {
  return (
    <Box margin={5}>
      <CreateCompany />
      <CompanyList />
    </Box>
  );
};

export default Dapp;
