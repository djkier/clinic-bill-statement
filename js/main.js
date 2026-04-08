import "./sections/patient-details.js ";
import "./sections/services-packages.js";
import "./sections/additional-services.js";
import "./sections/others.js";

import { processPatientDetails } from "./sections/patient-details.js";

const previewBtn = document.querySelector("#generate-preview-btn");

previewBtn.addEventListener("click", () => {
    processPatientDetails();
})