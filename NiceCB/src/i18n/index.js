import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

function loadLocales() {
    const files = import.meta.glob('./locales/*/*.json', {
        eager: true
    });

    const resources = {};
    Object.entries(files).forEach(([path, module]) => {
        const match = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/);

        if (!match) return;
        const [, language, namespace] = match;
        if (!resources[language]) {
            resources[language] = {};
        }
        resources[language][namespace] = module.default;
    });

    return resources;
}

const resources = loadLocales();
const allNamespaces = Object.keys(resources.en || {});

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        ns: allNamespaces,
        fallbackNS: allNamespaces, 
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'language',
            caches: ['localStorage']
        }
    });

export default i18n;
