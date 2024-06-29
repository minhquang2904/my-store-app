"use client";

import style from "./productDetail.module.scss";
import Image from "next/image";
import IconHeartSvg from "@/app/components/iconHeartSvg/iconHeartSvg";
import { useEffect, useState } from "react";
import { dataDescription } from "@/app/data";
import TitlePageNavigation from "@/app/components/titlePageNavigation/titlePageNavigation";
import RelatedProduct from "@/app/components/relatedProduct/relatedProduct";
import { getProduct } from "@/app/lib/getProduct";
import LoadingComponent from "@/app/components/loadingComponent/loadingComponent";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorInput from "@/app/components/errorInput/errorInput";
import { useAuthContext } from "@/app/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { toastConfig } from "@/app/config/toaster";
import Link from "next/link";
import { useCartContext } from "@/app/context/CartContext";

const order = ["s", "m", "l", "xl", "xxl"];

const SubTitleProductDetail = (props: any) => {
  const { title } = props;
  return (
    <h3 className="text-text capitalize font-semibold text-[1.6em]">{title}</h3>
  );
};

export default function ProductDetail({ searchParams }: any) {
  const { triggerFetchCart } = useCartContext();
  const { user } = useAuthContext();
  const id = searchParams.id;

  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(0);
  const navDescription = dataDescription[0].description;
  const navAddInformation = dataDescription[1].addInformation;
  const [product, setProduct] = useState(null) as any;
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null) as any;
  const [filterSize, setFilterSize] = useState(null) as any;
  const [selectedSize, setSelectedSize] = useState(null) as any;
  const [amount, setAmount] = useState(null) as any;
  const [showAmount, setShowAmount] = useState(null) as any;
  const [errorAmount, setErrorAmount] = useState(null) as any;

  const handleChangeDescription = (e: any) => {
    const id = e.target.id;
    id == "description" && setDescription(navDescription || "");
    id == "add-information" && setDescription(navAddInformation || "");

    document
      .querySelector(".activeTabDetail")
      ?.classList.remove("activeTabDetail");
    e.target.classList.add("activeTabDetail");
  };

  const handleActivePicture = (index: any) => {
    setPicture(index);
  };

  useEffect(() => {
    setDescription(navDescription || "");
  }, []);

  const getData = async () => {
    setLoadingProducts(true);
    const data = await getProduct(id, setLoadingProducts);
    setProduct(data.data);
    console.log("data", data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChooseSize = (value: any, setFieldValue: any) => {
    const filterAmount = filterSize?.filter((item: any) => {
      return value == item.size && selectedColor == item.color;
    });
    setShowAmount(filterAmount[0].amount);
    setSelectedSize(value);
    setErrorAmount(null);
    setFieldValue("size", value);
  };

  const handleChooseColor = (value: any, setFieldValue: any) => {
    const filterSize = product?.sizes?.filter(
      (size: any) => value == size.color
    );
    setFilterSize(filterSize);
    setSelectedColor(value);
    setSelectedSize(null);
    setShowAmount(null);
    setFieldValue("size", "");
    setErrorAmount(null);
    setFieldValue("color", value);
  };

  const handleSubmitHeart = (e: any) => {
    e.target.closest(".iconHeartSvg").classList.toggle("active");
    e.preventDefault();
  };

  const handleUpdateAmount = (value: any, setFieldValue: any) => {
    setErrorAmount(null);
    setAmount(Number(value));
    setFieldValue("amount", Number(value));
  };

  const initialValues = {
    color: "",
    size: "",
    amount: 1,
  };

  const CartSchema = Yup.object().shape({
    color: Yup.string().required("- Color is required"),
    size: Yup.string().required("- Size is required"),
    amount: Yup.number()
      .required("Amount is required")
      .min(1, "The minimum quantity of products is 1"),
  });

  const handleSubmit = (values: any, setSubmitting: any, resetForm: any) => {
    if (values.amount > showAmount) {
      setErrorAmount("Amount is greater than the available quantity");
      setSubmitting(false);
      return;
    }
    setErrorAmount(null);
    setSubmitting(true);
    try {
      fetch("/api/product/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId: product._id,
          size: values.size,
          quantity: values.amount,
          color: values.color,
          price: product.discountedPrice,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          const status = result.status;
          if (status === 200) {
            toast.success("Product added to cart");
            resetForm();
            setSelectedColor(null);
            setSelectedSize(null);
            triggerFetchCart();
          }
          if (status === 400) {
            toast.error(result.message);
          }
          setSubmitting(false);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Toaster toastOptions={toastConfig} />
      {loadingProducts && <LoadingComponent />}
      {product && (
        <div className="flex justify-center items-center px-pLayout">
          <div className="l:mt-80 sm:mt-60 xsm:mt-40 w-full max-w-layout">
            <TitlePageNavigation />
            <div className="l:mt-[50px] sm:mt-[40px] xsm:mt-[30px] flex xsm:flex-col">
              <div className="flex flex-col items-center shrink grow-0 l:basis-2/4 sm:basis-[40%] xsm:basis-[100%]">
                <div className="!relative max-w-[400px] flex w-full">
                  <Image
                    src={product?.files[0]?.url || "/images/avatar-profile.png"}
                    className="!relative w-full"
                    alt={`${product?.files[0]?.url}`}
                    fill
                    sizes="(max-width: 400px) 100vw"
                    loading="lazy"
                  />
                </div>
                <div className="flex mt-[10px]">
                  {product?.files.map((item: any) => {
                    return product?.files?.length > 1 ? (
                      <div
                        key={item.url}
                        className="!relative max-w-[110px] w-full cursor-pointer hover:opacity-80"
                        onClick={() => handleActivePicture(item.id - 1)}
                      >
                        <Image
                          src={item.url}
                          className="w-full !relative"
                          alt={`Product ${item.id}`}
                          fill
                          sizes="(max-width: 200px) 100vw"
                        />
                      </div>
                    ) : (
                      ""
                    );
                  })}
                </div>
              </div>
              <div className="shrink grow-0 l:basis-2/4 ml-[30px] xsm:ml-[0] xsm:mt-[40px] sm:basis-[60%] xsm:basis-[100%]">
                <div className="flex justify-between">
                  <h1 className="text-text font-medium text-[2.2em] capitalize">
                    {product?.name || "N/A"}
                  </h1>
                  <div className="flex">
                    <div className="flex items-center mr-[16px]">
                      <div>
                        <IconHeartSvg
                          onClick={handleSubmitHeart}
                          className="iconHeartSvg [&.active]:fill-secondary cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="bg-[#e2f8e2] flex items-center py-[8px] px-[16px] rounded-[10px]">
                      <h5 className="text-[#3cd139] text-[1.4em] font-medium">
                        In Stock : {product?.quantity || 0}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="mt-[8px]">
                  <h4 className="text-text font-normal text-[1.6em] capitalize">
                    {product?.categories || "N/A"}
                  </h4>
                </div>
                <div className="flex mt-[8px] gap-x-[6px] items-end">
                  {product?.discount > 0 && (
                    <h4 className="text-button font-semibold text-[1.6em] line-through">
                      {product?.price}
                    </h4>
                  )}
                  <h4 className="text-secondary font-semibold text-[2.2em]">
                    {product?.discountedPrice || "N/A"}
                  </h4>
                </div>
                <div className="mt-[16px]">
                  <p className="text-text font-normal text-[1.4em] line-clamp-4">
                    {product?.description || "N/A"}
                  </p>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={CartSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) =>
                    handleSubmit(values, setSubmitting, resetForm)
                  }
                >
                  {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="flex flex-col">
                      <div className="mt-[16px]">
                        <div className="flex">
                          <SubTitleProductDetail title="Color" />
                          <ErrorInput
                            name="color"
                            styleCustom="!mt-[0] text-[1.6em] ml-[8px]"
                          />
                        </div>
                        <div className="mt-[8px] flex flex-wrap gap-y-[8px]">
                          {product?.colors?.map((item: any, index: any) => {
                            return (
                              <div key={item?.value + index}>
                                <label
                                  htmlFor={item?.value}
                                  className={`mr-[8px] ${
                                    values?.color == item?.value
                                      ? "bg-button text-white"
                                      : "bg-[transparent] text-text"
                                  } min-w-[70px] h-[40px] px-[14px] cursor-pointer rounded-[20px] flex justify-center items-center capitalize border-solid border-[1px] border-[#727074] text-[1.5em] select-none`}
                                >
                                  {item?.value}
                                </label>
                                <Field
                                  type="radio"
                                  name="color"
                                  id={item?.value}
                                  className="hidden"
                                  value={item?.value}
                                  onChange={(e: any) =>
                                    handleChooseColor(
                                      e.target.value,
                                      setFieldValue
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-[16px]">
                        <div className="flex">
                          <SubTitleProductDetail title="Size" />
                          <ErrorInput
                            name="size"
                            styleCustom="!mt-[0] text-[1.6em] ml-[8px]"
                          />
                          {selectedSize && (
                            <div className="text-[1.6em] ml-[4px]">
                              - {showAmount}
                            </div>
                          )}
                        </div>
                        <div className="flex mt-[8px] flex-wrap gap-y-[8px]">
                          {selectedColor ? (
                            <>
                              {filterSize
                                ?.sort(
                                  (a: any, b: any) =>
                                    order.indexOf(a.size) -
                                    order.indexOf(b.size)
                                )
                                ?.map((item: any, index: any) => {
                                  return (
                                    <div
                                      key={`${item._id}-${index}-${item.size}`}
                                    >
                                      <label
                                        htmlFor={`${item?.color} - ${item?.size}`}
                                        className={`mr-[8px] ${
                                          values?.size == item?.size
                                            ? "bg-button text-white"
                                            : "bg-[transparent] text-text"
                                        } w-[70px] h-[40px] cursor-pointer rounded-[20px] flex justify-center items-center uppercase border-solid border-[1px] border-[#727074] text-[1.5em] select-none`}
                                      >
                                        {item?.size}
                                      </label>
                                      <Field
                                        type="radio"
                                        name="size"
                                        id={`${item?.color} - ${item?.size}`}
                                        className="hidden"
                                        value={item?.size}
                                        onChange={(e: any) =>
                                          handleChooseSize(
                                            e.target.value,
                                            setFieldValue
                                          )
                                        }
                                      />
                                    </div>
                                  );
                                })}
                            </>
                          ) : (
                            <div className="text-text text-[1.6em] font-normal">
                              Please select a color to display the available
                              sizes.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-[28px] flex">
                        <div>
                          <div className="inline-flex !relative items-center border-[1px] border-solid border-button py-[4px] px-[8px] rounded-[26px] min-w-[106px]">
                            <Image
                              src="/icons/subtract.svg"
                              className="!relative !w-[24px] !h-[24px] cursor-pointer"
                              alt="Icon"
                              fill
                              sizes="100vw"
                              priority={true}
                              onClick={() => {
                                setErrorAmount(null);
                                if (values.amount > 0) {
                                  setFieldValue("amount", values.amount - 1);
                                  setAmount(values.amount - 1);
                                }
                              }}
                            />
                            <Field
                              type="number"
                              name="amount"
                              value={values.amount}
                              onChange={(e: any) =>
                                handleUpdateAmount(
                                  e.target.value,
                                  setFieldValue
                                )
                              }
                              className={`text-text outline-none p-[6px] text-[1.6em] max-w-[40px] font-medium text-center ${style.inputOuterAndInner} bg-[transparent]`}
                            />
                            <Image
                              src="/icons/plus.svg"
                              className="!relative !w-[24px] !h-[24px] cursor-pointer"
                              alt="Icon"
                              fill
                              sizes="100vw"
                              priority={true}
                              onClick={() => {
                                setErrorAmount(null);
                                setAmount(values.amount + 1);
                                setFieldValue("amount", values.amount + 1);
                              }}
                            />
                          </div>
                        </div>
                        <div className="ml-[16px] flex items-center bg-button rounded-[26px] max-w-[300px] w-full hover:opacity-90 cursor-pointer duration-200">
                          {user ? (
                            <button
                              className="text-center w-full text-[1.4em] text-white h-full"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Add to Card
                            </button>
                          ) : (
                            <Link
                              href="/login"
                              className="text-center w-full text-[1.4em] text-white h-full flex items-center justify-center"
                            >
                              <h1>Add to Card</h1>
                            </Link>
                          )}
                        </div>
                      </div>
                      <div>
                        <ErrorInput
                          name="amount"
                          styleCustom="!mt-[8px] text-[1.6em] ml-[8px]"
                        />
                        {errorAmount && (
                          <div className="text-[1.6em] mt-[8px] ml-[8px] text-secondary font-medium capitalize">
                            {errorAmount}
                          </div>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="l:mt-[80px] sm:mt-[60px] xsm:mt-[40px]">
              <div className="flex font-medium mb-[20px] text-sub capitalize text-[2em]">
                <div
                  className="activeTabDetail [&.activeTabDetail]:before:absolute [&.activeTabDetail]:before:content-[''] [&.activeTabDetail]:before:w-full [&.activeTabDetail]:before:h-[4px] [&.activeTabDetail]:before:bottom-[0] [&.activeTabDetail]:before:bg-button [&.activeTabDetail]:before:rounded-[4px] [&.activeTabDetail]:text-text pb-[8px] mr-[16px] relative cursor-pointer hover:text-button"
                  onClick={handleChangeDescription}
                  id="description"
                >
                  description
                </div>
                <div
                  className="[&.activeTabDetail]:before:absolute [&.activeTabDetail]:before:content-[''] [&.activeTabDetail]:before:w-full [&.activeTabDetail]:before:h-[4px] [&.activeTabDetail]:before:bottom-[0] [&.activeTabDetail]:before:bg-button [&.activeTabDetail]:before:rounded-[4px] [&.activeTabDetail]:text-text pb-[8px] mr-[16px] relative cursor-pointer hover:text-button"
                  onClick={handleChangeDescription}
                  id="add-information"
                >
                  Add Information
                </div>
              </div>
              <div className="text-text">
                <p className="text-[1.4em] leading-5">{product?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <RelatedProduct
        styleCustom={{ textAlign: "left", marginBottom: "35px" }}
      />
    </>
  );
}
