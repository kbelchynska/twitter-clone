import TopNavLink from "../components/TopNavLink";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Cover from "../components/Cover";
import Avatar from "../components/Avatar";
import PostContent from "../components/PostConetnt";
import useUserInfo from "../hooks/useUserInfo";

export default function UserPage() {
  const router = useRouter();
  const { username } = router.query;
  const [profileInfo, setProfileInfo] = useState();
  const [originalUserInfo, setOriginalUserInfo] = useState();
  const [posts, setPosts] = useState([]);
  const [postsLikedByMe, setPostsLikedByMe] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { userInfo } = useUserInfo();

  useEffect(() => {
    if (!username) {
      return;
    }
    axios.get("/api/users?username=" + username).then((response) => {
      setProfileInfo(response.data.user);
      setOriginalUserInfo(response.data.user);
    });
  }, [username]);

  useEffect(() => {
    if (!profileInfo?._id) {
      return;
    }
    axios.get("/api/posts?author=" + profileInfo._id).then((response) => {
      setPosts(response.data.posts);
      setPostsLikedByMe(response.data.idsLikedByMe);
    });
  }, [profileInfo]);

  function updateUserImage(type, src) {
    setProfileInfo((prev) => ({ ...prev, [type]: src }));
  }

  async function updateProfile() {
    const { bio, name, username } = profileInfo;
    await axios.put("/api/profile", {
      bio,
      name,
      username,
    });
    setEditMode(false);
  }

  function cancel() {
    setProfileInfo((prev) => {
      const { bio, name, username } = originalUserInfo;
      return { ...prev, bio, name, username };
    });
    setEditMode(false);
  }

  const isMyProfile = profileInfo?._id === userInfo?._id;

  return (
    <Layout>
      {!!profileInfo && (
        <div>
          <div className="px-5 pt-2">
            <TopNavLink title={profileInfo.name} />
          </div>
          <Cover
            src={profileInfo.cover}
            editable={isMyProfile}
            onChange={(src) => updateUserImage("cover", src)}
          />
          <div className="flex justify-between">
            <div className="ml-5 relative">
              <div className="absolute -top-14 border-2 rounded-full border-black overflow-hidden">
                <Avatar
                  big
                  src={profileInfo.image}
                  editable={isMyProfile}
                  onChange={(src) => updateUserImage("image", src)}
                />
              </div>
            </div>
            <div className="p-2">
              {!isMyProfile && (
                <button className="bg-twitterBlue text-white py-2 px-5 rounded-full">
                  Follow
                </button>
              )}
              {isMyProfile && (
                <div>
                  {!editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-twitterBlue text-white py-2 px-5 rounded-full"
                    >
                      Edit profile
                    </button>
                  )}
                  {editMode && (
                    <div>
                      <button
                        onClick={() => cancel()}
                        className="bg-twitterWhite text-black py-2 px-5 rounded-full mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => updateProfile()}
                        className="bg-twitterBlue text-white py-2 px-5 rounded-full"
                      >
                        Save profile
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="px-5 mt-2">
              {!editMode && (
                <h1 className="font-bold text-xl leading-5">
                  {profileInfo.name}
                </h1>
              )}
              {editMode && (
                <div>
                  <input
                    className="bg-twitterBorder p-2 rounded-full mb-2"
                    type="text"
                    value={profileInfo.name}
                    onChange={(ev) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        name: ev.target.value,
                      }))
                    }
                  />
                </div>
              )}
              {!editMode && (
                <h2 className="text-twitterLightGray text-sm">
                  @{profileInfo.username}
                </h2>
              )}
              {editMode && (
                <div>
                  <input
                    className="bg-twitterBorder p-2 rounded-full mb-2"
                    type="text"
                    value={profileInfo.username}
                    onChange={(ev) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        username: ev.target.value,
                      }))
                    }
                  />
                </div>
              )}
              {!editMode && (
                <div className="text-sm mt-2 mb-2">{profileInfo.bio}</div>
              )}
              {editMode && (
                <div>
                  <textarea
                    value={profileInfo.bio}
                    className="bg-twitterBorder p-2 rounded-2xl mb-1 w-full block"
                    onChange={(ev) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        bio: ev.target.value,
                      }))
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {posts?.length > 0 &&
        posts.map((post) => (
          <div className="p-5 border-t border-twitteBorder" key={post._id}>
            <PostContent
              {...post}
              likedByMe={postsLikedByMe.includes(post._id)}
            />
          </div>
        ))}
    </Layout>
  );
}
