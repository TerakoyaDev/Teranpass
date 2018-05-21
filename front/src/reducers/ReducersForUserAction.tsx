const reducersForUserAction = (
  state: any = { isSigned: false, message: '' },
  action: any
): any => {
  switch (action.type) {
    case 'CREATE_NEW_USER_SUCCESS':
      return {
        ...state,
        isSigned: true,
      };
    case 'CREATE_NEW_USER_FAILED':
      return {
        ...state,
        isSigned: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default reducersForUserAction;
