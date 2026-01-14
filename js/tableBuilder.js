const tableData = [
    {
        "Maternity Care Package (MCP)" : [
            {
                name: "Professional Fee",
                amount: 0,
            },
            {
                name: "Liza H. Rual, RM",
                amount: 6240,
            },
            {
                name: "Nursing Service Fee",
                amount: 1500,
            },
            {
                name: "Recovery Room",
                amount: 1000,
            },
            {
                name: "Prenatal and Postnatal Fee",
                amount: 2000,
            },
            {
                name: "Medications",
                amount: 3500,
            },
            {
                name: "Miscellaneous Fee",
                amount: 1360
            }
        ]
    },
    {
        "Expanded Newborn Care (ENCP)" : [
            {
                name: "Expanded Newborn Screening",
                amount: 2761.50
            },
            {
                name: "Vitamin K",
                amount: 400
            },
            {
                name: "Hepatitis B Vaccine",
                amount: 500
            },
            {
                name: "Erythromycin Eye Prophylaxis",
                amount: 180
            },
            {
                name: "BCG Vaccine",
                amount: 300
            },
            {
                name: "Professional Fee",
                amount: 978
            }
        ]
    }
]

const tbody = document.querySelector("tbody");
// const tr = document.createElement("tr");
// const td1 = document.createElement("td");
// const td2 = document.createElement("td");

// td2.textContent = "21";

// tr.appendChild(td1);
// tr.appendChild(td2);

// tbody.appendChild(tr);

tableData.forEach( entry => {
    const packageName = Object.keys(entry)[0];
    const trPackageName = document.createElement("tr");
    const tdPackageName = document.createElement("td");
    const packageType = packageName.split(" ")[0];



    tdPackageName.textContent = packageName;
    trPackageName.appendChild(tdPackageName);

    for (let i = 0; i < 3; i++) {
        const tdRowPackageName = document.createElement("td");
        trPackageName.appendChild(tdRowPackageName);
    }

    tdPackageName.classList.add("package-name");
    trPackageName.classList.add("package-name-row", packageType.toLowerCase());


    tbody.appendChild(trPackageName);

    entry[packageName].forEach(packageItem => {
        const trItem = document.createElement("tr");
        const tdItemName = document.createElement("td");
        const tdItemAmount = document.createElement("td");
        const tdItemPhil = document.createElement("td");
        const tdItemNet = document.createElement("td");

        tdItemName.classList.add("item-name");
        tdItemAmount.classList.add("item-amount");
        tdItemPhil.classList.add("item-phil");
        tdItemNet.classList.add("item-net");

        tdItemName.textContent = packageItem.name;

        if (packageItem.name === "Liza H. Rual, RM") {
            trItem.classList.add("professional-row");
        }

        if (!(packageItem.amount == 0)) {
            tdItemAmount.textContent = numberFormat(packageItem.amount);
            tdItemPhil.textContent = numberFormat(packageItem.amount);
            tdItemNet.textContent = numberFormat(123);
        }

        trItem.appendChild(tdItemName);
        trItem.appendChild(tdItemAmount);
        trItem.appendChild(tdItemPhil);
        trItem.appendChild(tdItemNet);

        tbody.appendChild(trItem);
    });

});

function numberFormat(amount) {
    return amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

