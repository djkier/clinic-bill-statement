import "./sections/patient-details.js ";
import "./sections/services-packages.js";
import "./sections/additional-services.js";
import "./sections/others.js";

import { getPatientDetails } from "./state.js";
import { handlePatientDetailsState } from "./sections/patient-details.js";

const previewBtn = document.querySelector("#generate-preview-btn");

previewBtn.addEventListener("click", () => {
    handlePatientDetailsState();
    const patientDetails = getPatientDetails();

    console.log("Patient Name: " + patientDetails.patientName);
    console.log("Admission Date: " + patientDetails.dateOfAdmission);
    console.log("Discharge Date: " + patientDetails.dateOfDischarge);
    console.log("Age: " + patientDetails.age);
    console.log("Baby's Gender: " + patientDetails.babyGender);
    console.log("Pregnancy Count: " + patientDetails.pregnancyCount);
    console.log("Parity: " + patientDetails.parity);
})