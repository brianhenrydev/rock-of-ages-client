import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login.jsx";
import Home from "../pages/Home";
import { RockForm } from "./RockForm.jsx";
import { RockList } from "./RockList.jsx";
import { Register } from "../pages/Register.jsx";

export const ApplicationViews = () => {
  const [rocksState, setRocksState] = useState([
    {
      id: 1,
      name: "Sample",
      type: {
        id: 1,
        label: "Volcanic",
      },
    },
  ]);

  const fetchRocksFromAPI = async (loc) => {
    const queryUrl =
      loc.to === "mine"
        ? "http://localhost:8000/rocks?owner=current"
        : "http://localhost:8000/rocks";
    const response = await fetch(queryUrl, {
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
      },
    });
    const rocks = await response.json();
    setRocksState(rocks);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/allrocks"
            element={
              <RockList
                loc={{ to: "allrocks" }}
                rocks={rocksState}
                fetchRocks={fetchRocksFromAPI}
              />
            }
          />
          <Route
            path="/create"
            element={<RockForm fetchRocks={fetchRocksFromAPI} />}
          />
          <Route
            path="/mine"
            element={
              <RockList
                loc={{ to: "mine" }}
                rocks={rocksState}
                fetchRocks={fetchRocksFromAPI}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
