import { UseFormStateReturn } from "react-hook-form";

export interface IProps {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
