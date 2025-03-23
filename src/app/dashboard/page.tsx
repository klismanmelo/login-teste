import { auth } from "@/app/lib/auth";
import { getProfileData, getTasksData } from "@/app/server/get-profile-data";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import InfoUser from "../components/infoUser";
import ListTasks from "../components/listTasks";
import InputCreateTasks from "../components/inputCreateTasks";

export default async function TaskPage({
  params,
}: {
  params: { profileid: string };
}) {
  
  const session = await auth();

  if (!session) {
    redirect("/login"); 
  }

  const userId = session.user?.id;

  if (!userId) {
    redirect("/login"); 
  }

  const profileData = await getProfileData(userId);
  
  if (!profileData) return notFound();

  const tasks = await getTasksData(userId);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      
      <InfoUser profileData={profileData} />
      <InputCreateTasks userId={userId} />

      <ListTasks tasks={tasks} />

    </div>
  );
}
