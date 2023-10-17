import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContexts } from "../auth/Context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(AuthContexts);
  return (
    <div className="header w-full ">
      <div className="header-box flex justify-between items-center">
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
              <div className="name">
                <span className="font-semibold">{user?.name}</span>
              </div>
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
