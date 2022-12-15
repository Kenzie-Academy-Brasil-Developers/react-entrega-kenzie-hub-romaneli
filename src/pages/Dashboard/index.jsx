import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/api";
import logo from "../../assets/Logo.svg";
import {
  StyledButtonAddTech,
  StyledButtonTertiary,
} from "../../styles/buttons";
import { StyledHeader } from "../../styles/header";
import {
  StyledH2,
  StyledH3,
  StyledH5,
  StyledSpan,
} from "../../styles/typography";
import { StyledDivHeaderTechs, StyledDivUser, StyledUl } from "./dashboard";
import { UserContext } from "../../contexts/UserContext";
import { Technologies } from "../../components/Technologies";
import { ModalAddTech } from "../../components/ModalAddTech";
import { TechContext } from "../../contexts/TechContext";
import { ModalEditTech } from "../../components/ModalEditTech";

export const Dashboard = () => {
  const { user, setUser, techUser } = useContext(UserContext);
  const { modal, setModal, modalEdit, techSelected } = useContext(TechContext);
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("@USERID");

  useEffect(() => {
    const dashboardUser = async (id) => {
      try {
        setLoading(true);
        const response = await Api.get(`users/${id}`);
        setUser(response.data);
      } catch (error) {
        return error;
      }
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
        <StyledH2>{user && `Olá, ${user.name}`}</StyledH2>
        <StyledSpan>{user && user.course_module}</StyledSpan>
      </StyledDivUser>
      <StyledDivHeaderTechs>
        <StyledH3>Tecnologias</StyledH3>
        <StyledButtonAddTech onClick={() => setModal(true)}>
          +
        </StyledButtonAddTech>
      </StyledDivHeaderTechs>
      <StyledUl>
        {techUser.length != 0 ? (
          techUser.map((tech, index) => (
            <Technologies tech={tech} key={index} />
          ))
        ) : (
          <StyledH5>Adicione novas Tecnologias!</StyledH5>
        )}
      </StyledUl>
      {modal && <ModalAddTech />}
      {modalEdit && <ModalEditTech techSelected={techSelected} />}
    </>
  );
};
