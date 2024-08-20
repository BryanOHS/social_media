"use client";
import React, { ChangeEvent, useState } from "react";
import { LoginInfo } from "../Types/User";
import FormInput from "./FormInput";
import { LoginUser } from "../Utils/AuthUtils";
import { useRouter } from "next/navigation";

import { Roboto } from "next/font/google";
const Robotoo = Roboto({ subsets: ["latin"], weight: ["400", "900"] });

const LoginForm = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<LoginInfo>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const RegisterInputData = [
    {
      label: "username",
      name: "username-l",
      type: "text",
    },

    {
      label: "password",
      name: "password-l",
      type: "password",
    },
  ];

  const LoginUpdateInfo = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await LoginUser(userInfo);
      if (result[0]) {
        router.push("/home");
      } else {
        setErrorMessage(result[1]);
      }
    } catch (error:any) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred."
      );
    }
  };

  return (
    <form
      method="POST"
      className="w-full h-fit flex flex-col items-center pt-8"
      onSubmit={(e) => HandleSubmit(e)}
    >
      {RegisterInputData.map((value) => (
        <FormInput
          key={value.label}
          name={value.name}
          label={value.label}
          type={value.type}
          updateInfo={LoginUpdateInfo}
        />
      ))}

      <h1 className=" italic text-red-500 my-2">{errorMessage}</h1>
      <input
        type="submit"
        value="Login"
        className={` ${Robotoo.className} text-2xl w-[200px] rounded-md h-[60px] bg-transparent border-2 border-white mt-4 uppercase font-bold cursor-pointer`}
      />
    </form>
  );
};

export default LoginForm;
