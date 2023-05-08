import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function () {
  const {data:session, status:sessionStatus} = useSession;
  const [userInfo, setUserInfo] = useState();
  const [status, setStatus] = useState('loading');

  function getUserInfo() {
    if (sessionStatus === 'loading') {
      return;
    }
    fetch('/api/users?id='+session.user.id)
      .then(response => {
        response.json().then(json => {
          setUserInfo(json.user);
          setStatus('authenticated');
        })
      })
  }

  useEffect(() => {
    getUserInfo();
  }, [sessionStatus]);


  return {userInfo, status}
}