import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
const HeaderAdmin = (props: any) => {
  const { childToParent } = props;
  const pathname = usePathname();
  const router = useRouter();
  const [pageData, setPageData] = useState(null) as any;

  const handleLogOut = () => {
    Cookies.remove("LOGIN-INFO-ADMIN");
    router.push("/admin/login");
  };

  useLayoutEffect(() => {
    if (pathname === "/admin") {
      setPageData([
        { id: 1, name: "add product", url: "/admin/product/add" },
        { id: 2, name: "list product", url: "/admin/product/lists" },
      ]);
    }
    if (pathname.startsWith("/admin/product")) {
      setPageData([
        {
          id: 1,
          name: "add product",
          url: "/admin/product/add",
        },
        {
          id: 2,
          name: "lists product",
          url: "/admin/product/lists",
        },
      ]);
    }
    if (pathname === "/admin/user") {
      setPageData([
        { id: 1, name: "add product", url: "/admin/user/add" },
        { id: 2, name: "lists product", url: "/admin/product/lists" },
      ]);
    }
  }, [pathname]);

  return (
    <div className="px-[30px] h-[80px] flex items-center justify-between">
      <div className="flex gap-x-[8px]">
        {pageData &&
          pageData.map((item: any) => {
            return (
              <Link
                href={item.url}
                key={item.id || null}
                className={`hover:text-[#1B84FF] hover:bg-[#B6D6FB] duration-200 text-[1.6em] px-[16px] py-[8px] rounded-[16px] font-medium capitalize select-none ${
                  pathname === item.url
                    ? "text-[#1B84FF] bg-[#B6D6FB]"
                    : "text-text"
                }`}
              >
                {item.name || null}
              </Link>
            );
          })}
      </div>
      <div className="flex">
        <div
          className="p-[10px] cursor-pointer rounded-[4px] group"
          onClick={handleLogOut}
        >
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="a"
              height="2"
              maskUnits="userSpaceOnUse"
              width="15"
              x="8"
              y="11"
            >
              <path
                clipRule="evenodd"
                d="m8.99609 11.2501h13.54091v1.5h-13.54091z"
                fill="#fff"
                fillRule="evenodd"
              />
            </mask>
            <mask
              id="b"
              height="8"
              maskUnits="userSpaceOnUse"
              width="5"
              x="18"
              y="8"
            >
              <path
                clipRule="evenodd"
                d="m18.1096 8.33539h4.4274v7.33071h-4.4274z"
                fill="#fff"
                fillRule="evenodd"
              />
            </mask>
            <path
              clipRule="evenodd"
              d="m11.3192 22.0001h-4.88596c-2.444 0-4.433-1.989-4.433-4.435v-11.12898c0-2.446 1.989-4.436 4.433-4.436h4.87496c2.446 0 4.436 1.99 4.436 4.436v.932c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-.932c0-1.62-1.317-2.936-2.936-2.936h-4.87496c-1.617 0-2.933 1.316-2.933 2.936v11.12898c0 1.619 1.316 2.935 2.933 2.935h4.88596c1.612 0 2.925-1.312 2.925-2.924v-.943c0-.414.336-.75.75-.75s.75.336.75.75v.943c0 2.44-1.986 4.424-4.425 4.424z"
              className="fill-[#99A1B7] group-hover:fill-[#1B84FF]"
              fillRule="evenodd"
            />
            <g mask="url(#a)">
              <path
                clipRule="evenodd"
                d="m21.7871 12.7501h-12.04101c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h12.04101c.414 0 .75.336.75.75s-.336.75-.75.75z"
                className="fill-[#99A1B7] group-hover:fill-[#1B84FF]"
                fillRule="evenodd"
              />
            </g>
            <g mask="url(#b)">
              <path
                clipRule="evenodd"
                d="m18.8594 15.6661c-.192 0-.385-.073-.531-.221-.292-.294-.291-.768.002-1.06l2.394-2.385-2.394-2.38396c-.293-.292-.295-.766-.002-1.06.292-.294.766-.294 1.06-.002l2.928 2.91496c.142.14.221.332.221.531s-.079.391-.221.531l-2.928 2.916c-.146.146-.338.219-.529.219z"
                className="fill-[#99A1B7] group-hover:fill-[#1B84FF]"
                fillRule="evenodd"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
