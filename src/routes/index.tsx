import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AuthForm from "../shared/components/auth/AuthForm";
import { useAppSelector } from "../store";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnauthenticatedRoutes from "./UnauthenticatedRoutes";
import GoalsPage from "../pages/goals";
import Header from "../shared/components/header/Header";
import { Button } from "@nextui-org/react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import PrivateRoute from "./PrivateRoute";
import { useEffect } from "react";
import PlannerPage from "../pages/planner";

export default function MainRoutes() {
  const { account, credentialHasBeenFetched } = useAppSelector(
    (state) => state.auth,
  );

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/auth" && account)
      navigate("/");
  }, [account]);

  return (
    <>
      <Header
      // ThemeToggle={
      //   <Button
      //     variant={"light"}
      //     onClick={() => setIsDarkTheme((prev) => !prev)}
      //     isIconOnly
      //     radius="full"
      //     size="sm"
      //     className="text-lg"
      //   >
      //     {isDarkTheme ? <BsMoonFill /> : <BsSunFill />}
      //   </Button>
      // }
      />
      <main
        className={
          !account && credentialHasBeenFetched ? "" : "h-[calc(100vh-4.125rem)]"
        }
      >
        <Routes>
          <Route
            index
            path="/"
            element={
              <PrivateRoute>
                <Navigate to={account ? "/goals" : "/auth"} />
              </PrivateRoute>
            }
          />
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="goals"
            element={
              <PrivateRoute>
                <GoalsPage />
              </PrivateRoute>
            }
          />
          <Route path="planner" element={<PlannerPage />} />
        </Routes>
      </main>
    </>
  );
}
