import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { VerificationFormData } from "@shared/types/form";

import { FieldSkeleton } from "@components/LoadingStates/FieldSkeleton";
import { Spinner } from "@components/Spinner/Spinner";
import { useUserData } from "@hooks/useUserData";
import { executeRecaptcha } from "@utils/executeRecaptcha";

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
  const userData = useUserData();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<VerificationFormData>({
    mode: "onChange",
  });
  const isFormLoading = userData === null;

  const onSubmit = async (formData: VerificationFormData) => {
    try {
      const tokenCaptcha = await executeRecaptcha(siteKey);
      const payload = {
        ...formData,
        captcha: tokenCaptcha,
        referrer,
        token,
      };
      console.log("Payload enviado al backend:", payload);
      alert("Formulario enviado");
    } catch (error) {
      console.error("Captcha error:", error);
      alert("Error with reCAPTCHA, please try again.");
    }
  };

  useEffect(() => {
    if (userData) {
      setValue("fullname", userData.fullname);
      setValue("address", userData.address);
    }
  }, [userData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>{t("fullname")}</label>
        {userData === null ? (
          <FieldSkeleton />
        ) : (
          <input
            {...register("fullname", {
              required: true,
              minLength: 3,
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                message: t("invalidName"),
              },
            })}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {errors.fullname?.type === "required" && (
          <span className="text-red-500">{t("required")}</span>
        )}
        {errors.fullname?.type === "minLength" && (
          <span className="text-red-500">{t("minLength", { count: 3 })}</span>
        )}
        {errors.fullname?.type === "pattern" && (
          <span className="text-red-500">{t("invalidName")}</span>
        )}
      </div>

      <Suspense fallback={<FieldSkeleton />}>
        <CountrySelect register={register} errors={errors} />
      </Suspense>

      <div>
        <label>{t("address")}</label>
        {userData === null ? (
          <FieldSkeleton />
        ) : (
          <input
            {...register("address", {
              required: true,
              minLength: 5,
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s#\-.,]+$/,
                message: t("invalidAddress"),
              },
            })}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {errors.address?.type === "required" && (
          <span className="text-red-500">{t("required")}</span>
        )}
        {errors.address?.type === "minLength" && (
          <span className="text-red-500">{t("minLength", { count: 5 })}</span>
        )}
        {errors.address?.type === "pattern" && (
          <span className="text-red-500">{t("invalidAddress")}</span>
        )}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="border px-4 py-2 disabled:border-gray-400 disabled:cursor-not-allowed text-gray-600 rounded-lg"
          disabled
        >
          {t("back")}
        </button>
        <button
          type="submit"
          disabled={isFormLoading || isSubmitting || !isValid}
          className="bg-blue-500 text-white px-4 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-600 rounded-lg cursor-pointer"
        >
          {isSubmitting ? <Spinner /> : t("next")}
        </button>
      </div>
    </form>
  );
};
