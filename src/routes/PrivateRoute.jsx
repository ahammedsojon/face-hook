import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import useAuth from "../hooks/useAtuh";
import ProfileProvider from "../providers/ProfileProvider";
import useProfile from "../hooks/useProfile";

const PrivateRoute = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <>
      {auth?.authToken ? (
        <>
          <ProfileProvider>
            <Header />
            <main className="mx-auto max-w-[1020px] py-8">
              <div className="container">
                <Outlet />
              </div>
            </main>
          </ProfileProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
