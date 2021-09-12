import { Box, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDaoFactory } from "../hooks/useDaoFactory";
import ContractsLayout from "./ContractsLayout";
import DaoContextProvider from "../context/DaoContext";
import Roles from "./Roles";

const Dao = () => {
  const params = useParams()
  const { id } = params

  const [, daoFactoryState] = useDaoFactory();
  const data = daoFactoryState.daoFactory_data[id];

  return (
    <DaoContextProvider daoAddress={data.daoAddress}>
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
        <ContractsLayout />
        <Roles />
      </Box>
    </DaoContextProvider>
  );
};

export default Dao;