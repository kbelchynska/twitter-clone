import PostContent from "../components/PostConetnt";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostPage() {
    const router = useRouter();
    const {id} = router.query;
    const [post, setPost] = useState();

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/posts?id='+id)
            .then(response => {
                setPost(response.data.post);
            });
    }, [id])
    return (
        <div>
            {!!post?._id && (
                <PostContent {...post} />
            )}
        </div>
    )
}