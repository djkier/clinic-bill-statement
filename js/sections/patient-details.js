import { setPatientName, setDateOfAdmission, setDateOfDischarge, setAge, setBabyGender, setPregnancyCount, setParity } from "../state.js";

// input selector
const patientNameInput = document.querySelector("#patient-name");
const admissionDateInput = document.querySelector("#admission-date");
const dischargeDateInput = document.querySelector("#discharge-date");
const patientAgeInput = document.querySelector("#patient-age");
const genderSelect = document.querySelector("#gender");
const gravidaInput = document.querySelector("#gravida");
const paraInput = document.querySelector("#para");

const today = new Date();
const yesterday = (new Date()).setDate(today.getDate() - 1);

// -----------------------------------------------------
// DEFAULTS    -----------------------------------------
// -----------------------------------------------------
defaultDate(admissionDateInput, new Date(yesterday));
defaultDate(dischargeDateInput, new Date());


//Patient name has no constraints

// -----------------------------------------------------
// DATE FORMATS-----------------------------------------
// -----------------------------------------------------
function defaultDate(input, date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    
    input.value = `${yyyy}-${mm}-${dd}`;
}

const dateFormat = date =>
    (new Date(date)).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
});

//Constraints
dischargeDateInput.addEventListener("change", e => {
    // automatic admission when changing discharge value
    const dateOfDischarge= new Date(e.target.value);
    const possibleDateOfAdmission = (dateOfDischarge.setDate(dateOfDischarge.getDate() - 1));
    defaultDate(admissionDateInput, new Date(possibleDateOfAdmission));
});


// -----------------------------------------------------
// Age       -------------------------------------------
// -----------------------------------------------------
//Constraints
patientAgeInput.addEventListener("input", e => {
    let ageValue = Number(e.target.value);
    if (ageValue < 0) {
        patientAgeInput.value = 0;
    } 

    if (ageValue > 100) {
        patientAgeInput.value = 100;
    }

})


// -----------------------------------------------------
// Pregnancy Count--------------------------------------
// -----------------------------------------------------
//Constraints
gravidaInput.addEventListener("input", e => {
    let g = Number(e.target.value);

    if (g > 20) {
        g = 20;
    }

    if (g === "" || g < 0) {
        g = 0;
    }

    gravidaInput.value = g;
});

// -----------------------------------------------------
// Parity Count   --------------------------------------
// -----------------------------------------------------
//Constraints
paraInput.addEventListener("input", e => {
    let p = Number(e.target.value);

    if (p > Number(gravidaInput.value)) {
        p = Number(gravidaInput.value);
    }

    if (p === "" || p < 0) {
        p = 0;
    }

    paraInput.value = p;


});




// for later use
// patientNameInput.addEventListener("input", e => {
//     let nameValue = e.target.value
//                         .trim()
//                         .split(" ")
//                         .filter(word => word)
//                         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//                         .join(" ");

//     if (nameValue.length === 0 ) {

//     }
// })

function formatName(input){
    return input.value
                .trim()
                .split(" ")
                .filter(word => word)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
}

export function handlePatientDetailsState() {
    setPatientName(formatName(patientNameInput));
    setDateOfAdmission(admissionDateInput.value);
    setDateOfDischarge(dischargeDateInput.value);
    setAge(patientAgeInput.value);
    setBabyGender(genderSelect.value);
    setPregnancyCount(gravidaInput.value);
    setParity(paraInput.value); 
}

