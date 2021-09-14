import { useContext, useReducer } from "react"
import { ContractsContext } from "../context/ContractsContext"
import { governanceReducer } from "../reducers/governanceReducer"

export const useGovernance = () => {
  const [governance] = useContext(ContractsContext)
  const [governanceState, governanceDispatch] = useReducer(governanceReducer, {
    token_data: { name: '', symbol: '', balance: 0, voting: 0 },
    send_account: "",
    send_amount: "",
    lock_amount: "",
    description: "",
    account: "",
    role: "",
    grant: true,
    proposals_id: [],
    proposals_data: [{}],
    vote_used: [],
  })
  if (governance === undefined) {
    throw new Error("You try to use ContractsContext outside of his provider")
  }
  return [governance, governanceState, governanceDispatch]
}