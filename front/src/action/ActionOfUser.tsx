export const createNewUser = (
  userName: string,
  email: string,
  password: string
) => {
  return {
    payload: {
      email,
      password,
      userName,
    },
    type: 'CREATE_NEW_USER',
  };
};
