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
    <div>
      <h1>Tasks</h1>
      {tasks.map((task) => (
        <div key={task.id}>{task.taskDescription}</div>
      ))}
    </div>
  );
}
