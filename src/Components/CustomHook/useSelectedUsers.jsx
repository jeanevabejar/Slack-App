import { createContext, useContext, useState } from "react";
import { toastError } from "@/Utils";

// Create a context to manage the selected users
const SelectedUsersContext = createContext();

// Provider component to manage the state and provide it to its children
const SelectedUsersProvider = ({ children }) => {
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
    <SelectedUsersContext.Provider value={contextValue}>
      {children}
    </SelectedUsersContext.Provider>
  );
};

// Custom hook to access the selectedUsers context
const useSelectedUsers = () => {
  try {
    // Use the useContext hook to access the SelectedUsersContext
    const context = useContext(SelectedUsersContext);

    // Throw an error if the context is not available
    if (!context) {
      throw new Error("Context not available");
    }

    // Return an array containing selectedUsers state and updateSelectedUsers function
    return [context.selectedUsers, context.updateSelectedUsers];
  } catch (error) {
    // Catch any errors that may occur and display a toast message
    toastError("Error accessing context: " + error.message);

    // Return default values in case of an error
    return [[], () => {}];
  }
};

// Export the provider and custom hook for external use
export { SelectedUsersProvider, useSelectedUsers };
