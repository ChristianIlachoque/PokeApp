import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../components/Home";
import { Pokedex } from "../components/Pokedex";
import { PokeGrid } from "../components/PokeGrid";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokegrid" element={<PokeGrid />} />
        <Route path="/pokegrid/:name" element={<Pokedex />} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
