import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDaoFactory } from "../hooks/useDaoFactory";
import DashboardCompany from "./DashboardCompany"

const CompanyList = () => {
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
          url: await daoFactory.receiverOf(i),
          author: await daoFactory.authorOf(i),
          createdAt: await daoFactory.creationOf(i),
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
        return <DashboardCompany id={el} data={daoFactory_data[el]} />
      })}
    </Box>
  );
};

export default CompanyList;