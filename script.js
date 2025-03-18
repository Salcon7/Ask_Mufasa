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

    // Check localStorage to see if the cards should be visible
    if (localStorage.getItem("cardsVisible") === "true") {
        resumeUploadSection.style.display = "flex"; // Show the cards
    }

    if (getStartedBtn && resumeUploadSection) {
        getStartedBtn.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior
            resumeUploadSection.style.display = "flex"; // Show the upload section
            localStorage.setItem("cardsVisible", "true"); // Save the visibility state
        });
    } else {
        console.error("Get Started button or Resume Upload section not found in the DOM.");
    }

    // Upload Form Submission
    const uploadForm = document.getElementById("upload-form");

    if (uploadForm) {
        uploadForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const formData = new FormData();
            const fileInput = document.getElementById("resume");
            const file = fileInput.files[0];

            if (!file) {
                alert("Please select a file before uploading.");
                return;
            }

            formData.append("file", file);

            try {
                // Simulate backend call and use default extracted data
                const extractedData = {
                    name: extractName(),
                    date_of_birth: extractDOB(),
                    experience: extractExperience(),
                    skills: extractSkills()
                };

                // Save the extracted data to sessionStorage
                sessionStorage.setItem("extractedData", JSON.stringify(extractedData));

                // Redirect to the extracted info page
                window.location.href = "extracted-info.html";
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            }
        });
    }

    // Load Extracted Information on extracted-info.html
    const extractedInfoContainer = document.getElementById("extracted-info");
    if (extractedInfoContainer) {
        const extractedData = JSON.parse(sessionStorage.getItem("extractedData"));

        if (extractedData) {
            // Create a function to format lists
            const formatAsList = (text) => {
                return text.split(',').map(item => `<li>${item.trim()}</li>`).join('');
            };

            // Dynamically populate the extracted information
            extractedInfoContainer.innerHTML = `
                <div class="content-container card">
                    <h2>Extracted Information</h2>
                    <p><strong>Name:</strong> ${extractedData.name}</p>
                    <p><strong>Date of Birth:</strong> ${extractedData.date_of_birth}</p>
                    <p><strong>Work Experience:</strong></p>
                    <ul>${formatAsList(extractedData.experience)}</ul>
                    <p><strong>Skills:</strong></p>
                    <ul>${formatAsList(extractedData.skills)}</ul>
                </div>
            `;
        } else {
            extractedInfoContainer.innerHTML = "<p>No data available. Please upload a CV.</p>";
        }
    }
});

// Placeholder functions for extracting data
function extractName() {
    return "Amina Msuya";
}
function extractDOB() {
    return "August 10, 2004";
}
function extractExperience() {
    return "5 months in digital marketing, 8 months in college counselling, 4 months in teaching, 4 months in hospitality";
}
function extractSkills() {
    return "Technical skills, programming, communication, customer service, leadership, resilience";
}
document.addEventListener("DOMContentLoaded", () => {
    // Simulated extracted data
    const extractedData = {
        name: "Amina Msuya",
        date_of_birth: "August 10, 2004",
        experience: [
            "5 months in digital marketing",
            "8 months in college counselling",
            "4 months in teaching",
            "4 months in hospitality"
        ],
        skills: [
            "Technical skills",
            "Programming",
            "Communication",
            "Customer service",
            "Leadership",
            "Resilience"
        ]
    };

    const typeWriter = (element, text, delay, callback) => {
        let index = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(index);
            index++;
            if (index === text.length) {
                clearInterval(timer);
                if (callback) callback();
            }
        }, delay);
    };

    const typeList = (listElement, items, delay, itemDelay, callback) => {
        let index = 0;
        const typeNextItem = () => {
            if (index < items.length) {
                const li = document.createElement("li");
                listElement.appendChild(li);
                typeWriter(li, items[index], delay, () => {
                    index++;
                    setTimeout(typeNextItem, itemDelay); // Delay before the next item
                });
            } else if (callback) {
                callback();
            }
        };
        typeNextItem();
    };

    // Typewriter animation execution
    typeWriter(document.getElementById("name"), extractedData.name, 50, () => {
        typeWriter(document.getElementById("dob"), extractedData.date_of_birth, 50, () => {
            typeList(document.getElementById("experience-list"), extractedData.experience, 50, 500, () => {
                typeList(document.getElementById("skills-list"), extractedData.skills, 50, 500);
            });
        });
    });
});
