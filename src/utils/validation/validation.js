export const passwordValidation = (password) => {
  const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return passwordValidation.test(password);
};
