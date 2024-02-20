import * as yup from "yup";
import { errorMessages } from "../utils/validation.utils";
import { Color, colorList } from "../utils/constant.utils";

export const iconThumbSchema = yup.object({
  iconName: yup.string().required(errorMessages.matches),
  color: yup
    .mixed<Color>()
    .oneOf(colorList as Color[])
    .required(errorMessages.matches),
});

export const goalSchema = yup.object({
  name: yup.string().required(errorMessages.required),
  endDate: yup.number().required(errorMessages.required),
  iconThumb: iconThumbSchema,
});
