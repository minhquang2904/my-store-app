"use client";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "@/app/components/loading/loading";
import FieldInput from "@/app/components/fieldInput/fieldInput";
import ErrorInput from "@/app/components/errorInput/errorInput";
import LabelInput from "@/app/components/labelInput/labelInput";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import { useAuthContext } from "@/app/context/AuthContext";
import style from "./profile.module.scss";

const Profile = () => {
  const { user } = useAuthContext();

  const [modalEditProfile, setModalEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState(null) as any;

  const handleCloseModalEditProfile = () => setModalEditProfile(false);
  const handleShowModalEditProfile = () => setModalEditProfile(true);
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <div className="!relative max-w-[80px] max-h-[80px] w-full">
            <Image
              src="/images/profile.png"
              alt="Bag"
              className="!relative max-w-[80px] max-h-[80px] w-full h-full rounded-[50%] object-cover"
              fill
              sizes="(max-width: 51px) 100vw"
            />
          </div>
          <div
            className="inline-flex items-center bg-button px-[20px] py-[12px] rounded-[16px] cursor-pointer"
            onClick={handleShowModalEditProfile}
          >
            <svg
              fill="none"
              height="20"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="white">
                <path d="m15 22.75h-6c-5.43 0-7.75-2.32-7.75-7.75v-6c0-5.43 2.32-7.75 7.75-7.75h2c.41 0 .75.34.75.75s-.34.75-.75.75h-2c-4.61 0-6.25 1.64-6.25 6.25v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 5.43-2.32 7.75-7.75 7.75z" />
                <path d="m8.49935 17.6901c-.61 0-1.17-.22-1.58-.62-.49-.49-.7-1.2-.59-1.95l.43-3.01c.08-.58.46-1.33.87-1.74l7.87995-7.88004c1.99-1.990001 4.01-1.990001 6 0 1.09 1.09 1.58 2.2 1.48 3.31-.09.9-.57 1.78-1.48 2.68l-7.88 7.88004c-.41.41-1.16.79-1.74.87l-3.00995.43c-.13.03-.26.03-.38.03zm8.06995-14.14004-7.87995 7.88004c-.19.19-.41.63-.45.89l-.43 3.01c-.04.29.02.53.17.68s.39.21.68.17l3.00995-.43c.26-.04.71-.26.89-.45l7.88-7.88004c.65-.65.99-1.23 1.04-1.77.06-.65-.28-1.34-1.04-2.11-1.6-1.6-2.7-1.15-3.87.01z" />
                <path d="m19.8496 9.82978c-.07 0-.14-.01-.2-.03-2.63-.74-4.72-2.83-5.46-5.46-.11-.4.12-.81.52-.93.4-.11.81.12.92.52.6 2.13 2.29 3.82 4.42 4.42.4.11.63.53.52.93-.09.34-.39.55-.72.55z" />
              </g>
            </svg>
            <h1 className="text-white text-[1.6em] ml-[8px] capitalize select-none">
              Edit profile
            </h1>
          </div>
        </div>
        <div className="mt-[32px]">
          <div className="flex gap-x-[20px] xsm:flex-col">
            <div className="w-full sm:w-[50%] xsm:w-[100%]">
              <LabelInput name="First Name" styleCustom="!mb-[0px]" />
              <InputModal
                title="First Name"
                styleCustom="w-full"
                readOnly={true}
                value={user?.firstName || "N/A"}
              />
            </div>
            <div className="w-full sm:w-[50%] xsm:w-[100%]">
              <LabelInput name="Last Name" styleCustom="!mb-[0px]" />
              <InputModal
                title="Last Name"
                styleCustom="w-full"
                readOnly={true}
                value={user?.lastName || "N/A"}
              />
            </div>
          </div>
          <div className="flex gap-x-[20px] xsm:flex-col">
            <div className="w-full sm:w-[50%] xsm:w-[100%]">
              <LabelInput name="Number Phone" styleCustom="!mb-[0px]" />
              <InputModal
                title="Phone Number"
                styleCustom="w-full"
                readOnly={true}
                value={user?.phone || "N/A"}
              />
            </div>
            <div className="w-full sm:w-[50%] xsm:w-[100%]">
              <LabelInput name="Email" styleCustom="!mb-[0px]" />
              <InputModal
                title="Email Address"
                styleCustom="w-full"
                readOnly={true}
                value={user?.email || "N/A"}
              />
            </div>
          </div>
          <div className="flex flex-col gap-x-[20px]">
            <LabelInput name="Address" styleCustom="!mb-[0px]" />
            <InputModal
              title="Address"
              styleCustom="w-[100%]"
              readOnly={true}
              value={
                user?.address.length > 0 ? user?.address[0].addressFull : "N/A"
              }
            />
          </div>
        </div>
      </div>
      {modalEditProfile && (
        <ModalAdd
          isOpen={modalEditProfile}
          onClose={handleCloseModalEditProfile}
          setLoading={setLoading}
          area={area}
          setArea={setArea}
        />
      )}
      {loading && <Loading />}
    </>
  );
};

