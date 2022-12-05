import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../../components/RegisterForm";
import logo from "../../assets/Logo.svg";
import { StyledButtonTertiary } from "../../styles/buttons";
import { StyledRegisterPage } from "./register";

export const Register = () => {
  const navigate = useNavigate();
  const backPage = () => {
    navigate(-1);
  };
  return (
    <>
      <StyledRegisterPage>
        <img src={logo} alt="logo" />
        <StyledButtonTertiary onClick={backPage}>Voltar</StyledButtonTertiary>
      </StyledRegisterPage>
      <RegisterForm />
    </>
  );
};
