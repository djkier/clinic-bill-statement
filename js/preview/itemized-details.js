const previewTable = document.querySelector("#preview-table");
const previewTableBody = document.querySelector("#preview-table tbody");

function createData(value) {
    const newTd = document.createElement("td");
    newTd.textContent = value;

    return newTd;
}

function createRow(info) {
    const { name, amount, philHealth } = info;
    const newRow = document.createElement("tr");

    const descTd = 
}

function packageRows(details) {
    for (const key in details) {

    }
}

function addPackageNameRow(name) {
    const packageNameCell = document.createElement("td");
    const packageNameRow = document.createElement("tr");

    packageNameCell.textContent = name;

    packageNameRow.appendChild(packageNameCell);
    previewTableBody.appendChild(packageNameRow);
}

function clearTableData() {
    previewTableBody.replaceChildren();
}

export function previewItemizedTable(servicePackages) {
    const { states, mcp, encp } = servicePackages;

    if (states.mcp) {
        
    }

    if (states.encp) {

    }


}