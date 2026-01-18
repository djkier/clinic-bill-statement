const mcpData = {
    "Maternity Care Package (MCP)" : [
        {
            name: "Professional Fee",
            professionals: [
                {
                    name: "Liza H. Rual, RM",
                    amount: 0,
                    philHealth: 6240
                },
                {
                    name: "Dr. Genevieve Mendoza-Dalire",
                    amount: 0,
                    philHealth: 6240
                }
            ],
            philHealth: 6240
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
        // {
        //     id: 1,
        //     description: "xxx",
        //     quantity: 1,
        //     unitPrice: 123,
        //     netAmount: 123
        // }
    ],
    serviceCounter: 0,
}
const serviceFirstKey = Object.keys(newServiceData)[0];


const subTotalItem = {
    rualNetAmount: {
        value: 0,
        isIncluded: false
    },
    dalireNetAmount : {
        value: 0,
        isIncluded: false
    },
    serviceNetAmount : {
        value: 0,
        isIncluded: false
    }
}

const mcpCard = document.querySelector("#mcp");
const mcpCheckBox = document.querySelector("#mcp-box");
const profFeeCard = document.querySelector("#professional-fee");
const rualCheckBox = document.querySelector("#rual-checkbox");
const dalireCheckBox = document.querySelector("#dalire-checkbox");
const encpCard = document.querySelector("#encp");
const encpCheckBox = document.querySelector("#encp-box");
const tbody = document.querySelector("tbody");

const addServiceBtn = document.querySelector("#add-service-btn");
const addServiceCard = document.querySelector("#additional-generated-services");

const trCount = () => tbody.querySelectorAll("tr").length;
// default
const nonEntry = "&nbsp;&nbsp;&#8212;";
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

// mcp professionals should deduct only on 6240 as a whole not per each professional

mcpCheckBox.addEventListener("change", e => {
    const rowClassName = "mcp";
    if (mcpCheckBox.checked) {
        mcpCard.style.backgroundColor = "oklch(94.158% 0.02414 254.032)";
        profFeeCard.style.display = "flex";
        mcpRow(rowClassName);

        //professional checkbox
        checkboxInputEvent(rualCheckBox, "rual", subTotalItem.rualNetAmount);
        checkboxInputEvent(dalireCheckBox, "dalire", subTotalItem.dalireNetAmount);
    } else {
        mcpCard.style.backgroundColor = "oklch(0.985 0.002 247.839)";
        profFeeCard.style.display = "none";
         
        rualCheckBox.checked = false;
        dalireCheckBox.checked = false;
        subTotalItem.rualNetAmount.isIncluded = false;
        subTotalItem.dalireNetAmount.isIncluded = false;
        
        removeRowByClass(rowClassName);
        trCount() < 1 && defaultRow();

    }
});

encpCheckBox.addEventListener("change", e => {
    const rowClassName = "encp";
    if (encpCheckBox.checked) {
        encpCard.style.backgroundColor = "oklch(94.158% 0.02414 254.032)";
        encpRow(rowClassName);
        
        //tester for subtotal
        // console.log(`Rual Net: ${subTotalItem.rualNetAmount.value}`);
        // console.log(`Rual Net: ${subTotalItem.rualNetAmount.isIncluded ? subTotalItem.rualNetAmount.value : 0}`);
        // console.log(`Dalire Net: ${subTotalItem.dalireNetAmount.isIncluded ? subTotalItem.dalireNetAmount.value : 0}` );
    } else {
        encpCard.style.backgroundColor = "oklch(0.985 0.002 247.839)";
        removeRowByClass(rowClassName);
        trCount() < 1 && defaultRow();
    }
});

addServiceBtn.addEventListener("click", e => {
    const cardIdNum = newServiceData.serviceCounter;
    newServiceData.serviceCounter ++;

    addNewEntry(cardIdNum);
    createServiceCard(cardIdNum);
    serviceRowTable("services");

})

// mcpRow();
function mcpRow(rowClassName) {
    if (trCount() === 1) {
        tbody.innerHTML = "";
    }
    tableBuilder(mcpData, rowClassName);
}

// encpRow();
function encpRow(rowClassName) {
    if (trCount() === 1) {
        tbody.innerHTML = "";
    }

    tableBuilder(encpData, rowClassName);
}

function tableBuilder(data, rowClass) {
    
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
            trItem.append(tdItemAmount, tdItemPhil, tdItemNet);
            tbody.appendChild(trItem);

            item.professionals.forEach(prof => {
                const trProf = document.createElement("tr");
                const tdProfName = document.createElement("td");
                const tdProfAmount = document.createElement("td");
                const tdProfPhil = document.createElement("td");
                const tdProfNet = document.createElement("td");

                const isLiza = prof.name.split(" ")[0].toLowerCase() === "liza";
                trProf.id = isLiza ? "rual-row" : "dalire-row";


                trProf.classList.add("professional-row", rowClass);
                

                tdProfName.classList.add("item-name");
                tdProfAmount.classList.add("item-amount");
                tdProfPhil.classList.add("item-phil");
                tdProfNet.classList.add("item-net");

                const net = Number(prof.amount) - Number(prof.philHealth);

                tdProfName.textContent = prof.name;
                tdProfAmount.textContent = numberFormat(prof.amount);
                tdProfPhil.textContent = numberFormat(prof.philHealth);
                tdProfNet.textContent = numberFormat(net);

                trProf.appendChild(tdProfName);
                trProf.appendChild(tdProfAmount);
                trProf.appendChild(tdProfPhil);
                trProf.appendChild(tdProfNet);

                trProf.style.display = Number(prof.amount) < 1 ? "none" : "table-row"; 
                
                tbody.appendChild(trProf);
                
            });

            
        }

        if (item.amount && item.philHealth) {
            const net = Number(item.amount) - Number(item.philHealth);

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

function textTrimmerFirstCap(str) {
    str = str.trim();
    
    if (!str) return "";

    return str[0].toUpperCase() + str.slice(1);
}

function checkboxInputEvent(profCheckBox, profName, netAmount) {
    const profRow = document.querySelector(`#${profName}-row`);
    const profInput = document.querySelector(`#${profName}-pf`);
    const profAmount = document.querySelector(`#${profName}-row .item-amount`);
    const profNet = document.querySelector(`#${profName}-row .item-net`);

    profInput.addEventListener("input", e => handleInputToPreview(profInput, profAmount, profNet, netAmount));

    profCheckBox.addEventListener("change", e => {
        
        if (e.target.checked) {
            profRow.style.display = "table-row";
            profInput.disabled = false;
            profAmount.textContent = numberFormat(Number(profInput.value));
            netAmount.isIncluded = true;

        } else {
            profRow.style.display = "none";
            profInput.disabled = true;
            profInput.value = "";
            profNet.textContent = numberFormat(-6240);
            netAmount.value = -6240;
            netAmount.isIncluded = false;

        }
    });

}

function handleInputToPreview(profInput, previewAmount, previewNet, netAmount) {
    netAmount.value = Number(profInput.value) - 6240;
    previewAmount.textContent = numberFormat(netAmount.value + 6240);
    previewNet.textContent = numberFormat(netAmount.value);
}

//service card add entry on the dictionary
function addNewEntry(serviceNum) { 
    const service = {
        id: serviceNum,
        description: "",
        quantity: 0,
        unitPrice: 0,
        netAmount: 0
    }

    newServiceData[serviceFirstKey].push(service);
}

//service card input ui
function createServiceCard(serviceNum) {
    const divParent = document.createElement("div");
    const labelDesc = document.createElement("label");
    const inputDesc = document.createElement("input");

    const divQuantityPrice = document.createElement("div");
    const labelQuantity = document.createElement("label");
    const inputQuantity = document.createElement("input");
    const labelPrice = document.createElement("label");
    const inputPrice = document.createElement("input");

    const divTotalDelete = document.createElement("div");
    const pTotal = document.createElement("p");
    const spanTotal = document.createElement("span");
    const imgDelete = document.createElement ("img");

    // type, class and id delegation
    divParent.className = "service-card";
    divParent.id = `card-${serviceNum}`;
    
    inputDesc.className = "desc";
    inputDesc.type = "text";

    divQuantityPrice.className = "quantity-unit-price";
    inputQuantity.className = "quantity";
    inputQuantity.type = "number";
    inputPrice.className = "unit-price";
    inputPrice.type = "number";

    divTotalDelete.className = "total-delete-button";
    spanTotal.className = "subtotal-per-card";
    imgDelete.className = "delete-button";

    //context delegation
    labelDesc.textContent = "Description";
    labelDesc.appendChild(inputDesc);

    labelQuantity.textContent = "Quantity";
    labelQuantity.appendChild(inputQuantity);
    labelPrice.textContent = "Unit Price";
    labelPrice.appendChild(inputPrice);
    divQuantityPrice.append(labelQuantity, labelPrice);

    pTotal.innerHTML = "Total: &#8369; ";
    spanTotal.textContent = numberFormat(0);
    pTotal.appendChild(spanTotal);
    imgDelete.src = "./assets/trash.svg";
    imgDelete.alt = "delete button"
    divTotalDelete.append(pTotal, imgDelete);

    // adding tags
    divParent.append(labelDesc, divQuantityPrice, divTotalDelete);

    //listeners
    inputListener(inputDesc, "description", spanTotal, divParent, serviceNum);
    inputListener(inputQuantity, "quantity", spanTotal, divParent, serviceNum);
    inputListener(inputPrice, "unitPrice", spanTotal, divParent, serviceNum);
    
    deleteParent(imgDelete, divParent, serviceNum);

    addServiceCard.appendChild(divParent);

}

function inputListener(inputTag, modifier, totalTag, parentTag, idNum) {
    inputTag.addEventListener("input", e => {
        if (modifier !== "description" && Number(e.target.value) < 0) {
            e.target.value = 0;
        }

        newServiceData[serviceFirstKey].forEach(item => {
            if (item.id === idNum) {
                item[modifier] = modifier === "description" ? textTrimmerFirstCap(e.target.value) : Number(e.target.value);
                
                if (modifier !== "description") {
                    item.netAmount = item.quantity * item.unitPrice;
                    totalTag.textContent = numberFormat(item.netAmount);

                    const tdItemAmount = document.querySelector(`#service-${item.id} .item-amount`);
                    const tdNetAmount = document.querySelector(`#service-${item.id} .item-net`);
                    tdItemAmount.textContent = numberFormat(item.netAmount);
                    tdNetAmount.textContent = numberFormat(item.netAmount);
                }

                // row ui
                const tdItemName = document.querySelector(`#service-${item.id} .item-name`);
                tdItemName.innerHTML = `${item.description} x${item.quantity} x &#8369;${numberFormat(item.unitPrice)}`;
                
                if (item.description && item.quantity > 0 && item.unitPrice > 0) {
                    parentTag.style.backgroundColor = "oklch(94.158% 0.02414 254.032)";
                } else {
                    parentTag.style.backgroundColor = "rgb(238, 238, 238)";
                }
                
                
                console.log (`id: ${item.id}, desc:${item.description}, quantity:${item.quantity}, unit price: ${item.unitPrice}, net: ${item.netAmount}`);
            }
        })
    });
}

function deleteParent(imgTag, parentTag, idNum) {
    imgTag.addEventListener("click", e => {
        newServiceData[serviceFirstKey] = newServiceData[serviceFirstKey].filter(item => item.id !== Number(idNum));
        deleteEquivRow(idNum);
        parentTag.remove();
    })
}

//service row builder
function serviceRowTable(rowClassName) {
    if (trCount() === 1) {
        tbody.innerHTML = "";
    }

    if (newServiceData[serviceFirstKey].length <= 1) {
        const trPackageName = document.createElement("tr");
        trPackageName.className = rowClassName;
        for (let i = 0; i < 4; i++) {
            const tdPackage = document.createElement("td");
            if (i === 0) {
                tdPackage.textContent = serviceFirstKey;
                tdPackage.className = "package-name";
            }
            trPackageName.appendChild(tdPackage);
        }
        tbody.appendChild(trPackageName);
    }

    newServiceData[serviceFirstKey].forEach(item => {
        const isItemRowExisting = document.querySelector(`#service-${item.id}`) !== null;
        if (!isItemRowExisting) {
            const trItem = document.createElement("tr");
            const tdItemDesc = createTdWithClass("item-name");
            const tdItemAmount = createTdWithClass("item-amount");
            const tdItemPhil = createTdWithClass("item-phil");
            const tdItemNet = createTdWithClass("item-net");

            trItem.className = rowClassName;
            trItem.id = `service-${item.id}`;


            tdItemDesc.innerHTML = nonEntry;
            tdItemAmount.textContent = numberFormat(item.unitPrice);
            tdItemPhil.textContent = numberFormat(0);
            tdItemNet.textContent = numberFormat(item.netAmount);

            trItem.append(tdItemDesc, tdItemAmount, tdItemPhil, tdItemNet);

            // get the last service row
            const allServicesRow = document.querySelectorAll(`tr.${rowClassName}`);
            const lastServiceRow = allServicesRow[allServicesRow.length - 1];

            lastServiceRow.after(trItem);
        }
    }); 
}

function createTdWithClass(tdClassName) {
    const td = document.createElement("td");
    td.className = tdClassName;

    return td;
}

function deleteEquivRow(idNum) {
    //delete row
    const serviceRow = document.querySelector(`#service-${idNum}`);
    serviceRow.remove();

    //delete service header if there is no service
    const serviceRowCount = document.querySelectorAll(".services");
    if (serviceRowCount.length === 1) {
        serviceRowCount.forEach(item => item.remove());
    }
    
    //default
    trCount() < 1 && defaultRow();
}






