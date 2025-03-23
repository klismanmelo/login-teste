"use server";

import { db } from "../lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { auth } from '@/app/lib/auth'

export async function createTask(taskDescription: string) {
    const session = await auth();
    if (!session?.user?.id || !taskDescription.trim()) return;
    
    const userId = session.user.id;
  
    const newTask = {
      id: uuidv4(),
      userId,
      taskDescription,
      taskCompleted: false,
      createdAt: new Date().toISOString(),
    };
    console.log("Nova tarefa:", newTask);
  
    try {
      await db
        .collection("users")
        .doc(userId)
        .collection("tasks")
        .doc(newTask.id)
        .set(newTask);
  
      return { success: true, message: "Tarefa criada com sucesso!" };
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
      return { success: false, message: "Erro ao criar a tarefa." };
    }
  }
