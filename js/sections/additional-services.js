const table = document.querySelector("#additional table");
const tbody = document.querySelector("#additional tbody");
const rows = document.querySelectorAll("#additional tbody tr");
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

// const firstInput = parentTr.children[0].querySelector("input");
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
        const newTd = document.createElement("td");
        let tdChild = document.createElement("input");
        tdChild.type = "number"
        
        if (i === 0) {
            tdChild.name = "name-additional";
            tdChild.type = "text";
        }

        if (i === 1) {
            tdChild.name = "quantity";
        }

        if (i === 2) {
            tdChild.name = "unit-price"
        }
        
        if (i === 3) {
            tdChild.name = "amount"
            tdChild.disabled = true;
        }

        if (i === 4) {
            const newImg = document.createElement("img");
            newImg.src = "./assets/trash.svg";
            
            const newDiv = document.createElement("div");
            newDiv.classList.add("trash-btn");
            
            newDiv.appendChild(newImg);
            handleTrashAction(newDiv);

            tdChild = newDiv;
        }

        newTd.appendChild(tdChild);

        newTr.appendChild(newTd);
    }

    tbody.appendChild(newTr);
}



