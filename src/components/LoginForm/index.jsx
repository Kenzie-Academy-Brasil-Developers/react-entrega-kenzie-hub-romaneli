import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Api } from "../../services/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { StyledDivLogin } from "./loginPage";
import { StyledForm } from "../../styles/form";
import { StyledError, StyledH2, StyledSpan } from "../../styles/typography";
import {
  StyledButtonPrimary,
  StyledButtonSecondary,
} from "../../styles/buttons";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup.string().required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitForm = async (data) => {
    reset();
    try {
      setLoading(true);
      const response = await Api.post("sessions", data);
      toast.success("Login feito com sucesso");
      window.localStorage.setItem("@TOKEN", response.data.token);
      window.localStorage.setItem("@USERID", response.data.user.id);

      navigate("/dashboard");
    } catch (error) {
      toast.error("verifique login e senha e tente novamente");
    } finally {
      setLoading(false);
    }
  };

  const registerPage = () => {
    navigate("/register");
  };
  return (
    <StyledDivLogin>
      <StyledH2>Login</StyledH2>
      <StyledForm onSubmit={handleSubmit(onSubmitForm)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email")}
          placeholder="Digite aqui seu email"
        />
        {errors.email && <StyledError>{errors.email.message}</StyledError>}
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          {...register("password")}
          placeholder="Digite aqui sua senha"
        />
        {errors.password && (
          <StyledError>{errors.password.message}</StyledError>
        )}
        <StyledButtonPrimary type="submit">
          {loading ? "Entrando..." : "Entrar"}
        </StyledButtonPrimary>
      </StyledForm>
      <div>
        <StyledSpan>Ainda nao tem uma conta?</StyledSpan>
        <StyledButtonSecondary type="button" onClick={registerPage}>
          Cadastre-se
        </StyledButtonSecondary>
      </div>
    </StyledDivLogin>
  );
};
