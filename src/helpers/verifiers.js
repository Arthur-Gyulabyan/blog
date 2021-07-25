const isValidInput = (input, type) => {
  const regExes = {
    name: /^[a-zA-Z]+$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
  };

  const lowerCaseType = type.toLowerCase();

  switch (lowerCaseType) {
    case 'username':
      return regExes.name.test(input) && input.length > 1;
    case 'password':
      return regExes.password.test(input);
    default:
      throw new Error('Unknown type of input!');
  }
};

export default isValidInput;
