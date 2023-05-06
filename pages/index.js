import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function Home() {
  const {data:session, status} = useSession();

  const [userInfo, setUserInfo] = useState();
  const [userInfoStatus, setUserInfoStatus] = useState('false');

  function getUserInfo() {
    if (status === 'loading') {
      return;
    }
    fetch('/api/users?id='+session.user.id)
      .then(response => {
        response.json().then(json => {
          setUserInfo(json.user);
          setUserInfoStatus('done')
        })
      })
  }

  useEffect(() => {
    getUserInfo();
  }, [status]);

  if(userInfoStatus === 'loading') {
    return 'loading user info';
  }

  if(!userInfo?.username) {
    return 'no username';
  }

  return (
    <div>test</div>
  )
}
