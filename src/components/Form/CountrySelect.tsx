import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCountries } from "@hooks/useCountries";
import { FieldSkeleton } from "@components/LoadingStates/FieldSkeleton";
import { VerificationFormData } from "@shared/types/form";
import React, { useMemo } from "react";
import { Country } from "@shared/types/country";

interface CountrySelectProps {
  register: UseFormRegister<VerificationFormData>;
  errors: FieldErrors<VerificationFormData>;
}

const CountrySelect = React.memo(({ register, errors }: CountrySelectProps) => {
  const { t } = useTranslation();
  const mockCountries = useCountries();

  const sortedCountries = useMemo<Country[]>(() => {
    if (!mockCountries) return [];
    return [...mockCountries].sort((a, b) => a.name.localeCompare(b.name));
  }, [mockCountries]);

  if (!mockCountries) {
    return <FieldSkeleton />;
  }

  return (
    <div>
      <label>{t("country")}</label>
      <select
        aria-label={t("selectCountry")}
        disabled={sortedCountries.length === 0}
        {...register("country", { required: true })}
        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" hidden>
          {t("selectCountry")}
        </option>
        {sortedCountries.map(({ name, code }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
      {errors.country && <span className="text-red-500">{t("required")}</span>}
    </div>
  );
});

export default CountrySelect;
