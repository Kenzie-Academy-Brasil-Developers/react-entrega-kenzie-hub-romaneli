import { LoginForm } from "../../components/LoginForm";
import logo from "../../assets/Logo.svg";
import { StyledLoginPage } from "./login";

export const Login = () => {
  return (
    <>
      <StyledLoginPage>
        <img src={logo} alt="logo" />
      </StyledLoginPage>
      <LoginForm />
    </>
  );
};
