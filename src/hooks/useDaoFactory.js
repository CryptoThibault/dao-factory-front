import { useContext, useReducer } from "react"
import { DaoFactoryContext } from "../context/DaoFactoryContext"
import { daoFactoryReducer } from "../reducers/daoFactoryReducer"

export const useDaoFactory = () => {
  const [daoFactory] = useContext(DaoFactoryContext)
  const [daoFactoryState, daoFactoryDispatch] = useReducer(daoFactoryReducer, {
    name: "",
    url: "",
    tokenName: "",
    tokenSymbol: "",
    daoFactory_id: [],
    daoFactory_data: [],
    dao: {},
  })
  if (daoFactory === undefined) {
    throw new Error("You try to use ContractsContext outside of his provider")
  }
  return [daoFactory, daoFactoryState, daoFactoryDispatch]
}