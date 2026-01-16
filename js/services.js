const mcpData = {
    "Maternity Care Package (MCP)" : [
        {
            name: "Professional Fee",
            professionals: [
                {
                    name: "Liza H. Rual, RM",
                    amount: 15600,
                    philHealth: 6240
                },
                {
                    name: "Dr. Genevieve Mendoza-Dalire",
                    amount: 0,
                    philHealth: 6240
                }
            ]
        },
        {
            name: "Nursing Service Fee",
            amount: 1500,
            philHealth: 1500
        }, 
        {
            name: "Recovery Room",
            amount: 1000,
            philHealth: 1000
        },
        {
            name: "Prenatal and Postnatal Fee",
            amount: 2000,
            philHealth: 2000

        },
        {
            name: "Medications",
            amount: 3500,
            philHealth: 3500

        },
        {
            name: "Miscellaneous Fee",
            amount: 1360,
            philHealth: 1360

        }, 
    ]
};
const encpData = {
    "Expanded Newborn Care Package (ENCP)" : [
        {
            name: "Expanded Newborn Screening",
            amount: 2761.50,
            philHealth: 2761.50
        },
        {
            name: "BCG Vaccine",
            amount: 500,
            philHealth: 500
        },
        {
            name: "Vitamin K",
            amount: 200,
            philHealth: 200
        },
        {
            name: "Hepatitis B Vaccine",
            amount: 500,
            philHealth: 500
        },
        {
            name: "Erythromycin Eye Prophylaxis",
            amount: 130,
            philHealth: 130
        },
        {
            name: "Cord Clamp",
            amount: 50,
            philHealth: 50
        },
        {
            name: "Professional Fee",
            amount: 978,
            philHealth: 978
        }
    ]
};
const newServiceData = {
    "Additional Services / Medications" : [

    ]
}

let mcpNetAmount = 0;
let encpNetAmount = 0;
let additionalAmount = 0;


const mcpCard = document.querySelector("#mcp");
const mcpCheckBox = document.querySelector("#mcp-box");
const profFeeCard = document.querySelector("#professional-fee");
const encpCard = document.querySelector("#encp");
const encpCheckBox = document.querySelector("#encp-box");
const tbody = document.querySelector("tbody");

const trCount = () => tbody.querySelectorAll("tr").length;
// default
profFeeCard.style.display = "none";

defaultRow();
function defaultRow() {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    
    td.style.textAlign = "left";
    td.style.padding = "4px 12px";
    td.textContent = "No services added";
    
    tr.appendChild(td);;
    tbody.appendChild(tr);

}



mcpCheckBox.addEventListener("change", e => {
    const rowClassName = "mcp";
    if (mcpCheckBox.checked) {
        mcpCard.style.backgroundColor = "oklch(94.158% 0.02414 254.032)";
        profFeeCard.style.display = "flex";
        mcpRow(rowClassName);
    } else {
        mcpCard.style.backgroundColor = "oklch(0.985 0.002 247.839)";
        profFeeCard.style.display = "none";
        removeRowByClass(rowClassName);
        trCount() < 1 && defaultRow();
    }
});

// mcpRow();
function mcpRow(rowClassName) {
    if (trCount() === 1) {
        tbody.innerHTML = "";
    }
    tableBuilder(mcpData, mcpNetAmount, rowClassName);
}

// encpRow();
function encpRow(rowClassName) {
    if (trCount() === 1) {
        tbody.innerHTML = "";
    }

    tableBuilder(encpData, encpNetAmount, rowClassName);
}



encpCheckBox.addEventListener("change", e => {
    const rowClassName = "encp";
    if (encpCheckBox.checked) {
        encpCard.style.backgroundColor = "oklch(94.158% 0.02414 254.032)";
        encpRow(rowClassName);
    } else {
        encpCard.style.backgroundColor = "oklch(0.985 0.002 247.839)";
        removeRowByClass(rowClassName);
        trCount() < 1 && defaultRow();
    }
});

function tableBuilder(data, netAmount, rowClass) {
    const packageName = Object.keys(data)[0];
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
    trPackageName.classList.add(packageType.toLowerCase(), rowClass);

    tbody.appendChild(trPackageName);

    data[packageName].forEach(item => {
        const trItem = document.createElement("tr");
        const tdItemName = document.createElement("td");
        const tdItemAmount = document.createElement("td");
        const tdItemPhil = document.createElement("td");
        const tdItemNet = document.createElement("td");

        tdItemName.classList.add("item-name");
        tdItemAmount.classList.add("item-amount");
        tdItemPhil.classList.add("item-phil");
        tdItemNet.classList.add("item-net");

        tdItemName.textContent = item.name;

        trItem.classList.add(rowClass);
        trItem.appendChild(tdItemName);

        if (item.professionals) {
            tbody.appendChild(trItem);

            item.professionals.forEach(prof => {
                if (prof.amount) {
                    const trProf = document.createElement("tr");
                    const tdProfName = document.createElement("td");
                    const tdProfAmount = document.createElement("td");
                    const tdProfPhil = document.createElement("td");
                    const tdProfNet = document.createElement("td");

                    trProf.classList.add("professional-row", rowClass);
                    tdProfName.classList.add("item-name");

                    const net = Number(prof.amount) - Number(prof.philHealth);
                    netAmount += net;
                    // console.log("Package Name: " + packageName + " Amount: " + netAmount);

                    tdProfName.textContent = prof.name;
                    tdProfAmount.textContent = numberFormat(prof.amount);
                    tdProfPhil.textContent = numberFormat(prof.philHealth);
                    tdProfNet.textContent = numberFormat(net);

                    trProf.appendChild(tdProfName);
                    trProf.appendChild(tdProfAmount);
                    trProf.appendChild(tdProfPhil);
                    trProf.appendChild(tdProfNet);
                    
                    tbody.appendChild(trProf);
                }
            });

            
        }

        if (item.amount && item.philHealth) {
            const net = Number(item.amount) - Number(item.philHealth)
            netAmount += net;
            // console.log("Package Name: " + packageName + " Amount: " + netAmount);

            tdItemAmount.textContent = numberFormat(item.amount);
            tdItemPhil.textContent = numberFormat(item.philHealth);
            tdItemNet.textContent = numberFormat(net);

            trItem.appendChild(tdItemAmount);
            trItem.appendChild(tdItemPhil);
            trItem.appendChild(tdItemNet);

            tbody.appendChild(trItem);
        }
    });
}

function removeRowByClass (rowClassName) {
    tbody.querySelectorAll("tr."+rowClassName).forEach(tr => {
            tr.remove();
    })
}

function numberFormat(amount) {
    return amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


