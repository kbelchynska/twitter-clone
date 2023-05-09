import { useState } from "react";
import useUserInfo from "../hooks/useUserInfo"
import axios from "axios";

export default function PostForm () {
    const {userInfo,status} = useUserInfo();
    const [text, setText] = useState('');

    async function handlePostSubmit(e) {
        e.preventDefault();
        await axios.post('/api/posts', {text});

    }

    if (status === 'loading') {
        return '';
    }
    return (
      <form className="mx-5" onSubmit={handlePostSubmit}>
        <div className="flex">
          <div className="">
            <div className="rounded-full overflow-hidden w-12">
              <img src={userInfo?.image} alt="avatar" />
            </div>
            
          </div>
          <div className="grow pl-2">
            <textarea 
              className="w-full p-2 bg-transparent text-twiierWhite"
              placeholder={'What\'s happening?'}
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <div className="text-right border-t border-twitterBorder pt-2">
              <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">Tweet</button>
            </div>
          </div>
        </div>
      </form>
    )
}