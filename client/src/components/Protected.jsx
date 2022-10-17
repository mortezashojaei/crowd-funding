import { Navigate } from "react-router-dom";

export const Protected = ({ children }) => {
  console.log("ACCOUNT", localStorage.getItem("ACCOUNT"));
  if (localStorage.getItem("ACCOUNT") === null) return <Navigate to="/" />;
  return <div>{children}</div>;
};
