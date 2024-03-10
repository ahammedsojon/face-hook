import { useState } from "react";
import useAuth from "../../hooks/useAtuh";
import useProfile from "../../hooks/useProfile";
import ManagePost from "./ManagePost";

const NewPost = () => {
  const { auth } = useAuth();
  const { state: profile } = useProfile();
  const user = auth?.user || profile?.user;
  const [showManagePost, setShowManagePost] = useState(false);
  return (
    <>
      {showManagePost ? (
        <div class="card relative">
          <h6 class="mb-3 text-center text-lg font-bold lg:text-xl">
            Create Post
          </h6>

          <ManagePost user={user} />
        </div>
      ) : (
        <div class="card">
          <div class="flex-center mb-3 gap-2 lg:gap-4">
            <img
              class="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />

            <div class="flex-1">
              <textarea
                class="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                name="post"
                id="post"
                placeholder="What's on your mind?"
                onClick={() => setShowManagePost(true)}
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPost;
