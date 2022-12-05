import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/api";
import logo from "../../assets/Logo.svg";
import { StyledButtonTertiary } from "../../styles/buttons";
import { StyledHeader } from "../../styles/header";
import { StyledH2, StyledSpan } from "../../styles/typography";
import { StyledDivUser } from "./dashboard";

export const Dashboard = ({ user, setUser }) => {
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("@USERID");

  useEffect(() => {
    const dashboardUser = async (id) => {
      try {
        const response = await Api.get(`users/${id}`);
        setUser(response.data);
      } catch (error) {}
    };
    dashboardUser(userId);
  }, []);

  const logout = () => {
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <StyledHeader>
        <img src={logo} alt="logo" />
        <StyledButtonTertiary
          onClick={() => {
            logout();
          }}
        >
          Sair
        </StyledButtonTertiary>
      </StyledHeader>
      <StyledDivUser>
        <StyledH2>{`Olá, ${user.name}`}</StyledH2>
        <StyledSpan>{user.course_module}</StyledSpan>
      </StyledDivUser>
    </>
  );
};
