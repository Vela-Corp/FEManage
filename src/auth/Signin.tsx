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

        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-lg mx-auto w-72">
                <div>
                  <h1 className="text-2xl font-semibold">Login Form</h1>
                </div>
                <div className="">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative">
                        <input
                          autoComplete="off"
                          {...register("email", {
                            required: "Email is required",
                          })}
                          id="email"
                          name="email"
                          type="text"
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Email address"
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Email Address
                        </label>
                      </div>
                      {errors.email && (
                        <span className="text-red-500 text-sm">
                          {errors.email.message}
                        </span>
                      )}
                      <div className="relative">
                        <input
                          {...register("password", {
                            required: "Password is required",
                          })}
                          autoComplete="off"
                          id="password"
                          name="password"
                          type="password"
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Password"
                        />
                        <label
                          form="password"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Password
                        </label>
                      </div>
                      {errors.password && (
                        <span className="text-red-500 text-sm">
                          {errors.password.message}
                        </span>
                      )}
                      <div className="relative">
                        <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="text-center whitespace-nowrap">
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
        </div>
      </div>
    </>
  );
};

export default Signin;
