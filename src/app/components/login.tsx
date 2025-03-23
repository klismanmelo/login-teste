import Button from "@/app/components/buttonLogin";
import { auth } from "@/app/lib/auth";
import { manageAuth } from "@/app/action/manage-auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {session && <Button>Login</Button>}
      <form action={manageAuth}>
        <Button>{session ? "Logout" : "Login"}</Button>
      </form>
    </div>
  );
}
