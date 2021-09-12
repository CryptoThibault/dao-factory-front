import CreateCompany from "./CreateCompany"
import CompanyList from "./CompanyList"
import { Box, Button, Text } from "@chakra-ui/react";
import ContractsContextProvider from "../context/ContractsContext";
import { useContext, useEffect } from "react";
import { Web3Context } from "web3-hooks";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom"
import DashboardCompany from "./DashboardCompany";
import { useDaoFactory } from "../hooks/useDaoFactory";
import DaoFactoryContextProvider from "../context/DaoFactoryContext";

const Dapp = () => {
  const [web3State, login] = useContext(Web3Context)
  const [daoFactory, daoFactoryState, daoFactoryDispatch] = useDaoFactory()
  const { daoFactory_id, daoFactory_data } = daoFactoryState
  const params = useParams()
  const id = params
  const handleClickLogin = () => {
    if (!web3State.isLogged) {
      login()
    }
  }

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
    <DaoFactoryContextProvider>
      <Button onClick={handleClickLogin}>{!web3State.isLogged ? 'Log in' : 'Log out'}</Button>
      {web3State.isLogged
        ? <Box margin={5}>
          <Text>Dao Factory</Text>
          <Router>
            <Switch>
              <Route path="/:id">
                <ContractsContextProvider id={id}>
                  <DashboardCompany id={id} data={daoFactory_data[id]} />
                </ContractsContextProvider>
              </Route>
              <Route path="/">
                <CreateCompany />
                <CompanyList ids={daoFactory_id} data={daoFactory_data} />
              </Route>
            </Switch>
          </Router>
        </Box> : <></>}

    </DaoFactoryContextProvider>
  );
};

export default Dapp;
