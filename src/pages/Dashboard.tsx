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
import { Modal, Table } from "antd";
import { createCheck } from "../api/check";
import { AuthContexts } from "../auth/Context/AuthContext";
import { toast } from "react-toastify";
import { getAllCustomers } from "../api/customer";
import Paginations from "../components/Pagination";
import type { ColumnsType } from "antd/es/table";
interface DataType {
  key: React.Key;
  name: string;
  created_by: string;
  updated_by: string;
  createdAt: string;
  updatedAt: string;
}

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

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 4,
      },
      width: 150,
      fixed: "left",
    },

    {
      title: "Created By",
      dataIndex: "created_by",
    },
    {
      title: "Updated By",
      dataIndex: "updated_by",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => (
        <span>
          {format(new Date(text), "dd/MM/yyyy", {
            locale: vi,
          })}
        </span>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (text) => (
        <span>
          {format(new Date(text), "dd/MM/yyyy", {
            locale: vi,
          })}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record: any) => (
        <div className="flex items-center  gap-4 ">
          <button
            onClick={() => {
              setIdEvent(record?._id);
              setModalCheckin(true);
            }}
            className=" text-green-500 text-xl hover:text-green-600"
          >
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
          <button
            onClick={() => {
              setIdEvent(record?._id);
              setModalDelete(true);
            }}
            className=" text-red-500 text-xl hover:text-red-600"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      ),
    },
  ];
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
                className="w-full h-8 outline-none border border-gray-400 focus:border-black rounded-md pl-1 mt-1"
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
      <div className="action mt-5">
        <Action
          valueSearch={valueSearch}
          setValueSearch={setValueSearch}
          handSubmitSearch={handSubmitSearch}
        />
      </div>
      <div className=" w-full bg-white rounded-2xl overflow-hidden my-5 shadow-xl">
        <div className="flex justify-between items-center p-5">
          <h1 className="font-semibold text-xl ">List Events</h1>
          <button
            onClick={handAdd}
            className="btn btn-primary font-semibold text-white 0 rounded-md py-2 px-4 bg-teal-500 hover:bg-teal-600"
          >
            Add Event
          </button>
        </div>
        <Table
          columns={columns}
          dataSource={data?.docs}
          pagination={false}
          scroll={{ x: 1000 }}
          rowKey="_id"
        />
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
