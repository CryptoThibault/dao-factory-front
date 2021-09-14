import { Button, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Web3Context } from "web3-hooks";
import DaoFactoryContextProvider from "../context/DaoFactoryContext";
import Dao from "./Dao";
import DaoFactory from "./DaoFactory";
import DaoList from "./DaoList";

const Dapp = () => {
  const [web3State, login] = useContext(Web3Context)
  const [list, listUp] = useState(false)
  return (
    <DaoFactoryContextProvider>
      <Text fontSize={80} align="center">Dao Factory</Text>
      <Button onClick={login} margin={5}>{!web3State.isLogged ? 'Log in' : 'Log out'}</Button>
      {web3State.isLogged ?
        (<Router>
          <Switch>
            <Route path="/:id">
              <Dao />
            </Route>
            <Route path="/" >
              <Button onClick={() => listUp(!list)}>{list ? 'Hide list' : 'Show list'}</Button>
              <DaoFactory listUp={listUp} />
              {list ? <DaoList /> : <></>}
            </Route>
          </Switch>
        </Router>) : <Text margin={5}>You must login before use Dao Factory</Text>
      }
    </DaoFactoryContextProvider >
  );
};

export default Dapp;