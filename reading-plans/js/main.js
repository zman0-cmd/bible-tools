// Basic error handling.

document.addEventListener("DOMContentLoaded", () => {
    let generateButton = document.getElementById("generateButton");
    if (generateButton) {
        generateButton.addEventListener("click", generateReadingPlan);
    } else {
        console.error("Error: 'generateButton' not found in the document.");
    }
});

// Advanced mode vs basic mode. Basic mode on refresh. No Local Storage.

document.addEventListener("DOMContentLoaded", () => {
    let modeToggle = document.getElementById("modeToggle");
    let modeLabel = document.getElementById("modeLabel");

    modeToggle.checked = false;
    modeLabel.textContent = "Basic Mode";
    toggleAdvancedMode(false);

    // Set default mode
    modeToggle.addEventListener("change", () => {
        let isAdvanced = modeToggle.checked;
        modeLabel.textContent = isAdvanced ? "Advanced Mode" : "Basic Mode";

        // Show/Hide advanced elements
        toggleAdvancedMode(isAdvanced);
    });

    // Function to toggle UI elements
    function toggleAdvancedMode(isAdvanced) {
        let advancedElements = document.querySelectorAll(".advanced");
        advancedElements.forEach(element => {
            element.style.display = isAdvanced ? "block" : "none";
        });
    }
});

// Theme code
document.addEventListener("DOMContentLoaded", () => {
    let themeToggle = document.getElementById("themeToggle");
    let themeLabel = document.getElementById("themeLabel");

    // Check local storage for user preference
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.checked = true;
        themeLabel.textContent = "Dark Mode";
    }

    // Toggle Dark/Light Mode
    themeToggle.addEventListener("change", () => {
        let isDarkMode = themeToggle.checked;
        document.body.classList.toggle("dark-mode", isDarkMode);
        themeLabel.textContent = isDarkMode ? "Dark Mode" : "Light Mode";

        // Save preference in local storage
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let planDropdown = document.getElementById("planType");
    let apocryphaOption = document.getElementById("apocryphaOption");

    // Function to check if Apocrypha should be displayed
    function updateApocryphaVisibility() {
        let selectedPlan = planDropdown.value;
        if (selectedPlan === "bible") {
            apocryphaOption.style.display = "block"; // Show checkbox
        } else {
            apocryphaOption.style.display = "none"; // Hide checkbox
        }
    }

    // Run function on dropdown change
    planDropdown.addEventListener("change", updateApocryphaVisibility);

    // Run function once on page load to apply the correct state
    updateApocryphaVisibility();
});

document.addEventListener("DOMContentLoaded", () => {
    let clearButton = document.getElementById("clearButton");

    clearButton.addEventListener("click", () => {
        document.getElementById("output").innerHTML = ""; // Clear output table
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let durationRadios = document.querySelectorAll('input[name="duration"]');
    let endDateInput = document.getElementById("endDate");

    // Function to enable/disable endDate field
    function updateEndDateState() {
        let selectedOption = document.querySelector('input[name="duration"]:checked').value;
        if (selectedOption === "custom") {
            endDateInput.disabled = false; // Enable if "Custom" is selected
        } else {
            endDateInput.disabled = true; // Disable for preset durations
            endDateInput.value = ""; // Clear the input if switching back
        }
    }

    // Add event listeners to all radio buttons
    durationRadios.forEach(radio => {
        radio.addEventListener("change", updateEndDateState);
    });

    // Initialize state on page load
    updateEndDateState();
});


async function generateReadingPlan() {
    let planType = document.getElementById("planType").value;
    
    if (!planType) {
        alert("Please select a plan type.");
        return;
    }

    switch (planType) {
        case "whole-bible":
            generateWholeBiblePlan();
            break;
        case "new-testament":
            generateNewTestamentPlan();
            break;
        case "thematic":
            generateThematicPlan();
            break;
        case "chronological":
            generateChronologicalPlan();
            break;
        default:
            alert("Invalid plan type selected.");
    }
}
