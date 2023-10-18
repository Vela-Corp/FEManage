import {
  faFolderOpen,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Sliderbar = () => {
  const menuSileBar = [
    {
      path: "/dashboard",
      icon: <FontAwesomeIcon icon={faHouse} />,
      title: "Event",
    },
    {
      path: "/customer",
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "Customers",
    },
    {
      path: "/checkin",
      icon: <FontAwesomeIcon icon={faFolderOpen} />,
      title: "Checkin",
    },
  ];
  return (
    <div className="siler__bar  ">
      <div className="siler__bar__logo text-center">
        <Link to={"/"}>
          {" "}
          {/* <h1 className="text-[32px] font-bold">SHOP.CO</h1> */}
        </Link>
      </div>
      <div className="siler__bar__menu">
        <ul className="menu">
          {menuSileBar.map((item, index) => (
            <Link key={index} to={item?.path}>
              <li
                key={index}
                className="pl-8 py-4 pr-20 hover:bg-slate-100 cursor-pointer rounded-lg text-[#757575] "
              >
                <div className="flex items-center gap-4">
                  <div className="icon text-2xl">{item.icon}</div>
                  <div className="title font-semibold ">{item.title}</div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sliderbar;
