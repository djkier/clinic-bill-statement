// input selector
const patientNameInput = document.querySelector("#patient-name");
const admissionDateInput = document.querySelector("#admission-date");
const dischargeDateInput = document.querySelector("#discharge-date");
const patientAgeInput = document.querySelector("#patient-age");
const genderSelect = document.querySelector("#gender");
const gravidaInput = document.querySelector("#gravida");
const paraInput = document.querySelector("#para");


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




admissionDateInput.addEventListener("change", e => {

});

dischargeDateInput.addEventListener("change", e => {
    // automatic admission when changing discharge value
    const dateOfDischarge= new Date(e.target.value);
    const possibleDateOfAdmission = (dateOfDischarge.setDate(dateOfDischarge.getDate() - 1));
    inputDateFormatter(admissionDateInput, new Date(possibleDateOfAdmission));

});



// -----------------------------------------------------
// NON DATES -------------------------------------------
// -----------------------------------------------------
const noEntryDefault = "&nbsp;&nbsp;&#8212;";





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


})

patientAgeInput.addEventListener("input", e => {
    let ageValue = Number(e.target.value);
    if (ageValue < 10 || ageValue > 60) {
        ageValue = noEntryDefault;
    }

})






function genderEquiv (gender) {
    return gender === "male" ? "boy" : "girl";
}

gravidaInput.addEventListener("input", e => {
    let g = Number(e.target.value);

    if (g > 20) {
        g = 20;
        gravidaInput.value = g;
    }

    if (g < 0) {
        gravidaInput.value = 0;
    }

    if (g === "" || g < 0) {
        g = 0;
    }


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


});

genderSelect.addEventListener("input", e => {

})

