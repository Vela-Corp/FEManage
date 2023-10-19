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
import { Modal, Table } from "antd";
import Action from "../components/Action";
import { toast } from "react-toastify";
import type { ColumnsType } from "antd/es/table";
interface DataType {
  key: React.Key;
  name: string;
  customer_id: string;
  checked_at: string;
  checked_by: string;
  createdAt: string;
  updatedAt: string;
}
const Checkin = () => {
  const [modalDelete, setModalDelete] = useState(false);
  const [idCheckin, setIdCheckin] = useState(null as string | null); // id Customer
  const [page, setPage] = useState(1);
  const [valueSearch, setValueSearch] = useState("");

  const { data: dataUsers } = useQuery("users", getAllUsers);
  const { data: dataCustomer } = useQuery("customers", getAllCustomers);
  const { data: dataEvent } = useQuery("event", getAllEvents);

  const { data, refetch } = useQuery(["checkin", page], () =>
    getAllChecks({ page: page, keyword: valueSearch })
  );

  //   const [selectedValue, setSelectedValue] = useState(
  //     (null as string | null) || localStorage.getItem("sortCheckin")
  //   );

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

  //   const handleSelectChange = (value: string) => {
  //     setSelectedValue(value);
  //     localStorage.setItem("sortCheckin", value);
  //   };

  const handlDeleteCheckin = (id: string) => {
    mutate(id);
    setModalDelete(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name Event",
      dataIndex: "event_id",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 4,
      },
      width: 150,
      fixed: "left",
      render: (text) => {
        const event = dataEvent?.docs.find((item: any) => item._id === text);
        return <span>{event?.name}</span>;
      },
    },
    {
      title: "Customer",
      dataIndex: "customer_id",
      sorter: {
        compare: (a, b) => a.customer_id.localeCompare(b.customer_id),
        multiple: 3,
      },
      render: (text) => {
        const customer = dataCustomer?.find((item: any) => item._id === text);
        return <span>{customer?.name}</span>;
      },
    },
    {
      title: "Checked at",
      dataIndex: "checked_at",
      sorter: {
        compare: (a, b) => a.checked_at.localeCompare(b.checked_at),
        multiple: 2,
      },
      render: (text) => (
        <span>
          {format(new Date(text), "dd/MM/yyyy", {
            locale: vi,
          })}
        </span>
      ),
    },
    {
      title: "Checked by",
      dataIndex: "checked_by",
      render: (text) => {
        const user = dataUsers?.docs.find((item: any) => item._id === text);
        return <span>{user?.name}</span>;
      },
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
        <div className="flex items-center justify-center gap-4 h-20">
          <button
            onClick={() => {
              setIdCheckin(record?._id);
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
      <div className="action mt-5 w-full flex justify-between">
        <div className="w-full">
          <Action
            valueSearch={valueSearch}
            setValueSearch={setValueSearch}
            handSubmitSearch={handSubmitSearch}
          />
        </div>
      </div>
      {/* <div className="mt-5">
        <Select
          value={selectedValue}
          onChange={handleSelectChange}
          placeholder="Sort for"
          className="min-w-[120px] min-h-[40px]"
        >
          <Select.Option value="phone">Phone</Select.Option>
        </Select>
      </div> */}
      <div className=" w-full bg-white rounded-2xl overflow-hidden my-5 shadow-xl">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl p-5">List Checkin</h1>
        </div>
        <div className="w-full overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data?.docs}
            pagination={false}
            scroll={{ x: 1000 }}
            rowKey={"_id"}
          />
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

export default Checkin;
