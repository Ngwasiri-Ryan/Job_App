import { addDoc, collection } from "firebase/firestore";
import { db } from "../../backend/Firebase"; 

/**
 * Saves a job to the Firestore collection `savedJobs`.
 * 
 * @param {Object} jobData - The data of the job to save.
 * @param {string} username - The username of the logged-in user.
 */
export const saveJob = async (jobData, username) => {
  try {
    // Reference to the `savedJobs` collection
    const savedJobsCollection = collection(db, "savedJobs");

    
    await addDoc(savedJobsCollection, {
      ...jobData, // Spread all job properties
      username,   // Add the username
      savedAt: new Date().toISOString(), 
    });

    console.log("Job saved successfully.");
  } catch (error) {
    console.error("Error saving job:", error.message);
  }
};