import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTokenContext } from "../../context/AuthContextProvider";

export const LogoutPage = () => {
  const navigate = useNavigate();
  const { setToken } = useTokenContext();
  useEffect(() => {
    setToken(null);
    navigate("/");
  });
  return <></>;
};
