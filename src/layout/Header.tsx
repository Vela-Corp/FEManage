import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContexts } from "../auth/Context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { signoutApi } from "../api/auth";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Tooltip } from "antd";
const Header = () => {
  const { user, setUser } = useContext(AuthContexts);
  const handleLogout = async () => {
    try {
      const res: any = await signoutApi();
      if (res.status === 200) {
        setUser(null);
        Cookies.remove("token");
        toast.success("Logout Success", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="header w-full ">
      <div className="header-box flex justify-between items-center ">
        <div className="text-left">
          <h2 className="text-xl font-semibold">Hello</h2>
          <span className="text-sm text-[#757575]">Have a nice day</span>
        </div>
        <div className="text-right flex items-center gap-6 ">
          <div className="icon text-2xl">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="hr w-[1px] h-10 bg-[#C2C2C2]"></div>
          <div className="users flex items-center gap-4">
            <div className="imge w-10 h-10 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg"
                alt=""
              />
            </div>
            {user?.name ? (
              <Tooltip
                trigger={["click"]}
                placement="bottom"
                color="white"
                title={
                  <>
                    <div className="logout">
                      <button
                        onClick={handleLogout}
                        className="bg-blue-500 text-white font-semibold px-6 py-1 shadow-lg rounded-md "
                      >
                        Logout
                      </button>
                    </div>
                  </>
                }
              >
                <div className="cursor-pointer">
                  <div className="name flex flex-col">
                    <span className="font-semibold">{user?.name}</span>
                  </div>
                </div>
              </Tooltip>
            ) : (
              <Link to={"/signin"}>
                <div className="btn-login">
                  <button className=" bg-gray-500 text-white font-semibold px-5 py-2 shadow-xl rounded-lg ring">
                    Login Now
                  </button>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
