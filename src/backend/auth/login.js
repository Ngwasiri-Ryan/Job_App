import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../Firebase"; 

// Function to handle login and fetch username
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Query Firestore to fetch username based on email
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Assuming there's only one document for the email
      const userDoc = querySnapshot.docs[0];
      const username = userDoc.data().username;

      return { success: true, user, username };
    } else {
      throw new Error("User data not found in Firestore.");
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};
