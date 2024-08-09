"use client";
import React, { ChangeEvent, useState } from "react";
import { LoginInfo } from "../Types/User";
import FormInput from "./FormInput";
import { validateHeaderName } from "http";
import { LoginUser } from "../Utils/AuthUtils";
import { error } from "console";


const LoginForm = () => {
        const [userInfo, setUserInfo] = useState<LoginInfo>({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("")
    const RegisterInputData = [
        {
            label: "username",
            name: "username-l",
            type: "text"
        },    
           
        {
            label: "password",
            name: "password-l",
            type: "password"
        },


    ]

    const LoginUpdateInfo = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const { value } = e.target;  
        setUserInfo(prevState => ({
            ...prevState,
            [key]: value  
        }));
    };
    const HandleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      console.log(userInfo)
      LoginUser(userInfo)
      .then((result) =>{
        setErrorMessage("SUCCESS")

      })
      .catch((error) =>{
        setErrorMessage(error.response.data.message)
      })
    }

  return (
    <form
      method="POST"
      className="w-full h-fit flex flex-col items-center pt-8"
      onSubmit={(e) => HandleSubmit(e)}
    >
       {RegisterInputData.map((value) =>(
            <FormInput key={value.label} name={value.name} label={value.label} type={value.type} updateInfo={LoginUpdateInfo}/>
       ))} 
      
      <h1 className=" italic text-red-500 my-2">{errorMessage}</h1>
      <input type="submit"  value="Login" className="w-[200px] rounded-md h-[60px] bg-transparent border-2 border-white mt-4 uppercase font-bold cursor-pointer"/>
    </form>
  );
};



export default LoginForm