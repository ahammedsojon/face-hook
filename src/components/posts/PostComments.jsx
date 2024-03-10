import { useState } from "react";
import { api } from "../../api";
import useAvatar from "../../hooks/useAvatar";
import PostCommetList from "./PostCommetList";

const PostComments = ({ post }) => {
  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const avatar = useAvatar(post);
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(`/posts/${post.id}/comment`, {
        comment,
      });
      console.log(response);
      if (response.status === 200) {
        setComments([...response.data.comments]);
        setComment("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={avatar}
          alt="avatar"
        />

        <div className="flex-1">
          <form onSubmit={addComment}>
            <input
              type="text"
              className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
              name="post"
              id="post"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What's on your mind?"
            />
          </form>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="text-gray-300 max-md:text-sm"
          onClick={() => setShowComments(!showComments)}
        >
          All Comment ▾
        </button>
      </div>
      <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
        {showComments && <PostCommetList comments={comments} />}
      </div>
    </div>
  );
};

export default PostComments;
