import { auth } from "@/app/lib/auth";
import { getProfileData, getTasksData } from "@/app/server/get-profile-data";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
export default async function TaskPage({
  params,
}: {
  params: { profileid: string };
}) {
  
  const session = await auth();
  console.log("Sessão do usuário:", session); 

  if (!session) {
    redirect("/login"); 
  }

  const userId = session.user?.id;
  console.log("ID do usuário autenticado:", userId);

  if (!userId) {
    redirect("/login"); 
  }

  const profileData = await getProfileData(userId);
  console.log("Dados do perfil:", profileData);
  
  if (!profileData) return notFound();

  const tasks = await getTasksData(userId);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      {/* Informações do Usuário */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <img
          src={profileData.image || "/default-avatar.png"}
          alt="User Avatar"
          className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gray-600"
        />
        <h1 className="text-2xl font-semibold">{profileData.name}</h1>
        <p className="text-gray-400">{profileData.email}</p>
      </div>

      {/* Lista de Tasks */}
      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Suas Tarefas</h2>
        <ul className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => (
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
    </div>
  );
}
