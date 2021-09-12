import { Text } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import DaoFactoryContextProvider from "../context/DaoFactoryContext";
import Dao from "./Dao";
import DaoFactory from "./DaoFactory";
import DaoList from "./DaoList";

const Dapp = () => {
  return (
    <DaoFactoryContextProvider>
      <Router>
        <Text>Dao Factory</Text>
        <Switch>
          <Route path="/:id">
            <Dao />
          </Route>
          <Route path="/" >
            <DaoFactory />
            <DaoList />
          </Route>
        </Switch>
      </Router>
    </DaoFactoryContextProvider>
  );
};

export default Dapp;