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

export const getRequiredFields = (schema) => {
  let requiredFields = [];
  schema.forEach((item, index) => {
    const { id, type, required } = item;
    if (type === "multiValue") {
      Object.values(item.fields).map((field, index) => {
        const { id, required } = field;
        required && requiredFields.push(id);
      });
    } else {
      required && requiredFields.push(id);
    }
  });
  return requiredFields;
};
