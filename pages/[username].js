import TopNavLink from "../components/TopNavLink";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Cover from "../components/Cover";
import Avatar from "../components/Avatar";

export default function UserPage() {
    const router = useRouter();
    const {username} = router.query;
    const [profileInfo, setProfileInfo] = useState();

    useEffect(() => {
        if (!username) {
            return;
        }
        axios.get('/api/users?username='+username)
            .then(response => {
                setProfileInfo(response.data.user);
            })
    }, [username]);

    return (
        <Layout>
            {!!profileInfo && (
                <div>
                    <div className="px-5 pt-2">
                        <TopNavLink title={profileInfo.name} />
                    </div>
                    <Cover />
                    <div className="flex justify-between">
                        <div className="ml-5 relative -top-14 border-2 rounded-full border-black">
                            <Avatar big src={profileInfo.image} />
                        </div>
                        <div className="p-2">
                            <button className="bg-twitterBlue text-white py-2 px-5 rounded-full">Follow</button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}