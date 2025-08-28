document.addEventListener('DOMContentLoaded', () => {

    const toggleButton = document.getElementById('lang-toggle-btn');

    let currentLanguage = 'pl';

    function translatePage() {
        document.documentElement.lang = currentLanguage;

        if (currentLanguage === 'pl') {
            toggleButton.innerHTML = 'PL 🇵🇱';
        } else {
            toggleButton.innerHTML = 'ENG 🇬🇧';
        }

        for (const key in translations[currentLanguage]) {
            const element = document.getElementById(key);
            if (element) {
                element.innerHTML = translations[currentLanguage][key];
            }
        }
    }
    toggleButton.addEventListener('click', () => {
        if (currentLanguage === 'pl') {
            currentLanguage = 'en';
        } else {
            currentLanguage = 'pl';
        }
        translatePage();
    });
    translatePage();
});
