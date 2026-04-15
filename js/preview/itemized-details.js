import { formatMoney } from "../util";

const previewTable = document.querySelector("#preview-table");
const previewTableBody = document.querySelector("#preview-table tbody");

function createDataCell(value) {
    const newTd = document.createElement("td");
    newTd.textContent = value;

    return newTd;
}

function computeAmount(amount, philHealth) {
    const net = Number(amount) - Number(philHealth);

    return formatMoney(net);
}

function createRow(info) {
    const { name, amount, philHealth } = info;
    const newRow = document.createElement("tr");

    const descTd = createDataCell(name);
    const amountTd = createDataCell(formatMoney(amount));
    const philHealthTd = createDataCell(formatMoney(philHealth));
    const netTd = createDataCell(computeAmount(amount, philhealth));

    newRow.append(descTd, amountTd, philHealthTd, netTd);
    
    return newRow;
}

function createProfessionalRows(profFeeInfo) {
    
}

function packageRows(details) {
    for (const key in details) {
        if (details[key].professionals !== undefined) {
            createProfessionalRows(details[key]);
        } else {
            const row = createRow(details[key]);
            previewTableBody.appendChild(row);
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

    if (states.mcp) {
        addPackageNameRow("Maternity Care Package");
        packageRows(mcp);
    }

    if (states.encp) {

    }


}