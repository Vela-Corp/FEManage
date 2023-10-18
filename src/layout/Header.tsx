import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContexts } from "../auth/Context/AuthContext";
import { useContext } from "react";
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
      {/* <div className="cursor-pointer">
                  <div className="name flex flex-col">
                    <span className="font-semibold">{user?.name}</span>
                  </div>
                </div> */}
      <div className="header-box flex justify-between items-center bg-white p-4 rounded-lg">
        <div className="text-left text-teal-500">
          <h2 className="text-xl font-semibold">Hello {user?.name}</h2>
          <span className="text-sm text-[#757575]">Have a nice day</span>
        </div>
        <div className="text-right flex items-center gap-6 ">
          <div className="icon text-2xl text-teal-400">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="hr w-[1px] h-10 bg-[#C2C2C2]"></div>
          <div className="users flex items-center gap-4">
            <Tooltip
              trigger={["click"]}
              placement="bottomLeft"
              arrow={false}
              color="white"
              style={{ boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)" }}
              overlayStyle={{ marginTop: "5px" }}
              title={
                <div className="text-left flex flex-col gap-1 items-start justify-start pl-1 py-2 w-40">
                  <div className="name hover:bg-gray-100 w-full p-1 cursor-pointer">
                    <span className=" text-black">{user?.name}</span>
                  </div>
                  <div className="logout  hover:bg-gray-100 w-full p-1 cursor-pointer">
                    <button
                      onClick={handleLogout}
                      className="text-black  rounded-md "
                    >
                      Logout
                    </button>
                  </div>
                </div>
              }
            >
              <div className="imge w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                <img
                  className="w-full h-full object-cover"
                  src="https://orangepreschool.org.au/wp-content/uploads/default-staff.jpg"
                  alt=""
                />
              </div>
            </Tooltip>
            {/* {user?.name ? (
              <Tooltip
                trigger={["click"]}
                placement="bottom"
                color="white"
                title={
               
                    <div className="logout">
                      <button
                        onClick={handleLogout}
                        className="bg-blue-500 text-white font-semibold px-6 py-1 shadow-lg rounded-md "
                      >
                        Logout
                      </button>
                    </div>
                
                }
              >
               
              </Tooltip>
            ) : (
              <Link to={"/signin"}>
                <div className="btn-login">
                  <button className=" bg-gray-500 text-white font-semibold px-5 py-2 shadow-xl rounded-lg ring">
                    Login Now
                  </button>
                </div>
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
