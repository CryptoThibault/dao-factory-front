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
    case "LIST_COMPANY":
      return {
        ...state,
        daoFactory_id: action.payload,
      }
    case "UPDATE_COMPANY_DATA":
      return {
        ...state,
        daoFactory_data: action.payload,
      }
    case "UPDATE_DAO":
      return {
        ...state,
        dao: action.payload,
      }
    default: throw new Error(`Unsupported action type ${action.type}`);
  }
}