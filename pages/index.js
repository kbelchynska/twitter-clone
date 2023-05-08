import useUserInfo from "@/hooks/useUserInfo";
import UsernameForm from "../components/UsernameForm";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function Home() {
  const {userInfo, status:userInfoStatus} = useUserInfo();

  if(userInfoStatus === 'loading') {
    return 'loading user info';
  }

  if(!userInfo?.username) {
    return <UsernameForm />;
  }

  return (
    <div>Homepage logged in {userInfo.username}</div>
  )
}
