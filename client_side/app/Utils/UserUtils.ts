"use server";
import { cookies } from "next/headers";

export const GetUserDataByToken = async () => {
    try{
        
        const API_URL = process.env.API_URL;
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;


        if (!API_URL) {
            throw new Error('API_URL is not defined in environment variables');
        }

        const response = await fetch(`${API_URL}/user/token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
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

}