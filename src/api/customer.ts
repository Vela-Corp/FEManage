import service from "./config";
const getAllCustomers = async ({ keyword, page, sort }: any) => {
  try {
    const response = await service.get("/customers", {
      params: {
        keyword: keyword,
        page: page,
        sort: sort,
      },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createCustomer = async (customer: any) => {
  try {
    const response = await service.post("/customers", customer);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteCustomer = async (id: string) => {
  try {
    const response = await service.delete(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllCustomers, createCustomer, deleteCustomer };
