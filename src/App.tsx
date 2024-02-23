import { Button, NextUIProvider } from "@nextui-org/react";
import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import "./App.css";
import Header from "./shared/components/header/Header";
import AppRoutes from "./pages/routes";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import LoadingOverlay from "./shared/components/loading-overlay/LoadingOverlay";
import { useNavigate } from "react-router-dom";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <div
        className={
          (isDarkTheme ? "dark" : "") +
          " h-screen bg-background text-foreground"
        }
      >
        <Header
          ThemeToggle={
            <Button
              variant={"light"}
              onClick={() => setIsDarkTheme((prev) => !prev)}
              isIconOnly
              radius="full"
              size="sm"
              className="text-lg"
            >
              {isDarkTheme ? <BsMoonFill /> : <BsSunFill />}
            </Button>
          }
        />
        <main className="h-[calc(100vh-64px)]">
          <AppRoutes />
        </main>
        <LoadingOverlay />
      </div>
    </NextUIProvider>
  );
}

export default App;
