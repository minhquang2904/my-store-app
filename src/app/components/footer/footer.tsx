import Link from "next/link";
import Image from "next/image";
import style from "./footer.module.scss";

export default function Footer() {
  return (
    <>
      <div className="l:mt-[180px] xsm:mt-[100px] sm:mt-[100px] px-pLayout">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-layout">
            <div className="flex flex-wrap gap-y-[26px]">
              <div className="shrink-0 grow-0 l:basis-1/4 xsm:basis-[100%] sm:basis-[100%]">
                <div className="xsm:flex flex-col justify-center items-center">
                  <Link
                    href="#"
                    className="!relative max-w-[110px] h-full block"
                  >
                    <Image
                      src="/images/logo.svg"
                      className="!relative w-full h-full"
                      alt="LOGO"
                      fill
                      sizes="100vw"
                      priority={true}
                    />
                  </Link>
                  <p className="my-[32px] mx-0 text-[#00000080] text-[1.6em] font-normal xsm:text-center sm:text-center l:text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </p>
                  <div className="flex">
                    <Link
                      href="#"
                      className="!relative block mr-[36px] hover:before:content-[''] hover:before:absolute hover:before:top-[-50%] hover:before:right-[50%] hover:before:translate-x-[50%] hover:before:w-[40px] hover:before:h-[40px] hover:before:rounded-half hover:before:bg-hover1"
                    >
                      <Image
                        src="/icons/icon.svg"
                        className="!relative w-full h-full"
                        alt="LOGO"
                        fill
                        sizes="100vw"
                        priority={true}
                      />
                    </Link>
                    <Link
                      href="#"
                      className="!relative block mr-[36px] hover:before:content-[''] hover:before:absolute hover:before:top-[-50%] hover:before:right-[50%] hover:before:translate-x-[50%] hover:before:w-[40px] hover:before:h-[40px] hover:before:rounded-half hover:before:bg-hover1"
                    >
                      <Image
                        src="/icons/icon1.svg"
                        className="!relative w-full h-full"
                        alt="LOGO"
                        fill
                        sizes="100vw"
                        priority={true}
                      />
                    </Link>
                    <Link
                      href="#"
                      className="!relative block mr-[36px] hover:before:content-[''] hover:before:absolute hover:before:top-[-50%] hover:before:right-[50%] hover:before:translate-x-[50%] hover:before:w-[40px] hover:before:h-[40px] hover:before:rounded-half hover:before:bg-hover1"
                    >
                      <Image
                        src="/icons/icon2.svg"
                        className="!relative w-full h-full"
                        alt="LOGO"
                        fill
                        sizes="100vw"
                        priority={true}
                      />
                    </Link>
                    <Link
                      href="#"
                      className="!relative block mr-[36px] hover:before:content-[''] hover:before:absolute hover:before:top-[-50%] hover:before:right-[50%] hover:before:translate-x-[50%] hover:before:w-[40px] hover:before:h-[40px] hover:before:rounded-half hover:before:bg-hover1"
                    >
                      <Image
                        src="/icons/icon3.svg"
                        className="!relative w-full h-full"
                        alt="LOGO"
                        fill
                        sizes="100vw"
                        priority={true}
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="shrink-0 grow-0 l:basis-1/4 xsm:basis-[100%] sm:basis-[100%]">
                <div className="xsm:flex flex-col justify-center items-center">
                  <h1 className="text-text text-[1.6em] font-semibold mb-[22px]">
                    CATALOG
                  </h1>
                  <div className="flex flex-col xsm:items-center">
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      Necklaces
                    </Link>
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      hoodies
                    </Link>
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      Jewelry Box
                    </Link>
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      t-shirt
                    </Link>
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      jacket
                    </Link>
                  </div>
                </div>
              </div>
              <div className="shrink-0 grow-0 l:basis-1/4 xsm:basis-[100%] sm:basis-[100%]">
                <div className="xsm:flex flex-col justify-center items-center">
                  <h1 className="text-text text-[1.6em] font-semibold mb-[22px]">
                    ABOUT US
                  </h1>
                  <div className="flex flex-col xsm:items-center">
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      Our Producers
                    </Link>
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      Sitemap
                    </Link>
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      FAQ
                    </Link>
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      About Us
                    </Link>
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      Terms & Conditions
                    </Link>
                  </div>
                </div>
              </div>
              <div className="shrink-0 grow-0 l:basis-1/4 xsm:basis-[100%] sm:basis-[100%]">
                <div className="xsm:flex flex-col justify-center items-center">
                  <h1 className="text-text text-[1.6em] font-semibold mb-[22px]">
                    CUSTOMER SERVICES
                  </h1>
                  <div className="flex flex-col xsm:items-center">
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      Track Your Order
                    </Link>
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      Product Care & Repair
                    </Link>
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      Book an Appointment
                    </Link>
                    <Link
                      href=""
                      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
                    >
                      Shipping & Returns
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1e2832] flex justify-center items-center mt-[90px]">
        <div className="w-full max-w-layout py-[10px] px-0 flex justify-between">
          <h1 className="text-[1.6em] capitalize"> © 2022 Coral , Inc.</h1>
          <div
            className="flex items-center cursor-pointer !relative hover:opacity-80"
            onClick={() => window.scroll(0, 0)}
          >
            <h3 className="text-[1.6em] capitalize tracking-[2px] mr-[10px]">
              Scroll to top
            </h3>
            <Image
              src="/icons/arrowUp.svg"
              className="!relative !w-[20px] !h-[20px]"
              alt="LOGO"
              fill
              sizes="100vw"
              priority={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
