import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDaoFactory } from "../hooks/useDaoFactory";

const DaoList = () => {
  const [daoFactory, daoFactoryState, daoFactoryDispatch] = useDaoFactory()
  const { daoFactory_id, daoFactory_data } = daoFactoryState
  useEffect(() => {
    let ids = []
    let data = [{}]
    async function getCompany() {
      const id = await daoFactory.lastId();
      for (let i = 1; i <= id; i++) {
        ids.push(i)
        data.push({
          name: await daoFactory.nameOf(i),
          url: await daoFactory.urlOf(i),
          author: await daoFactory.authorOf(i),
          createdAt: await daoFactory.creationOf(i).toString(),
          daoAddress: await daoFactory.daoAddressOf(i),
        })
      }
    }
    getCompany()
    daoFactoryDispatch({ type: "LIST_COMPANY", payload: ids })
    daoFactoryDispatch({ type: "UPDATE_COMPANY_DATA", payload: data })
  }, [daoFactory, daoFactoryDispatch])
  return (
    <Box>
      {daoFactory_id.map(el => {
        return (
          <Link to={`/${el}`}>
            <Text>{daoFactory_data[el].name} #{el}</Text>
            <Text>Contract address: {daoFactory_data[el].daoAddress}</Text>
          </Link>
        )
      })}
    </Box>
  );
};

export default DaoList;