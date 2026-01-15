// input selector
const patientNameInput = document.querySelector("#patient-name");
const patientAgeInput = document.querySelector("#patient-age");
const admissionDateInput = document.querySelector("#admission-date");
const dischargeDateInput = document.querySelector("#discharge-date");
const gravidaInput = document.querySelector("#gravida");
const paraInput = document.querySelector("#para");
const babyGenderSelection = document.querySelector("#gender");

// preview selector
const statementDate = document.querySelector("#statement-date");
const patientNamePreview = document.querySelector("#patient-name-preview");
const patientAgePreview = document.querySelector("#patient-age-preview");
const admissionDatePreview = document.querySelector("#admission-preview");
const dischargeDatePreview = document.querySelector("#discharge-preview");
const gravidaPreview = document.querySelector("#g");
const paraPreview = document.querySelector("#p");
const babyGender = document.querySelector("#baby-gender");



// -----------------------------------------------------
// DATE FORMATS-----------------------------------------
// -----------------------------------------------------
const today = new Date();
const yesterday = (new Date()).setDate(today.getDate() - 1);

function inputDateFormatter(input, date) {
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


// Bill information date input default
inputDateFormatter(admissionDateInput, new Date(yesterday));
inputDateFormatter(dischargeDateInput, new Date());

// preview dates
statementDate.textContent = dateFormat(today);
admissionDatePreview.textContent = dateFormat(admissionDateInput.value);
dischargeDatePreview.textContent = dateFormat(dischargeDateInput.value);

admissionDateInput.addEventListener("change", e => {
    admissionDatePreview.textContent = dateFormat(e.target.value);
});

dischargeDateInput.addEventListener("change", e => {
    // automatic admission when changing discharge value
    const dateOfDischarge= new Date(e.target.value);
    const possibleDateOfAdmission = (dateOfDischarge.setDate(dateOfDischarge.getDate() - 1));
    inputDateFormatter(admissionDateInput, new Date(possibleDateOfAdmission));

    admissionDatePreview.textContent = dateFormat(possibleDateOfAdmission);
    dischargeDatePreview.textContent = dateFormat(e.target.value);
});



// -----------------------------------------------------
// NON DATES -------------------------------------------
// -----------------------------------------------------
const noEntryDefault = "&nbsp;&nbsp;&#8212;";

noValueFormatter(patientNamePreview);
noValueFormatter(patientAgePreview);

function noValueFormatter(input) {
    if (!input.value) {
        input.innerHTML = noEntryDefault;
    }
}

patientNameInput.addEventListener("input", e => {
    let nameValue = e.target.value
                        .trim()
                        .split(" ")
                        .filter(word => word)
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ");

    if (nameValue.length === 0 ) {
        nameValue = noEntryDefault;
    }

    patientNamePreview.innerHTML = nameValue;
})

patientAgeInput.addEventListener("input", e => {
    let ageValue = Number(e.target.value);
    if (ageValue < 10 || ageValue > 60) {
        ageValue = noEntryDefault;
    }
    patientAgePreview.innerHTML = ageValue;
})


// -----------------------------------------------------
// FINAL DIAGNOSIS -------------------------------------
// -----------------------------------------------------

gravidaPreview.textContent = 0;
paraPreview.textContent = 0;
babyGender.textContent = genderEquiv(babyGenderSelection.value);

function genderEquiv (gender) {
    return gender === "male" ? "boy" : "girl";
}

gravidaInput.addEventListener("input", e => {
    let g = Number(e.target.value);

    if (g < 0) {
        gravidaInput.value = 0;
    }

    if (g === "" || g < 0) {
        g = 0;
    }

    gravidaPreview.textContent = g;
});

paraInput.addEventListener("input", e => {
    let p = Number(e.target.value);

    if (p > Number(gravidaInput.value)) {
        p = Number(gravidaInput.value);
        paraInput.value = p;
    }


    if (p < 0) {
        paraInput.value = 0;
    }

    if (p === "" || p < 0) {
        p = 0;
    }

    paraPreview.textContent = p;
});

