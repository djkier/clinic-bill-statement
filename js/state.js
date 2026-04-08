const billInfo = {
    patientDetails: {
        patientName: "",
        dateOfAdmission: new Date(),
        dateOfDischarge: new Date(),
        age: 0,
        babyGender: "",
        pregnancyCount: 0,
        parity: 0
    },
    servicesPackages: {
        mcp: {
            profFee: {
                amount: {
                    rual: 0,
                    dalire: 0
                },
                philHealth: 6240 
            },
            nursingService: {
                amount: 0,
                philHealth: 1500
            },
            recoveryRoom: {
                amount: 0,
                philHealth: 1000
            },
            prenatalAndPost: {
                amount: 0,
                philHealth: 2000
            },
            medication: {
                amount: 0,
                philHealth: 3500
            },
            miscellaneous: {
                amount: 0,
                philHealth: 1360
            }
        },
        encp: {
            profFee: {
                amount: 0,
                philHealth: 978
            },
            ens: {
                amount: 0,
                philHealth: 2761.50
            },
            bcgVaccine: {
                amount: 0,
                philHealth: 500
            },
            vitK: {
                amount: 0,
                philHealth: 200
            },
            hepaBVaccine: {
                amount: 0,
                philHealth: 500
            },
            erythromycin: {
                amount: 0,
                philHealth: 130
            },
            cordClamp: {
                amount: 0,
                philHealth: 50
            }
        } 
    },
    additionalServices: [],
    others: {
        discountAmount: 0,
        preparedBy: "",
        dateToday: new Date()
    }
};

function getValueOrDefault(value, def) {
    return (value === "" || value === null || value === undefined) ? def : value; 
}

function defaultEmptyText(value) {
    return getValueOrDefault(value, "---");
}

function defaultEmptyNumber(value) {
    return getValueOrDefault(value, 0);
}

function defaultEmptyDate(value) {
    return getValueOrDefault(value, "YYYY-MM-DD");
}


export function setPatientName(name) {
    billInfo.patientDetails.patientName = defaultEmptyText(name)
}

export function setDateOfAdmission(date) {
    billInfo.patientDetails.dateOfAdmission = defaultEmptyDate(date);
}

export function setDateOfDischarge(date) {
    billInfo.patientDetails.dateOfDischarge = defaultEmptyDate(date);
}

export function setAge(age) {
    billInfo.patientDetails.age = defaultEmptyNumber(age);
}

export function setBabyGender(gender) {
    billInfo.patientDetails.babyGender = defaultEmptyText(gender);
}

export function setPregnancyCount(count) {
    billInfo.patientDetails.pregnancyCount = defaultEmptyNumber(count);
}

export function setParity(count) {
    billInfo.patientDetails.parity = defaultEmptyNumber(count);
}

export function setLizaAmount(amount) {
    billInfo.servicesPackages.mcp.profFee.amount.liza = amount;
}

export function setDalireAmount(amount) {
    billInfo.servicesPackages.mcp.profFee.amount.dalire = amount;
}

export function setNursingService(amount) {
    billInfo.servicesPackages.mcp.nursingService.amount = amount;
}

export function setRecoveryRoom(amount) {
    billInfo.servicesPackages.mcp.recoveryRoom.amount = amount;
}

export function setPreAndPostNatal(amount) {
    billInfo.servicesPackages.mcp.prenatalAndPost.amount = amount;
}

export function setMedication(amount) {
    billInfo.servicesPackages.mcp.medication.amount = amount;
}

export function setMiscellaneous(amount) {
    billInfo.servicesPackages.mcp.miscellaneous.amount = amount;
}

export function setEncpProfFee(amount) {
    billInfo.servicesPackages.encp.profFee.amount = amount;
}

export function setEns(amount) {
    billInfo.servicesPackages.encp.ens.amount = amount;
}

export function setBcgVaccine(amount) {
    billInfo.servicesPackages.encp.bcgVaccine.amount = amount;
}

export function setVitK(amount) {
    billInfo.servicesPackages.encp.vitK.amount = amount;
}

export function setHepaBVaccine(amount) {
    billInfo.servicesPackages.encp.hepaBVaccine.amount = amount;
}

export function setErythromycin(amount) {
    billInfo.servicesPackages.encp.erythromycin.amount = amount;
}

export function setCordClamp(amount) {
    billInfo.servicesPackages.encp.cordClamp.amount = amount;
}

export function createNewService(nameVal, qtyVal, unitVal, amountVal) {
    return {
        name: nameVal,
        qty: qtyVal,
        unit: unitVal,
        amount: amountVal
    }
}

export function addNewAdditionalServices(newService) {
    billInfo.additionalServices.push(newService);
}

export function setDiscount(amount) {
    billInfo.others.discountAmount = defaultEmptyNumber(amount);
}

export function setPreparedBy(name) {
    
    billInfo.others.preparedBy = defaultEmptyText(name);
}

export function setDateToday(date) {
    billInfo.others.dateToday = defaultEmptyDate(date);
}

export function getPatientDetails() {
    return { ...billInfo.patientDetails };
}

export function getOtherDetails() {
    return { ...billInfo.others };
}

export function getDiscountAmount() {
    return billInfo.others.discountAmount;
}
