import { Country } from "@shared/types/country";
import { useState, useEffect } from "react";

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountries([
        { name: "Argentina", code: "AR" },
        { name: "Brasil", code: "BR" },
        { name: "Colombia", code: "CO" },
        { name: "Uruguay", code: "UY" },
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return countries;
};
