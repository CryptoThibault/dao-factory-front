import { useContext, useReducer } from "react"
import ContractsContext from "../context/ContractsContext"
import { daoReducer } from "../reducers/daoReducer"

export const useDao = () => {
  const [dao] = useContext(ContractsContext)
  const [daoState, daoDispatch] = useReducer(daoReducer, {
    account: "",
    role: "",
    grant: true,
  })
  if (dao === undefined) {
    throw new Error("You try to use ContractsContext outside of his provider")
  }
  return [dao, daoState, daoDispatch]
}