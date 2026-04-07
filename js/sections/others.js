import { nonNegativeInput } from "../util.js";

const preparedByValues = [
    "Liza H. Rual, RM", 
    "Allheryl Yvette D. Campos", 
    "Mar Angelo H. Ignacio", 
    "Cherrish Paggad", 
    "Don Justine Fontanilla"
];

const discountInput = document.querySelector("#discounts");
const preparedSelect = document.querySelector("#prepared-selection");

// -----------------------------------------------------
// DEFAULTS    -----------------------------------------
// -----------------------------------------------------
addOptions();
nonNegativeInput(discountInput);


// -----------------------------------------------------
// DISCOUNTS   -----------------------------------------
// -----------------------------------------------------


// -----------------------------------------------------
// SELECTION   -----------------------------------------
// -----------------------------------------------------
function addOptions() {
    preparedByValues.sort((a, b) => a.localeCompare(b));

    preparedByValues.forEach(opt => {
        const optionEl = document.createElement("option");
        optionEl.value = opt;
        optionEl.textContent = formatName(opt);

        preparedSelect.appendChild(optionEl);
    })
}

function formatName(name) {
    name = name.split(",")[0].trim();

    const parts = name.split(" ");

    const lastName = parts.pop();
    const firstPart = parts.join(" ");

    return `${firstPart} ${lastName[0]}.`;
}