const InputModal = (props: any) => {
  const { title, type, placeholder, styleCustom, readOnly, value } = props;
  return (
    <div className={`flex flex-col mb-[16px] ${styleCustom}`}>
      <LabelInput title={title} />
      <input
        value={value}
        readOnly={readOnly}
        type={type}
        placeholder={placeholder}
        className="outline-none border-[1px] border-button px-[16px] py-[10px] rounded-[12px] text-[1.6em] text-text"
      />
    </div>
  );
};

const ButtonModal = (props: any) => {
  const { styleCustom, onClick, title } = props;
  return (
    <button
      onClick={onClick}
      className={`text-[1.6em] font-normal outline-none capitalize px-[20px] py-[8px] w-[120px] h-[42px] rounded-[12px] ${styleCustom} border-[1px] border-solid hover:opacity-80`}
    >
      {title}
    </button>
  );
};

const ModalAdd = (props: any) => {
  const { isOpen, onClose, setLoading, area, setArea } = props;

  const [city, setCity] = useState([]) as any;
  const [district, setDistrict] = useState([]) as any;
  const formData = new FormData();
  const { user } = useAuthContext();
  // console.log(area);
  // console.log(user);

  const updateCityAndDistrict = (
    area: any[],
    user: any,
    setCity: (city: any) => void,
    setDistrict: (district: any) => void
  ) => {
    if (!area || !user || !user.address || !user.address[0]) {
      setCity([]);
      setDistrict([]);
      return;
    }
    const filteredCity = area.filter(
      (n: any) => n.Name === user.address[0].city
    );

    if (filteredCity.length > 0) {
      setCity(filteredCity[0].Districts);

      const filteredDistrict = filteredCity[0].Districts.filter(
        (n: any) => n.Name === user.address[0].district
      );

      setDistrict(filteredDistrict[0].Wards);
    } else {
      setCity([]);
      setDistrict([]);
    }
  };

  useEffect(() => {
    if (area && user) {
      updateCityAndDistrict(area, user, setCity, setDistrict);
    }
  }, [area, user]);

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    city: user?.address[0]?.city || "",
    district: user?.address[0]?.district || "",
    ward: user?.address[0]?.ward || "",
    street: user?.address[0]?.street || "",
  };

  const userSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .max(50, "The first name can only be a maximum of 50 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .max(50, "The last name can only be a maximum of 50 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]+$/, "Only number"),
    city: Yup.string().required("City is required"),
    district: Yup.string().required("District is required"),
    ward: Yup.string().required("Ward is required"),
    street: Yup.string().required("Street is required"),
  });

  useEffect(() => {
    const fetchDataArea = async () => {
      setLoading(true);
      try {
        await fetch(process.env.AREA_URL!)
          .then((res) => res.json())
          .then((data) => {
            setArea(data);
            setLoading(false);
          });
      } catch (error: any) {
        console.log("Get area Failed!", error);
      }
    };
    if (!area) {
      fetchDataArea();
    }
  }, []);

  useEffect(() => {
    if (!city) {
      setDistrict([]);
    }
  }, [city]);

  const handleSubmit = (values: any, setSubmitting: any) => {
    formData.set("id", user.id);
    formData.set("firstName", values.firstName);
    formData.set("lastName", values.lastName);
    formData.set("phone", values.phone.toString());
    formData.set("city", values.city);
    formData.set("district", values.district);
    formData.set("ward", values.ward);
    formData.set("street", values.street);

    try {
      setSubmitting(true);
      fetch("/api/users/profile", {
        method: "PUT",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          const status = result.status;
          if (status === 200) {
            onClose();
          }
          if (status === 400) {
            console.log(result.message);
          }
        });
      setSubmitting(false);
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"10px 2px 10px 2px"}
        margin={"auto 15px auto 15px"}
        className="xsm:!max-w-[400px] xsm:!max-h-[600px] max-h-[800px]"
      >
        <div className="xsm:px-[16px] px-[24px] py-[10px]">
          <h1 className="text-text text-[2em] font-medium">Edit Profile</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          validateOnChange={true}
          onSubmit={(values, { setSubmitting }) =>
            handleSubmit(values, setSubmitting)
          }
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="flex flex-col gap-y-[16px] overflow-hidden xsm:px-[4px] px-[12px]">
              <div
                className={`flex flex-col gap-y-[20px] overflow-y-auto px-[12px] ${style.tableScroll}`}
              >
                <div className="flex justify-between gap-x-[20px] gap-y-[20px] xsm:flex-col">
                  <div className="sm:w-[50%] xsm:w-[100%]">
                    <LabelInput
                      name="First Name"
                      id="firstName"
                      styleCustom="!mb-[4px]"
                    />
                    <FieldInput
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      styleCustom="!border-[#ABAEB1]"
                    />
                    <ErrorInput name="firstName" />
                  </div>
                  <div className="sm:w-[50%] xsm:w-[100%]">
                    <LabelInput
                      name="Last Name"
                      id="lastName"
                      styleCustom="!mb-[4px]"
                    />
                    <FieldInput
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      styleCustom="!border-[#ABAEB1]"
                    />
                    <ErrorInput name="lastName" />
                  </div>
                </div>
                <div>
                  <LabelInput
                    name="Phone Number"
                    id="phone"
                    styleCustom="!mb-[4px]"
                  />
                  <FieldInput
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    styleCustom="!border-[#ABAEB1]"
                  />
                  <ErrorInput name="phone" />
                </div>
                <div>
                  <LabelInput name="city" styleCustom="!mb-[4px]" />
                  <div className="relative">
                    <Field
                      as="select"
                      name="city"
                      className="xsm:text-subMobile appearance-none capitalize sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                      onChange={(e: any) => {
                        const result = area.filter(
                          (n: any) => n.Name === e.target.value
                        );
                        setFieldValue("city", e.target.value);
                        setFieldValue("district", "");
                        setFieldValue("ward", "");
                        setCity(result[0]?.Districts);
                      }}
                    >
                      <option value="" label="Select city" />
                      {area?.map((option: any) => {
                        return (
                          <option key={option.Id} value={option.Name}>
                            {option.Name}
                          </option>
                        );
                      })}
                    </Field>
                    <label className="absolute top-[50%] translate-y-[-50%] right-[16px]">
                      <svg
                        fill="none"
                        height="18"
                        viewBox="0 0 24 24"
                        width="18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m4 8 8 8 8-8"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </label>
                  </div>
                  <ErrorInput name="city" />
                </div>
                <div>
                  <LabelInput name="district" styleCustom="!mb-[4px]" />
                  <div className="relative">
                    <Field
                      as="select"
                      name="district"
                      className="xsm:text-subMobile appearance-none capitalize sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                      onChange={(e: any) => {
                        const result = city.filter(
                          (n: any) => n.Name === e.target.value
                        );
                        setFieldValue("district", e.target.value);
                        setFieldValue("ward", "");
                        setDistrict(result[0]?.Wards);
                      }}
                    >
                      <option value="" label="Select district" />
                      {city?.map((option: any) => {
                        return (
                          <option key={option.Id} value={option.Name}>
                            {option.Name}
                          </option>
                        );
                      })}
                    </Field>
                    <label className="absolute top-[50%] translate-y-[-50%] right-[16px]">
                      <svg
                        fill="none"
                        height="18"
                        viewBox="0 0 24 24"
                        width="18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m4 8 8 8 8-8"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </label>
                  </div>
                  <ErrorInput name="district" />
                </div>
                <div>
                  <LabelInput name="ward" styleCustom="!mb-[4px]" />
                  <div className="relative">
                    <Field
                      as="select"
                      name="ward"
                      className="xsm:text-subMobile appearance-none capitalize sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                      onChange={(e: any) => {
                        setFieldValue("ward", e.target.value);
                      }}
                    >
                      <option value="" label="Select ward" />
                      {district?.map((option: any) => {
                        return (
                          <option key={option.Id} value={option.Name}>
                            {option.Name}
                          </option>
                        );
                      })}
                    </Field>
                    <label className="absolute top-[50%] translate-y-[-50%] right-[16px]">
                      <svg
                        fill="none"
                        height="18"
                        viewBox="0 0 24 24"
                        width="18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m4 8 8 8 8-8"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </label>
                  </div>
                  <ErrorInput name="ward" />
                </div>
                <div>
                  <LabelInput
                    name="Street Name, Building, House No."
                    id="street"
                    styleCustom="!mb-[4px]"
                  />
                  <FieldInput
                    type="text"
                    name="street"
                    placeholder="Street Name, Building, House No."
                    styleCustom="!border-[#ABAEB1]"
                  />
                  <ErrorInput name="street" />
                </div>
              </div>
              <div className="flex gap-x-[10px] justify-end mt-[16px] px-[12px]">
                <ButtonModal
                  onClick={onClose}
                  title="Cancel"
                  styleCustom="border-button bg-white"
                />
                <BtnAccount
                  disabled={isSubmitting}
                  type="submit"
                  styleCustom="max-w-[120px] !mt-[0] !px-[20px] !py-[8px] !border-button !rounded-[12px]"
                />
              </div>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default Profile;
