import { useContext, useReducer } from "react"
import ContractsContext from "../context/ContractsContext"
import { managementReducer } from "../reducers/managementReducer"

export const useManagement = () => {
  const [management] = useContext(ContractsContext)
  const [managementState, managementDispatch] = useReducer(managementReducer, {
    account: "",
    salary: "",
    sendAmount: "",
    employees_id: [],
    employees_data: [],
  })
  if (management === undefined) {
    throw new Error("You try to use ContractsContext outside of his provider")
  }
  return [management, managementState, managementDispatch]
}