import { createContext, useState } from "react";

export const StateContext = createContext();

export default function StateContextProvider(props) {
  const [selectedIdea, setSelectedIdea] = useState({ id: 0, title: "" });
  return (
    <StateContext.Provider
      value={{
        selectedIdea,
        setSelectedIdea,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
}
