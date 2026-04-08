const patientName = document.querySelector("#patient-name-preview");
const patientAge = document.querySelector("#patient-age-preview");
const admissionDate = document.querySelector("#admission-preview");
const dischargeDate = document.querySelector("#discharge-preview");
const babyGender = document.querySelector("#baby-gender");
const gravida = document.querySelector("#g");
const para = document.querySelector("#p");

// -----------------------------------------------------
// Patient Details      --------------------------------
// -----------------------------------------------------

export function previewPatientDetails(details) {
    patientName.textContent = details.patientName;
    patientAge.textContent = details.age;
    admissionDate.textContent = details.dateOfAdmission;
    dischargeDate.textContent = details.dateOfDischarge;
    babyGender.textContent = details.babyGender;
    gravida.textContent = details.pregnancyCount;
    para.textContent = details.parity;
}