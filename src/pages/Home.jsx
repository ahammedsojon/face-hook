import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <p>Home Page</p>
      <Link to="/me">Go to profile page</Link>
    </>
  );
};

export default Home;
