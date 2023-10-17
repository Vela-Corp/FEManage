import { Pagination } from "antd";
const Paginations = ({ total, limit, page, handlOnChange }: any) => {
  return (
    <Pagination
      current={page}
      defaultCurrent={1}
      total={total}
      pageSize={limit}
      onChange={handlOnChange}
    />
  );
};

export default Paginations;
