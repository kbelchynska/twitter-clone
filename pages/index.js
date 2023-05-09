import useUserInfo from "@/hooks/useUserInfo";
import UsernameForm from "../components/UsernameForm";
import PostForm from "../components/PostForm";
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
    <div className="max-w-lg mx-auto border-l border-r border-twitterBorder">
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm />
    </div>
  )
}
