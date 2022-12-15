import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../services/api";
import { UserContext } from "./UserContext";

export const TechContext = createContext({});

export const TechProviders = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [techSelected, setTechSelected] = useState([]);
  const { setLoading } = useContext(UserContext);

  const selectedTech = (tech) => {
    setModalEdit(true);
    setTechSelected(tech);
  };

  const createNewTechs = async (data) => {
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

  const editTechs = async (id, data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("@TOKEN");
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await Api.put(`users/techs/${id}`, data);
      toast.success("Tecnologia Atualizada!");
    } catch (error) {
      toast.error("Algo deu errado, tente novamente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TechContext.Provider
      value={{
        createNewTechs,
        deleteTechs,
        modal,
        setModal,
        modalEdit,
        setModalEdit,
        editTechs,
        techSelected,
        setTechSelected,
        selectedTech,
      }}
    >
      {children}
    </TechContext.Provider>
  );
};
