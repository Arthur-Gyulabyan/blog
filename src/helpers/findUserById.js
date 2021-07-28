const findUserById = (users, id) => {
  return users.find((user) => user.id === id);
};

export default findUserById;
