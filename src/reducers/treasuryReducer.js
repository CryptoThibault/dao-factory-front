export const treasuryReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return {
        ...state,
        name: action.payload,
      }
    case "CHANGE_RECEIVER":
      return {
        ...state,
        receiver: action.payload,
      }
    case "CHANGE_AMOUNT":
      return {
        ...state,
        amount: action.payload,
      }
    case "CHANGE_SEND_AMOUNT":
      return {
        ...state,
        sendAmount: action.payload,
      }
    default: throw new Error(`Unsupported action type ${action.type}`);
  }
}