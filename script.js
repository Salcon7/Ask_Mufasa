// Object containing translations for different languages
const translations = {
    en: {
        heading: "Hi, I am Mufasa!",
        subheading: "Your gateway to job opportunities and skills development"
    },
    fr: {
        heading: "Salut, je suis Mufasa!",
        subheading: "Votre passerelle vers des opportunités d'emploi et le développement des compétences"
    },
    rw: {
        heading: "Muraho, ndi Mufasa!",
        subheading: "Urugi rwawe rugana ku mahirwe y'akazi n'iterambere ry'ubumenyi"
    },
    es: {
        heading: "Hola, soy Mufasa!",
        subheading: "Tu puerta de entrada a oportunidades laborales y desarrollo de habilidades"
    },
    zh: {
        heading: "嗨，我是木法沙！",
        subheading: "您通往工作机会和技能发展的门户"
    }
};

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Language Translation Functionality
    const languageSelector = document.getElementById("language-selector");

    if (languageSelector) {
        languageSelector.addEventListener("change", (event) => {
            const selectedLanguage = event.target.value;
            const heading = document.querySelector("#home h1");
            const subheading = document.querySelector("#home p");

            // Change the content based on the selected language
            if (heading && subheading && translations[selectedLanguage]) {
                heading.textContent = translations[selectedLanguage].heading;
                subheading.textContent = translations[selectedLanguage].subheading;
            } else {
                console.error("Translation or elements missing for the selected language.");
            }
        });
    } else {
        console.error("Language selector not found in the DOM.");
    }

    // Get Started Button and Resume Upload Section
    const getStartedBtn = document.getElementById("get-started-btn");
    const resumeUploadSection = document.getElementById("resume-upload");

    if (getStartedBtn && resumeUploadSection) {
        getStartedBtn.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior
            resumeUploadSection.style.display = "block"; // Show the upload section
        });
    } else {
        console.error("Get Started button or Resume Upload section not found in the DOM.");
    }
});
