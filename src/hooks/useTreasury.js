import { useContext, useReducer } from "react"
import ContractsContext from "../context/ContractsContext"
import { treasuryReducer } from "../reducers/treasuryReducer"

export const useTreasury = () => {
  const [treasury] = useContext(ContractsContext)
  const [treasuryState, treasuryDispatch] = useReducer(treasuryReducer, {
    name: "",
    receiver: "",
    amount: "",
    sendAmount: "",
    sendAddress: "",
    charges_id: [],
    charges_data: [],
  })
  if (treasury === undefined) {
    throw new Error("You try to use ContractsContext outside of his provider")
  }
  return [treasury, treasuryState, treasuryDispatch]
}