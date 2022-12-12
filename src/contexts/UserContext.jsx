import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/api";

export const UserContext = createContext({});

export const Providers = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function selfLogin() {
      const token = window.localStorage.getItem("@TOKEN");
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (token) {
        try {
          const response = await Api.get("profile");
          setUser(response.data);
          setDataUser(response.data.techs);
          navigate("/dashboard");
        } catch (error) {
          window.localStorage.clear();
          navigate("/");
        }
      } else {
        navigate("/");
      }
    }
    selfLogin();
  }, [dataUser]);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, setLoading, dataUser, setDataUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
