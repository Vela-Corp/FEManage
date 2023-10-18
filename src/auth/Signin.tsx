import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { signinApi } from "../api/auth";
import Cookies from "js-cookie";
import { AuthContexts } from "./Context/AuthContext";
const Signin = () => {
  const queryClient = useQueryClient();
  const { setUser } = useContext(AuthContexts);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();
  const { mutate } = useMutation("signin", signinApi, {
    onSuccess: (data) => {
      if (data?.data?.token) {
        queryClient.invalidateQueries("userLogin");
        toast.success("Signin Success", {
          autoClose: 1000,
        });
        Cookies.set("token", data.data.token, { expires: 7 });
        setUser(data?.data?.user);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
        // Chuyển hướng sau đăng nhập thành công
      } else {
        toast.error("Invalid email or password", {
          autoClose: 1000,
        });
      }
    },
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        autoClose: 1000,
      });
    },
  });
  const onSubmit = (data: any) => {
    mutate(data);
    // setTimeout(() => {
    //   window.location.href = "/";
    // }, 1800);
  };

  return (
    <>
      <div className="signin_page w-full h-screen">
        <ToastContainer />
        <div className="content w-full  flex h-screen px-2 md:px-0">
          <div className="image_backgorund w-2/3 h-full hidden lg:block">
            <img
              className="w-full h-full object-contain"
              src="https://tophinhanhdep.com/wp-content/uploads/2021/10/Sale-Wallpapers.jpg"
              alt=""
            />
          </div>
          <div className="form_sigup relative md:bg-blue-400 lg:w-1/3 w-full ">
            <div className="box absolute px-10 py-20 w-full md:w-5/6 lg:w-96  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 my-auto mx-auto bg-white  rounded-md">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" mx-auto mt-10  "
              >
                <h2 className="text-2xl font-semibold mb-5">Login</h2>
                <div className="email">
                  <label htmlFor="">Email</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                    })}
                    type="text"
                    className="border-2 border-blue-300 w-full h-8 pl-2 rounded-md flex items-center outline-none focus:border-blue-700"
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="password">
                  <label htmlFor="">Password</label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    className="border-2 border-blue-300 w-full h-8 pl-2 rounded-md flex items-center outline-none focus:border-blue-700"
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="btn_submit mt-5">
                  <button className="w-full h-8 bg-blue-700 text-white rounded-md">
                    Login
                  </button>
                </div>
              </form>
              <p className="text-center mt-3 whitespace-nowrap">
                You don't have an account yet,{" "}
                <Link
                  className="underline underline-offset-4 text-blue-600"
                  to={"/signup"}
                >
                  register now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
