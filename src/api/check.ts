import service from "./config";

const createCheck = async (data: any) => {
  try {
    const response = await service.post("/checkin", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllChecks = async ({ keyword, page, sort }: any) => {
  try {
    const response = await service.get("/checkin", {
      params: {
        keyword: keyword,
        page: page,
        sort: sort,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteCheck = async (id: string) => {
  try {
    const response = await service.delete(`/checkin/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { createCheck, getAllChecks, deleteCheck };
