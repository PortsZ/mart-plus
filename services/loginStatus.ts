import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function loginStatus() {


  const session = await getServerSession(options);
  console.log(session)

  if (!session) {
    redirect("/api/auth/signin");
  }

  else return session;
}
