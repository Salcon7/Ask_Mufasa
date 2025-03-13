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

// Reference to the language selector
const languageSelector = document.getElementById("language-selector");

// Event listener to handle language changes
languageSelector.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    const heading = document.querySelector("#home h1");
    const subheading = document.querySelector("#home p");

    // Change the content based on the selected language
    heading.textContent = translations[selectedLanguage].heading;
    subheading.textContent = translations[selectedLanguage].subheading;
});

// Reference to the Get Started button and Resume Upload section
const getStartedBtn = document.getElementById("get-started-btn");
const resumeUploadSection = document.getElementById("resume-upload");

// Add click event listener to the Get Started button
getStartedBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    resumeUploadSection.style.display = "block"; // Show the upload section
    getStartedBtn.style.display = "none"; // Hide the Get Started button
});
