import './assets/styles/main.css';

import back1 from './assets/images/1.png';
import back2 from './assets/images/2.png';
import back3 from './assets/images/3.png';

const loadLanguage = async (lang) => {
    switch (lang) {
        case 'de':
            return await import('./languages/de.json');
        case 'pt':
            return await import('./languages/pt.json');
        case 'es':
            return await import('./languages/es.json');
        case 'fr':
            return await import('./languages/fr.json');
        case 'ja':
            return await import('./languages/ja.json');
        default:
            return await import('./languages/en.json');
    }
};

const supportedLanguages = ['de', 'en', 'es', 'fr', 'ja', 'pt'];

let lang = navigator.language.slice(0, 2);

if (!supportedLanguages.includes(lang)) {
    lang = 'en';
}

const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang');

if (langParam && supportedLanguages.includes(langParam)) {
    lang = langParam;
}

document.documentElement.lang = lang;

const plans = {
    current: 0,
    links: ['https://apple.com/', 'https://google.com/']
};


const renderBanner = async () => {
    const language = (await loadLanguage(lang)).default;

    const bannerHTML = `
        <div class="banner">
            <button class="close"></button>
            <h1 class="title">${language['Get Unlimited <br>Access']}</h1>
            <div class="features">
                <a href="#">
                    <div class="features_card" style="background-image: url(${back1})">
                        <p>${language['Unlimited Art <br>Creation']}</p>
                    </div>
                </a>
                <a href="#">
                    <div class="features_card" style="background-image: url(${back2})">
                        <p>${language['Exclusive <br>Styles']}</p>
                    </div>
                </a>
                <a href="#">
                    <div class="features_card" style="background-image: url(${back3})">
                        <p>${language['Magic Avatars <br>With 20% Off']}</p>
                    </div>
                </a>
            </div>
            <div class="plans">
                <div class="plan active">
                    <div class="left">
                        <h2>${language['YEARLY ACCESS']}</h2>
                        <p>${language['Just {{price}} per year'].replace('{{price}}', '$39.99')}</p>
                    </div>
                    <div class="right">
                        <p>${language['{{price}} <br>per week'].replace('{{price}}', '$0.48')}</p>
                    </div>
                    <div class="best">${language['BEST OFFER']}</div>
                </div>
                <div class="plan">
                    <div class="left">
                        <h2>${language['WEEKLY ACCESS']}</h2>
                    </div>
                    <div class="right">
                        <p>${language['{{price}} <br>per week'].replace('{{price}}', '$6.99')}</p>
                    </div>
                </div>
            </div>
            <button class="continue-button">${language['Continue']}</button>
            <footer>
                <a href="#">${language['Terms of Use']}</a>
                <a href="#">${language['Privacy Policy']}</a>
                <a href="#">${language['Restore']}</a>
            </footer>
        </div>
`;

    document.getElementById('app').innerHTML = bannerHTML;

    document.querySelectorAll('.plans .plan').forEach((elem, i) => {
        elem.addEventListener('click',function (){
            document.querySelectorAll('.plans .plan').forEach(plan => plan.classList.remove('active'));
            this.classList.add('active');
            plans.current = i;
        });
    });

    document.querySelector('.close').addEventListener('click',() => {
        window.location.href = '#';
    });

    document.querySelector('.continue-button').addEventListener('click',() => {
        window.location.href = plans.links[plans.current];
    });
};

renderBanner();