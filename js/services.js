const mcpData = {
    "Maternity Care Package (MCP)" : [
        {
            name: "Professional Fee",
            professionals: [
                {
                    name: "Liza H. Rual, RM",
                    amount: 0,
                    key: "rual"
                },
                {
                    name: "Dr. Genevieve Mendoza-Dalire",
                    amount: 0,
                    key: "dalire"
                }
            ],
            amount: 0,
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
    ],
    subTotal: 0
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
    ],
    subTotal: 0
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
    subTotal: 0
}
const serviceFirstKey = Object.keys(newServiceData)[0];
const mcpFirstKey = Object.keys(mcpData)[0];
const profArr = mcpData[mcpFirstKey][0].professionals;

const profCheckBox = document.querySelectorAll(`.pf input[type="checkbox"]`);
const profInput = document.querySelectorAll(`.pf input[type="number"]`);
const mcpCard = document.querySelector("#mcp");
const mcpCheckBox = document.querySelector("#mcp-box");
const profFeeCard = document.querySelector("#professional-fee");
const mcpServiceCard = document.querySelector("#mcp-service");
const mcpServiceBox = document.querySelector("#mcp-service-checkbox");
const mcpServicePricing = document.querySelector("#mcp-service-pricing");
const rualCheckBox = document.querySelector("#rual-checkbox");
const dalireCheckBox = document.querySelector("#dalire-checkbox");

const encpCard = document.querySelector("#encp");
const encpCheckBox = document.querySelector("#encp-box");
const encpServiceCard = document.querySelector("#encp-service");
const encpServiceBox = document.querySelector("#encp-service-checkbox");
const encpServicePricing = document.querySelector("#encp-service-pricing");


const tbody = document.querySelector("tbody");
const subTotalP = document.querySelector("#subtotal p:nth-of-type(2)");
const discountInput = document.querySelector("#discounts");
const discountP = document.querySelector("#discount-prev p:nth-of-type(2)");
const totalh2 = document.querySelector("#total-value");

const addServiceBtn = document.querySelector("#add-service-btn");
const addServiceCard = document.querySelector("#additional-generated-services");

const trCount = () => tbody.querySelectorAll("tr").length;
// default
const blueColor = "oklch(94.158% 0.02414 254.032)";
const darkColor = "oklch(0.985 0.002 247.839)";
const nonEntry = "&nbsp;&nbsp;&#8212;";

defaultMcpUI();
function defaultMcpUI() {
    profFeeCard.style.display = "none";
    mcpServiceCard.style.display = "none";
    mcpServicePricing.style.display = "none";
}

defaultEncpUI();
function defaultEncpUI() {
    encpServiceCard.style.display = "none";
    encpServicePricing.style.display = "none";
}


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

defaultTotals();
function defaultTotals() {
    discountP.textContent = `- ${numberFormat(0)}`;
    totalh2.textContent = numberFormat(0);
}

// mcp professionals should deduct only on 6240 as a whole not per each professional
checkboxInputEvent(rualCheckBox, "rual");
checkboxInputEvent(dalireCheckBox, "dalire");



mcpCheckBox.addEventListener("change", e => {
    const rowClassName = "mcp";
    if (mcpCheckBox.checked) {
        mcpCard.style.backgroundColor = blueColor;
        profFeeCard.style.display = "flex";
        mcpServiceCard.style.display = "flex";

        tableBuilder(mcpData, rowClassName);
        updateProfAmount();

        //professional checkbox
        
    } else {
        //card inactive
        mcpCard.style.backgroundColor = darkColor;
        defaultMcpUI();
        mcpServiceBox.checked = false;

         
        //uncheck all professional check
        profCheckBox.forEach(node => {
            node.checked = false;
        })

        //reset input into its default mode
        profInput.forEach(node => {
            node.disabled = true;
            node.value = "";
        })
    
        //reset professional amount 
        profArr.forEach(prof => {
            prof.amount = 0;
        })

        // updateProfAmount();
        mcpData.subTotal = 0;
        updateSubTotal();
        

        removeRowByClass("prof-fee");
        removeRowByClass(rowClassName);
        
        trCount() < 1 && defaultRow();

    }
});

mcpServiceBox.addEventListener("change", e => {
    if (mcpServiceBox.checked) {
        mcpServicePricing.style.display = "flex";
    } else {
        mcpServicePricing.style.display = "none";
        //add event that will enable the textfields
    }
});

encpCheckBox.addEventListener("change", () => {
    const rowClassName = "encp";
    if (encpCheckBox.checked) {
        encpCard.style.backgroundColor = blueColor;
        encpServiceCard.style.display = "flex";


        tableBuilder(encpData, rowClassName);
        
    } else {
        encpCard.style.backgroundColor = darkColor;
        defaultEncpUI();
        encpServiceBox.checked = false;
        
        removeRowByClass(rowClassName);
        trCount() < 1 && defaultRow();
    }
});

encpServiceBox.addEventListener("change", e => {
    if (encpServiceBox.checked) {
        encpServicePricing.style.display = "flex";
    } else {
        encpServicePricing.style.display = "none";
    }
});

addServiceBtn.addEventListener("click", () => {
    const cardIdNum = newServiceData.serviceCounter;
    newServiceData.serviceCounter ++;

    addNewEntry(cardIdNum);
    createServiceCard(cardIdNum);
    serviceRowTable("services");

})

discountInput.addEventListener("input", e => {
    if (Number(e.target.value) <= 0) {
        e.target.value = 0;
    } 
    discountP.textContent = "- " + numberFormat(Number(e.target.value));

    updateSubTotal();
})

