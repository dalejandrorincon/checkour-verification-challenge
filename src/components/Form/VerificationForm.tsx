import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { VerificationFormData } from "@shared/types/form";

import { CountrySkeleton } from "@components/LoadingStates/CountrySkeleton";
import { loadRecaptcha } from "@utils/loadRecaptcha";
import { Spinner } from "@components/Spinner/Spinner";

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const CountrySelect = lazy(() => import("@components/Form/CountrySelect"));

interface VerificationFormProps {
  referrer?: string | null;
  token?: string | null;
}

export const VerificationForm = ({
  referrer,
  token,
}: VerificationFormProps) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: VerificationFormData) => {
    setIsSubmitting(true);

    try {
      await loadRecaptcha(siteKey);
      await new Promise<void>((resolve) => grecaptcha.ready(resolve));
      const tokenCaptcha = await grecaptcha.execute(siteKey, {
        action: "submit",
      });
      console.log("Captcha token:", tokenCaptcha);
      console.log("Referrer:", referrer);
      console.log("Token from query:", token);
      console.log("Form submitted:", data);
      alert("Form submitted!");
    } catch (error) {
      console.error("Captcha error:", error);
      alert("Error with reCAPTCHA, please try again.");
    } finally {
      setIsSubmitting(false);
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
        <button
          type="button"
          className="border px-4 py-2"
          disabled={isSubmitting}
        >
          {t("back")}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2"
        >
          {isSubmitting ? <Spinner /> : t("next")}
        </button>
      </div>
    </form>
  );
};
