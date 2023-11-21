// SelectedOptionsContext.js
import { createContext, useContext, useState } from "react";
import { toastError } from "@/Utils";

const SelectedOptionsContext = createContext();

const SelectedOptionsProvider = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const updateSelectedOptions = (newSelectedOptions) => {
    setSelectedOptions(newSelectedOptions);
  };

  const contextValue = {
    selectedOptions,
    updateSelectedOptions,
  };

  return (
    <SelectedOptionsContext.Provider value={contextValue}>
      {children}
    </SelectedOptionsContext.Provider>
  );
};

const useSelectedOptions = () => {
  try {
    const context = useContext(SelectedOptionsContext);
    if (!context) {
      throw new Error("Context not available");
    }
    return [context.selectedOptions, context.updateSelectedOptions];
  } catch (error) {
    toastError("Error accessing context: " + error.message);
    return [[], () => {}]; // Provide a fallback value or function
  }
};

export { SelectedOptionsProvider, useSelectedOptions };
