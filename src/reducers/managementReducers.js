export const managementReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_ACCOUNT":
      return {
        ...state,
        account: action.payload,
      }
    case "CHANGE_SALARY":
      return {
        ...state,
        salary: action.payload,
      }
    default: throw new Error(`Unsupported action type ${action.type}`);
  }
}