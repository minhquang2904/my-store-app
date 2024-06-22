import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const urlPageLogin = ["/signup", "/login"];
const useAuth = () => {
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState(null) as any;
  const path = usePathname();
  const { push } = useRouter();
  const endpoint = path.startsWith("/admin")
    ? ""
    : "/api/users/validation-token";

  useEffect(() => {
    if (!urlPageLogin.includes(path)) {
      const fetchDataWithToken = async () => {
        setLoadingAuth(true);
        console.log("fetchDataWithToken");
        try {
          const res = await fetch(endpoint);
          const result = await res.json();

          const status = result.status;
          const data = result.data;
          if (status === 200) {
            setUser(data);
          }
          if (
            status === 400 ||
            status === 500 ||
            status === 403 ||
            status === 404
          ) {
            setUser(null);
            push("/login");
          }
          setLoadingAuth(false);
        } catch (error) {
          console.error("There was a problem with token validation:", error);
          setLoadingAuth(false);
        }
      };

      fetchDataWithToken();
    }
  }, [path]);

  return { user, loadingAuth, setLoadingAuth, setUser };
};

export default useAuth;
