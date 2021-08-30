import { Box, Stack, Text } from "@chakra-ui/react";
import Governance from "./Governance"
import Management from "./Management"
import Treasury from "./Treasury"

const DashboardCompany = ({ id, data }) => {
  return (
    <Box>
      <Stack>
        <Text>Business information</Text>
        <Text>Name: {data.name}</Text>
        <Text>Url: {data.url}</Text>
        <Text>Author: {data.author}</Text>
        <Text>Created at: {data.createdAt}</Text>
        <Text>Contract Address: {data.daoAddress}</Text>
        <Text>Id: {id}</Text>
      </Stack>
      <Governance />
      <Treasury />
      <Management />
    </Box>
  );
};

export default DashboardCompany;