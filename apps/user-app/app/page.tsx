import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  if (!session?.user) {
    redirect("/auth/sign-up");
    return null;
  }

  return (
    <>
      hello
    </>
  );
}