import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "antd";
import React, { useState } from "react";
import Sliderbar from "../layout/Sliderbar";
type Props = {
  valueSearch: string;
  setValueSearch: React.Dispatch<React.SetStateAction<string>>;
  handSubmitSearch: (e: React.FormEvent<HTMLFormElement>) => void;
};
const Action = ({ valueSearch, setValueSearch, handSubmitSearch }: Props) => {
  const [openModel, setOpenModel] = useState(false);
  const handlOpenModel = () => setOpenModel(true);
  const handlCloseModel = () => setOpenModel(false);
  return (
    <>
      <div className="action">
        {/* add */}

        <div className="action-box flex justify-between items-center w-full gap-2">
          <form
            onSubmit={handSubmitSearch}
            className="inp-search flex gap-4 items-center w-[400px] bg-white border rounded-lg py-2  px-5"
          >
            <i className="text-base text-teal-400">
              <FontAwesomeIcon icon={faSearch} />
            </i>
            <input
              type="text"
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.value)}
              className="w-full outline-none"
              placeholder="Search"
            />
          </form>
          <div className="menu-moblie lg:hidden block">
            <button onClick={handlOpenModel}>
              <FontAwesomeIcon
                className="text-3xl text-teal-500"
                icon={faBars}
              />
            </button>
            <Drawer open={openModel} onClose={handlCloseModel}>
              <Sliderbar
                handlCloseModel={handlCloseModel}
                openDrawer={openModel}
              />
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Action;
