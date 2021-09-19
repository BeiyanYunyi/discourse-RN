import i18n from "i18n-js";
import en from "./en";
import zh from "./zh";
// Set the key-value pairs for the different languages you want to support.
const appI18n = i18n;
appI18n.translations = {
  en,
  zh,
};
appI18n.fallbacks = true;
// Set the locale once at the beginning of your app.
export default appI18n;
