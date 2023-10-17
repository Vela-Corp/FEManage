import * as xlsx from "xlsx";
import { useMutation, useQueryClient } from "react-query";
import { createCustomer } from "../../../api/customer";
import { AuthContexts } from "../../../auth/Context/AuthContext";
import { useContext } from "react";
const AddCustomer = () => {
  const { user } = useContext(AuthContexts);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    "addcustomer",
    (data) => createCustomer(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("customers");
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
        dataFromExcel.shift();
        const dataNew = dataFromExcel.map((item: any, index: number) => {
          if (index > 0) {
            return {
              name: item[0],
              phone: item[1],
              address: item[2],
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
  return (
    <>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileUpload} name="" id="" />
      </form>
    </>
  );
};

export default AddCustomer;
