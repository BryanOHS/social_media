"use client";
import React, { ChangeEvent, useState } from "react";
import { RegisterInfo } from "../Types/User";
import FormInput from "./FormInput";
import axios from "axios";
import { RegisterUser, validateEmail, validateRegisterInfo, validateUsername } from "../Utils/AuthUtils";

const RegisterForm = () => {
    const [userInfo, setUserInfo] = useState<RegisterInfo>({
        username: "",
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("")
    const RegisterInputData = [
        {
            label: "username",
            name: "username-r",
            type: "text"
        },    
        {
            label: "email",
            name: "email-r",
            type: "email"
        },    
        {
            label: "password",
            name: "password-r",
            type: "password"
        },


    ]

    const updateRegisterInfo = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const { value } = e.target;  
        setUserInfo(prevState => ({
            ...prevState,
            [key]: value  
        }));
    };
    const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        console.log(userInfo)
        const validResult = validateRegisterInfo(userInfo)
        if(typeof validResult === 'string'){
            setErrorMessage(validResult)
        }       
        RegisterUser(userInfo)
        .then((result:[boolean, string]) => {
            setErrorMessage("SUCCESS")
        })
        .catch((error:any) => {
            setErrorMessage(error[1])
        })

    }

  return (
    <form
      method="POST"
      onSubmit={(e) => HandleSubmit(e)}
      className="w-full h-fit flex flex-col items-center"
    >
       {RegisterInputData.map((value) =>(
            <FormInput key={value.label} name={value.name} label={value.label} type={value.type} updateInfo={updateRegisterInfo}/>
       ))} 
      
       <h1 className=" italic text-red-500 my-2">{errorMessage}</h1>
      <input type="submit"  value="Register" className="w-[200px] rounded-md h-[60px] bg-transparent border-2 border-white mt-4 uppercase font-bold cursor-pointer"/>
    </form>
  );
};

export default RegisterForm;
