import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDaoFactory } from "../hooks/useDaoFactory";

const DaoList = () => {
  const [daoFactory, daoFactoryState, daoFactoryDispatch] = useDaoFactory()
  const { daoFactory_id, daoFactory_data } = daoFactoryState
  useEffect(() => {
    async function getCompany() {
      let ids = []
      let data = [{}]
      let id = 0
      try {
        id = await daoFactory.lastId();
        for (let i = 1; i <= Number(id.toString()); i++) {
          ids.push(i)
          data.push({
            name: await daoFactory.nameOf(i),
            daoAddress: await daoFactory.daoAddressOf(i),
          })
        }
      } catch (e) {
        console.log(e.message)
      }
      daoFactoryDispatch({ type: "LIST_COMPANY", payload: ids })
      daoFactoryDispatch({ type: "UPDATE_COMPANY_DATA", payload: data })
    }
    if (daoFactory) {
      getCompany()
    }
  }, [daoFactory, daoFactoryDispatch])
  return (
    <Box> {daoFactory_id.map(el => {
      return daoFactory_data[el] ? (
        <Box backgroundColor="gray.600" margin={5} padding={3} key={el}>
          <Link to={`/${el}`}>
            <Text>{daoFactory_data[el].name} #{el}</Text>
            <Text>Contract address: {daoFactory_data[el].daoAddress}</Text>
          </Link>
        </Box>
      ) : <Text>Dao link is loading</Text>
    })}
    </Box>
  )
};

export default DaoList;