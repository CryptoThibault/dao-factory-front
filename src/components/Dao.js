import { Box, Stack, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useDaoFactory } from "../hooks/useDaoFactory";
import ContractsLayout from "./ContractsLayout";
import DaoContextProvider from "../context/DaoContext";
import Roles from "./Roles";
import { useEffect } from "react";
import SimpleDateTime from 'react-simple-timestamp-to-date';

const Dao = () => {
  const params = useParams()
  const { id } = params
  const [daoFactory, daoFactoryState, daoFactoryDispatch] = useDaoFactory();

  useEffect(() => {
    async function getDao() {
      daoFactoryDispatch({
        type: 'UPDATE_DAO', payload: {
          address: await daoFactory.daoAddressOf(id),
          name: await daoFactory.nameOf(id),
          author: await daoFactory.authorOf(id),
          url: await daoFactory.urlOf(id),
          createdAt: Number((await daoFactory.creationOf(id)).toString()),
        }
      })
    }
    if (daoFactory) {
      getDao()
    }
  }, [id, daoFactory, daoFactoryDispatch])
  return (
    <Box>
      {
        daoFactoryState.dao !== {} ? (
          <DaoContextProvider daoAddress={daoFactoryState.dao.address}>
            <Box margin={5}>
              <Stack >
                <Text fontSize={40} align="center">Business information</Text>
                <Text>Name: {daoFactoryState.dao.name}</Text>
                <Text>Url: <b><a href={daoFactoryState.dao.url}>{daoFactoryState.dao.url}</a></b></Text>
                <Text>Author: {daoFactoryState.dao.author}</Text>
                <Text>Created the <SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{daoFactoryState.dao.createdAt}</SimpleDateTime></Text>
                <Text>Contract Address: {daoFactoryState.dao.address}</Text>
                <Text>Id: {id}</Text>
              </Stack>
              <ContractsLayout />
              <Roles />
              <Link margin={5} to="./">Back to Dao Factory</Link>
            </Box>
          </DaoContextProvider>)
          : <Text>Dao is loading</Text >
      }
    </Box>
  );
};

export default Dao;