import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddCustomer from "../components/CRUD/customer/AddCustomer";
import { deleteCustomer, getAllCustomers } from "../api/customer";
import { useQuery, useMutation } from "react-query";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Paginations from "../components/Pagination";
import { useState } from "react";
import Action from "../components/Action";
import { Modal, Table } from "antd";
import { toast } from "react-toastify";
import type { ColumnsType } from "antd/es/table";
interface DataType {
  key: React.Key;
  name: string;
  phone: string;
  address: string;
  note: string;
  created_by: string;
  updated_by: string;
  createdAt: string;
  updatedAt: string;
}

const Customer = () => {
  const [modalDelete, setModalDelete] = useState(false);
  const [modalAdd, setModalAdd] = useState(false); // modal add
  const [idCustomer, setIdCustomer] = useState(null as string | null); // id Customer
  const [page, setPage] = useState(1);
  const [valueSearch, setValueSearch] = useState("");
  // const [selectedValue, setSelectedValue] = useState(
  //   (null as string | null) || localStorage.getItem("sort")
  // );
  const { data, refetch } = useQuery(["customers", page], () =>
    getAllCustomers({ page: page, keyword: valueSearch })
  );
  console.log(data?.limit);

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

  // const handleSelectChange = (value: string) => {
  //   setSelectedValue(value);
  //   localStorage.setItem("sort", value);
  // };

  const handlDeleteCustomer = (id: string) => {
    mutate(id);
    setModalDelete(false);
  };

  const handOpenModalAdd = () => setModalAdd(true);
  const handCloseModalAdd = () => setModalAdd(false);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 4,
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: {
        compare: (a, b) => a.phone.localeCompare(b.phone),
        multiple: 3,
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: {
        compare: (a, b) => a.address.localeCompare(b.address),
        multiple: 2,
      },
    },
    {
      title: "Note",
      dataIndex: "note",
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
        <div className="flex items-center justify-center gap-4 ">
          <button
            onClick={() => {
              setIdCustomer(record?._id);
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
          handlDeleteCustomer(idCustomer as string);
        }}
        onCancel={() => setModalDelete(false)}
      >
        <div className="">
          <h1 className="text-xl font-semibold">Are you sure?</h1>
          <p className="text-base">Do you want to delete this event?</p>
        </div>
      </Modal>
      <div className="action mt-5 w-full flex items-center justify-between">
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
          <Select.Option value="name">Name</Select.Option>
          <Select.Option value="phone">Phone</Select.Option>
        </Select>
      </div> */}
      <div className="table w-full bg-white rounded-2xl overflow-hidden my-5  shadow-xl">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl p-5">List Customrs</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handOpenModalAdd}
              className="btn btn-primary font-semibold text-white 0 rounded-md py-1 px-4 bg-teal-500 hover:bg-teal-600"
            >
              Add{" "}
              <FontAwesomeIcon
                className="text-white font-bold text-lg"
                icon={faPlus}
              />
            </button>

            <AddCustomer open={modalAdd} handClose={handCloseModalAdd} />
          </div>
        </div>
        <div className="">
          <Table
            columns={columns}
            dataSource={data?.docs}
            pagination={false}
            scroll={{ x: 160 }}
          />
        </div>
        {data?.total > 5 && (
          <div className="pagination text-center my-5 py-2 bg-white">
            <Paginations
              total={data?.total}
              limit={data?.limit || 5}
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
