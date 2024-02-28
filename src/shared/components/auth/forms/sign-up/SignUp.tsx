import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Input, Link } from "@nextui-org/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import { reset, signUp } from "../../../../../store/modules/registerSlice";
import { registerSchema } from "../../../../schema/register.schema";
import Logo from "../../../Logo";
import { onSuccess } from "./fn";
import { IProps, RegisterData } from "../type";

export default function SignUp({ setSignUp }: IProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const { errorMessage, registrationSuccess, registrationFailure } =
    useAppSelector((state) => state.register);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmitSuccess = (data: RegisterData) => {
    dispatch(reset());
    dispatch(signUp(data));
  };

  useEffect(() => {
    if (registrationSuccess) onSuccess();
  }, [registrationSuccess]);

  return !registrationSuccess ? (
    <>
      <span className="mb-2 font-light text-zinc-600">Get started with</span>
      <Logo height={40} />
      <form
        onSubmit={handleSubmit(onSubmitSuccess)}
        className="mt-8 flex min-w-72 flex-col gap-4"
      >
        <div
          className={
            "w-72 text-wrap rounded-small border-danger bg-danger-50 text-xs text-danger transition-all " +
            (errorMessage && registrationFailure ? "border p-4" : "h-0")
          }
        >
          {errorMessage && registrationFailure && (
            <>
              <span className="mr-1 font-semibold">Alert:</span>
              {errorMessage}
            </>
          )}
        </div>
        <Input
          radius="sm"
          labelPlacement="outside"
          variant="faded"
          placeholder="Name"
          startContent={
            <>
              <i className="bi bi-person-fill text-default-400"></i>
            </>
          }
          color={errors.name ? "danger" : undefined}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          {...register("name")}
        />
        <Input
          radius="sm"
          labelPlacement="outside"
          variant="faded"
          placeholder="Email"
          startContent={
            <>
              <i className="bi bi-envelope-at-fill text-default-400"></i>
            </>
          }
          color={errors.email ? "danger" : undefined}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("email")}
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
          color={errors.password ? "danger" : undefined}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
        <Button
          type="submit"
          color="primary"
          radius="sm"
          className="mt-2 shadow-small"
        >
          Sign up
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
          Sign up with Google
        </Button>
        <div className="order-1 mt-4 flex justify-center gap-1 text-small">
          Already have an account?
          <Link
            color="secondary"
            className="cursor-pointer font-semibold"
            size="sm"
            onClick={() => setSignUp((prev) => !prev)}
          >
            Login here
          </Link>
        </div>
      </form>
    </>
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-green-100 text-4xl text-green-500">
        <i className="bi bi-person-fill-check"></i>
      </div>
      <div className="mb-4 mt-2 text-center font-semibold">
        <div>Sign up successful</div>
        <div className="flex items-center gap-1 text-small font-normal text-default-500">
          Now you can start plan with Journite!
        </div>
      </div>
      <Button color="primary" size="sm">
        Login now
      </Button>
      <canvas
        id="canvas"
        className="absolute right-0 top-0 z-50 h-full w-full"
      ></canvas>
    </div>
  );
}
