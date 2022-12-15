import { StyledH4, StyledSpan } from "../../styles/typography";
import techDeleteImg from "../../assets/delete.png";
import techEditImg from "../../assets/editfilebutton.svg";
import { StyledLi } from "./technologies";
import { TechContext } from "../../contexts/TechContext";
import { useContext } from "react";

export const Technologies = ({ tech, index }) => {
  const { deleteTechs, selectedTech } = useContext(TechContext);

  return (
    <StyledLi key={index}>
      <StyledH4>{tech.title}</StyledH4>
      <div>
        <StyledSpan>{tech.status}</StyledSpan>
        <button onClick={() => selectedTech(tech)}>
          <img src={techEditImg} alt="botao de editar tecnologia" />
        </button>
        <button onClick={() => deleteTechs(tech.id)}>
          <img src={techDeleteImg} alt="botao de deletar tecnologia" />
        </button>
      </div>
    </StyledLi>
  );
};
