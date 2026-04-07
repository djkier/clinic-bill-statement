const table = document.querySelector("#additional table");
const tbody = document.querySelector("#additional tbody");
const rows = document.querySelectorAll("#additional tbody tr");
const trashBtns = document.querySelectorAll("#additional .trash-btn");
const addRowBtn = document.querySelector("add-row-btn");


// -----------------------------------------------------
// DEFAULTS    -----------------------------------------
// -----------------------------------------------------

trashBtns.forEach(btn => {
    handleTrashAction(btn)
});

// -----------------------------------------------------
// Rows Actions ----------------------------------------
// -----------------------------------------------------

// const firstInput = parentTr.children[0].querySelector("input");
function handleTrashAction(btn) {
    btn.addEventListener("click",  e => {
        const parentTr = e.target.closest("tr");
        tbody.removeChild(parentTr);
    });
}

