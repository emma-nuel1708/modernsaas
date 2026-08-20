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

export interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: any;
}

const PROJECTS_COLLECTION = "projects";

export const createProject = async (name: string, description: string, userId: string) => {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      name,
      description,
      userId,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding project: ", error);
    throw error;
  }
};

export const getProjectsForUser = async (userId: string): Promise<Project[]> => {
  try {
    const q = query(collection(db, PROJECTS_COLLECTION), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() } as Project);
    });
    return projects;
  } catch (error) {
    console.error("Error getting projects: ", error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
  } catch (error) {
    console.error("Error deleting project: ", error);
    throw error;
  }
};
