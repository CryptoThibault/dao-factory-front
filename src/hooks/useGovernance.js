import { useContext, useReducer } from "react"
import ContractsContext from "../context/ContractsContext"
import { daoFactoryReducer } from "../reducers/daoFactoryReducer"

export const useDaoFactory = () => {
  const [daoFactory] = useContext(ContractsContext)
  const [daoFactoryState, daoFactoryDispatch] = useReducer(daoFactoryReducer, {
    description: "",
    account: "",
    role: "",
    grant: true,
  })
  if (daoFactory === undefined) {
    throw new Error("You try to use ContractsContext outside of his provider")
  }
  return [daoFactory, daoFactoryState, daoFactoryDispatch]
}