import { useContext, useReducer } from "react"
import { DaoContext } from "../context/DaoContext"
import { daoReducer } from "../reducers/daoReducer"

export const useDao = () => {
  const [dao] = useContext(DaoContext)
  const [daoState, daoDispatch] = useReducer(daoReducer, {
    account: "",
    role: "",
    grant: true,
    governanceAddress: "",
    managementAddress: "",
    treasuryAddress: "",
  })
  if (dao === undefined) {
    throw new Error("You try to use ContractsContext outside of his provider")
  }
  return [dao, daoState, daoDispatch]
}