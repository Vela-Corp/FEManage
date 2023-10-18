import * as xlsx from "xlsx";
import { useMutation, useQueryClient } from "react-query";
import { createCustomer } from "../../../api/customer";
import { AuthContexts } from "../../../auth/Context/AuthContext";
import { useContext } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const AddCustomer = ({ open, handClose }: any) => {
  const { user } = useContext(AuthContexts);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();
  const { mutate } = useMutation(
    "addcustomer",
    (data) => createCustomer(data),
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries("customers");
          toast.success("Thêm thành công", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
          handClose();
        } else {
          toast.error("Thêm Thất bại", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
        }
      },
    }
  );
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = xlsx.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const dataFromExcel: any = xlsx.utils.sheet_to_json(worksheet, {
          header: 1,
        });
        // cắt phần tử đầu tiên của mảng vì nó là header
        // dataFromExcel.shift();
        const dataNew = dataFromExcel.map((item: any, index: number) => {
          if (index > 0) {
            return {
              name: item[0],
              phone: item[1],
              address: item[2],
              note: item[3],
            };
          }
        });
        for (const itemData of dataNew) {
          mutate({
            ...itemData,
            created_by: user?.name,
            updated_by: user?.name,
          });
        }

        // dataFromExcel chứa dữ liệu từ tệp Excel
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);

    mutate({
      ...data,
      created_by: user?.name,
      updated_by: user?.name,
    });
  };
  return (
    <>
      <Modal
        open={open}
        onOk={handleSubmit(onSubmit)}
        onCancel={handClose}
        okButtonProps={{ style: { backgroundColor: "blue" } }}
      >
        <form>
          <div className="title">
            <h2 className="text-xl font-semibold">Update</h2>
            <div className="box flex justify-center gap-2 w-full border-2 border-black rounded-lg p-3 mt-2">
              <div className="left w-full">
                <div className="name w-full">
                  <label htmlFor="">Name</label> <br />
                  <input
                    {...register("name", {
                      required: "Name is required",
                    })}
                    type="text"
                    name="name"
                    id=""
                    placeholder={user?.name}
                    className="w-full h-8 outline-none border-2 border-black focus:border-black-500 rounded-md pl-1"
                  />
                </div>
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
              <div className="right w-full">
                <div className="name w-full">
                  <label htmlFor="">Phone</label> <br />
                  <input
                    {...register("phone", {
                      required: "Phone is required",
                    })}
                    type="number"
                    name="phone"
                    id=""
                    placeholder={user?.phone}
                    className="w-full h-8 outline-none border-2 border-black focus:border-black-500 rounded-md pl-1"
                  />
                </div>
                {errors.phone && (
                  <span className="text-red-500">{errors.phone.message}</span>
                )}
              </div>
            </div>
            <div className="h-[1px] bg-black w-full mt-4"></div>

            <h3 className="mt-2 font-medium">Address</h3>
            <div className="address">
              <textarea
                {...register("address", {
                  required: "Address is required",
                })}
                name="address"
                id=""
                placeholder="Tầng 5, Toà nhà Viglacera, số 1 Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội."
                className="w-full h-8 outline-none border-2 border-black focus:border-black-500 rounded-md pl-1 min-h-[100px] max-h-[200px]"
              ></textarea>
            </div>
            {errors.address && (
              <span className="text-red-500">{errors.address.message}</span>
            )}

            <div className="h-[1px] bg-black w-full mt-4"></div>

            <h3 className="mt-2 font-medium">Note</h3>
            <div className="note">
              <textarea
                {...register("note", {
                  required: "Note is required",
                })}
                name="note"
                id=""
                className="w-full h-8 outline-none border-2 border-black focus:border-black-500 rounded-md pl-1 min-h-[100px] max-h-[200px]"
              ></textarea>
            </div>
            {errors.note && (
              <span className="text-red-500">{errors.note.message}</span>
            )}
          </div>
        </form>
      </Modal>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileUpload} name="" id="" />
      </form>
    </>
  );
};

export default AddCustomer;
