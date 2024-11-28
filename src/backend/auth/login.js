import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../Firebase";

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Query Firestore to fetch username based on email in the 'users' collection
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("email", "==", email));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      throw new Error("User not found in the 'users' collection.");
    }

    const userDoc = userSnapshot.docs[0];
    const username = userDoc.data().username;

    // Check if the username exists in the 'personal' collection
    const personalCollection = collection(db, "personal");
    const personalQuery = query(personalCollection, where("username", "==", username));
    const personalSnapshot = await getDocs(personalQuery);

    const isInPersonal = !personalSnapshot.empty;

    return { success: true, user, username, isInPersonal };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
