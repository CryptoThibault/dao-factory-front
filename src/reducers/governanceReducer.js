export const governanceReducer = (state, action) => {
  switch (action.type) {
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
    case "LIST_PROPOSAL":
      return {
        ...state,
        proposals_id: action.payload,
      }
    default: throw new Error(`Unsupported action type ${action.type}`);
  }
}