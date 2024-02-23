import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import GoalsPage from "./goals";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/goals"} />} />
      <Route path="/goals" element={<GoalsPage />} />
      <Route path="/planner" element={<></>} />
    </Routes>
  );
}
