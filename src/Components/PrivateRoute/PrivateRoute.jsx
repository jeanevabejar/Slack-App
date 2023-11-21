import React, { useEffect } from "react";
import { getLocalStorage } from "../../Utils/localstorage";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
  const navigate = useNavigate();
  const currentUser = getLocalStorage("headerData");

  useEffect(()=>{
    console.log(currentUser);
    if (currentUser === null) {
    return navigate("/login");
  }
  },[])

  
  return <>{children}</>
};

export default PrivateRoute;
