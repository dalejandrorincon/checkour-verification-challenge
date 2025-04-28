import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { VerificationFormData } from "@shared/types/form";

import { CountrySkeleton } from "@components/LoadingStates/CountrySkeleton";
import { loadRecaptcha } from "@utils/loadRecaptcha";

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const CountrySelect = lazy(() => import("@components/Form/CountrySelect"));

export const VerificationForm = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormData>();

  const onSubmit = async (data: VerificationFormData) => {
    try {
      await loadRecaptcha(siteKey);
      await new Promise<void>((resolve) => grecaptcha.ready(resolve));
      const token = await grecaptcha.execute(siteKey, { action: "submit" });
      console.log("Captcha token:", token);
      console.log("Form submitted:", data);
      alert("Form submitted!");
    } catch (error) {
      console.error("Captcha error:", error);
      alert("Error with reCAPTCHA, please try again.");
    }
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

      <Suspense fallback={<CountrySkeleton />}>
        <CountrySelect register={register} errors={errors} />
      </Suspense>

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
