export default function InfoUser({ tasks }: { tasks: any }) {
    if (!tasks) return null;

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
                <span className={task.taskCompleted ? "line-through text-gray-400" : ""}>
                  {task.taskDescription}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    task.taskCompleted ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  {task.taskCompleted ? "Concluída" : "Pendente"}
                </span>
              </li>
            ))
          ) : (
            <p className="text-gray-400">Nenhuma tarefa cadastrada.</p>
          )}
        </ul>
      </div>
    );
}
