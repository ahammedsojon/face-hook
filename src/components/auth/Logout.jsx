import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/icons/logout.svg";
import useAuth from "../../hooks/useAtuh";

const Logout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    setAuth({});
    navigate("/login");
  };
  return (
    <button className="icon-btn" onClick={handleLogOut}>
      <img src={LogoutIcon} alt="Logout" />
    </button>
  );
};

export default Logout;
