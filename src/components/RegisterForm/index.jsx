import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/api";
import { toast } from "react-toastify";
import { StyledDivRegister } from "./registerPage";
import { StyledForm } from "../../styles/form";
import { StyledError, StyledH2, StyledHeadline } from "../../styles/typography";
import { StyledButtonPrimary } from "../../styles/buttons";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Seu nome deve ter no mínimo 3 caracteres")
      .required("Nome obrigatório"),
    email: yup
      .string()
      .required("Email orbigatória")
      .email("Digite um email válido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(8, "Sua senha deve ter no mínimo 8 digitos")
      .matches(/(?=.*[A-Za-z])/, "Sua senha deve conter ao menos uma letra")
      .matches(/(?=.*[0-9])/, "Sua senha deve conter ao menos um número")
      .matches(
        /(?=.*[$*&@#])/,
        "Sua senha deve conter ao menos um caractere especial"
      ),
    passwordConfirm: yup
      .string()
      .required("Confirmar senha obrigatório")
      .oneOf([yup.ref("password")], "Senhas não conferem"),
    bio: yup.string().required("Este campo é obrigatorio"),
    contact: yup.string().required("Este campo é obrigatório"),
    course_module: yup.string().required("Este campo é obrigatório"),
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
    try {
      await Api.post("users", data);
      toast.success("Conta criada com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Ops! Algo deu errado");
    }
    reset();
  };

  return (
    <StyledDivRegister>
      <StyledH2>Crie sua conta</StyledH2>
      <StyledHeadline>Rápido e grátis, vamos nessa!</StyledHeadline>
      <StyledForm onSubmit={handleSubmit(onSubmitForm)}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          placeholder="Digite aqui seu nome"
          {...register("name")}
        />
        {errors.name && <StyledError>{errors.name.message}</StyledError>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Digite aqui seu email"
          {...register("email")}
        />
        {errors.email && <StyledError>{errors.email.message}</StyledError>}
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          placeholder="Dgite aqui sua senha"
          {...register("password")}
        />
        {errors.password && (
          <StyledError>{errors.password.message}</StyledError>
        )}
        <label htmlFor="passwordConfirm">Confirmar Senha</label>
        <input
          type="password"
          placeholder="Digite novamente sua senha"
          {...register("passwordConfirm")}
        />
        {errors.passwordConfirm && (
          <StyledError>{errors.passwordConfirm.message}</StyledError>
        )}
        <label htmlFor="bio">Bio</label>
        <input type="text" placeholder="Fale sobre você" {...register("bio")} />
        {errors.bio && <StyledError>{errors.bio.message}</StyledError>}
        <label htmlFor="contact">Contato</label>
        <input
          type="text"
          placeholder="Opção de contato"
          {...register("contact")}
        />
        {errors.contact && <StyledError>{errors.contact.message}</StyledError>}
        <label htmlFor="course_module">Selecionar Módulo</label>
        <select id="course_module" {...register("course_module")}>
          <option>Primeiro Modulo</option>
          <option>Segundo Modulo</option>
          <option>Terceiro Modulo</option>
          <option>Quarto Modulo</option>
          <option>Quinto Modulo</option>
          <option>Sexto Modulo</option>
        </select>
        {errors.course_module && (
          <StyledError>{errors.course_module.message}</StyledError>
        )}
        <StyledButtonPrimary type="submit">Cadastrar</StyledButtonPrimary>
      </StyledForm>
    </StyledDivRegister>
  );
};
