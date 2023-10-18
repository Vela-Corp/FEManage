import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
type Props = {
  valueSearch: string;
  setValueSearch: React.Dispatch<React.SetStateAction<string>>;
  handAdd: any;
  handSubmitSearch: (e: React.FormEvent<HTMLFormElement>) => void;
};
const Action = ({
  valueSearch,
  setValueSearch,
  handSubmitSearch,
  ...prop
}: Props) => {
  return (
    <>
      <div className="action">
        {/* add */}

        <div className="action-box flex items-center justify-between w-full">
          <form
            onSubmit={handSubmitSearch}
            className="inp-search flex gap-4 items-center w-[50%] bg-white rounded-xl py-3 px-5"
          >
            <i className="text-base">
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
          {prop?.handAdd && (
            <div className="btn-add">
              <button
                onClick={prop?.handAdd}
                className="btn btn-primary font-bold text-white bg-blue-500 rounded-md py-2 px-8 hover:bg-blue-600"
              >
                Add{" "}
                <FontAwesomeIcon
                  className="text-white font-bold text-lg"
                  icon={faPlus}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Action;
