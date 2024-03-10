import { useEffect, useReducer } from "react";
import actions from "../actions";
import NewPost from "../components/posts/NewPost";
import PostList from "../components/posts/PostList";
import useAuth from "../hooks/useAtuh";
import useAxios from "../hooks/useAxios";
import { postReducer } from "../reducers/postReducer";
import { initialState } from "../reducers/profileReducer";

const Home = () => {
  const { auth } = useAuth();
  console.log(auth);
  const { api } = useAxios();
  const [state, dispatch] = useReducer(postReducer, initialState);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        console.log(response);
        if (response.status === 200) {
          dispatch({ type: actions.posts.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        dispatch({
          type: actions.posts.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    fetchPosts();
  }, []);

  if (state?.loading) {
    return <div>Loading...</div>;
  }

  if (state?.error) {
    return <div>{state?.error}</div>;
  }
  return (
    <>
      <NewPost />
      <PostList posts={state?.posts} />
    </>
  );
};

export default Home;
