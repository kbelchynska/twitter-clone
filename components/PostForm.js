import { useState } from "react";
import useUserInfo from "../hooks/useUserInfo"
import axios from "axios";
import Avatar from "./Avatar";

export default function PostForm ({onPost}) {
    const {userInfo,status} = useUserInfo();
    const [text, setText] = useState('');

    async function handlePostSubmit(e) {
        e.preventDefault();
        await axios.post('/api/posts', {text});
        setText('');
        if(onPost) {
            onPost();
        }
    }

    if (status === 'loading') {
        return '';
    }
    return (
      <form className="mx-5" onSubmit={handlePostSubmit}>
        <div className="flex">
          <div className="">
            <Avatar src={userInfo?.image} />
            
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