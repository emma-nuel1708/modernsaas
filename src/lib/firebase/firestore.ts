import { db } from "./config";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc, 
  query, 
  where,
  serverTimestamp
} from "firebase/firestore";

export interface Monitor {
  id: string;
  name: string;
  url: string;
  userId: string;
  status: "up" | "down" | "pending";
  lastChecked: any;
  createdAt: any;
}

const MONITORS_COLLECTION = "monitors";

export const createMonitor = async (name: string, url: string, userId: string) => {
  try {
    const docRef = await addDoc(collection(db, MONITORS_COLLECTION), {
      name,
      url,
      userId,
      status: "pending",
      lastChecked: null,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding monitor: ", error);
    throw error;
  }
};

export const getMonitorsForUser = async (userId: string): Promise<Monitor[]> => {
  try {
    const q = query(collection(db, MONITORS_COLLECTION), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const monitors: Monitor[] = [];
    querySnapshot.forEach((doc) => {
      monitors.push({ id: doc.id, ...doc.data() } as Monitor);
    });
    return monitors;
  } catch (error) {
    console.error("Error getting monitors: ", error);
    throw error;
  }
};

export const deleteMonitor = async (monitorId: string) => {
  try {
    await deleteDoc(doc(db, MONITORS_COLLECTION, monitorId));
  } catch (error) {
    console.error("Error deleting monitor: ", error);
    throw error;
  }
};
