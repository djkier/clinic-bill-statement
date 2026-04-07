import { nonNegativeInput } from "../util.js";

const table = document.querySelector("#additional table");
const tbody = document.querySelector("#additional tbody");
const rows = document.querySelectorAll("#additional tbody tr");
const amtInputs = document.querySelectorAll("#additional tbody tr td:nth-child(3) input")
const trashBtns = document.querySelectorAll("#additional .trash-btn");
const addRowBtn = document.querySelector("#add-row-btn");


// -----------------------------------------------------
// DEFAULTS    -----------------------------------------
// -----------------------------------------------------
handleNewRow();

trashBtns.forEach(btn => {
    handleTrashAction(btn)
});

addRowBtn.addEventListener("click", handleNewRow);

// -----------------------------------------------------
// Rows Actions ----------------------------------------
// -----------------------------------------------------

function amountAction(qtyInput, unitInput, amtInput) {
    inputChange(qtyInput, () => handleAmountInput(qtyInput, unitInput, amtInput));
    inputChange(unitInput, () => handleAmountInput(qtyInput, unitInput, amtInput));
}

function handleAmountInput(qtyInput, unitInput, amtInput) {

    const qtyVal = Number(qtyInput.value) || 0;
    const unitVal = Number(unitInput.value) || 0;
    const amtValue = Number(qtyVal * unitVal).toFixed(2);

    amtInput.value = amtValue;
}

function inputChange(input, fn) {
    input.addEventListener("input", fn)
};



function handleTrashAction(btn) {
    btn.addEventListener("click",  e => {
        const parentTr = e.target.closest("tr");
        if (tbody.children.length > 1) {
            tbody.removeChild(parentTr);
        } else {
            clearRowInput(parentTr);
        }
    });
}

function clearRowInput(parentTr) {
    for (let child of parentTr.children) {
        const childInput = child.querySelector("input");
        if (childInput) {
            child.querySelector("input").value = "";
        }
    }
}

function handleNewRow() {
    const newTr = document.createElement("tr");

    for (let i=0; i < 5; i++) {
        
        let tdChild;
        switch (i) {
            case 0:
                tdChild = createInput("name-additional", "text");
                break;
            case 1:
                tdChild = createInput("quantity", "number");
                break;
            case 2:
                tdChild = createInput("unit-price", "number");
                break;
            case 3: 
                tdChild = createInput("amount", "number", true);
                break;
            case 4:
                tdChild = createTrashBtn();
                break;
            default:
                tdChild = document.createElement("div");

        }

        const newTd = document.createElement("td");
        newTd.appendChild(tdChild);
        newTr.appendChild(newTd);
    }

    amountAction(
        getInputFromTr(newTr, 1), //quantity input
        getInputFromTr(newTr, 2), //unit price input
        getInputFromTr(newTr, 3)  // amount input
    );

    tbody.appendChild(newTr);
}

function createInput(name, type, disable = false) {
    const newInput = document.createElement("input");
    newInput.name = name;
    newInput.type = type;
    if (type == "number") nonNegativeInput(newInput);
    if (disable) newInput.disabled = disable;
    

    return newInput;
}

function createTrashBtn() {
    const newImg = document.createElement("img");
    newImg.src = "./assets/trash.svg";
    
    const newDiv = document.createElement("div");
    newDiv.classList.add("trash-btn");
    
    newDiv.appendChild(newImg);
    
    handleTrashAction(newDiv);

    return newDiv;
}

function getInputFromTr(row, index) {
    return row.children[index].querySelector("input");
}