function tableBuilder(data, rowClassName) {
    if (trCount() === 1) {
        tbody.innerHTML = "";
    }
    
    //package name row
    const packageName = Object.keys(data)[0];
    const trPackageName = document.createElement("tr");
    for (let i = 0; i < 4; i++) {
        const tdRowPackageName = document.createElement("td");
        if (i === 0) {
            tdRowPackageName.textContent = packageName;
            tdRowPackageName.classList.add("package-name");
        }
        trPackageName.appendChild(tdRowPackageName);
    }
    trPackageName.classList.add(packageName.split(" ")[0].toLowerCase(), rowClassName);
    tbody.appendChild(trPackageName);

    //items from the package
    data[packageName].forEach(item => {
        const [trItem, tdItemName, tdItemAmount, tdItemPhil, tdItemNet] = trFactory();

        trItem.classList.add(rowClassName);

        tdItemName.textContent = item.name;
        tdItemAmount.textContent = numberFormat(item.amount);
        tdItemPhil.textContent = numberFormat(item.philHealth);
        tdItemNet.textContent = numberFormat(Number(item.amount) - Number(item.philHealth));

        //hide the amount for the professional row
        if (item.professionals) {
            tdItemAmount.id = "hidden-td";
            tdItemNet.id = "prof-net";
            trItem.classList.add("prof-fee");
        }
  
        trItem.append(tdItemName, tdItemAmount, tdItemPhil, tdItemNet);
        tbody.appendChild(trItem);
    });
}

function removeRowByClass (rowClassName) {
    tbody.querySelectorAll("tr."+rowClassName).forEach(tr => {
            tr.remove();
    })
}

function trFactory() {
    const trItem = document.createElement("tr");
    const tdItemDesc = createTdWithClass("item-name");
    const tdItemAmount = createTdWithClass("item-amount");
    const tdItemPhil = createTdWithClass("item-phil");
    const tdItemNet = createTdWithClass("item-net");

    return [trItem, tdItemDesc, tdItemAmount, tdItemPhil, tdItemNet];
}

function numberFormat(amount) {
    return amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function textTrimmerFirstCap(str) {
    str = str.trim();
    
    if (!str) return "";

    return str[0].toUpperCase() + str.slice(1);
}

function checkboxInputEvent(profCheckBox, profName) {
    const inputProf = document.querySelector(`#${profName}-pf`);
    const [trProf, tdProfName, tdProfAmount] = trFactory();
    trProf.append(tdProfName, tdProfAmount);
    trProf.id = `${profName}-row`
    trProf.classList.add("prof-fee");

    profCheckBox.addEventListener("change", e => {
        if (e.target.checked) {
            inputProf.disabled = false;
            addProfRow(profName, tdProfName, tdProfAmount, trProf);

        } else {
            inputProf.disabled = true;
            inputProf.value = "";
            profItem(profName).amount = 0;
            updateProfAmountUI();

            trProf.remove();

        }
    });

    //input should be seperated as it will produce multiple event listener per check done.
    inputProf.addEventListener("input", e => {
        if (Number(e.target.value) <= 0) {
            e.target.value = 0;
        }
        const prof = profItem(profName);

        //per professional row update
        prof.amount = Number(e.target.value);
        tdProfAmount.textContent = numberFormat(prof.amount);

        //professioanl fee row update
        updateProfAmountUI();
    });
}

function profItem(key) {
    return profArr.find(item => item.key === key);
}

function addProfRow(profName, tdName, tdAmount, trProf) {
    const item = profItem(profName);
    tdName.textContent = item.name;
    tdAmount.textContent = numberFormat(item.amount);

    const profFeeClasses = document.querySelectorAll(".prof-fee");
    const lastProfFeeClass = profFeeClasses[profFeeClasses.length - 1];
    lastProfFeeClass.after(trProf);
    
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
                    updateServSubTotal();

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
                    parentTag.style.backgroundColor = blueColor;
                } else {
                    parentTag.style.backgroundColor = darkColor;
                }
            }
        })
    });
}

function deleteParent(imgTag, parentTag, idNum) {
    imgTag.addEventListener("click", () => {
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
        trPackageName.classList.add(rowClassName, serviceFirstKey.split(" ")[0].toLowerCase());
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
            const [trItem, tdItemDesc, tdItemAmount, tdItemPhil, tdItemNet] = trFactory();

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
    updateServSubTotal();
    trCount() < 1 && defaultRow();
}

function updateProfAmountUI() {

    updateProfAmount();
    const tdAmountHidden = document.querySelector("#hidden-td");
    const tdProfNet = document.querySelector("#prof-net");

    tdAmountHidden.textContent = mcpData[mcpFirstKey][0].amount;
    tdProfNet.textContent = numberFormat(mcpData.subTotal);
}

function updateProfAmount() {
    const profTotal = profArr.reduce((sum, item) => sum + Number(item.amount), 0);
    mcpData[mcpFirstKey][0].amount = profTotal;
    mcpData.subTotal = profTotal - mcpData[mcpFirstKey][0].philHealth;
    updateSubTotal();
}

function updateServSubTotal() {
    let serviceArr = newServiceData[serviceFirstKey];
    newServiceData.subTotal = serviceArr.length > 0 ?
                                serviceArr.reduce((sum, item) => sum + item.netAmount, 0) :
                                0;

    updateSubTotal();

    console.log(`Service SubTotal: ${newServiceData.subTotal}`);
}

//default check
updateSubTotal();
function updateSubTotal() {
    const dataArr = [mcpData, encpData, newServiceData];

    const subTotal = dataArr.reduce((sum, item) => sum + item.subTotal, 0);
    subTotalP.textContent = numberFormat(subTotal);

    totalh2.textContent = numberFormat(subTotal - Number(discountInput.value));
}



