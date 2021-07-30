export const checkUsersExistence = (users, username, password) => {
  return users.some(
    (user) => user.name === username && user.password === password,
  );
};

export const findUserByNameAndPassword = (users, username, password) => {
  return users.find(
    (user) => user.name === username && user.password === password,
  );
};
