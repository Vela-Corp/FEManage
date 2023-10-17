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
export { sigupApi, signinApi, signoutApi, getOneUser };
