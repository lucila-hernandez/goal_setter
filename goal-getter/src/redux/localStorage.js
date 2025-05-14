export const saveState = (state) => {
    try {
      localStorage.setItem("goalState", JSON.stringify(state));
    } catch (error) {
      console.error("Error saving state to LocalStorage:", error);
    }
  };
  
  export const loadState = () => {
    try {
      const savedState = localStorage.getItem("goalState");
      return savedState ? JSON.parse(savedState) : undefined;
    } catch (error) {
      console.error("Error loading state from LocalStorage:", error);
      return undefined;
    }
  };
  