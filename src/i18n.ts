import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// i18n.ts
const resources = {
    am: {
        translation: {
            "Վարկեր": "Վարկեր",
            "Բիզնես": "Բիզնես",
            "Մուտք": "Մուտք"
        }
    },
    en: {
        translation: {
            "Վարկեր": "Loans",
            "Բիզնես": "Business",
            "Մուտք": "Login"
        }
    }, resources: {
        am: {
            translation: {
                "payments": {
                    "main_title": "Գլխավոր",
                    "enter_data": "Մուտքագրեք տվյալները",
                    "placeholder": "Հաշվեհամար կամ հեռախոս",
                    "pay_btn": "Վճարել",
                    "processing": "Մշակվում է...",
                    "success": "Վճարումն ընդունված է",
                    "error_empty": "Մուտքագրեք տվյալները",
                    "error_general": "Խնդիր առաջացավ վճարման ժամանակ"
                },
                // Կատեգորիաներ (Firebase-ի անունները որպես Key)
                "Կոմունալ վճարումներ": "Կոմունալ վճարումներ",
                "Բջջային կապ": "Բջջային կապ",
                "Ինտերնետ և TV": "Ինտերնետ և TV",
                "Պետական վճարներ": "Պետական վճարներ"
            }
        },
        en: {
            translation: {
                "payments": {
                    "main_title": "Main",
                    "enter_data": "Enter details",
                    "placeholder": "Account or phone number",
                    "pay_btn": "Pay",
                    "processing": "Processing...",
                    "success": "Payment accepted",
                    "error_empty": "Please enter details",
                    "error_general": "Something went wrong during payment"
                },
                "Կոմունալ վճարումներ": "Utility Payments",
                "Բջջային կապ": "Mobile Services",
                "Ինտերնետ և TV": "Internet & TV",
                "Պետական վճարներ": "State Payments"
            }
        },
        ru: {
            translation: {
                "payments": {
                    "main_title": "Главная",
                    "enter_data": "Введите данные",
                    "placeholder": "Счет или номер телефона",
                    "pay_btn": "Оплатить",
                    "processing": "Обработка...",
                    "success": "Платеж принят",
                    "error_empty": "Пожалуйста, введите данные",
                    "error_general": "Произошла ошибка при оплате"
                },
                "Կոմունալ վճարումներ": "Коммунальные платежи",
                "Բջջային կապ": "Мобильная связь",
                "Ինտերնետ և TV": "Интернет и ТВ",
                "Պետական վճարներ": "Госплатежи"
            }
        }
    }
};

i18n
    .use(LanguageDetector) // Ինքնաշխատ հայտնաբերում է բրաուզերի լեզուն
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "am", // Եթե լեզուն չգտնվի, կբացվի հայերենը
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;