import { Box, Stack, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useDaoFactory } from "../hooks/useDaoFactory";
import ContractsLayout from "./ContractsLayout";
import DaoContextProvider from "../context/DaoContext";
import Roles from "./Roles";
import { useEffect } from "react";

const Dao = () => {
  const params = useParams()
  const { id } = params
  const [daoFactory, daoFactoryState, daoFactoryDispatch] = useDaoFactory();

  useEffect(() => {
    let dao = {}
    async function getDao() {
      dao = {
        address: await daoFactory.daoAddressOf(id),
        name: await daoFactory.nameOf(id),
        url: await daoFactory.urlOf(id),
        createdAt: await daoFactory.creationOf(id),
      }
    }
    if (daoFactory) {
      getDao()
      daoFactoryDispatch({ type: 'UPDATE_DAO', payload: dao })
    }
  }, [id, daoFactory, daoFactoryDispatch])

  return (
    <Box>
      {
        daoFactoryState.dao !== {} ? (
          <DaoContextProvider daoAddress={daoFactoryState.dao.address}>
            <Box>
              <Stack>
                <Text>Business information</Text>
                <Text>Name: {daoFactoryState.dao.name}</Text>
                <Text>Url: {daoFactoryState.dao.url}</Text>
                <Text>Author: {daoFactoryState.dao.author}</Text>
                <Text>Created at: {daoFactoryState.dao.createdAt}</Text>
                <Text>Contract Address: {daoFactoryState.dao.address}</Text>
                <Text>Id: {id}</Text>
              </Stack>
              <ContractsLayout />
              <Roles />
            </Box>
            <Link to="./">Back to Dao Factory</Link>
          </DaoContextProvider>)
          : <Text>Dao is loading</Text >
      }
    </Box>
  );
};

export default Dao;