/* eslint-disable react/prop-types */
import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  console.log(posts);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <PostCard key={post.id} post={post} />)}
    </>
  );
};

export default PostList;
