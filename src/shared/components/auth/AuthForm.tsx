import React, { useEffect, useRef, useState } from "react";
import Logo from "../Logo";
import {
  Button,
  Checkbox,
  Divider,
  Image,
  Input,
  Link,
} from "@nextui-org/react";
import goalThumb from "../../../assets/goals-thumbnail.png";
import Login from "./forms/Login";
import SignUp from "./forms/sign-up/SignUp";

export default function AuthForm() {
  const [isSignUp, setSignUp] = useState(false);

  const [currentForm, setForm] = useState(<Login setSignUp={setSignUp} />);

  useEffect(() => {
    setTimeout(() => {
      setForm(
        isSignUp ? (
          <SignUp setSignUp={setSignUp} />
        ) : (
          <Login setSignUp={setSignUp} />
        ),
      );
    }, 250);
  }, [isSignUp]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className={
          "absolute flex h-full flex-col items-center justify-center px-8 transition-all !duration-1000 ease-in" +
          (!isSignUp ? " left-0 w-2/5" : " left-[40%] w-3/5")
        }
      >
        {currentForm}
      </div>
      <div
        className={
          "absolute h-full overflow-hidden bg-primary transition-all !duration-1000 !ease-soft-spring" +
          (!isSignUp ? " right-0 w-3/5" : " right-[60%] w-2/5")
        }
      >
        <Image
          src={goalThumb}
          width={180}
          classNames={{
            wrapper:
              "absolute bg-default-100 p-2 rounded-medium shadow-thumbnail animation-all !duration-1000 " +
              (isSignUp
                ? "rotate-12 left-8 -bottom-8"
                : "-rotate-[30deg] left-[75%] bottom-[calc(100%-360px)]"),
          }}
          className="max-w-auto translate top-0 w-96 rounded-small text-default-600 shadow-white"
        />
      </div>
    </div>
  );
}
