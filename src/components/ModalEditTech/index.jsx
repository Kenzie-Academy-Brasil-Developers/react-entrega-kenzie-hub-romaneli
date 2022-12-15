import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TechContext } from "../../contexts/TechContext";
import { UserContext } from "../../contexts/UserContext";
import { StyledButtonPrimary } from "../../styles/buttons";
import { StyledForm } from "../../styles/form";
import { StyledH4 } from "../../styles/typography";
import { StyledModalContainer } from "./ModalEditTech";

export const ModalEditTech = ({ techSelected }) => {
  const { setModalEdit, editTechs } = useContext(TechContext);
  const { loading } = useContext(UserContext);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: techSelected.title,
      status: techSelected.status,
    },
  });

  const onSubmitForm = async (data) => {
    editTechs(techSelected.id, data);
    delete data.title;
    reset();
    setModalEdit(false);
  };

  return (
    <StyledModalContainer>
      <div>
        <div>
          <StyledH4>Tecnologia Detalhes</StyledH4>
          <button onClick={() => setModalEdit(false)}>X</button>
        </div>
        <StyledForm onSubmit={handleSubmit(onSubmitForm)}>
          <label htmlFor="title-tech">Nome do projeto</label>
          <input
            type="text"
            id="title-tech"
            disabled
            {...register("title")}
            placeholder="Digite o nome da Tecnologia..."
          />
          <label htmlFor="nivel-tech">Status</label>
          <select name="" id="nivel-tech" {...register("status")}>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediario">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <div className="div-buttons">
            <StyledButtonPrimary type="submit">
              {loading ? "Salvando..." : "Salvar alterações"}
            </StyledButtonPrimary>
          </div>
        </StyledForm>
      </div>
    </StyledModalContainer>
  );
};
