export type UserCreateFormState = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
  role: string;
};

export const DEFAULT_USER_CREATE_FORM: UserCreateFormState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  departmentId: "",
  positionId: "",
  role: "Employee",
};
