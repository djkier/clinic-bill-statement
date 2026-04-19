const printBtn = document.querySelector("#print-preview");

printBtn.addEventListener("click", e => {
    window.print();
})