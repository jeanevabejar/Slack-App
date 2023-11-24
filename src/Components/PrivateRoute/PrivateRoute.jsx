import React from "react";
import { getLocalStorage } from "@/Utils";
import { redirect } from "react-router-dom";

const PrivateRoute = () => {
  const currentUser = getLocalStorage("headerData");

  if(!currentUser){
    return redirect("/login")
  }
  return null
};

export default PrivateRoute;
