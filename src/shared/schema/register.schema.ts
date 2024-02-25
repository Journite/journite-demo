import * as yup from "yup";
import { errorMessages } from "../utils/validation.utils";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required(errorMessages.required)
    .matches(/^[a-zA-Z\s]+$/g, errorMessages.matches),
  email: yup
    .string()
    .required(errorMessages.required)
    .email(errorMessages.matches),
  password: yup
    .string()
    .required(errorMessages.required)
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g, errorMessages.matches),
});
