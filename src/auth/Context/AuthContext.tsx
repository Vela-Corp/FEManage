import { createContext, useEffect, useState, ReactNode } from "react";
import { useQuery } from "react-query";
import { getOneUser } from "../../api/auth";
import Cookies from "js-cookie";
type children = {
  children: ReactNode;
};
export const AuthContexts = createContext(null as any);
const AuthProiver = ({ children }: children) => {
  const token = Cookies.get("token");
  const [user, setUser] = useState(null);
  const { data } = useQuery(["userLogin", token], () => getOneUser(token), {
    enabled: !!Cookies.get("token"),
  });
  useEffect(() => {
    if (data) {
      setUser(data?.data);
    }
  }, [data, token]);
  return (
    <>
      <AuthContexts.Provider value={{ user, setUser }}>
        {children}
      </AuthContexts.Provider>
      ;
    </>
  );
};

export default AuthProiver;
