import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { VerificationFormData } from "@shared/types/form";
import { useCountries } from "@hooks/useCountries";
import { CountrySkeleton } from "@components/LoadingStates/CountrySkeleton";

export const VerificationForm = () => {
  const { t } = useTranslation();
  const mockCountries = useCountries();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormData>();

  const onSubmit = (data: VerificationFormData) => {
    console.log("Form submitted:", data);
    alert("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>{t("fullname")}</label>
        <input
          {...register("fullname", { required: true })}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.fullname && (
          <span className="text-red-500">{t("required")}</span>
        )}
      </div>

      <div>
        <label>{t("country")}</label>
        {mockCountries === null ? (
          <CountrySkeleton />
        ) : (
          <select
            aria-label={t("selectCountry")}
            disabled={mockCountries.length === 0}
            {...register("country", { required: true })}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" hidden>
              {mockCountries.length === 0 ? t("loading") : t("selectCountry")}
            </option>
            {mockCountries.map(({ name, code }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        )}

        {errors.country && (
          <span className="text-red-500">{t("required")}</span>
        )}
      </div>

      <div>
        <label>{t("address")}</label>
        <input
          {...register("address", { required: true })}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.address && (
          <span className="text-red-500">{t("required")}</span>
        )}
      </div>

      <div>
        <label>{t("captchaQuestion")}</label>
        <input
          {...register("captcha", {
            required: true,
            validate: (value) => value === "5",
          })}
          className="border p-2 w-full"
        />
        {errors.captcha && (
          <span className="text-red-500">{t("incorrectCaptcha")}</span>
        )}
      </div>

      <div className="flex justify-between">
        <button type="button" className="border px-4 py-2">
          {t("back")}
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {t("next")}
        </button>
      </div>
    </form>
  );
};
