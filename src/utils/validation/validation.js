export const notEmptyValidation = (value) => {
  return value.trim() !== '';
};

export const telephoneValidation = (value) => {
  const regex = /^08[0-9]{8,11}$/;
  return regex.test(value);
};

export const postalCodeValidation = (value) => {
  const regex = /^[0-9]{5}$/;
  return regex.test(value);
};

export const passwordValidation = (password) => {
  const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return passwordValidation.test(password);
};
