import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';

export const updateUserDetails = async (section, updatedData) => {
  const userRef = doc(db, 'users', updatedData.username); // Update logic based on username
  await updateDoc(userRef, {
    [section]: updatedData,
  });
};
