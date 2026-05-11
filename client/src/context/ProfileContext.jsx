import { createContext, useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {

  // undefined = loading
  // null = no profile exists
  const [profile, setProfile] = useState(undefined);

  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      setProfile(res.data);
    } catch (err) {
      console.log(err);

      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        reload: loadProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};