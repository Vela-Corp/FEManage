import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
type Props = {
  valueSearch: string;
  setValueSearch: React.Dispatch<React.SetStateAction<string>>;
  handSubmitSearch: (e: React.FormEvent<HTMLFormElement>) => void;
};
const Action = ({ valueSearch, setValueSearch, handSubmitSearch }: Props) => {
  return (
    <>
      <div className="action">
        {/* add */}

        <div className="action-box flex flex-col justify-between w-full">
          <form
            onSubmit={handSubmitSearch}
            className="inp-search flex gap-4 items-center w-[30%] bg-white border rounded-lg py-2  px-5"
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
        </div>
      </div>
    </>
  );
};

export default Action;
