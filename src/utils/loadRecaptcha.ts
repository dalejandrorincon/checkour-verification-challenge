let recaptchaScriptLoaded = false;

export const loadRecaptcha = (siteKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (recaptchaScriptLoaded) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      recaptchaScriptLoaded = true;
      resolve();
    };
    script.onerror = reject;

    document.body.appendChild(script);
  });
};
