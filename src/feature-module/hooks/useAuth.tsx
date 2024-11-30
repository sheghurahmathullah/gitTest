import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log(context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
