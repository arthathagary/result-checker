// Import Axios and Result type if not already imported
import axios from "axios";

// Function to delete a result by ID
export const deleteData = async (resultId: string): Promise<void> => {
  try {
    const response = await axios.delete(`/api/results/${resultId}`);
    console.log("Result deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting result:", error);
    throw error; // Propagate the error if needed
  }
};
