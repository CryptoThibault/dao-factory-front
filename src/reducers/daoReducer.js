export const daoReducer = (state, action) => {
  switch (action.type) {
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
    case "CHANGE_ISROLE":
      return {
        ...state,
        isRole: action.payload,
      }
    case "UPDATE_ADDRESS":
      return {
        ...state,
        governanceAddress: action.payload.governanceAddress,
        managementAddress: action.payload.managementAddress,
        treasuryAddress: action.payload.treasuryAddress,
      }
    default: throw new Error(`Unsupported action type ${action.type}`);
  }
}