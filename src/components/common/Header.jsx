import HomeIcon from "../../assets/icons/home.svg";
import NotificationIcon from "../../assets/icons/notification.svg";
import Avatar from "../../assets/images/avatars/avatar_1.png";
import Logo from "../../assets/images/logo.svg";
import useAuth from "../../hooks/useAtuh";
import Logout from "../auth/Logout";

const Header = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <a href="./index.html">
          <img
            className="max-w-[100px] rounded-full lg:max-w-[130px]"
            src={Logo}
            alt="Logo"
          />
        </a>

        <div className="flex items-center space-x-4">
          <a href="./index.html" className="btn-primary">
            <img src={HomeIcon} alt="Home" />
            Home
          </a>
          <button className="icon-btn">
            <img src={NotificationIcon} alt="Notification" />
          </button>

          <Logout />

          <button className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">
              {auth?.user?.firstName}
            </span>
            <img
              className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
              src={Avatar}
              alt="avatar"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
