'use server';

import { LoginInfo, RegisterInfo } from "../Types/User";
import { cookies } from "next/headers";

export const RegisterUser = async (userInfo: RegisterInfo): Promise<[boolean, string]> => {
    try {
        const API = process.env.API_URL;
        if (!API) {
            throw new Error('API_URL is not defined');
        }
        
        const response = await fetch(`${API}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An error occurred');
        }

        const result = await response.json();
        
        const cookieStore = cookies();
        cookieStore.set('token', result.token, { secure: true });

        return [true, result.message];
    } catch (error: any) {
        return [false, error.message || 'An error occurred'];
    }
};

export const LoginUser = async (userInfo: LoginInfo): Promise<[boolean, string]> => {
    try {
        const API = process.env.API_URL;
        if (!API) {
            throw new Error('API_URL is not defined');
        }
        
        const response = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An error occurred');
        }

        const result = await response.json();
        
        const cookieStore = cookies();
        cookieStore.set('token', result.token, { secure: true });

        return [true, result.message];
    } catch (error: any) {
        return [false, error.message || 'An error occurred'];
    }
};

export const validateRegisterInfo = (userInfo: RegisterInfo): string | boolean => {
    if (!validateUsername(userInfo.username)) {
        return "Invalid username. It should be alphanumeric and 3-20 characters long.";
    }
    if (!validateEmail(userInfo.email)) {
        return "Invalid Email";
    }
    if (!validatePassword(userInfo.password)) {
        return "Invalid password. It should be at least 6 characters long and include both letters and numbers.";
    }
    return true;
};

// Function to validate username
export const validateUsername = (username?: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    return username ? usernameRegex.test(username) : true;
};

// Function to validate email
export const validateEmail = (email?: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return email ? emailRegex.test(email) : true;
};

// Function to validate password
export const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
};

export const validateToken = async (token: string): Promise<boolean> => {
    try {
        const API_URL = process.env.API_URL;

        if (!API_URL) {
            throw new Error('API_URL is not defined in environment variables');
        }

        const response = await fetch(`${API_URL}/auth/verify`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', // Optional, set if needed
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An error occurred');
        }

        const result = await response.json();
        return result.data;
    } catch (error: any) {
        console.error('Error validating token:', error.message || 'An error occurred');
        return false;
    }
};
