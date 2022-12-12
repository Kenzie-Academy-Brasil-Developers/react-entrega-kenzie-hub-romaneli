import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/UserContext";
import { Api } from "../../services/api";
import { StyledButtonPrimary } from "../../styles/buttons";
import { StyledForm } from "../../styles/form";
import { StyledH4 } from "../../styles/typography";
import { StyledModalContainer } from "./ModalAddTech";

export const ModalAddTech = ({ setModal }) => {
  const { register, handleSubmit } = useForm();
  const { loading, setLoading } = useContext(UserContext);

  const onSubmitForm = async (data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("@TOKEN");
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await Api.post("users/techs", data);
      toast.success("Nova tecnologia adicionada!");
      setModal(false);
    } catch (error) {
      toast.error("Tecnologia não adicionada, tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledModalContainer>
      <div>
        <div>
          <StyledH4>Cadastrar Tecnologia</StyledH4>
          <button onClick={() => setModal(false)}>X</button>
        </div>
        <StyledForm onSubmit={handleSubmit(onSubmitForm)}>
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
