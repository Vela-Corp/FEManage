import { faCircleCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Action from "../components/Action";
import { useContext, useState } from "react";
import AddEvent from "../components/CRUD/event/AddEvent";
import { useQuery } from "react-query";
import { deleteEvent, getAllEvents } from "../api/event";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useMutation } from "react-query";
import { Modal } from "antd";
import { createCheck } from "../api/check";
import { AuthContexts } from "../auth/Context/AuthContext";
import { toast } from "react-toastify";
import { getAllCustomers } from "../api/customer";
import Paginations from "../components/Pagination";

const Dashboard = () => {
  const { user } = useContext(AuthContexts);
  const [valueSearch, setValueSearch] = useState("");
  const [page, setPage] = useState(1);
  const [idEvent, setIdEvent] = useState(null as string | null); // id event
  const [openAdd, setOpenAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalCheckin, setModalCheckin] = useState(false);
  const [phone, setPhone] = useState((null as string | null) || "");
  const { data, refetch } = useQuery("event", () =>
    getAllEvents({ keyword: valueSearch, page: page })
  );

  const { data: dataCustomer } = useQuery(["customers"], getAllCustomers);
  const { mutate } = useMutation("deleteEvent", deleteEvent, {
    onSuccess: () => {
      refetch();
    },
  });

  const id_customer = dataCustomer?.find((item: any) => {
    if (item.phone === phone) {
      return item._id;
    }
  });
  const { mutate: mutateCheckIn } = useMutation("createCheckin", createCheck, {
    onSuccess: (data) => {
      if (data) {
        toast.success("checkin thành công", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
        setModalCheckin(false);
      } else {
        toast.error("checkin Thất bại", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    },
  });
  const handAdd = () => {
    setOpenAdd(true);
  };
  const handClose = () => {
    setOpenAdd(false);
  };
  const handSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch({ queryKey: valueSearch });
  };
  const handlDeleteEvent = (id: string) => {
    mutate(id);
  };

  const handlOnChange = (pages: number) => {
    setPage(pages);
  };
  const handlCheckPhone = (e: any) => {
    e.preventDefault();

    const newData: any = {
      phone: phone,
      event_id: idEvent,
      checked_by: user?._id,
      checked_at: new Date(),
      customer_id: id_customer,
    };
    mutateCheckIn(newData);
  };
  return (
    <>
      <div className="checkin">
        <Modal
          style={{ top: "30%" }}
          open={modalCheckin}
          okButtonProps={{ style: { backgroundColor: "blue" } }}
          onOk={(e) => handlCheckPhone(e)}
          onCancel={() => setModalCheckin(false)}
        >
          <form>
            <div className="w-full">
              <h1 className="text-xl font-semibold">Check In for phone</h1>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="222-333-4444"
                className="w-full h-8 outline-none border-2 border-black focus:border-black-500 rounded-md pl-1 mt-1"
                type="text"
                name=""
                id=""
              />
            </div>
          </form>
        </Modal>
      </div>
      <Modal
        style={{ top: "30%" }}
        open={modalDelete}
        okButtonProps={{ style: { backgroundColor: "blue" } }}
        onOk={() => {
          handlDeleteEvent(idEvent as string);
          setModalDelete(false);
        }}
        onCancel={() => setModalDelete(false)}
      >
        <div className="">
          <h1 className="text-xl font-semibold">Are you sure?</h1>
          <p className="text-base">Do you want to delete this event?</p>
        </div>
      </Modal>
      <div className="modelAdd">
        <AddEvent open={openAdd} handClose={handClose} />
      </div>
      <div className="action mt-10">
        <Action
          valueSearch={valueSearch}
          setValueSearch={setValueSearch}
          handSubmitSearch={handSubmitSearch}
          handAdd={handAdd}
        />
      </div>
      <div className="table w-full bg-white rounded-2xl overflow-hidden my-9 ">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl p-5">List Events</h1>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#EFF4FA] h-16 ">
              <th>STT</th>
              <th>Name</th>
              <th>Created By</th>
              <th>Updated By</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data && data?.docs.length > 0
              ? data?.docs?.map((item: any, index: number) => (
                  <tr
                    className={`${index % 2 == 0 ? "bg-white" : "bg-gray-100"}`}
                    key={index}
                  >
                    <td>{index + 1}</td>
                    <td className=" max-w-[120px] font-bold truncate">
                      {item?.name}
                    </td>
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
                          setModalCheckin(true);
                          setIdEvent(item?._id);
                        }}
                        className="text-green-500 text-2xl hover:text-green-700"
                      >
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </button>

                      <button
                        onClick={() => {
                          setIdEvent(item?._id);
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

export default Dashboard;
