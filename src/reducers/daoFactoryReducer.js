export const daoFactoryReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return {
        ...state,
        name: action.payload,
      }
    case "CHANGE_URL":
      return {
        ...state,
        url: action.payload,
      }
    case "CHANGE_TOKEN_NAME":
      return {
        ...state,
        tokenName: action.payload,
      }
    case "CHANGE_TOKEN_SYMBOL":
      return {
        ...state,
        tokenSymbol: action.payload,
      }
    default: throw new Error(`Unsupported action type ${action.type}`);
  }
}