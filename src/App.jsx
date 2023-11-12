import React, { useEffect } from "react";
import "./App.css";

import { loader } from "./Utils/animations";
import Preloader from "./Components/Preloader";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";




function App() {
  useEffect(() => {
    return () => {
  loader()
    };
  }, []);

  return (
    <>
     <Preloader/>
     <Dashboard/>
    </>
  );
}

export default App;
