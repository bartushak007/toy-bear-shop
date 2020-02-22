import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./assets/translations/en.json";
import ua from "./assets/translations/ua.json";
import ru from "./assets/translations/ru.json";
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: en
  },
  ua: {
    translation: ua
  },
  ru: {
    translation: ru
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: ["en", "ua", "ru"],

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
