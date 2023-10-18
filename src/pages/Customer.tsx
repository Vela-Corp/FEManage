import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddCustomer from "../components/CRUD/customer/AddCustomer";
import { deleteCustomer, getAllCustomers } from "../api/customer";
import { useQuery, useMutation } from "react-query";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Paginations from "../components/Pagination";
import { useState } from "react";
import Action from "../components/Action";
import { Modal, Select } from "antd";
import { toast } from "react-toastify";

const Customer = () => {
  const [modalDelete, setModalDelete] = useState(false);
  const [modalAdd, setModalAdd] = useState(false); // modal add
  const [idCustomer, setIdCustomer] = useState(null as string | null); // id Customer
  const [page, setPage] = useState(1);
  const [valueSearch, setValueSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState(
    (null as string | null) || localStorage.getItem("sort")
  );
  const { data, refetch } = useQuery(["customers", page, selectedValue], () =>
    getAllCustomers({ page: page, keyword: valueSearch, sort: selectedValue })
  );

  const { mutate } = useMutation("deleteCustomer", deleteCustomer, {
    onSuccess: () => {
      refetch();
      toast.success("Delete Success", {
        autoClose: 1000,
      });
    },
  });

  const handlOnChange = (pages: number) => {
    setPage(pages);
  };
  const handSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch({ queryKey: valueSearch });
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    localStorage.setItem("sort", value);
  };

  const handlDeleteCustomer = (id: string) => {
    mutate(id);
    setModalDelete(false);
  };

  const handOpenModalAdd = () => setModalAdd(true);
  const handCloseModalAdd = () => setModalAdd(false);
  return (
    <>
      <Modal
        style={{ top: "30%" }}
        open={modalDelete}
        okButtonProps={{ style: { backgroundColor: "blue" } }}
        onOk={() => {
          handlDeleteCustomer(idCustomer as string);
        }}
        onCancel={() => setModalDelete(false)}
      >
        <div className="">
          <h1 className="text-xl font-semibold">Are you sure?</h1>
          <p className="text-base">Do you want to delete this event?</p>
        </div>
      </Modal>
      <div className="action mt-10 w-full flex items-center justify-between">
        <div className="w-full">
          <Action
            valueSearch={valueSearch}
            setValueSearch={setValueSearch}
            handSubmitSearch={handSubmitSearch}
            handAdd={handOpenModalAdd}
          />
        </div>
      </div>
      <div className="mt-5">
        <Select
          value={selectedValue}
          onChange={handleSelectChange}
          placeholder="Sort for"
          className="min-w-[120px] min-h-[40px]"
        >
          <Select.Option value="name">Name</Select.Option>
          <Select.Option value="phone">Phone</Select.Option>
        </Select>
      </div>
      <div className="table w-full bg-white rounded-2xl overflow-hidden my-9  ">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl p-5">List Customrs</h1>
          <AddCustomer open={modalAdd} handClose={handCloseModalAdd} />
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full overflow-x-auto table-auto ">
            <thead>
              <tr className="bg-[#EFF4FA] h-16">
                <th>STT</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Note</th>
                <th>Created By</th>
                <th>Updated By</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data && data.docs.length > 0
                ? data.docs.map((item: any, index: number) => (
                    <tr
                      className={`${
                        index % 2 == 0 ? "bg-white" : "bg-gray-100"
                      }`}
                      key={index}
                    >
                      <td>{index + 1}</td>
                      <td className=" max-w-[120px] font-bold truncate">
                        {item?.name}
                      </td>
                      <td className="">{item?.phone}</td>
                      <td>{item?.address}</td>
                      <td>{item?.note}</td>
                      <td>{item?.created_by}</td>
                      <td>{item?.updated_by}</td>
                      <td>
                        {format(new Date(item?.createdAt), "dd/MM/yyyy", {
                          locale: vi,
                        })}
                      </td>
                      <td>
                        {format(new Date(item?.updatedAt), "dd/MM/yyyy", {
                          locale: vi,
                        })}
                      </td>
                      <td className="flex items-center justify-center gap-4 h-20">
                        <button
                          onClick={() => {
                            setIdCustomer(item?._id);
                            setModalDelete(true);
                          }}
                          className=" text-red-500 text-xl hover:text-red-600"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        {data?.total > 10 && (
          <div className="pagination text-center my-5 py-2 bg-white">
            <Paginations
              total={data?.total}
              limit={data?.limit || 10}
              page={page}
              handlOnChange={handlOnChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Customer;
