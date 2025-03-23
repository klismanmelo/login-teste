import { auth } from "@/app/lib/auth";
import { getProfileData, getTasksData } from "@/app/server/get-profile-data";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import InfoUser from "../components/infoUser";
import ListTasks from "../components/listTasks";


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
      
      <InfoUser profileData={profileData} />

      <ListTasks tasks={tasks} />

    </div>
  );
}
