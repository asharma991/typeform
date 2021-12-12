export const validationCheck = (value, type, exp) => {
  const regex = exp || /^[a-zA-Z0-9]*$/;
  return !!value.match(regex);
};
