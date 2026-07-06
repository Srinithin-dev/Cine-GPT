export const validateFields = (
  email: string,
  password: string,
  name: HTMLInputElement | null,
) => {
  console.log(name, "!name");
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email,
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);

  if (name && name.value == "") {
    return "Name is not valid";
  }
  if (!isEmailValid) return "Email Id is not valid";
  if (!isPasswordValid) return "Password is not valid";
  return null;
};
