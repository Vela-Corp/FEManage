import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { sigupApi } from "../api/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [error, setError] = useState({} as any);
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();
  const { mutate } = useMutation("sigup", sigupApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("sigup");
      toast.success("Sigup Success", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        autoClose: 1000,
      });
    },
  });
  const onSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      setError({ message: "Password and Comfirm Password not match" });
      return;
    }
    setError({});
    mutate(data);
  };
  return (
    <div className="sigup_page w-full h-screen">
      <ToastContainer />
      <div className="content flex h-full px-2 md:px-0 ">
        <div className="image_backgorund w-2/3 hidden lg:block">
          <img
            className="w-full h-full object-contain"
            src="https://tophinhanhdep.com/wp-content/uploads/2021/10/Sale-Wallpapers.jpg"
            alt=""
          />
        </div>
        <div className="form_sigup relative md:bg-blue-400 lg:w-1/3 w-full ">
          <div className="box absolute  px-10 py-20 w-full md:w-5/6 lg:w-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 my-auto mx-auto bg-white rounded-md">
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto ">
              <h2 className="text-2xl font-semibold mb-5">Register</h2>
              <div className="user_name">
                <label htmlFor="">User Name</label>
                <input
                  {...register("name", {
                    required: "User Name is required",
                  })}
                  type="text"
                  className="border-2 border-blue-300 w-full h-8 pl-2 rounded-md flex items-center outline-none focus:border-blue-700"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
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
              <div className="comfirm_password">
                <label htmlFor="">Comfirm Password</label>
                <input
                  {...register("confirmPassword", {
                    required: "Comfirm Password is required",
                  })}
                  type="password"
                  className="border-2 border-blue-300 w-full h-8 pl-2 rounded-md flex items-center outline-none focus:border-blue-700"
                />
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
                {error && <span className="text-red-500">{error.message}</span>}
              </div>
              <div className="btn_submit mt-5">
                <button className="w-full h-8 bg-blue-700 text-white rounded-md">
                  Sigup Now
                </button>
              </div>
            </form>
            <p className="text-center mt-3">
              You already have an account,{" "}
              <Link
                className="underline underline-offset-4 text-blue-600"
                to={"/signin"}
              >
                Log in now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
