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






//default values
const noEntryDefault = "&nbsp;&nbsp;&#8212;";

inputToPreview(patientNameInput, patientNamePreview);

function inputToPreview (input, preview) {
    input.addEventListener("input", e => {
        preview.textContent = e.target.value;
    });
}