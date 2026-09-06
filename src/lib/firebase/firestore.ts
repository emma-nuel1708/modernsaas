import { db } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  Timestamp,
  FieldValue,
} from "firebase/firestore";

export interface Monitor {
  id: string;
  name: string;
  url: string;
  userId: string;
  status: "up" | "down" | "pending";
  lastChecked: Timestamp | null;
  createdAt: Timestamp | FieldValue;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  plan: "free" | "pro";
  monitorLimit: number;
  createdAt: Timestamp | FieldValue;
  stripeCustomerId?: string;
}

const MONITORS_COLLECTION = "monitors";
const USERS_COLLECTION = "users";

// ---- Monitors ----

export const createMonitor = async (name: string, url: string, userId: string) => {
  const docRef = await addDoc(collection(db, MONITORS_COLLECTION), {
    name,
    url,
    userId,
    status: "pending",
    lastChecked: null,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getMonitorsForUser = async (userId: string): Promise<Monitor[]> => {
  const q = query(collection(db, MONITORS_COLLECTION), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const monitors: Monitor[] = [];
  querySnapshot.forEach((docSnap) => {
    monitors.push({ id: docSnap.id, ...docSnap.data() } as Monitor);
  });
  return monitors;
};

export const deleteMonitor = async (monitorId: string) => {
  await deleteDoc(doc(db, MONITORS_COLLECTION, monitorId));
};

// ---- User profiles (plan / usage) ----

export const createUserProfileIfMissing = async (
  uid: string,
  email: string,
  displayName: string
) => {
  const ref = doc(db, USERS_COLLECTION, uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid,
      email,
      displayName: displayName || "",
      plan: "free",
      monitorLimit: 1,
      createdAt: serverTimestamp(),
    });
  }
  return ref;
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const ref = doc(db, USERS_COLLECTION, uid);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as UserProfile) : null;
};

export const getUserByStripeCustomerId = async (
  customerId: string
): Promise<UserProfile | null> => {
  const q = query(collection(db, USERS_COLLECTION), where("stripeCustomerId", "==", customerId));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as UserProfile;
};

export const upgradeUserToPro = async (uid: string, stripeCustomerId?: string) => {
  const ref = doc(db, USERS_COLLECTION, uid);
  await updateDoc(ref, {
    plan: "pro",
    monitorLimit: 20,
    ...(stripeCustomerId ? { stripeCustomerId } : {}),
  });
};

export const downgradeUserToFree = async (uid: string) => {
  const ref = doc(db, USERS_COLLECTION, uid);
  await updateDoc(ref, { plan: "free", monitorLimit: 1 });
};

// Add these imports to the existing import line from firebase/firestore:
// deleteUser is NOT from firestore — it's from firebase/auth, imported separately in files that need it.

export interface TeamInvite {
  id: string;
  ownerId: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "pending";
  createdAt: Timestamp | FieldValue;
}

const TEAM_INVITES_COLLECTION = "teamInvites";

export const createTeamInvite = async (
  ownerId: string,
  email: string,
  role: TeamInvite["role"]
) => {
  const docRef = await addDoc(collection(db, TEAM_INVITES_COLLECTION), {
    ownerId,
    email,
    role,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getTeamInvitesForOwner = async (ownerId: string): Promise<TeamInvite[]> => {
  const q = query(collection(db, TEAM_INVITES_COLLECTION), where("ownerId", "==", ownerId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamInvite));
};

export const deleteTeamInvite = async (inviteId: string) => {
  await deleteDoc(doc(db, TEAM_INVITES_COLLECTION, inviteId));
};

export const updateUserDisplayName = async (uid: string, displayName: string) => {
  const ref = doc(db, USERS_COLLECTION, uid);
  await updateDoc(ref, { displayName });
};

export const deleteUserProfile = async (uid: string) => {
  await deleteDoc(doc(db, USERS_COLLECTION, uid));
};