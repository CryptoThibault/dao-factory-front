import { useContext, useReducer } from "react"
import ContractsContext from "../context/ContractsContext"
import { governanceReducer } from "../reducers/governanceReducer"

export const useGovernance = () => {
  const [governance] = useContext(ContractsContext)
  const [governanceState, governanceDispatch] = useReducer(governanceReducer, {
    description: "",
    account: "",
    role: "",
    grant: true,
    proposals_id: [],
  })
  if (governance === undefined) {
    throw new Error("You try to use ContractsContext outside of his provider")
  }
  return [governance, governanceState, governanceDispatch]
}