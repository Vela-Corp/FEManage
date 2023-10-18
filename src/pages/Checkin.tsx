import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paginations from "../components/Pagination";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { deleteCheck, getAllChecks } from "../api/check";
import { getAllCustomers } from "../api/customer";
import { getAllEvents } from "../api/event";
import { getAllUsers } from "../api/auth";
import { Modal, Select } from "antd";
import Action from "../components/Action";
import { toast } from "react-toastify";

const Checkin = () => {
  const [modalDelete, setModalDelete] = useState(false);
  const [idCheckin, setIdCheckin] = useState(null as string | null); // id Customer
  const [page, setPage] = useState(1);
  const [valueSearch, setValueSearch] = useState("");

  const { data: dataUsers } = useQuery("users", getAllUsers);
  const { data: dataCustomer } = useQuery("customers", getAllCustomers);
  const { data: dataEvent } = useQuery("event", getAllEvents);

  const { data, refetch } = useQuery(["checkin", page], () =>
    getAllChecks({ page: page, keyword: valueSearch, sort: selectedValue })
  );

  const [selectedValue, setSelectedValue] = useState(
    (null as string | null) || localStorage.getItem("sortCheckin")
  );

  const { mutate } = useMutation("deleteCheckin", deleteCheck, {
    onSuccess: () => {
      refetch();
      toast.success("Delete Success", {
        autoClose: 1000,
      });
    },
  });

  const handlOnChange = (pages: number) => setPage(pages);

  const handSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch({ queryKey: valueSearch });
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    localStorage.setItem("sortCheckin", value);
  };

  const handlDeleteCheckin = (id: string) => {
    mutate(id);
    setModalDelete(false);
  };
  return (
    <>
      <Modal
        style={{ top: "30%" }}
        open={modalDelete}
        okButtonProps={{ style: { backgroundColor: "blue" } }}
        onOk={() => {
          handlDeleteCheckin(idCheckin as string);
        }}
        onCancel={() => setModalDelete(false)}
      >
        <div className="">
          <h1 className="text-xl font-semibold">Are you sure?</h1>
          <p className="text-base">Do you want to delete this event?</p>
        </div>
      </Modal>
      <div className="action mt-10 w-full flex justify-between">
        <div className="w-full">
          <Action
            valueSearch={valueSearch}
            setValueSearch={setValueSearch}
            handSubmitSearch={handSubmitSearch}
            handAdd={null}
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
          <Select.Option value="phone">Phone</Select.Option>
        </Select>
      </div>
      <div className="table w-full bg-white rounded-2xl overflow-hidden my-9 ">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl p-5">List Checkin</h1>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#EFF4FA] h-16 ">
              <th>STT</th>
              <th>Name Event</th>
              <th>Customer</th>
              <th>Checked at</th>
              <th>Checked by</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data && data.docs.length > 0
              ? data.docs.map((item: any, index: number) => (
                  <tr
                    className={`${index % 2 == 0 ? "bg-white" : "bg-gray-100"}`}
                    key={index}
                  >
                    <td>{index + 1}</td>
                    <td className="max-w-[120px] font-bold truncat">
                      {dataEvent?.docs?.map((event: any) => {
                        if (event._id === item?.event_id) {
                          return event.name;
                        }
                      })}
                    </td>
                    <td className="">
                      {" "}
                      {dataCustomer?.map((cus: any) => {
                        if (cus._id === item?.customer_id) {
                          return cus.name;
                        }
                      })}
                    </td>
                    <td>{item?.checked_at}</td>
                    <td>
                      {dataUsers?.docs?.map((user: any) => {
                        if (user._id === item?.checked_by) {
                          return user.name;
                        }
                      })}
                    </td>
                    <td>
                      {format(new Date(item?.createdAt), "dd/MM/yyyy HH:mm", {
                        locale: vi,
                      })}
                    </td>
                    <td>
                      {format(new Date(item?.updatedAt), "dd/MM/yyyy HH:mm", {
                        locale: vi,
                      })}
                    </td>
                    <td className="flex items-center justify-center gap-4 h-20">
                      <button
                        onClick={() => {
                          setIdCheckin(item?._id);
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

export default Checkin;
