import React, { useEffect, useState } from "react";
import "./App.css";

import { loader } from "./Utils/animations";
import Preloader from "./Components/Preloader/Preloader";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";


function App() {
  const navigate = useNavigate();
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const loadAndNavigate = async () => {
      try {
        await loader();
        setLoadingComplete(true);
        navigate("/dashboard/home");
      } catch (error) {
        console.error("Error during loading:", error);
      }
    };
    loadAndNavigate();
  }, [navigate]);

  return (
    <>
      {!loadingComplete && <Preloader />}
      {loadingComplete && <Outlet />}
    </>
  );
}

export default App;
