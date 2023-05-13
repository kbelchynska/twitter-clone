import ReactTimeAgo from "react-time-ago";
import Avatar from "./Avatar";
import Link from "next/link";

export default function PostContent({text, author, createdAt}) {

    return(
        <div className="flex">
            <div>
                {!!author?.image && (
                    <Avatar src={author.image} />
                )}
            </div>
            <div className="pl-2 ">
                <div>
                    <span className="font-bold">{author.name}</span>
                    <span className="pl-1 text-twitterLightGray">@{author.username}</span>
                    <span className="pl-1 text-twitterLightGray">
                        {createdAt && (
                            <ReactTimeAgo date={createdAt} timeStyle={'twitter'} />
                        )}
                    </span>
                </div>
                <Link href={`/${author.username}/status/${_id}`}>
                    {text}
                </Link>
            </div>
        </div>
    )
}