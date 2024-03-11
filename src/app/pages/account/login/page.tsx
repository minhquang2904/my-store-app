"use client";

import { useState } from "react";
import style from "./login.module.scss";
import Link from "next/link";
import ImageLogin from "@/app/components/imageLogin/page";
import TitleAccount from "@/app/components/titleAccount/page";
import SubTitleAccount from "@/app/components/subTitleAccount/page";
import InputAccount from "@/app/components/inputAccount/page";
import { Jost } from "next/font/google";
import { ImageLogin1 } from "../../../data";
import BtnAccount from "@/app/components/btnAccount/page";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleInputChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <main className={`bg-white min-h-screen ${style.main}`}>
      <ImageLogin src={ImageLogin1} />
      <div className={`${style.formLogin} ${jost.className}`}>
        <div className={`${style.formContainer}`}>
          <TitleAccount title="Welcome 👋" />
          <Link href="/pages/account/signup">
            <SubTitleAccount title="Please sign up here" />
          </Link>
          <div className={`${style.formColumn}`}>
            <div className={`${style.formGroup}`}>
              <h4>Email Address</h4>
              <InputAccount
                value={email}
                onChange={handleInputChangeEmail}
                type="text"
                name="email"
                id="email"
                placeholder="Email@gmail.com"
                className=""
                style={{}}
              />
            </div>
            <div className={`${style.formGroup}`}>
              <h4>Password</h4>
              <InputAccount
                value={password}
                onChange={handleInputChangePassword}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className=""
                style={{}}
              />
            </div>
          </div>
          <div className={`${style.forgotPassword}`}>
            <Link href="/pages/account/forgotPassword">
              <p>Forgot Password?</p>
            </Link>
          </div>
          <BtnAccount title="Login" />
        </div>
      </div>
    </main>
  );
}
