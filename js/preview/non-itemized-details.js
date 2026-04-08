//today's date
const statementDate = document.querySelector("#statement-date");
//patient details
const patientName = document.querySelector("#patient-name-preview");
const patientAge = document.querySelector("#patient-age-preview");
const admissionDate = document.querySelector("#admission-preview");
const dischargeDate = document.querySelector("#discharge-preview");
const babyGender = document.querySelector("#baby-gender");
const gravida = document.querySelector("#g");
const para = document.querySelector("#p");

//other details
const patientNameSignDiv = document.querySelector("#patient-signature");
const preparedBySignDiv = document.querySelector("#prepared-signature");



// -----------------------------------------------------
// Patient Details      --------------------------------
// -----------------------------------------------------

export function previewPatientDetails(details) {
    patientName.textContent = details.patientName;
    patientAge.textContent = details.age;
    admissionDate.textContent = details.dateOfAdmission;
    dischargeDate.textContent = details.dateOfDischarge;
    babyGender.textContent = genderEquivalent(details.babyGender);
    gravida.textContent = details.pregnancyCount;
    para.textContent = details.parity;
    prependName(details.patientName, patientNameSignDiv);
}

function genderEquivalent(gender) {
    return gender.toLowerCase() === "male" ? "boy" : "girl";
}

// -----------------------------------------------------
// Others               --------------------------------
// -----------------------------------------------------
export function previewOtherDetails(others) {
    statementDate.textContent = others.dateToday;
    prependName(others.preparedBy, preparedBySignDiv);
}

function prependName(name, div) {
    if (div.children.length < 2) {
        addPara(name, div);
    } else {
        const namePara = div.children[0];
        namePara.textContent = name;
    }
}


//Add new p element on the designated div 
function addPara(name, div) {
    const currentPara = div.querySelector("p");

    const newPara = document.createElement("p");
    newPara.textContent = name;

    div.insertBefore(newPara, currentPara);
}