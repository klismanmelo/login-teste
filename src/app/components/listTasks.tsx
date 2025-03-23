"use client";

import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { completeTask } from "../action/action-task";
import { deleteTask } from "../action/action-task";
import { useRouter } from "next/navigation";


export default function InfoUser({ tasks }: { tasks: any }) {
    if (!tasks) return null;

    const router = useRouter();

    return (
      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Suas Tarefas</h2>
        <ul className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task: any) => (
              <li
                key={task.id}
                className="bg-gray-800 p-4 rounded-md shadow-md flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <button onClick={() => {
                    completeTask(task.id);
                    router.refresh();
                  }}>
                    <CheckCircleIcon className="w-4 h-4" />
                  </button>
                  <span className={task.taskCompleted ? "line-through text-gray-400" : ""}>
                    {task.taskDescription}
                  </span>
                </div>
    
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-4 py-1 text-xs rounded ${
                      task.taskCompleted ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {task.taskCompleted ? "Concluída" : "Pendente"}
                  </span>
                  <button onClick={() => {
                    deleteTask(task.id);
                    router.refresh();
                  }}>  
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-400">Nenhuma tarefa cadastrada.</p>
          )}
        </ul>
      </div>
    );
    
}
