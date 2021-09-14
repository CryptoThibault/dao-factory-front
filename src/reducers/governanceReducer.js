export const governanceReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TOKEN_DATA":
      return {
        ...state,
        token_data: action.payload,
      }
    case "CHANGE_SEND_ACCOUNT":
      return {
        ...state,
        send_account: action.payload,
      }
    case "CHANGE_SEND_AMOUNT":
      return {
        ...state,
        send_amount: action.payload,
      }
    case "CHANGE_LOCK_AMOUNT":
      return {
        ...state,
        lock_amount: action.payload,
      }
    case "CHANGE_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      }
    case "CHANGE_ACCOUNT":
      return {
        ...state,
        account: action.payload,
      }
    case "CHANGE_ROLE":
      return {
        ...state,
        role: action.payload,
      }
    case "CHANGE_GRANT":
      return {
        ...state,
        grant: action.payload,
      }
    case "LIST_PROPOSALS":
      return {
        ...state,
        proposals_id: action.payload,
      }
    case "UPDATE_PROPOSALS_DATA":
      return {
        ...state,
        proposals_data: action.payload,
      }
    case "UPDATE_VOTE_USED":
      return {
        ...state,
        vote_used: action.payload,
      }
    default: throw new Error(`Unsupported action type ${action.type}`);
  }
}