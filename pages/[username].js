import TopNavLink from "../components/TopNavLink";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

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
                </div>
            )}
        </Layout>
    )
}