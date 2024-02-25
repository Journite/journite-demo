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

export default function MainRoutes() {
  const account = useAppSelector((state) => state.auth.account);

  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/auth" && account) navigate("/");

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={account ? "/goals" : "/auth"} />}
      />
      <Route path="/auth" element={<AuthForm />} />
      <Route path="*">
        <>
          <AuthenticatedRoutes />
        </>
      </Route>
    </Routes>
  );
}
