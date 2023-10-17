import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { createEvent } from "../../../api/event";
import { useContext } from "react";
import { AuthContexts } from "../../../auth/Context/AuthContext";
const AddEvent = ({ open, handClose }: any) => {
  const { user } = useContext(AuthContexts);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();
  const onSubmit = (data: any) => {
    const newData = {
      ...data,
      created_by: user?.name,
      updated_by: user?.name,
    };

    mutate(newData);
  };

  const { mutate } = useMutation("addevent", (data) => createEvent(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("event");
      handClose();
    },
  });

  return (
    <Modal
      open={open}
      onOk={handleSubmit(onSubmit)}
      onCancel={handClose}
      okButtonProps={{ style: { backgroundColor: "blue" } }}
    >
      <form>
        <div className="title">
          <h2 className="text-xl font-semibold">Add Event</h2>
          <div className="box flex justify-center gap-2 w-full border-2 border-black rounded-lg p-3 mt-2">
            <div className="left w-full">
              <div className="name w-full">
                <label htmlFor="">Name Event</label> <br />
                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  type="text"
                  name="name"
                  id=""
                  className="w-full h-8 outline-none border-2 border-black focus:border-black-500 rounded-md pl-1"
                />
              </div>
              {errors.name && (
                <span className="text-red-500">{errors?.name?.message}</span>
              )}
            </div>
            {/* <div className="right w-full">
              <div className="clientNumber w-full">
                <label htmlFor="">Số lượng </label> <br />
                <input
                  {...register("clientNumber", {
                    required: "clientNumber is required",
                  })}
                  type="number"
                  name="clientNumber"
                  id=""
                  className="w-full h-8 outline-none border-2 border-black focus:border-black-500 rounded-md pl-1"
                />
              </div>
              {errors.clientNumber && (
                <span className="text-red-500">
                  {errors?.clientNumber?.message}
                </span>
              )}
            </div> */}
          </div>
          <div className="h-[1px] bg-black w-full mt-4"></div>
        </div>
      </form>
    </Modal>
  );
};

export default AddEvent;
