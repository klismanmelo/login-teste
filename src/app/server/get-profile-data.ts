"use server";

import { db } from "../lib/firebase";

export type ProfileData = {
    userId: string;
    name: string;
    email: string;
    createdAt: number;
};

export type TaskData = {
    id: string;
    userId: string;
    taskDescription: string;
    taskCompleted: boolean;
    createdAt: string;
};

export async function getProfileData(profileid: string) {
  const snapshot = await db.collection("users").doc(profileid).get();

  return snapshot.data() as ProfileData;
}

export async function getTasksData(profileid: string) {
  const snapshot = await db
    .collection("users")
    .doc(profileid)
    .collection("tasks")
    .get();

  return snapshot.docs.map((doc) => doc.data() as TaskData);
}