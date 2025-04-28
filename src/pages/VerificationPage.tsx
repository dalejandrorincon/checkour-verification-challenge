import { VerificationForm } from "@components/Form/VerificationForm";
import { Layout } from "@components/Layout/Layout";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export const VerificationPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const referrer = searchParams.get("referrer");
  const token = searchParams.get("token");

  return (
    <Layout>
      <div className="flex flex-col justify-center w-full text-center  mb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p>{t("subtitle")}</p>
      </div>
      <VerificationForm referrer={referrer} token={token} />
    </Layout>
  );
};
