import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sliderbar from "./Sliderbar";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

const LayoutAdmin = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="container-layout w-full  mx-auto ">
        <ToastContainer />
        <div className="w-full xl:flex ">
          <div
            className={`${
              !isOpen ? "w-28 " : " w-64 "
            } lg:block hidden container-slider__bar transform duration-700 fixed z-50 pt-10 h-screen bg-white shadow-lg`}
          >
            <Sliderbar open={isOpen} />
          </div>
          <div
            className={`${
              !isOpen ? "ml-28" : "ml-64"
            } box-right transform duration-700 float-right w-full bg-slate-100 pt-2 px-5 ml-64  min-h-screen`}
          >
            <div className="container-header ">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:block hidden my-2"
              >
                {isOpen ? (
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="menu-fold"
                    width="1.2em"
                    height="1.2em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z"></path>
                  </svg>
                ) : (
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="menu-unfold"
                    width="1.2em"
                    height="1.2em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z"></path>
                  </svg>
                )}
              </button>
              <Header />
            </div>
            <div className="container-content">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
