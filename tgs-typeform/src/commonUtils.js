import { constants } from "./constants";

export const validationCheck = (value, type, exp) => {
  if (!value) {
    return false;
  }
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

export const validateRequiredFields = (values, reqFields) => {
  let error = {};
  reqFields.forEach((field, index) => {
    if (values.hasOwnProperty(field) && values[field] === "") {
      error[field] = constants.messages.required;
    }
  });
  return error;
};

export const validateFields = (value) => {
  return (!value && constants.messages.required) || false;
};