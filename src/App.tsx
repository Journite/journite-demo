import { Button } from "@nextui-org/react";
import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import "./App.css";
import Header from "./shared/components/header/Header";
import AppRoutes from "./pages/routes";
import "bootstrap-icons/font/bootstrap-icons.min.css";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  return (
    <div
      className={
        (isDarkTheme ? "dark" : "") + " h-screen text-foreground bg-background"
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
    </div>
  );
}

export default App;
