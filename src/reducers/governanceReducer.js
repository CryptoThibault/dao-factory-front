export const governanceReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_DESCRIPTION":
      return {
        ...state,
        name: action.payload,
      }
    case "CHANGE_ACCOUNT":
      return {
        ...state,
        url: action.payload,
      }
    case "CHANGE_ROLE":
      return {
        ...state,
        tokenName: action.payload,
      }
    case "CHANGE_GRANT":
      return {
        ...state,
        tokenSymbol: action.payload,
      }
    default: throw new Error(`Unsupported action type ${action.type}`);
  }
}