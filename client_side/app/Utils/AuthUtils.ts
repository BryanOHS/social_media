"use server";

import { LoginInfo, RegisterInfo } from "../Types/User";
import LoginForm from "../Components/LoginForm";
import axios from "axios";
import { cookies } from "next/headers";

export const RegisterUser = async (userInfo: RegisterInfo):Promise<[boolean, string]> => {
    try {
        const API = process.env.API_URL;
        if (!API) {
            throw new Error('API_URL is not defined');
        }
        const response = await axios.post(`${API}/auth/register`, userInfo);
    
        const cookieStore = cookies()
        cookieStore.set('token', response.data.token, {secure: true})
        return [true, response.data.message]

  

    } catch (error:any) {
        return [false, error.response.data.message]

    }
};
export const LoginUser = async (userInfo: LoginInfo):Promise<[boolean, string]> => {
    try {
        const API = process.env.API_URL;
        if (!API) {
            throw new Error('API_URL is not defined');
        }
        const response = await axios.post(`${API}/auth/login`, userInfo);
    
        const cookieStore = cookies()
        cookieStore.set('token', response.data.token, {secure: true})
        return [true, response.data.message]

    } catch (error:any) {
        return [false, error.response.data.message]

    }
};

export const validateRegisterInfo = (userInfo: RegisterInfo): string | boolean =>{
    if(!validateUsername(userInfo.username)){
        return "Invalid username. It should be alphanumeric and 3-20 characters long."
    }
    if(!validateEmail(userInfo.email)){
        return "Invalid Email"
    }
    if (!validatePassword(userInfo.password)){
        
        return "Invalid password. It should be at least 6 characters long and include both letters and numbers.";
    }
    return true
}
// Function to validate username
export const validateUsername = (username?: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (username && !usernameRegex.test(username)) {
        return false
    }
    return true;
};

// Function to validate email
export const validateEmail = (email?: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailRegex.test(email)) {
        return false;
    }
    return true;
};

// Function to validate password
export const validatePassword = (password: string): boolean => {
    // Simple password criteria:
    // At least 6 characters long
    // Must contain at least one letter
    // Must contain at least one digit


    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
        return false
    }

    return true;
}