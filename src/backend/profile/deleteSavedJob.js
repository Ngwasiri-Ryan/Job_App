import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../backend/Firebase";

/**
 * Deletes a job from the Firestore collection `savedJobs` for a given job ID and username.
 * 
 * @param {string} jobId - The ID of the job to delete.
 * @param {string} username - The username of the logged-in user.
 */
export const deleteSavedJob = async (jobId, username) => {
  try {
    // Reference to the specific job document to delete
    const jobDocRef = doc(db, "savedJobs", jobId);

    // Delete the job document
    await deleteDoc(jobDocRef);

    console.log("Job deleted successfully.");
  } catch (error) {
    console.error("Error deleting job:", error.message);
  }
};
