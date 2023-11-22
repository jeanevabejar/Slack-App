
import { createContext, useContext, useState } from "react";
import { toastError } from "@/Utils";

const SelectedUsersContext = createContext();

const SelectedUsersProvider = ({ children }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const updateSelectedUsers = (newSelectedUsers) => {
    setSelectedUsers(newSelectedUsers);
  };

  const contextValue = {
    selectedUsers,
    updateSelectedUsers,
  };

  return (
    <SelectedUsersContext.Provider value={contextValue}>
      {children}
    </SelectedUsersContext.Provider>
  );
};

const useSelectedUsers = () => {
  try {
    const context = useContext(SelectedUsersContext);
    if (!context) {
      throw new Error("Context not available");
    }
    return [context.selectedUsers, context.updateSelectedUsers];
  } catch (error) {
    toastError("Error accessing context: " + error.message);
    return [[], () => {}]; 
  }
};

export { SelectedUsersProvider, useSelectedUsers };
