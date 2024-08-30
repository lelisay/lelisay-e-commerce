"use client";

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

const ClientMemberPage = () => {
  const {data:session} = useSession({
    required:true,
    onUnauthenticated(){
      redirect("/api/auth/signin?callbackUrl=/ClientMember  ")
    }
  });

  return (
    <div>
      <h1>ClientMember Server Session</h1>
      <p>
        {session?.user?.email}
      </p>
      <p>
        {session?.user?.role}
      </p>
    </div>
  )
}
export default ClientMemberPage
