import { StyledH4, StyledSpan } from "../../styles/typography";
import techDeleteImg from "../../assets/delete.png";
import { StyledLi } from "./technologies";
import { Api } from "../../services/api";
import { toast } from "react-toastify";

export const Technologies = ({ tech, index }) => {
  const deleteTechs = async (id) => {
    try {
      const token = localStorage.getItem("@TOKEN");
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await Api.delete(`users/techs/${id}`);
      toast.success("Tecnologia removida!");
    } catch (error) {
      toast.error("Ops! Algo deu errado");
    }
  };

  return (
    <StyledLi key={index}>
      <StyledH4>{tech.title}</StyledH4>
      <div>
        <StyledSpan>{tech.status}</StyledSpan>
        <button onClick={() => deleteTechs(tech.id)}>
          <img src={techDeleteImg} alt="botao de deletar tecnologia" />
        </button>
      </div>
    </StyledLi>
  );
};
