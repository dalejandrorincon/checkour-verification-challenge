import { loadRecaptcha } from "@utils/loadRecaptcha";
export const executeRecaptcha = async (siteKey: string): Promise<string> => {
  await loadRecaptcha(siteKey);
  await new Promise<void>((resolve) => grecaptcha.ready(resolve));
  return grecaptcha.execute(siteKey, { action: "submit" });
};
