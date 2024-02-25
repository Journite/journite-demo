import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import GoalsPage from "../pages/goals";
import Header from "../shared/components/header/Header";
import { Button } from "@nextui-org/react";

export default function AuthenticatedRoutes() {
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
      <main className="h-[calc(100vh-4.125rem)]">
        <Routes>
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/planner" element={<></>} />
        </Routes>
      </main>
    </>
  );
}
