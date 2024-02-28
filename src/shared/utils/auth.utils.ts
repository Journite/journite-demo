import { getAuth } from "firebase/auth";

export const getUid = (): string | undefined => {
  return getAuth().currentUser?.uid;
};
