export const validationCheck = (value, type, exp) => {
  const regex = exp || /^[a-zA-Z0-9]*$/;
  return !!value.match(regex);
};

export const isError = (error) => {
  for (let key in error) {
    if (error[key]) {
      return true;
    }
  }
  return false;
};
