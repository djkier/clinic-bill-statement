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
        states: {
            mcp: false,
            encp: false
        },
        mcp: {
            profFee: {
                name: "Professional Fee",
                professionals: [
                    {
                        name: "Liza H. Rual, RM",
                        id: "rual-pf",
                        amount: 0
                    },
                    {
                        name: "Dr.Genevieve Mendoza-Dalire",
                        id: "dalire-pf",
                        amount: 0
                    }
                ],
                philHealth: 6240 
            },
            nursingService: {
                name: "Nursing Service Fee",
                amount: 1500,
                philHealth: 1500
            },
            recoveryRoom: {
                name: "Recovery Room",
                amount: 1000,
                philHealth: 1000
            },
            prenatalAndPost: {
                name: "Prenatal and Postnatal Fee",
                amount: 2000,
                philHealth: 2000
            },
            medication: {
                name: "Medications",
                amount: 3500,
                philHealth: 3500
            },
            miscellaneous: {
                name: "Miscellaneous Fee",
                amount: 1360,
                philHealth: 1360
            }
        },
        encp: {
            profFee: {
                name: "Professional Fee",
                amount: 978,
                philHealth: 978
            },
            ens: {
                name: "Expanded Newborn Screening",
                amount: 2761.50,
                philHealth: 2761.50
            },
            bcgVaccine: {
                name: "BCG Vaccine",
                amount: 500,
                philHealth: 500
            },
            vitK: {
                name: "Vitamin K",
                amount: 200,
                philHealth: 200
            },
            hepaBVaccine: {
                name: "Hepatitis B Vaccine",
                amount: 500,
                philHealth: 500
            },
            erythromycin: {
                name: "Erythromycin Eye Prophylaxis",
                amount: 130,
                philHealth: 130
            },
            cordClamp: {
                name: "Cord Clamp",
                amount: 50,
                philHealth: 50
            }
        } 
    },
    additionalServices: [],
    others: {
        subTotalAmount: 0,
        discountAmount: 0,
        totalAmount: 0,
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

export function setMcpState(bool) {
    billInfo.servicesPackages.states.mcp = bool;
}

export function setEncpState(bool) {
    billInfo.servicesPackages.states.encp = bool;
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

export function setProfAmount(id, amount) {
    const profArr = billInfo.servicesPackages.mcp.profFee.professionals;
    

    for (let prof of profArr) {
        if (prof.id.toLowerCase() === id.toLowerCase()) {
            prof.amount = defaultEmptyNumber(amount);
            break;
        }
    }
}

function createNewService(nameVal, qtyVal, unitVal, amountVal) {
    return {
        name: nameVal,
        qty: qtyVal,
        unit: unitVal,
        amount: amountVal
    }
}

function validValue(value) {
    const val = Number(value);
    return !isNaN(val) && val > 0;
}

export function addNewAdditionalServices(nameVal, qtyVal, unitVal, amountVal) {
    if (validValue(qtyVal) && validValue(unitVal)) {
        const newService = createNewService(nameVal, qtyVal, unitVal, amountVal);
        billInfo.additionalServices.push(newService);
    }

}

export function clearAdditionalServices() {
    billInfo.additionalServices.length = 0;
}

export function getAdditionalServices() {
    return [ ...billInfo.additionalServices ];
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

export function getMcpDetails() {
    return { ...billInfo.servicesPackages.mcp };
}

export function setMcpDetails() {
    return billInfo.servicesPackages.mcp;
}

export function getEncpDetails() {
    return { ...billInfo.servicesPackages.encp };
}

export function setEncpDetails() {
    return billInfo.servicesPackages.encp;
}

export function getOtherDetailsxxx() {
    return { ...billInfo.others };
}

export function getOtherDetails() {
    return {
        datePrepared: billInfo.others.dateToday,
        preparedBy: billInfo.others.preparedBy
    }
}

export function getDiscountAmount() {
    return billInfo.others.discountAmount;
}

export function getServicePackages() {
    return { ...billInfo.servicesPackages };
}

export function resetSubTotal() {
    billInfo.others.subTotalAmount = 0;
}

export function addAmountOnSubTotal(amount) {
    billInfo.others.subTotalAmount += Number(amount);
}

export function getSubTotal() {
    return billInfo.others.subTotalAmount;
}

export function updateTotalAmount() {
    billInfo.others.totalAmount = getSubTotal() - getDiscountAmount();
}

export function getTotalAmount() {
    return billInfo.others.totalAmount;
}

export function getSummaryOfCharges() {
    return {
        subTotal: getSubTotal(),
        discount: getDiscountAmount(),
        total: getTotalAmount()
    }
}

export function saveBill() {
    return { ...billInfo };
}
