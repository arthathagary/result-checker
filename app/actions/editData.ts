// Import Axios and Result type if not already imported
import axios from "axios";

// Function to edit a result by ID
export const editData = async (resultId: string): Promise<void> => {
  try {
    const response = await axios.put(`/api/results/${resultId}`);
  } catch (error) {
    console.error("Error deleting result:", error);
    throw error; // Propagate the error if needed
  }
};
