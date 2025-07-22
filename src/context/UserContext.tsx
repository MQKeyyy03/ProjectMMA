import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileData {
  avatar: any;
  name: string;
  title: string;
}

interface UserContextType {
  profile: ProfileData | null;
  addProfile: (data: ProfileData) => void;
  updateProfile: (data: ProfileData) => void;
  deleteProfile: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData | null>({
    avatar: '',
    name: 'Suleyman',
    title: 'UI/UX Designer',
  });

  const addProfile = (data: ProfileData) => setProfile(data);
  const updateProfile = (data: ProfileData) => setProfile(data);
  const deleteProfile = () => setProfile(null);
  const logout = () => {
    console.log("Logged out");
    // Optional: Clear token or storage here
  };

  return (
    <UserContext.Provider value={{ profile, addProfile, updateProfile, deleteProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
