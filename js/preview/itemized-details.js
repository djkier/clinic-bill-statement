import { formatMoney } from "../util.js";
import { resetSubTotal, addAmountOnSubTotal } from "../state.js";

const previewTable = document.querySelector("#preview-table");
const previewTableBody = document.querySelector("#preview-table tbody");

function createDataCell(value) {
    const newTd = document.createElement("td");
    newTd.textContent = value;

    return newTd;
}


function createRow(info) {
    const { name, amount, philHealth } = info;
    const newRow = document.createElement("tr");
    const netAmount = Number(amount) - Number(philHealth);

    const descTd = createDataCell(name);
    const amountTd = createDataCell(formatMoney(amount));
    const philHealthTd = createDataCell(formatMoney(philHealth));
    const netTd = createDataCell(formatMoney(netAmount));

    //update state subtotal
    addAmountOnSubTotal(netAmount);

    newRow.append(descTd, amountTd, philHealthTd, netTd);
    
    return newRow;
}

function createProfessionalRows(profFeeInfo) {
    const { name, professionals, philHealth } = profFeeInfo;
    
    const profDescRow = document.createElement("tr");
    profDescRow.appendChild(createDataCell(name));
    previewTableBody.appendChild(profDescRow);

    let isPhilHealthUsed = false;
    for (const professional of professionals) {
        if (professional.amount === 0) {
            continue;
        }

        const info = {
            name: professional.name,
            amount: Number(professional.amount),
            philHealth: isPhilHealthUsed ? 0 : philHealth
        };

        const profRow = createRow(info);
        profRow.children[0].classList.add("indented");

        previewTableBody.appendChild(profRow);

        isPhilHealthUsed = true;
    }
}

function packageRows(details) {
    for (const key in details) {
        if (details[key].professionals !== undefined) {
            createProfessionalRows(details[key]);
        } else {
            previewTableBody.appendChild(createRow(details[key]));
        }
    }
}

function addPackageNameRow(name) {
    const packageNameRow = document.createElement("tr");
    packageNameRow.classList.add("package-name");

    packageNameRow.appendChild(createDataCell(name));
    previewTableBody.appendChild(packageNameRow);
}

function clearTableData() {
    previewTableBody.replaceChildren();
}

export function previewItemizedTable(servicePackages) {
    const { states, mcp, encp } = servicePackages;

    clearTableData();
    resetSubTotal();

    if (states.mcp) {
        addPackageNameRow("Maternity Care Package");
        packageRows(mcp);
    }

    if (states.encp) {
        addPackageNameRow("Expanded Newborn Care Package");
        packageRows(encp);
    }


}