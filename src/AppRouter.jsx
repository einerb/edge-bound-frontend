import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { DetailPage } from "./pages/DetailPage";
import { HomePage } from "./pages/HomePage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<HomePage />} />
        <Route path="pokemon/:id" element={<DetailPage />} />
      </Route>

      <Route path="*" element={<Header to="/" />} />
    </Routes>
  );
};
