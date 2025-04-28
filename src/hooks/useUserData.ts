import { UserData } from "@shared/types/user";
import { useState, useEffect } from "react";

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserData({
        fullname: "Diego A Rincon",
        address: "Calle 100, Bogotá",
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return userData;
};
