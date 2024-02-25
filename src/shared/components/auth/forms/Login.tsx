import { Button, Divider, Input, Link } from "@nextui-org/react";
import Logo from "../../Logo";
import { IProps } from "./type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../../store";
import * as yup from "yup";
import { errorMessages } from "../../../utils/validation.utils";
import { login, reset } from "../../../../store/modules/authSlice";

export default function Login({ setSignUp }: IProps) {
  const dispatch = useAppDispatch();

  const { errorMessage, loading, loginFailure, loginSuccess } = useAppSelector(
    (state) => state.auth,
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .required(errorMessages.required)
          .email(errorMessages.matches),
        password: yup
          .string()
          .required(errorMessages.required)
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
            errorMessages.matches,
          ),
      }),
    ),
  });

  const onSubmitSuccess = (data: { email: string; password: string }) => {
    dispatch(reset());
    dispatch(login(data));
  };
  return (
    <>
      <span className="mb-2 font-light text-zinc-600">
        Plan and grow yourself with
      </span>
      <Logo height={40} />
      <form
        onSubmit={handleSubmit(onSubmitSuccess)}
        className="mt-8 flex min-w-72 flex-col gap-4"
      >
        <div
          className={
            "w-72 text-wrap rounded-small border-danger bg-danger-50 text-xs text-danger transition-all " +
            (errorMessage && loginFailure ? "border p-4" : "h-0")
          }
        >
          {errorMessage && loginFailure && (
            <>
              <span className="mr-1 font-semibold">Alert:</span>
              {errorMessage}
            </>
          )}
        </div>
        <Input
          radius="sm"
          type="email"
          labelPlacement="outside"
          variant="faded"
          placeholder="Email"
          startContent={
            <>
              <i className="bi bi-envelope-at-fill text-default-400"></i>
            </>
          }
        />
        <Input
          radius="sm"
          labelPlacement="outside"
          type="password"
          placeholder="Password"
          variant="faded"
          startContent={
            <>
              <i className="bi bi-shield-lock-fill text-default-400"></i>
            </>
          }
        />
        <Button
          type="submit"
          color="primary"
          radius="sm"
          className="mt-2 shadow-small"
        >
          Login
        </Button>
        <div className="relative my-2">
          <Divider />
          <span className="absolute right-1/2 -translate-y-1/2 translate-x-1/2 bg-background p-1 text-xs font-semibold text-default-400">
            OR
          </span>
        </div>
        <Button
          fullWidth
          radius="sm"
          variant="bordered"
          className="border-1"
          startContent={
            <svg
              viewBox="-0.5 0 48 48"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={14}
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title>Google-color</title>
                <desc>Created with Sketch.</desc> <defs> </defs>
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      ></path>
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          }
        >
          Sign in with Google
        </Button>
        <div className="order-1 mt-4 flex justify-center gap-1 text-small">
          Do not have an account?
          <Link
            color="secondary"
            className="cursor-pointer font-semibold"
            size="sm"
            onClick={() => setSignUp((prev) => !prev)}
          >
            Sign up
          </Link>
        </div>
      </form>
    </>
  );
}
