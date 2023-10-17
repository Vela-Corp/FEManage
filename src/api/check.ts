import service from "./config";

const createCheck = async (data: any) => {
  try {
    const response = await service.post("/checkin", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { createCheck };
