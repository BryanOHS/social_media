"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserData } from '@/app/Types/User';
import { GetUserDataByToken } from '@/app/Utils/UserUtils';

interface UserDataContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
          const response = await GetUserDataByToken();
          setUserData(response);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
    };
    fetchUserData();
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
