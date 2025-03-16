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
});

document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("upload-form");
    const cvSummary = document.getElementById("cv-summary");

    // Reference to extracted data fields
    const nameField = document.getElementById("name");
    const dobField = document.getElementById("dob");
    const experienceField = document.getElementById("experience");
    const skillsField = document.getElementById("skills");

    uploadForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent form from refreshing the page
    
        const formData = new FormData(); // Create form data object
        const fileInput = document.getElementById('resume');
        const file = fileInput.files[0]; // Get the selected file
    
        if (!file) {
            alert('Please select a file before uploading.');
            return;
        }
    
        formData.append('file', file); // Append the file to the form data
    
        try {
            // Make a POST request to the backend
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                const data = await response.json(); // Parse JSON response from backend
                displayExtractedData(data.extracted_text); // Display the extracted text
            } else {
                alert('Failed to upload file. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
    // uploadForm.addEventListener("submit", async (event) => {
    //     event.preventDefault(); // Prevent the page from reloading

    //     const fileInput = document.getElementById("resume");
    //     const file = fileInput.files[0];

    //     if (file) {
    //         const formData = new FormData();
    //         formData.append("resume", file);

    //         try {
    //             const response = await fetch("https://f4d9-105-179-5-74.ngrok-free.app/upload", {
    //                 method: "POST",
    //                 body: formData,
    //             });

    //             if (response.ok) {
    //                 const extractedData = await response.json();

    //                 // Display extracted information
    //                 nameField.textContent = extractedData.name || "N/A";
    //                 dobField.textContent = extractedData.dob || "N/A";
    //                 experienceField.textContent = extractedData.experience || "N/A";
    //                 skillsField.textContent = extractedData.skills || "N/A";

    //                 cvSummary.style.display = "block"; // Show extracted data section
    //             } else {
    //                 console.error("Failed to extract data from the CV.");
    //                 alert("Failed to process your CV. Please try again.");
    //             }
    //         } catch (error) {
    //             console.error("Error uploading CV:", error);
    //             alert("An error occurred while uploading your CV.");
    //         }
    //     } else {
    //         alert("Please select a file to upload.");
    //     }
    // });
});

document.addEventListener("DOMContentLoaded", () => {
    const getStartedBtn = document.getElementById("get-started-btn");
    const resumeUploadSection = document.getElementById("resume-upload");
    const cards = document.querySelectorAll(".card");

    // Check localStorage to make cards visible when returning to the page
    if (localStorage.getItem("cardsVisible") === "true") {
        resumeUploadSection.style.display = "flex"; // Show the cards on load
        cards.forEach((card) => {
            card.style.opacity = 1; // Ensure visibility
            card.style.animation = "rise-animation 2s ease-out forwards";
        });
    }

    getStartedBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        resumeUploadSection.style.display = "flex"; // Show the upload section
        getStartedBtn.parentElement.style.marginBottom = "2rem"; // Add spacing below "Get Started" button

        // Trigger animation for the cards
        cards.forEach((card) => {
            card.style.opacity = 1; // Ensure visibility
            card.style.animation = "rise-animation 2s ease-out forwards";
        });

        // Save the visibility state of cards in localStorage
        localStorage.setItem("cardsVisible", "true");
    });
});

document.getElementById('upload-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById('resume');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file before uploading.');
        return;
    }

    formData.append('file', file);

    try {
        const response = await fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('name').textContent = data.name;  // Display extracted name
        } else {
            alert('Failed to fetch data from backend.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
    }
});

function displayExtractedData(text) {
    // Display the extracted text in the "cv-summary" section
    const cvSummary = document.getElementById('cv-summary');
    cvSummary.style.display = 'block';
    document.getElementById('name').textContent = extractName(text); // Add logic to extract the name
    document.getElementById('dob').textContent = extractDOB(text); // Add logic to extract date of birth
    document.getElementById('experience').textContent = extractExperience(text); // Add logic for experience
    document.getElementById('skills').textContent = extractSkills(text); // Add logic for skills
}

// Placeholder functions for extracting data (you’ll implement actual logic)
function extractName(text) {
    return "John Doe"; // Replace with proper extraction logic
}
function extractDOB(text) {
    return "January 1, 1990"; // Replace with proper extraction logic
}
function extractExperience(text) {
    return "5 years in software development"; // Replace with proper extraction logic
}
function extractSkills(text) {
    return "Python, Flask, Machine Learning"; // Replace with proper extraction logic
}
