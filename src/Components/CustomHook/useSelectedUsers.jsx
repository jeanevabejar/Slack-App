import { createContext, useContext, useState } from "react";
import { toastError } from "@/Utils";

// Create a context to manage the selected users
const UsersContext = createContext();

// Provider component to manage the state and provide it to its children
const UsersProvider = ({ children }) => {
  // State variable to store the selected users
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Function to update the selected users
  const updateSelectedUsers = (newSelectedUsers) => {
    setSelectedUsers(newSelectedUsers);
  };

  // Context value object containing the selectedUsers state and updateSelectedUsers function
  const contextValue = {
    selectedUsers,
    updateSelectedUsers,
  };

  // Provide the context value to the children components
  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};

// Custom hook to access the selectedUsers context
const useSelectedUsers = () => {
  try {
    const context = useContext(UsersContext);
    if (!context) {
      throw new Error("Context not available");
    }
    // Return an object with the selected users and the function to update them
    return [context.selectedUsers, context.updateSelectedUsers];;
  } catch (error) {
    toastError("Error accessing context: " + error.message);
    // Return default values in case of an error
    return { selectedUsers: [], updateSelectedUsers: () => {} }; 
  }
};

// Export the provider and custom hook for external use
export { UsersProvider, useSelectedUsers };
