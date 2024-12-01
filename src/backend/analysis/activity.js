import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

export const fetchUserLoginData = async (username) => {
  try {
    // Query 'userLogins' collection for the specific username
    const loginCollection = collection(db, "userLogins");
    const loginQuery = query(loginCollection, where("username", "==", username));
    const loginSnapshot = await getDocs(loginQuery);

    if (loginSnapshot.empty) {
      return { success: true, data: [] }; // No logins found
    }

    // Aggregate login counts per date
    const loginData = {};
    loginSnapshot.forEach((doc) => {
      const timestamp = doc.data().timestamp.toDate();
      const date = timestamp.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      loginData[date] = (loginData[date] || 0) + 1; // Increment count for the date
    });

    // Transform into an array suitable for charting
    const chartData = Object.keys(loginData).map((date) => ({
      label: date,
      value: loginData[date],
    }));

    return { success: true, data: chartData };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
