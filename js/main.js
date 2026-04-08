import "./sections/patient-details.js ";
import "./sections/services-packages.js";
import "./sections/additional-services.js";
import "./sections/others.js";

import { processPatientDetails } from "./sections/patient-details.js";
import { processOtherDetailsNonItemized } from "./sections/others.js";

const previewBtn = document.querySelector("#generate-preview-btn");
const dialog = document.querySelector("dialog");

previewBtn.addEventListener("click", () => {
    processPatientDetails();
    processOtherDetailsNonItemized(); 

    // dialog.showModal();
})