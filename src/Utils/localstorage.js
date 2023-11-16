

export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error setting local storage item:', error);
      }
}

export const getLocalStorage = (key) => {
    try {
    JSON.parse(localStorage.getItem(key)) || null;
    } catch{
        console.error('Error getting local storage item:', error);
        return null;
    }
}

export const removeLocalStorage = () => {
    try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing local storage item:', error);
      }
}