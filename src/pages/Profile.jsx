import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAtuh";
import useAxios from "../hooks/useAxios";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const { auth } = useAuth();
  const { api } = useAxios();
  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await api.get(`profile/${auth.user.id}`);
        setUser(response?.data?.user);
        setPosts(response?.data?.posts);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [auth.user.id, api]);

  if (loading) {
    return <div>Fetching your profile data...</div>;
  }
  return (
    <>
      <p>Welcome {user.firstName}, to your profile.</p>
      <p>You have {posts.length} post.</p>
      <Link to="/">Go to Home</Link>
    </>
  );
};

export default Home;
