import service from "./config";
const sigupApi = (data: any) => {
  const res = service.post("/signup", data);
  return res;
};

const signinApi = async (data: any) => {
  try {
    const res = await service.post("/signin", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const signoutApi = async () => {
  try {
    const res = await service.get("/signout");
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getOneUser = async (token?: string) => {
  try {
    const res = await service.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (id: string) => {
  try {
    const res = await service.get(`/user/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async ({ keyword, page, sort }: any) => {
  try {
    const response = await service.get("/users", {
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
export {
  sigupApi,
  signinApi,
  signoutApi,
  getOneUser,
  getUserById,
  getAllUsers,
};
