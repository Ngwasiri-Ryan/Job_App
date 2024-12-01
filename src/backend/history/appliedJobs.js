import { addDoc, collection  , query,where, getDocs, Timestamp} from "firebase/firestore";
import { db } from "../Firebase";
/**
 * Saves a job to the Firestore collection `savedJobs`.
 * 
 * @param {Object} jobData - The data of the job to save.
 * @param {string} username - The username of the logged-in user.
 */
export const saveAppliedJob = async (jobData, username) => {
  try {
    // Reference to the `savedJobs` collection
    const appliedJobsCollection = collection(db, "appliedJobs");

    
    await addDoc(appliedJobsCollection, {
      ...jobData, // Spread all job properties
      username,   // Add the username
      appliedAt: new Date().toISOString(), 
    });

     // keeping track of user events
     const EventCollection = collection(db, "userEvents");
     await addDoc(EventCollection, {
       username,
       event:'applied for job',
       timestamp: Timestamp.now(),
     });

    console.log("Job apply successfully.");
  } catch (error) {
    console.error("Error saving job:", error.message);
  }
};

//get number of applied jobs
export const getNumberOfAppliedJobs = async (username) => {
    try {
      // Reference to the `appliedJobs` collection
      const appliedJobsCollection = collection(db, "appliedJobs");
  
      // Create a query to get the jobs where the username matches
      const appliedJobsQuery = query(appliedJobsCollection, where("username", "==", username));
  
      // Execute the query
      const querySnapshot = await getDocs(appliedJobsQuery);
  
      // Return the count of applied jobs
      return querySnapshot.size; // The size of the snapshot represents the number of documents
    } catch (error) {
      console.error("Error fetching applied jobs:", error.message);
      return 0; // Return 0 if there's an error
    }
  };