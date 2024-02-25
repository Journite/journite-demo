import "bootstrap-icons/font/bootstrap-icons.min.css";
import { useEffect, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import "./App.css";
import MainRoutes from "./routes";
import LoadingOverlay from "./shared/components/loading-overlay/LoadingOverlay";
import { useAppDispatch } from "./store";
import { getCredential } from "./store/modules/authSlice";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  const dispatch = useAppDispatch();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    dispatch(getCredential());
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <div
          className={
            (isDarkTheme ? "dark" : "") +
            " h-screen bg-background text-foreground"
          }
        ></div>
      </NextUIProvider>
      <MainRoutes />
      <LoadingOverlay />
    </>
  );
}

export default App;
