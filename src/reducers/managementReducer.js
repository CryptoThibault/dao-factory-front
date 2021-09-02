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
    case "CHANGE_SEND_AMOUNT":
      return {
        ...state,
        sendAmount: action.payload,
      }
    case "LIST_EMPLOYEES":
      return {
        ...state,
        employees_id: action.payload,
      }
    case "UPDATE_EMPLOYEES_DATA":
      return {
        ...state,
        employees_data: action.payload,
      }
    default: throw new Error(`Unsupported action type ${action.type}`);
  }
}