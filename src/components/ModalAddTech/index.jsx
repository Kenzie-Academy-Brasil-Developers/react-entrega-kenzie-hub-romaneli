import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TechContext } from "../../contexts/TechContext";
import { UserContext } from "../../contexts/UserContext";
import { StyledButtonPrimary } from "../../styles/buttons";
import { StyledForm } from "../../styles/form";
import { StyledH4 } from "../../styles/typography";
import { StyledModalContainer } from "./ModalAddTech";

export const ModalAddTech = () => {
  const { createNewTechs, setModal } = useContext(TechContext);
  const { register, handleSubmit } = useForm();
  const { loading } = useContext(UserContext);

  return (
    <StyledModalContainer>
      <div>
        <div>
          <StyledH4>Cadastrar Tecnologia</StyledH4>
          <button onClick={() => setModal(false)}>X</button>
        </div>
        <StyledForm onSubmit={handleSubmit(createNewTechs)}>
          <label htmlFor="title-tech">Nome</label>
          <input
            type="text"
            id="title-tech"
            {...register("title")}
            placeholder="Digite o nome da Tecnologia..."
          />
          <label htmlFor="nivel-tech">Selecionar status</label>
          <select name="" id="nivel-tech" {...register("status")}>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediario">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <StyledButtonPrimary type="submit">
            {loading ? "Enviando..." : "Cadastrar Tecnologia"}
          </StyledButtonPrimary>
        </StyledForm>
      </div>
    </StyledModalContainer>
  );
};
