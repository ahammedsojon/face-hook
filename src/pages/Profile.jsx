import { useEffect } from "react";
import actions from "../actions";
import MyPosts from "../components/profile/MyPosts";
import ProfileInfo from "../components/profile/ProfileInfo";
import useAuth from "../hooks/useAtuh";
import useAxios from "../hooks/useAxios";
import useProfile from "../hooks/useProfile";

const Home = () => {
  const { auth } = useAuth();
  const { api } = useAxios();
  const { state, dispatch } = useProfile();
  useEffect(() => {
    const fetchProfile = async () => {
      dispatch({ type: actions.profile.DATA_FETCHING });
      try {
        const response = await api.get(`profile/${auth.user.id}`);
        response.data;
        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchProfile();
  }, [auth.user.id, api]);

  if (state?.loading) {
    return <div>{state?.loading}</div>;
  }
  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
};

export default Home;
