import {
  faCheckToSlot,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const Sliderbar = ({ handlCloseModel, open, openDrawer }: any) => {
  const navigate = useNavigate();
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
      icon: <FontAwesomeIcon icon={faCheckToSlot} />,
      title: "Checkin",
    },
  ];
  const [selectedValue, setSelectedValue] = useState(menuSileBar[0].path);
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    navigate(value);
    handlCloseModel();
  };

  return (
    <div className="siler__bar  ">
      <div className="siler__bar__logo ">
        <Link to={"/"}>
          {" "}
          {/* <h1 className="text-[32px] font-bold">SHOP.CO</h1> */}
        </Link>
      </div>
      <div className="siler__bar__menu">
        <ul className="menu px-1 flex flex-col gap-1">
          {menuSileBar.map((item, index) => (
            <li
              onClick={() => handleSelectChange(item?.path)}
              key={index}
              className={`pl-5 py-2 pr-20 hover:bg-gray-100 cursor-pointer text-black rounded-lg ${
                selectedValue === item?.path ? "bg-gray-200" : ""
              }`}
            >
              <div className="flex items-center text-center gap-4 ">
                <div className="icon text-xl  text-teal-400">{item.icon}</div>
                <div
                  className={`title font-normal ${
                    !open && !openDrawer ? "hidden" : ""
                  } `}
                >
                  {item.title}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sliderbar;
