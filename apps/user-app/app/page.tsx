import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

import { AppBar } from "@pay/ui/blocks"
import LogoutBtn from "./components/LogoutBtn";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  if (!session?.user) {
    redirect("/api/auth/signin");
    return null;
  }

  return (
    <>
      <AppBar LogoutBtn={LogoutBtn}/>
      hello
    </>
  );
}