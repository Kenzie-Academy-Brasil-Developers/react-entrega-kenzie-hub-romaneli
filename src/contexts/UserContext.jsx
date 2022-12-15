import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/api";

export const UserContext = createContext({});

export const Providers = ({ children }) => {
  const [user, setUser] = useState(null);
  const [techUser, setTechUser] = useState([]);
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
          setTechUser(response.data.techs);
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
  }, [techUser]);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, setLoading, techUser, setTechUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
