"use client";

import { useState, useTransition, useEffect } from "react";
import { createTask } from "../action/create-task";
import { useRouter } from "next/navigation";

export default function InputCreateTasks({ userId }: { userId: string }) {

  const [taskDescription, setTaskDescription] = useState("");
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  function handleCreateTask() {
    console.log("Criando tarefa...");
    console.log("ID do usuário:", userId);
    console.log("Descrição da tarefa:", taskDescription);

    // Aqui você pode adicionar a lógica para armazenar ou processar a tarefa
    // Exemplo: enviar para uma API ou atualizar o estado de uma lista de tarefas
    createTask(taskDescription).then(() => {
        setTaskDescription(""); // Limpa o campo após criação
        router.refresh(); // Dispara a atualização da lista de tarefas
      });
  }

  return (
    <div className="mt-6 w-full max-w-lg flex space-x-2">
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Digite sua nova tarefa..."
        className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleCreateTask}
        disabled={loading}
        className="px-4 py-3 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700 disabled:bg-gray-500"
      >
        {loading ? "Criando..." : "Adicionar"}
      </button>
    </div>
  );
}
