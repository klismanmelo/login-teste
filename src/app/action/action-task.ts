"use server";

import { db } from "../lib/firebase";
import { auth } from "@/app/lib/auth";

export async function completeTask(taskId: string) {
    const session = await auth();
    if (!session?.user?.id) return;
  
    try {
      const taskRef = db
        .collection("users")
        .doc(session.user.id)
        .collection("tasks")
        .doc(taskId);
  
      const taskSnapshot = await taskRef.get();
      const taskData = taskSnapshot.data();
  
      if (taskData) {
        const currentStatus = taskData.taskCompleted;
  
        await taskRef.update({ taskCompleted: !currentStatus });
      }
    } catch (error) {
      console.error("Erro ao completar tarefa:", error);
    }
  }

export async function deleteTask(taskId: string) {
    const session = await auth();
    if (!session?.user?.id) return;

    try {
        await db
            .collection("users")
            .doc(session.user.id)
            .collection("tasks")
            .doc(taskId)
            .delete();
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
    }
}